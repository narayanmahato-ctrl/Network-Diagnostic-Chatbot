import React from 'react';
import './ChatContainer.css';
import MessageBubble from './MessageBubble';

function ChatContainer({ messages, messagesEndRef }) {
  return (
    <div className="chat-container">
      <div className="messages-wrapper">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatContainer;
