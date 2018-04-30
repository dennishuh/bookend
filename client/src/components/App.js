import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from 'jwt-decode';
import "./App.css";

import Navbar from "./Layout/Navbar";
import Landing from "./Landing/Landing";
import Login from "./Auth/Login";
import Register from "./Auth/Register";

import store from "../store";
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

const jwtToken = localStorage.jwtToken;

if (jwtToken) {
  const decoded = jwt_decode(jwtToken);
  setAuthToken(jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());

    // TODO: Clear curent profiles
    // redirect to loginUser
    window.location.href = '/';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>

        </Router>
      </Provider>
    );
  }
}

export default App;
