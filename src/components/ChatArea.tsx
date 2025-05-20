import React, { useState, useRef, useEffect } from 'react';
import "../styles/ChatArea.css";
import ChatMessage from "./ChatMessage";
import type { Message } from "../services/api";
import { chatApi } from "../services/api";
import type { Contact } from "../types";

interface ChatAreaProps {
  contact: Contact;
}

const ChatArea = ({ contact }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const fetchedMessages = await chatApi.getMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
        alert('Failed to fetch messages. Please try again.');
      }
    };

    fetchMessages();
  }, [contact.id]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const sentMessages = await chatApi.sendMessage(newMessage, "me");      
      // Immediately add the messages to the state
      setMessages(prev => {
        // Create a new array with all messages
        const updatedMessages = [...prev];
        
        // Add each new message
        sentMessages.forEach(message => {
          // Check if message already exists to avoid duplicates
          if (!updatedMessages.some(m => m.id === message.id)) {
            updatedMessages.push(message);
          }
        });
        
        return updatedMessages;
      });
      
      setNewMessage("");
    } catch (error) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  useEffect(() => {
    // Load initial messages
    const loadMessages = async () => {
      try {
        const initialMessages = await chatApi.getMessages();
        setMessages(initialMessages);
      } catch (error) {
        console.error('Failed to load messages:', error);
      }
    };
    loadMessages();
  }, []);

  // Sort messages by timestamp first
  const sortedMessages = [...messages].sort((a, b) => {
    const timeA = new Date(a.timestamp).getTime();
    const timeB = new Date(b.timestamp).getTime();
    return timeA - timeB;
  });

  // Group messages by date
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const groupedMessages = sortedMessages.reduce((groups: { [key: string]: Message[] }, message) => {
    const date = formatDate(message.timestamp);
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  // Group consecutive messages from the same sender
  const groupConsecutiveMessages = (messages: Message[]) => {
    // Sort messages within the day by timestamp
    const sortedDayMessages = [...messages].sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const result: Message[][] = [];
    let currentGroup: Message[] = [];

    sortedDayMessages.forEach((message, index) => {
      if (index === 0 || sortedDayMessages[index - 1].sender !== message.sender) {
        if (currentGroup.length > 0) {
          result.push([...currentGroup]);
          currentGroup = [];
        }
      }
      currentGroup.push(message);

      if (index === sortedDayMessages.length - 1) {
        result.push([...currentGroup]);
      }
    });

    return result;
  };

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div className="chat-header-info">
          <div className="chat-header-avatar">
            <img src={contact.avatar} alt={contact.name} />
          </div>
          <div className="chat-header-details">
            <div className="chat-header-name">{contact.name}</div>
            <div className="chat-header-status">{contact.status}</div>
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="chat-header-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 7l-7 5 7 5V7z"></path>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
            </svg>
          </button>
          <button className="chat-header-action">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date} className="message-group">
            <div className="message-date">{date}</div>
            {groupConsecutiveMessages(messages).map((group, groupIndex) => (
              <div
                key={`${date}-${groupIndex}`}
                className={`message-bubble-group ${group[0]?.sender === "me" ? 'sent' : 'received'}`}
              >
                {group.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isSent={message.sender === "me"}
                  />
                ))}
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <div className="input-actions">
          <button type="button" className="input-action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M12 1C11.2044 1 10.4413 1.31607 9.87868 1.87868C9.31607 2.44129 9 3.20435 9 4V12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12V4C15 3.20435 14.6839 2.44129 14.1213 1.87868C13.5587 1.31607 12.7956 1 12 1Z" />
              <path d="M19 10V12C19 13.8565 18.2625 15.637 16.9497 16.9497C15.637 18.2625 13.8565 19 12 19C10.1435 19 8.36301 18.2625 7.05025 16.9497C5.7375 15.637 5 13.8565 5 12V10" />
              <path d="M12 19V23" />
              <path d="M8 23H16" />
            </svg>
          </button>
          <button type="button" className="input-action">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </button>
        </div>

        <input
          type="text"
          placeholder="Type a message"
          value={newMessage}
          data-testid="message-input"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />

        <button
          type="button"
          className="send-button"
          data-testid="send-button"
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
