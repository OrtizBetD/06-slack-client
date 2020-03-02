import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";

class Chat extends Component {
  // Render
  redirect = () => {
    this.props.history.push("/login");
  };

  componentWillMount() {}
  render() {
    return (
      <div id="wrap">
        <Sidebar redirect={this.redirect} />
        <Messages />
      </div>
    );
  }
}

export default Chat;
