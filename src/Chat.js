import React, { Component } from "react";
import "./styles/Chat.css";
import Sidebar from "./Sidebar";
import Messages from "./Messages";

class Chat extends Component {
  state = {
    channelid: ""
  };
  // Render
  redirect = () => {
    this.props.history.push("/login");
  };

  getSelectedChannelId = id => {
    console.log(id);

    this.setState({
      channelid: id
    });
  };
  componentWillMount() {}
  render() {
    return (
      <div id="wrap">
        <Sidebar
          redirect={this.redirect}
          getSelectedChannelId={this.getSelectedChannelId}
        />
        <Messages channelid={this.state.channelid} />
      </div>
    );
  }
}

export default Chat;
