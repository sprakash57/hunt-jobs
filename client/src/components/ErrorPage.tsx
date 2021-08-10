import styles from "../styles/components/ErrorPage.module.scss";

const ErrorPage = ({ message }: { message: string }) => {
    return (
        <section className={styles.container}>
            <h1 className={styles.container__h1}>{message}</h1>
        </section>
    )
}

export default ErrorPage
