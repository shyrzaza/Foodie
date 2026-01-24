# Foodie App - State Persistence Setup

## Installation

1. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

## Running the Application

You need to run both the frontend and backend:

### Terminal 1 - Backend Server
```bash
npm run server
```
This starts the backend on http://localhost:3001

### Terminal 2 - Frontend Dev Server
```bash
npm run dev
```
This starts the frontend on http://localhost:5173

## How It Works

The app now persists its state (selected recipes, skipped recipes, and completion status) to a backend server. This means:

- The state is shared across all devices/browsers accessing the app
- Refreshing the page maintains your selections
- The shopping list persists even when switching devices

## API Endpoints

- `GET /api/state` - Get current app state
- `POST /api/state` - Save app state
- `DELETE /api/state` - Reset app to initial state

## Files

- `server/index.js` - Express backend server
- `server/app-state.json` - Persisted state file (auto-created)
- `server/package.json` - Backend dependencies

## Reset

To start over, click the "Start Over" button on the shopping list page.
