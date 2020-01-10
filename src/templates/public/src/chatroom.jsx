import React, { Component } from 'react';

import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import '../chatroom.css';

class Chat extends Component {
  constructor() {
    console.log("construct chat")
    super();
    this.state = {
      userId: '',
      showLogin: true,
      isLoading: false,
      currentUser: null,
      currentRoom: null,
      rooms: [],
      roomUsers: [],
      roomName: null,
      messages: [],
      newMessage: '',
    };

  }

  render() {
    const {
      userId,
      showLogin,
      rooms,
      currentRoom,
      currentUser,
      messages,
      newMessage,
      roomUsers,
      roomName,
    } = this.state;

    return (
      <div className="App">
        <aside className="sidebar left-sidebar"></aside>
        <section className="chat-screen">
          <header className="chat-header"></header>
          <ul className="chat-messages"></ul>
          <footer className="chat-footer">
            <form className="message-form">
              <input
                type="text"
                name="newMessage"
                className="message-input"
                placeholder="Type your message and hit ENTER to send"
              />
            </form>
          </footer>
        </section>
        <aside className="sidebar right-sidebar"></aside>
      </div>
    );
  }
}

export default Chat;