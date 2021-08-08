import styles from '../styles/components/Job.module.scss';
import Tag from './common/Tag';
import Pin from '../assets/pin.svg';

const Job = () => {
    return (
        <article className={styles.card}>
            <header className={styles.card__title}>
                <h2>Job title</h2>
                <Tag label="Remote" />
            </header>
            <h4>Company</h4>
            <summary>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae adipisci assumenda veniam?.
            </summary>
            <section className={styles.card__location}>
                <span><img src={Pin} alt="Location" /></span>{" "}<small>Location</small>
            </section>
            <section>
                <small className={styles.card__date}>1 Jan 2019</small>
            </section>
        </article>
    )
}

export default Job;
