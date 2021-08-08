import styles from '../styles/components/Job.module.scss';
import { Tag, Header } from './common';
import Pin from '../assets/pin.svg';

const Job = () => {
    return (
        <article className={styles.card}>
            <Header type="h2" label="Job title" className={styles.card__title}>
                <Tag label="Remote" />
            </Header>
            <Header type="h4" className={styles.card__h4} label="Company" />
            <summary>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae adipisci assumenda veniam?.
            </summary>
            <section className={styles.card__location}>
                <span><img src={Pin} alt="Location" /></span><small>Location</small>
            </section>
            <section>
                <small className={styles.card__date}>1 Jan 2019</small>
            </section>
        </article>
    )
}

export default Job;
