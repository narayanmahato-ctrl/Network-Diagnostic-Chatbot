import React from 'react';
import './CommandMenu.css';

function CommandMenu({ onCommandSelect, isLoading, isActive, onInactiveAttempt }) {
  const commands = [
    { label: 'ℹ️ Network Info', cmd: 'info' },
    { label: '🏠 Local Network', cmd: 'network' },
    { label: '❓ Help', cmd: 'help' },
    { label: '🔗 Ping Google', cmd: 'ping google.com' },
    { label: '🌐 DNS Google', cmd: 'dns google.com' },
    { label: '🚪 Port Check', cmd: 'port google.com 80' },
  ];

  return (
    <div className="command-menu">
      <div className="menu-title">Quick Commands</div>
      <div className="command-buttons">
        {commands.map((cmd, idx) => (
          <button
            key={idx}
            className="command-btn"
            onClick={() => {
              if (!isActive) {
                onInactiveAttempt();
                return;
              }
              onCommandSelect(cmd.cmd);
            }}
            disabled={isLoading}
            title={!isActive ? 'Activate mode to use commands' : cmd.cmd}
          >
            {cmd.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CommandMenu;
