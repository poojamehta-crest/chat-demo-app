import { Router, Request, Response } from 'express';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string; // ISO string format
}

interface MessageRequest {
  text: string;
  sender?: string;
}

const router = Router();

// In-memory storage for messages (in a real app, use a database)
let messages: Message[] = [];
let nextId = 1;

// Get all messages
router.get('/messages', (_req: Request, res: Response<Message[]>) => {
  res.json(messages);
});

// Send a new message
router.post('/messages', async (req: Request<{}, {}, MessageRequest>, res: Response<Message[] | { error: string }>) => {
  const { text, sender = 'Anonymous' } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Message text is required' });
  }

  const now = new Date();
  const userMessage: Message = {
    id: nextId++,
    text,
    sender,
    timestamp: now.toISOString()
  };

  const serverMessage: Message = {
    id: nextId++,
    text: `Server: ${text}`, // Add 'Server:' prefix to the message
    sender: 'server',
    timestamp: new Date(now.getTime() + 1000).toISOString() // 1 second later
  };

  messages.push(userMessage);
  messages.push(serverMessage);

  // Send both messages in the response
  return res.status(201).json([userMessage, serverMessage]);
});

export default router;
