import { useHistory } from "react-router-dom"

const useLocation = () => {
    const history = useHistory();
    const id = history.location.pathname.split("/")[1];
    const jobList: Job[] = JSON.parse(localStorage.getItem("jobs")!) || [];
    const jobMatched = jobList.find(job => job.id === id);
    return jobMatched;
}

export default useLocation;