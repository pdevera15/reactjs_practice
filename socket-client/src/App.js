import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import 'uikit/dist/css/uikit.css';
import 'uikit/dist/js/uikit.js';

// Messages Component
import Messages from './messages';

class App extends Component {

  constructor() {
    super();

    this.state = {
      endpoint: "localhost:4001",
      userCon: "User Connected",
      value: "",
      userId: "",
      messages:[]
    };

    const socket = socketIOClient(this.state.endpoint);
    
    socket.on('connect', () => {
      this.setState({
        userId: socket.id
      });
    });

    // User connected from server
    socket.on('userConnected', (userConnected) => {
      console.log("User Connected from server with id " + this.state.userId);
    })

    // Message receive from server
    socket.on('sendMsg', (msg, userId) => {
      console.log(msg);
      console.log("My ID:" + userId + " Sender ID:" + this.state.userId);
      console.log("from server");
      console.log(this.messageList);
      this.addMessage(msg);
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  
  addMessage(message) {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages })
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // Prevent from reloading
    event.preventDefault();

    // Sending message to server
    const socket = socketIOClient(this.state.endpoint);
    socket.emit('sendMsg', this.refs.msg.value, this.refs.idholder.value);
    console.log("Submit Called");
    console.log("Sender ID:" + this.refs.idholder.value);
    console.log(this.refs.msg.value);
    this.setState({
      value: ""
    });

  }

  render() {

    return(
      <div>
        <Messages messages={this.state.messages} />
        <form onSubmit={this.handleSubmit.bind(this)}>
        <textarea value={this.state.value} onChange={this.handleChange} rows="5" class="uk-textarea" ref="msg" ></textarea>
        <input class="uk-input" type="hidden" value={this.state.userId} ref="idholder"></input>
        <button type="submit" class="uk-button uk-button-primary">Submit</button>
        </form>
      </div>
    )
  }
}

export default App;
