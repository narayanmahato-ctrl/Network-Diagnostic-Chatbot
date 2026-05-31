# Network Diagnostic Chatbot - React Frontend

A modern React-based frontend for the Network Diagnostic Chatbot that communicates with the Java REST API backend.

## Features

- 🎨 Modern, responsive UI built with React
- 💬 Interactive chat interface for network diagnostics
- 🚀 Real-time command execution and results
- ⚡ Quick command buttons for common operations
- 📱 Mobile-responsive design
- 🔌 Seamless integration with Java REST API

## Prerequisites

- Node.js 14+ and npm
- Java backend running on `http://localhost:8080`

## Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the API base URL** (optional):
   - Edit `.env` file and set the API URL if different from default
   - Default: `http://localhost:8080/api`

## Running the Frontend

### Development Mode

```bash
npm start
```

This will start the development server at `http://localhost:3000`

### Production Build

```bash
npm build
```

This creates an optimized production build in the `build` directory.

## API Endpoints

The frontend communicates with the following backend endpoints:

- **GET `/api/info`** - Get system information
- **POST `/api/command`** - Execute a diagnostic command
- **GET `/api/help`** - Get help information
- **GET `/api/health`** - Health check

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatContainer.js
│   │   ├── ChatContainer.css
│   │   ├── MessageBubble.js
│   │   ├── MessageBubble.css
│   │   ├── MessageInput.js
│   │   ├── MessageInput.css
│   │   ├── CommandMenu.js
│   │   └── CommandMenu.css
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
├── .env
└── README.md
```

## Available Commands

- **info** - Display network information
- **network** - Show local network details
- **ping <hostname>** - Ping a host
- **dns <hostname>** - DNS lookup
- **port <hostname> <port>** - Check if a port is open
- **connect <hostname> [port]** - Test connectivity
- **trace <hostname>** - Traceroute to a host
- **help** - Show help message

## Technologies Used

- React 18.2.0
- Axios for API calls
- CSS3 for styling
- Responsive Design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Cannot connect to backend API
1. Ensure the Java backend is running on `http://localhost:8080`
2. Check the CORS configuration in the Spring Boot application
3. Verify the `.env` file has the correct API URL

### Port already in use
If port 3000 is already in use, you can specify a different port:
```bash
PORT=3001 npm start
```

## License

MIT License - See LICENSE file for details

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please open an issue on GitHub.
