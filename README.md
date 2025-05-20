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

## Testing

The application uses Jest and React Testing Library for unit testing. To run tests:

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Current Test Coverage

```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------|---------|----------|---------|---------|-------------------
All files        |   89.88 |    78.26 |     100 |   90.47 |                   
 ChatArea.tsx    |   88.75 |    73.68 |     100 |   89.33 | 31-32,62-63,74    
 ChatMessage.tsx |     100 |      100 |     100 |     100 |                   
 ContactItem.tsx |     100 |      100 |     100 |     100 |                   
-----------------|---------|----------|---------|---------|-------------------
```

The test suite covers:
- Component rendering
- User interactions (typing messages, sending messages)
- Message grouping and formatting
- Contact management

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
