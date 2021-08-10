import { Link } from 'react-router-dom';
import styles from '../styles/screens/PageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <main className={styles.container}>
            <section className={styles.instructions}>
                <h1>404</h1>
                <h2>Looks like you have hit the wrong street <span role='img' aria-label='info'>😰</span></h2>
                <h4>
                    Let me help you to get back
                    <span role='img' aria-label='resolution'>👉{" "}</span>
                    <Link to='/' className={styles.container__followme}>Follow me</Link>
                </h4>
            </section>
        </main>
    )
}

export default PageNotFound;