import { useHistory } from 'react-router';
import { Button, Header, Tag } from '../components/common';
import styles from '../styles/screens/JobDetail.module.scss';
import Pin from '../assets/pin.svg';
import Back from '../assets/back.svg';


const JobDetail = () => {
    const history = useHistory();

    const goBack = () => {
        history.push("/")
    }

    return (
        <main className={styles.container}>
            <img src={Back} alt="Go Back" className={styles.container__img} onClick={goBack} />
            <article className={styles.container__article}>
                <Header type="h1" label="Job title" className={styles.container__article__h1}>
                    <Button label="Apply" />
                </Header>
                <Header type="h4" label="Company" className={styles.container__article__h4} />
                <section className={styles.card__location}>
                    <span><img src={Pin} alt="Location" /></span>
                    <small>Location</small>
                </section>
                <small className={styles.container__date}>1 Jan 2019</small>
                <Tag label="Part time" />
                <summary>
                    {`
                    
                    This HTML file is a template.
      If you open it directly in the browser, you will see an empty page. \

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the tag.

      To begin the development, run  or yarn start. \
      To create a production bundle, use .

      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page. \

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the tag.

      To begin the development, run  or yarn start.
      To create a production bundle, use .

      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the tag.

      To begin the development, run  or yarn start.
      To create a production bundle, use .
                    `}
                </summary>
            </article>
            <section className={styles.container__button}>
                <Button label="Apply" />
            </section>
        </main>
    )
}

export default JobDetail;
