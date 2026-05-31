import React, { useState } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, isLoading, isActive, onInactiveAttempt }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!isActive) {
      onInactiveAttempt();
      return;
    }
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (!isActive) {
      onInactiveAttempt();
      return;
    }
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="message-input">
      <textarea
        className="input-field"
        value={input}
        onChange={(e) => {
          if (!isActive) {
            onInactiveAttempt();
            return;
          }
          setInput(e.target.value);
        }}
        onKeyPress={handleKeyPress}
        placeholder={isActive ? 'Type a command... (e.g., ping google.com, dns google.com)' : 'Activate mode to send commands'}
        rows="1"
      />
      <button
        className="send-button"
        onClick={handleSend}
        disabled={isLoading || !input.trim() || !isActive}
      >
        {isLoading ? '⏳' : '📤'}
      </button>
    </div>
  );
}

export default MessageInput;
