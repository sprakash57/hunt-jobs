import React from "react";
import { useFormFields } from "../helpers/hooks";
import Input from "./common/Input";
import styles from "../styles/components/JobList.module.scss";
import { Button } from "./common";

const JobList = () => {
    const [fields, handleFieldChange] = useFormFields({
        location: "",
        category: ""
    })

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        console.log(fields)
    }

    const hasValidInputs = () => fields.location || fields.category;

    return (
        <section>
            <form onSubmit={handleSubmit} className={styles.formGroup}>
                <Input changeCallback={handleFieldChange} value={fields.location} placeholder="location" id="location" />
                <Input changeCallback={handleFieldChange} value={fields.category} placeholder="Find your dream job" id="category" />
                <Button label="Search" disabled={!hasValidInputs()} />
            </form>
        </section>
    )
}

export default JobList;
