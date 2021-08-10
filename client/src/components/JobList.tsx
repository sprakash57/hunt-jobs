import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFormFields, usePolling } from "../helpers/hooks";
import { pollingResults, triggerSearch } from "../helpers/api";
import Job from "./Job";
import ErrorPage from "./ErrorPage";
import { Button, Input, Loader } from "./common";
import { DELAY, EXPIRE_TIMER } from "../constants";
import styles from "../styles/components/JobList.module.scss";

const JobList = () => {
    const trackOneMinute = useRef(0); // Track the EXPIRE_TIMER
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
            const data = await triggerSearch({ ...fields });
            if (data?.status === 200) {
                setIsFetching(true);
            }
        } catch {
            showErrorMessage("Something went wrong! Try a new search.");
        }
    }

    usePolling(async () => {
        // Timeout after the EXPIRE_TIMER. Default is 1 min.
        if (++trackOneMinute.current >= EXPIRE_TIMER) {
            showErrorMessage("Request timeout. Try a new search.");
        }
        // Check if there are no jobs call the api again after some DELAY. Default is 2 seconds.
        if (!jobList.length) {
            const jobs = await pollingResults();
            setJobList(jobs);
        } else {
            // Persist data in localstorage.
            localStorage.setItem("jobs", JSON.stringify(jobList));
            setIsFetching(false);
            setIsLoading(false);
        }
    }, isFetching ? DELAY : null);
    // Render persisted data once component mounts.
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
            {error.status && <ErrorPage message={error.message} />}
        </section>
    )
}

export default JobList;
