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

const getPublicIpAddress = async () => {
  try {
    const response = await fetchWithTimeout('https://api.ipify.org?format=json');
    const result = await response.json();
    return result.ip || 'Unavailable';
  } catch (error) {
    console.error('Error fetching public IP address:', error);
    return 'Unavailable';
  }
};

const getBrowserSystemInfo = async () => ({
  hostname: window.location.hostname || 'browser',
  ipAddress: await getPublicIpAddress(),
  osName: navigator.platform || 'Browser',
  javaVersion: 'Browser mode'
});

const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
};

const isValidHost = (host) => /^[a-z0-9.-]+$/i.test(host || '');

const probeWebHost = async (host, port) => {
  if (!isValidHost(host)) {
    throw new Error('Enter a valid hostname, such as google.com');
  }

  const protocol = port === '80' ? 'http' : 'https';
  const portSuffix = port && !['80', '443'].includes(port) ? `:${port}` : '';
  const startedAt = performance.now();
  await fetchWithTimeout(`${protocol}://${host}${portSuffix}/favicon.ico`, {
    mode: 'no-cors',
    cache: 'no-store'
  });

  return Math.round(performance.now() - startedAt);
};

const getBrowserFallback = async (command) => {
  const [commandName, host, port] = command.trim().toLowerCase().split(/\s+/);
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const onlineStatus = navigator.onLine ? 'Online' : 'Offline';

  if (['info', 'network', 'status'].includes(commandName)) {
    const publicIpAddress = await getPublicIpAddress();
    return {
      output: [
        'BROWSER NETWORK INFO',
        `Status: ${onlineStatus}`,
        `Host: ${window.location.hostname || 'browser'}`,
        `Public IP: ${publicIpAddress}`,
        `Platform: ${navigator.platform || 'Unavailable'}`,
        `Connection: ${connection?.effectiveType || 'Unavailable'}`
      ].join('\n'),
      status: 'BROWSER',
      commandType: commandName
    };
  }

  if (commandName === 'ping') {
    try {
      const duration = await probeWebHost(host);
      return {
        output: [
          `BROWSER CONNECTIVITY CHECK: ${host}`,
          `Status: Reachable over HTTPS`,
          `Response time: ${duration} ms`,
          '',
          'Note: Browsers cannot send raw ICMP packets. This is a timed HTTPS reachability check.'
        ].join('\n'),
        status: 'SUCCESS',
        commandType: commandName
      };
    } catch (error) {
      return {
        output: `Could not reach ${host || 'the requested host'} over HTTPS: ${error.message}`,
        status: 'FAILED',
        commandType: commandName,
        isError: true
      };
    }
  }

  if (commandName === 'dns' || commandName === 'resolve') {
    if (!isValidHost(host)) {
      return {
        output: 'Enter a valid hostname, such as dns google.com',
        status: 'FAILED',
        commandType: commandName,
        isError: true
      };
    }

    try {
      const response = await fetchWithTimeout(`https://dns.google/resolve?name=${encodeURIComponent(host)}&type=A`);
      const result = await response.json();
      const addresses = (result.Answer || [])
        .filter((answer) => answer.type === 1)
        .map((answer) => answer.data);

      return {
        output: [
          `DNS LOOKUP: ${host}`,
          `Status: ${addresses.length ? 'Resolved' : 'No IPv4 records found'}`,
          ...addresses.map((address) => `Address: ${address}`)
        ].join('\n'),
        status: addresses.length ? 'SUCCESS' : 'FAILED',
        commandType: commandName,
        isError: !addresses.length
      };
    } catch (error) {
      return {
        output: `DNS lookup failed for ${host}: ${error.message}`,
        status: 'FAILED',
        commandType: commandName,
        isError: true
      };
    }
  }

  if (commandName === 'port' || commandName === 'connect') {
    const requestedPort = port || '443';

    if (requestedPort === '80' && window.location.protocol === 'https:') {
      return {
        output: [
          'Browser security blocks plain HTTP port 80 checks from an HTTPS page.',
          'Try port 443 in the public demo.',
          'Use the Java backend for a raw TCP check of port 80.'
        ].join('\n'),
        status: 'BACKEND REQUIRED',
        commandType: commandName,
        isError: true
      };
    }

    if (!['80', '443'].includes(requestedPort)) {
      return {
        output: [
          `Browser security prevents direct TCP checks for port ${requestedPort}.`,
          'The public demo supports web reachability checks for ports 80 and 443.',
          'Use the Java backend for arbitrary TCP port diagnostics.'
        ].join('\n'),
        status: 'BACKEND REQUIRED',
        commandType: commandName,
        isError: true
      };
    }

    try {
      const duration = await probeWebHost(host, requestedPort);
      return {
        output: [
          `WEB PORT CHECK: ${host}:${requestedPort}`,
          'Status: Reachable',
          `Response time: ${duration} ms`,
          '',
          'Note: This confirms HTTP(S) reachability. Use the Java backend for raw TCP checks.'
        ].join('\n'),
        status: 'SUCCESS',
        commandType: commandName
      };
    } catch (error) {
      return {
        output: `Could not reach ${host || 'the requested host'}:${requestedPort}: ${error.message}`,
        status: 'FAILED',
        commandType: commandName,
        isError: true
      };
    }
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
        'The public demo supports browser network info, HTTPS connectivity checks,',
        'DNS lookup, and web reachability checks for ports 80 and 443.',
        'Raw TCP checks and traceroute require the Java backend.'
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
      setSystemInfo(await getBrowserSystemInfo());
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
      const fallback = await getBrowserFallback(command);
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
