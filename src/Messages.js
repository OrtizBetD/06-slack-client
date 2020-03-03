import React, { Component } from "react";
import "./styles/Messages.css";
import "./styles/NewMessage.css";
import axios from "axios";

class Content extends Component {
  // Data
  state = {
    newMessage: {
      text: "",
      channel: "",
      file: null
    },
    messages: []
  };
  // Lifecycle
  componentWillMount() {
    axios
      .get(`${process.env.REACT_APP_API}/messages`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        this.setState({ messages: res.data });
        this.setState({ messagesCopy: res.data });
      });
  }
  // Methods
  changeText = (e, props) => {
    let newMessage = this.state.newMessage;
    console.log("newMessage", newMessage);
    newMessage.text = e.target.value;
    newMessage.channel = props.channelid;
    console.log("newMessagechanged", newMessage);

    this.setState({ newMessage: newMessage });
  };
  createMessage = e => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_API}/messages`,
        {
          messages: this.state.message,
          text: this.state.newMessage.text,
          channel: this.state.newMessage.channel
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(response => {
        console.log(response.data);
        this.setState(oldState => ({
          messages: [...oldState.messages, response.data],
          newMessage: { ...oldState.NewMessage, text: "" }
        }));
      });
  };
  componentWillReceiveProps(props) {
    console.log("channelid", props.channelid);
    let messages_temp = this.state.messagesCopy;
    let messages = messages_temp.filter(message => {
      return message.channel === props.channelid;
    });
    this.setState({ messages });
  }
  // Render
  render() {
    return (
      <div id="messages">
        <div id="content">
          {this.state.messages.map(message => {
            return (
              <div className="message" key={message._id}>
                <span className="user">{message.user.name}</span>
                <span className="date">{message.date}</span>
                <div className="body">{message.text}</div>
                -> Insert Image
              </div>
            );
          })}
        </div>
        <div id="new-message">
          <form
            onSubmit={e => {
              this.createMessage(e);
            }}
          >
            <input type="file" name="file" onChange={this.addFile} />
            <input
              type="text"
              placeholder="New Message..."
              value={this.state.newMessage.text}
              onChange={e => this.changeText(e, this.props)}
            />
            <button type="submit" className="positive">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Content;
