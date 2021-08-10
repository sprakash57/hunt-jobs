import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageNotFound from './screens/PageNotFound';
import Home from './screens/Home';
import JobDetail from './screens/JobDetail';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/:id(\d+)" exact component={JobDetail} />
                <Route component={PageNotFound} />
            </Switch>
        </Router>
    )
}

export default App
