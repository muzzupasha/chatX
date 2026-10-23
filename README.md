# ChatApp

A real-time one-to-one chat application built with React, Express, MongoDB, and Socket.IO. Create an account, find other users, and exchange messages in a responsive chat interface.

**Live application:** [chat-app-ten-psi-22.vercel.app](https://chat-app-ten-psi-22.vercel.app/)

## The Problem

Starting a direct conversation should not require a complicated setup or a crowded interface. ChatApp brings account creation, finding another user, and one-to-one messaging into one simple workflow. It keeps conversations available after a user leaves the page and delivers new messages in real time when both participants are connected.

## Intended Impact

ChatApp is designed to make direct communication approachable and immediate. Username availability feedback helps people choose an account name before submitting the registration form, while persistent conversations let participants return to their message history later. Live delivery and online presence make the interaction feel current instead of relying on manual refreshes.

As a compact full-stack application, it also demonstrates how a modern chat experience can be built from connected frontend, API, database, authentication, and realtime layers.

## What Makes It Different

ChatApp is intentionally focused on the essentials of one-to-one conversation rather than trying to reproduce a large collaboration platform. Its distinguishing choices are:

- **A direct workflow:** register, discover other users, and start a private conversation without extra workspace or channel setup.
- **Responsive feedback:** debounced username checks provide availability feedback while a person is typing, without sending a request on every keystroke.
- **Live communication:** Socket.IO supports incoming message delivery and online-user presence alongside database-backed message history.
- **A cohesive chat experience:** emoji selection, clear message states, and a responsive layout are built into the conversation flow.
- **A practical full-stack design:** the frontend and backend can be developed separately, while the production frontend routes API and Socket.IO traffic to the deployed backend.

These are design goals and implementation choices, not claims of measured user outcomes or feature parity with established messaging products.

## Features

- Account registration and login with password hashing and JWT-based authentication.
- Live username availability checks while signing up.
- User discovery and authenticated one-to-one conversations.
- Message history persisted in MongoDB.
- Real-time message delivery and online-user presence with Socket.IO.
- Emoji picker for composing messages.
- Responsive interface for desktop and mobile layouts.

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React 19, React Router, Redux Toolkit, Tailwind CSS, Webpack |
| Backend | Node.js, Express 5, Socket.IO |
| Database | MongoDB with Mongoose |
| Authentication | JWT cookies, bcryptjs |
| UI utilities | React Icons, emoji-picker-react, react-hot-toast |
| Deployment | Vercel frontend and API rewrites |

## Architecture

The repository contains two applications:

```text
chatapp/
├── backend/     Express API, MongoDB models, authentication, and Socket.IO
├── frontend/    React client and Webpack configuration
└── README.md
```

The frontend communicates with the API through `/api/v1`. During local development, API requests use `http://localhost:5000` by default. In production, the frontend's Vercel rewrites forward API and Socket.IO traffic to the deployed backend at `https://chat-app-api-plum.vercel.app`.

## How It Was Built

The application is organized around a clear request and event flow:

1. **React client:** React Router presents the landing, signup, login, and chat views. Redux Toolkit holds shared user, conversation, and message state.
2. **Express API:** REST endpoints handle registration, login, user discovery, username availability, and message history or sending.
3. **MongoDB persistence:** Mongoose models store users, conversations, and messages so conversation history can be loaded again later.
4. **Authentication:** the backend hashes passwords with bcryptjs and uses a JWT in an HTTP-only cookie to protect user and message routes.
5. **Realtime events:** Socket.IO tracks connected users and sends new messages to a connected recipient; the API also persists each message.
6. **Deployment routing:** Vercel serves the frontend and forwards API and Socket.IO requests to the backend deployment.

The frontend is built with React, styled with Tailwind CSS, and bundled with Webpack. Axios is used for API requests, and `emoji-picker-react` supplies the message composer’s emoji picker.

## Run Locally

### Prerequisites

- Node.js and npm
- A MongoDB database, either local or hosted

### 1. Install dependencies

Run these commands from the repository root:

```powershell
npm --prefix backend install
npm --prefix frontend install
```

### 2. Configure the backend

Create `backend/.env` with the following values:

```dotenv
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/chatapp
JWT_SECRET=replace-this-with-a-long-random-secret
CLIENT_URL=http://localhost:3000
```

Use your MongoDB Atlas connection string for `MONGO_URI` if you are using a hosted database. Keep `.env` private and do not commit real credentials or secrets.

### 3. Start the backend

In a terminal:

```powershell
cd backend
npm run dev
```

The API listens on `http://localhost:5000` by default.

### 4. Start the frontend

In a second terminal:

```powershell
cd frontend
npm start
```

The Webpack development server runs at `http://localhost:3000` and opens the app in your browser.

## Available Scripts

| Directory | Command | Purpose |
| --- | --- | --- |
| `backend` | `npm run dev` | Start the API with Nodemon |
| `frontend` | `npm start` | Start the Webpack development server |
| `frontend` | `npm run build` | Create a production frontend build |

From the repository root, the frontend build can also be run with:

```powershell
npm --prefix frontend run build
```

## API Overview

All endpoints are under `/api/v1`.

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/user/register` | No | Register a user |
| `GET` | `/user/check-username?userName=...` | No | Check username availability |
| `POST` | `/user/login` | No | Log in and receive an authentication cookie |
| `GET` | `/user/logout` | No | Clear the authentication cookie |
| `GET` | `/user/me` | Yes | Get the authenticated user's profile |
| `GET` | `/user/getOtherUser` | Yes | List other users |
| `POST` | `/message/send/:id` | Yes | Send a message to a user |
| `GET` | `/message/:id` | Yes | Get the conversation with a user |

Authentication is provided through an HTTP-only JWT cookie. Message requests are authenticated by the backend; live message delivery and online presence are handled by Socket.IO.

## Deployment

The frontend is configured for Vercel in `frontend/vercel.json`. It rewrites `/api/*` and `/socket.io/*` requests to the deployed backend, then sends other paths to the React application. The backend needs its own deployment with the environment variables listed above; set `CLIENT_URL` to the deployed frontend origin.

Visit the deployed app at [https://chat-app-ten-psi-22.vercel.app/](https://chat-app-ten-psi-22.vercel.app/).

## Author

Created entirely by **Muzahir Ali**.