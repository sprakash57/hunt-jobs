import styles from '../styles/components/Job.module.scss';
import dompurify from 'dompurify';
import { Tag, Header } from './common';
import Pin from '../assets/pin.svg';


const Job = ({ job }: { job: Job }) => {
    const { title, description, location, publishedDate, company } = job;
    const summaryText = `${description.replace(/<[^>]*>/g, "").slice(0, 90).trim()}...`;
    return (
        <article className={styles.card}>
            <Header type="h3" label={title} className={styles.card__title} />
            <Header type="h5" className={styles.card__h5} label={company} />
            <summary dangerouslySetInnerHTML={{ __html: dompurify.sanitize(summaryText) }} />
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
                    {new Date(publishedDate).toLocaleDateString("en-GB", { day: 'numeric', year: 'numeric', month: 'short' })}
                </small>
            </section>
        </article>
    )
}

export default Job;
