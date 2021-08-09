import styles from "../styles/components/ErrorPage.module.scss";

const ErrorPage = () => {
    return (
        <section className={styles.container}>
            <h1 className={styles.container__h1}>Something went wrong!! Try a new search.</h1>
        </section>
    )
}

export default ErrorPage
