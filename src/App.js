import React, { Component } from "react";
import "./styles/App.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
//import Messages from "./Messages";
import Chat from "./Chat";

const isAuth = localStorage.getItem("token");
class App extends Component {
  // Methods
  /*checkToken = () => {
    console.log(localStorage);
    return localStorage;
  };*/

  // Render
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            history={this.history}
            path="/"
            render={props => {
              return localStorage.getItem("token") ? (
                <Chat {...props} />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
