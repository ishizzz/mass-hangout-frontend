import React, { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import "./ChatPage.css";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [groups] = useState([
    {
      id: 1,
      name: "CS 326 Team 6",
      lastMessage: "What time are we meeting?",
      time: "10:30 AM",
      messages: [
        { id: 1, sender: "John Doe", text: "What time are we meeting?", time: "10:30 AM" },
        { id: 2, sender: "You", text: "How about 4 PM?", time: "10:31 AM" }
      ]
    },
    {
      id: 2,
      name: "UMass Book Club",
      lastMessage: "Looking forward to the next session!",
      time: "10:15 AM",
      messages: [
        { id: 1, sender: "Jane Smith", text: "Looking forward to the next session!", time: "10:15 AM" }
      ]
    },
    {
      id: 3,
      name: "Team UMass",
      lastMessage: "Project update at 5 PM",
      time: "9:45 AM",
      messages: [
        { id: 1, sender: "Team Leader", text: "Project update at 5 PM", time: "9:45 AM" }
      ]
    }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (selectedGroup) {
      scrollToBottom();
    }
  }, [selectedGroup]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && selectedGroup) {
      const newMessage = {
        id: selectedGroup.messages.length + 1,
        sender: "You",
        text: message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      const updatedGroups = groups.map((group) =>
        group.id === selectedGroup.id
          ? { ...group, messages: [...group.messages, newMessage], lastMessage: message }
          : group
      );
      setSelectedGroup({
        ...selectedGroup,
        messages: [...selectedGroup.messages, newMessage]
      });
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const handleSearchMessages = (query) => {
    setSearchQuery(query);
    if (!query.trim() || !selectedGroup) {
      setSearchResults([]);
      return;
    }

    const results = selectedGroup.messages.filter((msg) =>
      msg.text.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div className="chat-layout">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search for groups..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => handleSearchMessages(e.target.value)}
          />
        </div>

        <div className="recent-chats">
          <h2>Groups</h2>
          {groups.map((group) => (
            <div
              key={group.id}
              className={`chat-item ${selectedGroup?.id === group.id ? "active" : ""}`}
              onClick={() => setSelectedGroup(group)}
            >
              <div className="chat-avatar">{group.name[0]}</div>
              <div className="chat-item-info">
                <div className="chat-item-name">{group.name}</div>
                {/* <div className="chat-item-message">{group.lastMessage}</div> */}
              </div>
              {/* <div className="chat-item-time">{group.time}</div> */}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-main">
        {selectedGroup ? (
          <>
            <div className="chat-header">
              <h2>{selectedGroup.name}</h2>
            </div>

            {/* Search Messages in Chat */}
            <div className="chat-search-container">
              <Search className="chat-search-icon" />
              <input
                type="text"
                placeholder="Search within chat..."
                className="chat-search-input"
                value={searchQuery}
                onChange={(e) => handleSearchMessages(e.target.value)}
              />
            </div>

            {/* Messages Container */}
            <div className="messages-container">
              {(searchQuery ? searchResults : selectedGroup.messages).map((msg) => (
                <div
                  key={msg.id}
                  className={`message ${msg.sender === "You" ? "sent" : "received"}`}
                >
                  <div className="message-content">
                    <div className="message-sender">{msg.sender}</div>
                    <div className="message-text">
                      {msg.text}
                    </div>
                    <div className="message-time">{msg.time}</div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className="message-input-container">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="message-input"
                onKeyPress={handleKeyPress}
              />
              <button className="send-button" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">Select a group to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
