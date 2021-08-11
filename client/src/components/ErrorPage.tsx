import styles from "../styles/components/ErrorPage.module.scss";
import { Header } from "./common";

const ErrorPage = ({ message }: { message: string }) => {
    return (
        <section className={styles.container}>
            <Header type="h1" label={message} />
        </section>
    )
}

export default ErrorPage
