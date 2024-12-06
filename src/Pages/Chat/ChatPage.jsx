import React, { useState } from "react";
import { Search } from "lucide-react";
import "./ChatPage.css";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hey, what's up?",
      time: "10:30 AM",
      messages: [
        { id: 1, sender: "John Doe", text: "Hey, how's it going?", time: "10:30 AM" },
        { id: 2, sender: "You", text: "Good, how about you?", time: "10:31 AM" }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      lastMessage: "Let's catch up soon!",
      time: "10:15 AM",
      messages: []
    },
    {
      id: 3,
      name: "Team UMass",
      lastMessage: "Meeting at 5 PM",
      time: "9:45 AM",
      messages: []
    }
  ]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedChat) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="chat-layout">
      {/* Left Sidebar */}
      <div className="chat-sidebar">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search for people..."
            className="search-input"
          />
        </div>

        <div className="recent-chats">
          <h2>Recent Chats</h2>
          {chats.map(chat => (
            <div
              key={chat.id}
              className={`chat-item ${selectedChat?.id === chat.id ? 'active' : ''}`}
              onClick={() => setSelectedChat(chat)}
            >
              <div className="chat-avatar">{chat.name[0]}</div>
              <div className="chat-item-info">
                <div className="chat-item-name">{chat.name}</div>
                <div className="chat-item-message">{chat.lastMessage}</div>
              </div>
              <div className="chat-item-time">{chat.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {selectedChat ? (
          <>
            <div className="chat-header">
              <h2>Chat with {selectedChat.name}</h2>
            </div>

            <div className="messages-container">
              {selectedChat.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <div className="message-sender">{msg.sender}</div>
                    <div className="message-text">{msg.text}</div>
                    <div className="message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="message-input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
              />
              <button className="send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;