import React from "react";
import { clx } from "../../helpers/utils";
import styles from "../../styles/components/common/Input.module.scss";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    changeCallback: (e: React.FormEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
}
const Input = ({ type = "text", className = "", changeCallback, value, ...rest }: Props) => {
    return (
        <input
            type={type}
            className={clx(styles.input, className)}
            value={value}
            onChange={changeCallback}
            {...rest}
        />
    )
}

export default Input;
