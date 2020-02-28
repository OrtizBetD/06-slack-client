import React, { Component } from "react";
import Chat from "./Chat";
import "./styles/App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";

class App extends Component {
  // Methods
  // Render
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Chat} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
