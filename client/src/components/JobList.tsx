import React, { useEffect, useState } from "react";
import { useFormFields, usePolling } from "../helpers/hooks";
import styles from "../styles/components/JobList.module.scss";
import { Button, Input } from "./common";
import Job from "./Job";
import { getJobs, queryForJobs } from "../helpers/api";
import { DELAY, EXPIRE_TIMER } from "../constants";
import Loader from "./common/Loader";
import { Link } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const JobList = () => {
    let currentTimer = 0; // Track the expire time factor
    const [isFetching, setIsFetching] = useState(false);
    const [jobList, setJobList] = useState<Job[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({ status: false, message: "" });
    const [fields, handleFieldChange] = useFormFields({
        location: "",
        query: ""
    });
    // Clear persisted data if new query has been submitted.
    const resetData = () => {
        setJobList([]);
        setError({ status: false, message: "" });
        localStorage.removeItem("jobs");
    }

    const showErrorMessage = (message: string) => {
        setError({ status: true, message });
        setIsLoading(false);
        setIsFetching(false);
    }

    const handleSubmit = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();
            resetData();
            setIsLoading(true);
            const data = await queryForJobs({ ...fields });
            if (data?.status === 200) {
                setIsFetching(true);
            }
        } catch {
            showErrorMessage("Something went wrong! Try a new search.");
        }
    }

    usePolling(async () => {
        const jobs = await getJobs();
        // If current timer is greater than 1 min then cancel polling.
        if (++currentTimer > EXPIRE_TIMER) {
            showErrorMessage("Request timeout. Try a new search.");
        } else if (jobs.length) {
            // Get the top 10 results
            console.log(jobs.length);
            setJobList(jobs);
            localStorage.setItem("jobs", JSON.stringify(jobs)); //Persist data in localstorage
            setIsFetching(false);
            setIsLoading(false);
        }
    }, isFetching ? DELAY : null);
    // On mount render persisted data.
    useEffect(() => {
        const jobs = localStorage.getItem("jobs");
        if (jobs) {
            setJobList(JSON.parse(jobs));
        }
    }, [])

    return (
        <section className={styles.jobs}>
            <form onSubmit={handleSubmit} className={styles.jobs__form}>
                <Input
                    changeCallback={handleFieldChange}
                    value={fields.location}
                    placeholder="location"
                    id="location"
                    aria-describedby="JobLocation"
                />
                <Input
                    changeCallback={handleFieldChange}
                    value={fields.query}
                    placeholder="Find your dream job"
                    id="query"
                    aria-describedby="technology"
                />
                <Button label="Search" />
            </form>
            {!!jobList.length && jobList.map(job => (
                <Link to={`/${job.id}`} key={job.id}>
                    <Job job={job} />
                </Link>
            ))}
            {isLoading && !jobList.length && <Loader label="Your results will appear here..." />}
            {error.status && <ErrorPage />}
        </section>
    )
}

export default JobList;
