import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import Pay from './components/Pay';
import Signup from './components/Signup';
import Login from './components/Login';
import Details from "./components/Details";
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
     
        <Router>
          <Navbar />
          {/* <Alert message="This is amazing React course" /> */}
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/pay/:id">
                <Pay />
              </Route>
              <Route exact path="/details/:id">
                <Details />
              </Route>
              <Route exact path="/dashboard"><Dashboard/></Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
            </Switch>
          </div>
        </Router>
   
    </>
  );
}

export default App;
