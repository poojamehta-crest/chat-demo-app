const API_BASE_URL = 'http://localhost:3001/api';

export interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: string; // ISO string formatting
}

export const chatApi = {
  // Get all messages
  async getMessages(): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/chat/messages`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    return response.json();
  },

  // Send a new message
  async sendMessage(text: string, sender: string = 'Anonymous'): Promise<Message[]> {
    const response = await fetch(`${API_BASE_URL}/chat/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, sender }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();

    // Ensure we always return an array
    return Array.isArray(data) ? data : [data];
  }
};

export default chatApi;
