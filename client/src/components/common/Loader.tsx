import styles from '../../styles/components/common/Loader.module.scss';
import Header from './Header';

const Loader = ({ size = 150, label = "" }: { size?: number, label?: string }) => {
    return (
        <section className={styles.container}>
            <Header type="h1" label={label} />
            <div
                className={styles.container__loader}
                style={{ width: `${size}px`, height: `${size}px` }}
                role="status"
            />
        </section>
    )
}

export default Loader;
