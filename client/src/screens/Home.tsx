import JobList from "../components/JobList";
import styles from "../styles/screens/Home.module.scss";

const Home = () => {
  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to DevJobs</h1>
      </header>
      <JobList />
    </main>
  );
}

export default Home;
