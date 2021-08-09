import React, { useState } from "react";
import { useFormFields, usePolling } from "../helpers/hooks";
import styles from "../styles/components/JobList.module.scss";
import { Button, Input } from "./common";
import Job from "./Job";
import { getJobs, queryForJobs } from "../helpers/api";

const JobList = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [list, setList] = useState([]);
    const [fields, handleFieldChange] = useFormFields({
        location: "",
        category: ""
    })

    const handleSubmit = async (e: React.SyntheticEvent) => {
        try {
            e.preventDefault();
            console.log(fields);
            setList([]);
            const data = await queryForJobs();
            if (data?.status === 200) {
                setIsRunning(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const hasValidInputs = fields.location || fields.category;

    usePolling(async () => {
        const data = await getJobs();
        if (data.length) {
            setList(data);
            setIsRunning(false);
        }
    }, isRunning ? 1000 : null);

    return (
        <section className={styles.jobs}>
            <form onSubmit={handleSubmit} className={styles.jobs__form}>
                <Input changeCallback={handleFieldChange} value={fields.location} placeholder="location" id="location" />
                <Input changeCallback={handleFieldChange} value={fields.category} placeholder="Find your dream job" id="category" />
                <Button label="Search" disabled={!hasValidInputs} />
            </form>
            {!!list.length && (<>
                <Job />
                <Job />
                <Job />
                <Job />
            </>)}

        </section>
    )
}

export default JobList;
