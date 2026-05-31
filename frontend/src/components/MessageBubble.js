import React from 'react';
import './MessageBubble.css';

function MessageBubble({ message }) {
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatOutput = (text) => {
    if (typeof text !== 'string') return text;
    
    // Split by newlines and render as separate lines
    return text.split('\n').map((line, idx) => (
      <div key={idx}>{line || '\u00A0'}</div>
    ));
  };

  return (
    <div className={`message-bubble ${message.sender} ${message.isError ? 'error' : ''}`}>
      <div className="message-content">
        {message.sender === 'bot' && (
          <div className="message-avatar">🤖</div>
        )}
        <div className="message-text">
          {formatOutput(message.text)}
        </div>
        {message.sender === 'user' && (
          <div className="message-avatar">👤</div>
        )}
      </div>
      <div className="message-time">{formatTime(message.timestamp)}</div>
      {message.status && (
        <div className={`message-status ${message.status.toLowerCase()}`}>
          {message.status}
        </div>
      )}
    </div>
  );
}

export default MessageBubble;
