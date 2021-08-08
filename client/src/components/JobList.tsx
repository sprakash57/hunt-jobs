import React from "react";
import { useFormFields } from "../helpers/hooks";
import Input from "./common/Input";

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
            <form onSubmit={handleSubmit}>
                <Input changeCallback={handleFieldChange} value={fields.location} placeholder="location" id="location" />
                <Input changeCallback={handleFieldChange} value={fields.category} placeholder="Find your dream job" id="category" />
                <button disabled={!hasValidInputs()}>Submit</button>
            </form>
        </section>
    )
}

export default JobList;
