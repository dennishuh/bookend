import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

import Navbar from "./Layout/Navbar";
import Intro from "./Home/Intro";
import Register from "./Auth/Register";

import store from "../store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Intro} />
              <Route path="/register" exact component={Register} />
            </Switch>
          </div>

        </Router>
      </Provider>
    );
  }
}

export default App;
