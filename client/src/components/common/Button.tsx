import React from 'react';
import { clx } from '../../helpers/utils';
import styles from '../../styles/components/common/Button.module.scss';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    clickCallback?: () => void;
    className?: string;
}

const Button = ({ label, clickCallback, className, ...rest }: Props) => {
    return (
        <button
            {...rest}
            className={clx(styles.button, className)}
            onClick={clickCallback}
        >
            {label}
        </button>
    )
}

export default Button;
