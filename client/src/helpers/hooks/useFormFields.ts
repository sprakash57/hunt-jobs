import React, { useState } from "react";

type UseFormFields = [
    fields: SearchFields,
    callback: (event: React.FormEvent<HTMLInputElement>) => void
]

const useFormFields = (initialState: SearchFields): UseFormFields => {
    const [fields, setFields] = useState(initialState);

    return [
        fields,
        function (event: React.FormEvent<HTMLInputElement>) {
            const target = event.target as HTMLInputElement;
            setFields({
                ...fields,
                [target.id]: target.value
            })
        }
    ]
}

export default useFormFields;