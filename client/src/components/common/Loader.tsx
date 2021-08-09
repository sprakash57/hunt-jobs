import styles from '../../styles/components/common/Loader.module.scss';

const Loader = ({ size = 150, label = "" }: { size?: number, label?: string }) => {
    return (
        <section className={styles.container}>
            <h1>{label}</h1>
            <div
                className={styles.container__loader}
                style={{ width: `${size}px`, height: `${size}px` }}
                role="status"
            />
        </section>
    )
}

export default Loader;
