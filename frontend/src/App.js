import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';
import ChatContainer from './components/ChatContainer';
import MessageInput from './components/MessageInput';
import CommandMenu from './components/CommandMenu';
import ThemeToggle from './components/ThemeToggle';
import DashboardPanel from './components/DashboardPanel';
import ProfilePage from './components/ProfilePage';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

const getBrowserSystemInfo = () => ({
  hostname: window.location.hostname || 'browser',
  ipAddress: 'Browser protected',
  osName: navigator.platform || 'Browser',
  javaVersion: 'Backend offline'
});

const getBrowserFallback = (command) => {
  const [commandName] = command.trim().toLowerCase().split(/\s+/);
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const onlineStatus = navigator.onLine ? 'Online' : 'Offline';

  if (['info', 'network', 'status'].includes(commandName)) {
    return {
      output: [
        'BROWSER NETWORK INFO',
        `Status: ${onlineStatus}`,
        `Host: ${window.location.hostname || 'browser'}`,
        `Platform: ${navigator.platform || 'Unavailable'}`,
        `Connection: ${connection?.effectiveType || 'Unavailable'}`,
        '',
        'Note: IP address and adapter details require the Java backend.'
      ].join('\n'),
      status: 'BROWSER',
      commandType: commandName
    };
  }

  if (commandName === 'help' || commandName === '?') {
    return {
      output: [
        'AVAILABLE COMMANDS',
        'info | network | status',
        'ping <hostname>',
        'dns <hostname>',
        'port <hostname> <port>',
        'connect <hostname> [port]',
        'trace <hostname>',
        '',
        'This public GitHub Pages demo can show browser network info.',
        'Ping, DNS, port, connect, and trace commands require the Java backend.'
      ].join('\n'),
      status: 'BROWSER',
      commandType: commandName
    };
  }

  return {
    output: [
      `The "${command}" diagnostic requires the Java backend.`,
      '',
      'The public GitHub Pages site currently hosts the frontend only.',
      'Run the backend locally or configure a deployed API URL to enable this command.'
    ].join('\n'),
    status: 'BACKEND REQUIRED',
    commandType: commandName,
    isError: true
  };
};

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Welcome to Network Diagnostic Chatbot! I can help you with network diagnostics.',
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: 2,
      text: 'Type a command like "ping google.com" or click the command buttons below.',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [systemInfo, setSystemInfo] = useState(null);
  const messagesEndRef = useRef(null);
  const messageIdRef = useRef(2);

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'light';
    } catch (e) {
      return 'light';
    }
  });
  const [activePage, setActivePage] = useState('dashboard');
  const [isActive, setIsActive] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const showProfilePage = () => setActivePage('profile');
  const showDashboard = () => setActivePage('dashboard');
  const toggleActiveMode = () => {
    setIsActive((current) => !current);
    setStatusMessage('');
  };
  const handleInactiveAttempt = () => {
    setStatusMessage('Turn on active mode to send messages.');
  };

  useEffect(() => {
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${theme}`);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  }, [theme]);

  useEffect(() => {
    fetchSystemInfo();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!statusMessage) return;
    const timeout = setTimeout(() => setStatusMessage(''), 4200);
    return () => clearTimeout(timeout);
  }, [statusMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchSystemInfo = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/info`);
      setSystemInfo(response.data);
    } catch (error) {
      console.error('Error fetching system info:', error);
      setSystemInfo(getBrowserSystemInfo());
    }
  };

  const executeCommand = async (command) => {
    // Add user message
    const userMessage = {
      id: ++messageIdRef.current,
      text: command,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (window.location.protocol === 'https:' && API_BASE_URL.startsWith('http://')) {
        throw new Error('Secure frontend requires a deployed HTTPS backend');
      }

      const response = await axios.post(
        `${API_BASE_URL}/command`,
        { command },
        { timeout: 600000 }
      );

      const botMessage = {
        id: ++messageIdRef.current,
        text: response.data.output || 'Command executed successfully',
        sender: 'bot',
        timestamp: new Date(),
        status: response.data.status,
        commandType: response.data.testType
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error executing command:', error);
      const fallback = getBrowserFallback(command);
      const errorMessage = {
        id: ++messageIdRef.current,
        text: fallback.output,
        sender: 'bot',
        timestamp: new Date(),
        status: fallback.status,
        commandType: fallback.commandType,
        isError: fallback.isError
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommandSelect = (command) => {
    if (!isActive) {
      handleInactiveAttempt();
      return;
    }
    executeCommand(command);
  };

  const handleSendRequest = (message) => {
    if (!isActive) {
      handleInactiveAttempt();
      return;
    }
    executeCommand(message);
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>🌐 Network Diagnostic Chatbot</h1>
          <p className="subtitle">v1.0.0</p>
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        {systemInfo && (
          <div className="system-info">
            <span>{systemInfo.hostname} • {systemInfo.ipAddress}</span>
          </div>
        )}
      </header>

      <div className="main-content">
        <section className="workspace-panel">
          <div className="workspace-header">
            <div>
              <p className="dashboard-label">Command Console</p>
              <h2>Live Diagnostic Terminal</h2>
            </div>
            <div className="workspace-meta">Send a packet, ping, trace route or run a network scan.</div>
          </div>

          <ChatContainer messages={messages} messagesEndRef={messagesEndRef} />

          <div className="input-section">
            <CommandMenu
              onCommandSelect={handleCommandSelect}
              isLoading={isLoading}
              isActive={isActive}
              onInactiveAttempt={handleInactiveAttempt}
            />
            <MessageInput
              onSendMessage={handleSendRequest}
              isLoading={isLoading}
              isActive={isActive}
              onInactiveAttempt={handleInactiveAttempt}
            />
          </div>
          {statusMessage && (
            <div className="status-banner">{statusMessage}</div>
          )}
        </section>

        {activePage === 'dashboard' ? (
          <DashboardPanel
            systemInfo={systemInfo}
            onViewProfile={showProfilePage}
            isActive={isActive}
            onToggleActive={toggleActiveMode}
          />
        ) : (
          <ProfilePage onBack={showDashboard} systemInfo={systemInfo} />
        )}
      </div>
    </div>
  );
}

export default App;
