 // client/src/App.js

import React, { Component } from 'react';
import {
  handleInput,
  connectToChatkit,
  connectToRoom,
  sendMessage, 
  sendDM,
} from './methods';
import RoomList from './components/roomList';
import ChatSession from './components/chatSession';
import Dialog from './components/dialog';
import 'skeleton-css/css/normalize.css';
import 'skeleton-css/css/skeleton.css';
import '../chatroom.css';
import RoomUsers from './components/roomUsers';

class App extends Component {
   constructor() {
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
     this.handleInput = handleInput.bind(this);
     this.connectToChatkit = connectToChatkit.bind(this);
     this.connectToRoom = connectToRoom.bind(this);
     this.sendMessage = sendMessage.bind(this);
     this.sendDM = sendDM.bind(this);
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
        <aside className="sidebar left-sidebar">
              {currentUser ? (
                <div className="user-profile">
                  <span className="user-id">{`@${currentUser.id}`}</span>
                </div>
              ) : null}
              {currentRoom ? (
                <RoomList
                  rooms={rooms}
                  currentRoom={currentRoom}
                  connectToRoom={this.connectToRoom}
                  currentUser={currentUser}
                />
              ) : null}
        </aside>
        <section className="chat-screen">
              <header className="chat-header">
                {currentRoom ? <h3>{roomName}</h3> : null}
              </header>
              <ul className="chat-messages">
                <ChatSession messages={messages} />
              </ul>
              <footer className="chat-footer">
                <form onSubmit={this.sendMessage} className="message-form">
                  <input
                    type="text"
                    value={newMessage}
                    name="newMessage"
                    className="message-input"
                    placeholder="Type your message and hit ENTER to send"
                    onChange={this.handleInput}
                  />
                </form>
              </footer>
        </section>
        <aside className="sidebar right-sidebar">
              {currentRoom ? (
                <RoomUsers
                  currentUser={currentUser}
                  roomUsers={roomUsers}
                />
              ) : null}
        </aside>
        {showLogin ? (
          <Dialog
            userId={userId}
            handleInput={this.handleInput}
            connectToChatkit={this.connectToChatkit}
          />
        ) : null}
        </div>
     );
   }
 }

 export default App;