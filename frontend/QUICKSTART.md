# Frontend Setup - Quick Start

This guide will help you get the React frontend running in just a few minutes.

## 1️⃣ Prerequisites

- ✅ Node.js 14+ installed
- ✅ npm installed
- ✅ Java backend should be running on `http://localhost:8080`

## 2️⃣ Install Dependencies

From the `frontend` directory, run:

```bash
npm install
```

This will install:
- React
- Axios (for API calls)
- React Scripts (build tools)

## 3️⃣ Start the Frontend

```bash
npm start
```

The app will open at `http://localhost:3000`

## 4️⃣ Use the Chatbot

### Quick Commands (Click the buttons):
- 📊 **Network Info** - Display your network info
- 🌐 **DNS Google** - Resolve google.com
- 📍 **Ping Google** - Test connectivity to google.com
- 🚪 **Port Check** - Check port 80 on google.com

### Type Custom Commands:
```
ping example.com
dns example.com
port example.com 443
info
help
```

## 📁 File Structure

```
frontend/
├── public/index.html              # HTML entry point
├── src/
│   ├── App.js                    # Main app component
│   ├── components/
│   │   ├── ChatContainer.js      # Messages display
│   │   ├── MessageBubble.js      # Individual message
│   │   ├── MessageInput.js       # Input field
│   │   └── CommandMenu.js        # Quick command buttons
│   └── index.js                  # React entry point
├── package.json                  # Dependencies
├── .env                          # Configuration
└── README.md                     # Full documentation
```

## 🔧 Configuration

The API endpoint is configured in `App.js`:

```javascript
const API_BASE_URL = 'http://localhost:8080/api';
```

To change it, edit `frontend/.env`:
```
REACT_APP_API_BASE_URL=http://your-backend-url/api
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `Cannot find module 'react'` | Run `npm install` |
| Port 3000 already in use | Run `PORT=3001 npm start` |
| Cannot reach backend | Ensure backend running on port 8080 |
| CORS error | Check ChatbotController CORS config |

## 🚀 What You Can Do

✅ Send commands to the chatbot  
✅ See real-time results  
✅ Use quick command buttons  
✅ Type custom diagnostic commands  
✅ View system information  
✅ Check connectivity and DNS  

## 📝 Available Commands

```
info              - Show system info
network           - Show network status
ping <host>       - Ping a host
dns <host>        - Resolve hostname
port <host> <p>   - Check port
connect <h> [p]   - Test connection
trace <host>      - Traceroute
help              - Show help
```

## 🎨 Features

🎯 Modern chat interface  
📱 Mobile responsive  
⚡ Real-time updates  
🎨 Beautiful gradient UI  
💬 Message bubbles  
🚀 Quick command buttons  

---

**Ready?** Run `npm start` and start diagnosing! 🚀
