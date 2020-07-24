import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
// import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth";

function App() {
  return (
    <div>
      {/* <NavBar /> */}
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />

            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
