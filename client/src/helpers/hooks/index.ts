import React, { useState } from "react";

type UseFormFields = [
    fields: SearchFields,
    cb: (event: React.FormEvent<HTMLInputElement>) => void
]

export const useFormFields = (initialState: SearchFields): UseFormFields => {
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