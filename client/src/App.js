import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import NavBar from "./components/views/NavBar/NavBar";

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />

            <Route exact path="/register" component={RegisterPage} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
