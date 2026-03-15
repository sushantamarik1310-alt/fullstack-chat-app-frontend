# Fullstack Chat App - Frontend

React frontend application for the Fullstack Chat App microservice architecture using Vite, React Router, Socket.io, and Tailwind CSS.

## Features

- Real-time messaging with Socket.io
- JWT authentication with secure token storage
- User profile management
- Theme switching (Light/Dark mode)
- Responsive design with Tailwind CSS
- Online user status
- Message history
- Image sharing in messages

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router v7
- **State Management**: Zustand
- **Real-time**: Socket.io-client
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Prerequisites

- Node.js 16+ and npm
- Auth Service running on `http://localhost:5001`
- Chat Service running on `http://localhost:5002`

## Setup Instructions

### 1. Clone/Navigate to the project
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (if needed)
The frontend uses environment variables for API endpoints. Check `src/lib/axios.js` for the default configuration:
- Auth Service API: `http://localhost:5001/api`
- Chat Service API: `http://localhost:5002/api`
- Socket.io Server: `http://localhost:5002`

### 4. Run Development Server
```bash
npm run dev
```

The application will start on **http://localhost:5173**

## Available Scripts

### Development
```bash
npm run dev
```
Starts the development server with hot module replacement (HMR).

### Build for Production
```bash
npm run build
```
Creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Previews the production build locally. Binds to all interfaces (`0.0.0.0`).

### Lint Code
```bash
npm run lint
```
Runs ESLint to check for code quality issues.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AuthImagePattern.jsx       # Auth page background pattern
│   │   ├── ChatContainer.jsx          # Main chat window
│   │   ├── ChatHeader.jsx             # Chat header with user info
│   │   ├── MessageInput.jsx           # Message input with image upload
│   │   ├── Navbar.jsx                 # Navigation bar
│   │   ├── NoChatSelected.jsx         # Placeholder when no chat selected
│   │   ├── Sidebar.jsx                # User list sidebar
│   │   └── skeletons/                 # Loading skeleton components
│   ├── pages/
│   │   ├── HomePage.jsx               # Main chat page
│   │   ├── LoginPage.jsx              # Login page
│   │   ├── ProfilePage.jsx            # User profile page
│   │   ├── SettingsPage.jsx           # Settings/theme page
│   │   └── SignUpPage.jsx             # Sign up page
│   ├── store/
│   │   ├── useAuthStore.js            # Authentication state (Zustand)
│   │   ├── useChatStore.js            # Chat state (Zustand)
│   │   └── useThemeStore.js           # Theme state (Zustand)
│   ├── lib/
│   │   ├── axios.js                   # Axios instance with interceptors
│   │   └── utils.js                   # Utility functions
│   ├── constants/
│   │   └── index.js                   # Application constants
│   ├── App.jsx                        # Main App component with routing
│   ├── main.jsx                       # React entry point
│   └── index.css                      # Global styles
├── public/                            # Static assets
├── vite.config.js                     # Vite configuration
├── package.json
├── eslint.config.js
└── README.md
```

## State Management (Zustand)

### useAuthStore
Manages authentication state and user data:
- Login/signup functionality
- User profile information
- Token management
- Logout

### useChatStore
Manages chat state:
- Active chat user
- Messages
- Users list
- Socket.io events

### useThemeStore
Manages UI theme:
- Light/Dark mode toggle

## API Integration

### Authentication Service
- **SignUp**: `POST /api/auth/signup`
- **Login**: `POST /api/auth/login`
- **Get Current User**: `GET /api/auth/me`
- **Update Profile**: `PUT /api/auth/update-profile`
- **Logout**: `POST /api/auth/logout`

### Chat Service (REST)
- **Get Users**: `GET /api/messages/users`
- **Get Messages**: `GET /api/messages/:userId`
- **Send Message**: `POST /api/messages/send/:userId`

### Socket.io Events
- **Connection**: Establishes real-time connection with userId
- **getOnlineUsers**: Broadcasts list of online users
- **newMessage**: Real-time message delivery

## Deployment

### Deploy to Render.com

1. **Build the project locally to ensure it works**:
   ```bash
   npm run build
   npm run preview
   ```

2. **Update render.yaml** (if using Infrastructure as Code) or configure in Render dashboard:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run preview`
   - **Node Version**: 18 or higher
   - **Port**: Automatically detected from listening port (4173)

3. **Ensure Auth & Chat services are deployed first**

4. **Update API endpoints** if services are deployed on different domains:
   - Modify `src/lib/axios.js` to use production API URLs
   - Update Socket.io connection URL in components

### Environment Variables for Production
Add these in your deployment platform dashboard:
```
VITE_API_URL=https://your-auth-service.com/api
VITE_CHAT_API_URL=https://your-chat-service.com/api
VITE_SOCKET_URL=https://your-chat-service.com
```

### Common Deployment Issues

#### Issue: "No open ports detected" on Render.com
**Solution**: Already fixed by updating `vite.config.js` to bind to `0.0.0.0` with `--host` flag.

#### Issue: CORS errors
**Solution**: Ensure both Auth and Chat services have CORS enabled and allow your frontend domain.

#### Issue: WebSocket connection fails
**Solution**: Ensure your Chat Service enables WebSocket connections. Update Socket.io connection URL to HTTPS in production.

## Development Workflow

1. Start all three services locally:
   ```bash
   # Terminal 1 - Auth Service
   cd auth-service
   mvn spring-boot:run

   # Terminal 2 - Chat Service
   cd chat-service
   npm run dev

   # Terminal 3 - Frontend
   cd frontend
   npm run dev
   ```

2. Access the application: `http://localhost:5173`

3. Create an account and start chatting

## Troubleshooting

### Clear build cache
```bash
rm -r node_modules dist
npm install
npm run build
```

### Clear browser storage
Clear application storage in DevTools → Application → Local Storage/Session Storage

### Connection issues
- Check that Auth and Chat services are running
- Verify API URLs in `src/lib/axios.js`
- Check browser console for specific error messages

## Performance Optimization

- Lazy loading of routes using React Router
- Image optimization with Cloudinary
- CSS tree-shaking with Tailwind
- Code splitting with Vite

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
