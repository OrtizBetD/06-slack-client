import React, { Component } from "react";
import axios from "axios";
import "./styles/Sidebar.css";

class Sidebar extends Component {
  // Data
  state = {
    workspace: "Tortuga Coders",
    channels: []
  };
  // Lifecycle
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/channels`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        res.data[0].active = true;
        this.setState({ channels: res.data });
      });
  }
  // Methods
  logout = e => {
    localStorage.removeItem("token");
    this.props.redirect();
  };
  selectChannel = id => {
    let channels = this.state.channels;
    console.log(channels);
    channels.forEach((element, index) => {
      if (element._id != id) {
        channels[index].active = false;
      } else {
        channels[index].active = true;
      }
    });
    this.setState({ channels: channels });
  };
  // Render
  render() {
    return (
      <div id="sidebar">
        <h2>{this.state.workspace}</h2>
        <ul className="list-unstyled">
          {this.state.channels.map(channel => {
            return (
              <li
                key={channel._id}
                className={channel.active ? "active" : ""}
                onClick={() => this.selectChannel(channel._id)}
              >
                # {channel.name}
              </li>
            );
          })}
        </ul>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default Sidebar;
