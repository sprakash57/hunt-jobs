import { useHistory } from 'react-router';
import { Button, Header, Tag, SafeSummary } from '../components/common';
import styles from '../styles/screens/JobDetail.module.scss';
import Pin from '../assets/pin.svg';
import Back from '../assets/back.svg';
import { formatDate } from '../helpers/utils';
import ErrorPage from '../components/ErrorPage';
import { useState } from 'react';

const JobDetail = () => {
    const [hasApplied, setHasApplied] = useState(false);
    const history = useHistory();
    const id = history.location.pathname.split("/")[1];
    const jobList: Job[] = JSON.parse(localStorage.getItem("jobs")!);
    const jobMatched = jobList.find(job => job.id === id);

    const goBack = () => {
        history.push("/")
    }

    const handleApply = () => {
        const updatedJobList = jobList.map(job => {
            if (id === job.id) return { ...job, applied: true }
            return job;
        });
        localStorage.setItem("jobs", JSON.stringify(updatedJobList));
        setHasApplied(true);
    }

    const renderDetails = () => {
        // render error page if user provides random id in the url
        if (!jobMatched) {
            return (
                <article className={styles.container__nojob}>
                    <ErrorPage message="Job does not exist!!" />
                </article>
            )
        }
        const { title, description, publishedDate, company, location, applied } = jobMatched;
        const jobApplied = applied || hasApplied;
        return (
            <>
                <article className={styles.container__article}>
                    <Header type="h1" label={title} className={styles.container__article__h1}>
                        <Button
                            label={jobApplied ? "Applied" : "Apply"}
                            disabled={jobApplied}
                            clickCallback={handleApply}
                            className={jobApplied ? styles.h1__btn : ""}
                        />
                    </Header>
                    <Header type="h4" label={company} className={styles.container__article__h4} />
                    {!location
                        ? <Tag label="Remote" />
                        : (
                            <section className={styles.card__location}>
                                <span><img src={Pin} alt="Location" /></span>
                                <small>{location}</small>
                            </section>
                        )}
                    <small className={styles.container__date}>
                        {formatDate(publishedDate, "en-GB")}
                    </small>
                    <SafeSummary label={description} />
                </article>
                <section className={styles.container__button}>
                    <Button
                        label={jobApplied ? "Applied" : "Apply"}
                        disabled={jobApplied}
                        clickCallback={handleApply}
                        className={jobApplied ? styles.h1__btn : ""}
                    />
                </section>
            </>
        )
    }

    return (
        <main className={styles.container}>
            <img
                src={Back}
                alt="Go Back"
                className={styles.container__img}
                onClick={goBack}
                onKeyDown={goBack}
                role="button"
                tabIndex={0}
            />
            {renderDetails()}
        </main>
    )
}

export default JobDetail;
