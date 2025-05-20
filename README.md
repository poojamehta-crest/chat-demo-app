# Modern Chat Application

A beautiful and responsive chat application built with React, TypeScript, and Express. Features a modern UI with real-time messaging capabilities.

## Features

### Chat Interface
- Real-time messaging with automatic responses
- Beautiful message bubbles with proper alignment for sent/received messages
- Message timestamps with elegant date formatting
- Message grouping by date
- Smooth scrolling chat area

### Contact Management
- Contact list with avatars and online status
- Last message preview for each contact
- Active contact highlighting
- Contact search functionality

### UI/UX
- Modern and clean design
- Responsive layout (mobile-friendly)
- Voice and video call buttons
- Message input with send button
- Elegant hover effects and transitions
- Profile view with contact details

### Technical Features
- Built with React and TypeScript
- Express.js backend server
- RESTful API for message handling
- Vite for fast development and building

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd chat-demo-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
# Terminal 1: Start the backend server
cd server
npm run dev

# Terminal 2: Start the frontend
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
chat-demo-app/
├── src/
│   ├── components/     # React components
│   ├── services/      # API services
│   ├── styles/        # CSS styles
│   ├── types/         # TypeScript types
│   └── App.tsx        # Main app component
├── server/
│   ├── src/
│   │   ├── routes/    # API routes
│   │   └── index.ts   # Server entry
│   └── package.json
└── package.json
```

## Tech Stack

- **Frontend**
  - React
  - TypeScript
  - Vite
  - CSS Modules

- **Backend**
  - Express.js
  - TypeScript
  - Node.js

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
