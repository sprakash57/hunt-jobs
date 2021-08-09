import React from 'react';
import { clx } from '../../helpers/utils';
import styles from '../../styles/components/common/Header.module.scss';

interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    type?: "h1" | "h2" | "h3" | "h4" | "h5";
    children?: React.ReactNode;
    parentClass?: string;
}

const Header = ({ label, type = "h2", children, parentClass, ...rest }: Props) => {
    return (
        <header className={clx(styles.title, parentClass)}>
            {React.createElement(type, { ...rest }, label)}
            {children}
        </header>
    )
}

export default Header;
