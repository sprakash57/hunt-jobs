import React, { useState } from "react";
import { useFormFields, usePolling } from "../helpers/hooks";
import styles from "../styles/components/JobList.module.scss";
import { Button, Input } from "./common";
import Job from "./Job";
import { getJobs, queryForJobs } from "../helpers/api";
import { DELAY, EXPIRE_TIMER } from "../constants";
import Loader from "./common/Loader";
import { Link } from "react-router-dom";

const JobList = () => {
    let currentTimer = 0; // Track the expire time factor
    const [isFetching, setIsFetching] = useState(false);
    const [jobList, setJobList] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        location: "",
        query: ""
    });

    const handleSubmit = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();
            setJobList([]);
            setIsLoading(true);
            const data = await queryForJobs({ ...fields });
            if (data?.status === 200) {
                setIsFetching(true);
            }
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    usePolling(async () => {
        const jobs = await getJobs();
        // If current timer is greater than 1 min then cancel polling.
        if (++currentTimer > EXPIRE_TIMER) {
            setIsFetching(false);
        } else if (jobs.length) {
            setJobList(jobs);
            setIsFetching(false);
            setIsLoading(false);
        }
    }, isFetching ? DELAY : null);

    return (
        <section className={styles.jobs}>
            <form onSubmit={handleSubmit} className={styles.jobs__form}>
                <Input changeCallback={handleFieldChange} value={fields.location} placeholder="location" id="location" />
                <Input changeCallback={handleFieldChange} value={fields.query} placeholder="Find your dream job" id="query" />
                <Button label="Search" />
            </form>
            {!!jobList.length && jobList.slice(0, 9).map(job => (
                <Link to={`/${job.id}`} key={job.id}>
                    <Job job={job} />
                </Link>
            ))}
            {isLoading && !jobList.length && <Loader label="Your results will appear here..." />}
        </section>
    )
}

export default JobList;
