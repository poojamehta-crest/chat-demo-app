import "../styles/ChatMessage.css";
import type { Message } from "../services/api";

interface ChatMessageProps {
  message: Message;
  isSent: boolean;
}

const ChatMessage = ({ message, isSent }: ChatMessageProps) => {
  const timestamp = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
  return (
    <div className={`chat-message ${isSent ? 'sent' : 'received'}`}>
      <div className="message-content">{message.text}</div>
      <div className="message-timestamp">{timestamp}</div>
    </div>
  );
};

export default ChatMessage;
