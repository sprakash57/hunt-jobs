import styles from '../styles/components/Job.module.scss';
import { Tag, Header, SafeSummary, Button } from './common';
import Pin from '../assets/pin.svg';
import { formatDate } from '../helpers/utils';


const Job = ({ job }: { job: Job }) => {
    const { title, description, location, publishedDate, company, applied } = job;
    const summaryText = `${description.replace(/<[^>]*>/g, "").slice(0, 100).trim()}...`;
    return (
        <article className={styles.card}>
            <Header type="h3" label={title} className={styles.card__title}>
                {applied && <Button label="Applied" className={styles.card__title__btn} disabled={applied} />}
            </Header>
            <Header type="h5" className={styles.card__h5} label={company} />
            <SafeSummary label={summaryText} />
            <section className={styles.card__location}>
                {!location ? <Tag label="Remote" /> : (
                    <>
                        <span><img src={Pin} alt="Location" /></span>
                        <small>{location}</small>
                    </>
                )}
            </section>
            <section>
                <small className={styles.card__date}>
                    {formatDate(publishedDate, "en-GB")}
                </small>
            </section>
        </article>
    )
}

export default Job;
