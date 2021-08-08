import { clx } from "../../helpers/utils";
import styles from "../../styles/components/common/Tag.module.scss";

type Props = {
    label: string;
    color?: "violet" | "blue" | "orange";
}

const Tag = ({ label, color = "blue" }: Props) => {
    return (
        <span className={clx(styles.tag, styles[`tag--color-${color}`])}>
            {label}
        </span>
    )
}

export default Tag
