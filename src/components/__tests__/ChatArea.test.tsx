import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ChatArea from '../ChatArea';

const mockContact = {
  id: 1,
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  lastMessage: 'Hello there!',
  status: 'Online',
};

const mockMessages = [
  {
    id: '1',
    text: 'Hello',
    timestamp: '2025-05-20T12:00:00Z',
    sender: 'me'
  },
  {
    id: '2',
    text: 'Hi',
    timestamp: '2025-05-19T12:00:00Z',
    sender: 'server'
  }
];

const mockGetMessages = jest.fn().mockResolvedValue(mockMessages);
const mockSendMessage = jest.fn().mockImplementation((text: string) => Promise.resolve([{
  id: '3',
  text,
  timestamp: '2025-05-20T12:00:00Z',
  sender: 'me'
}]));

// Mock window.alert
const mockAlert = jest.fn();
window.alert = mockAlert;

// Mock console.error
const mockConsoleError = jest.fn();
window.console.error = mockConsoleError;

jest.mock('../../services/api', () => ({
  chatApi: {
    getMessages: () => mockGetMessages(),
    sendMessage: (text: string) => mockSendMessage(text)
  }
}));

describe('ChatArea', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    mockAlert.mockClear();
    mockConsoleError.mockClear();
  });

  it('renders contact information', async () => {
    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('renders messages grouped by date', async () => {
    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      expect(screen.getByText('Tuesday, May 20, 2025')).toBeInTheDocument();
      expect(screen.getByText('Monday, May 19, 2025')).toBeInTheDocument();
    });
  });

  it('sends new message when form is submitted', async () => {
    render(<ChatArea contact={mockContact} />);
    
    await waitFor(() => {
      expect(screen.getByTestId('message-input')).toBeInTheDocument();
    });

    const input = screen.getByTestId('message-input');
    const sendButton = screen.getByTestId('send-button');

    await userEvent.type(input, 'New message');
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(mockSendMessage).toHaveBeenCalledWith('New message');
    });
  });

  it('groups messages by date', async () => {
    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      expect(screen.getByText('Tuesday, May 20, 2025')).toBeInTheDocument();
      expect(screen.getByText('Monday, May 19, 2025')).toBeInTheDocument();
    });
  });

  it('handles fetch messages error', async () => {
    const error = new Error('Failed to fetch');
    mockGetMessages.mockRejectedValueOnce(error);

    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith(expect.any(String), error);
      expect(mockAlert).toHaveBeenCalledWith(expect.any(String));
    });
  });

  it('handles send message error', async () => {
    mockGetMessages.mockResolvedValueOnce([]);
    const error = new Error('Failed to send');
    mockSendMessage.mockRejectedValueOnce(error);

    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      const input = screen.getByTestId('message-input');
      expect(input).toBeInTheDocument();
    });

    const input = screen.getByTestId('message-input');
    const sendButton = screen.getByTestId('send-button');

    await userEvent.type(input, 'Test message');
    await userEvent.click(sendButton);

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith(expect.any(String), error);
      expect(mockAlert).toHaveBeenCalledWith(expect.any(String));
    });
  });

  it('sends message when Enter key is pressed', async () => {
    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      const input = screen.getByTestId('message-input');
      expect(input).toBeInTheDocument();
    });

    const input = screen.getByTestId('message-input');
    await userEvent.type(input, 'Test message{enter}');

    expect(mockSendMessage).toHaveBeenCalledWith('Test message');
  });

  it('groups messages correctly when sender changes', async () => {
    const messagesWithDifferentSenders = [
      { id: '1', text: 'Hi', timestamp: '2025-05-20T12:00:00Z', sender: 'me' },
      { id: '2', text: 'Hello', timestamp: '2025-05-20T12:01:00Z', sender: 'other' },
      { id: '3', text: 'How are you?', timestamp: '2025-05-20T12:02:00Z', sender: 'me' }
    ];

    const getMessagePromise = Promise.resolve(messagesWithDifferentSenders);
    mockGetMessages.mockReturnValue(getMessagePromise);
    
    render(<ChatArea contact={mockContact} />);

    // Wait for the API call to complete
    await getMessagePromise;

    // Wait for React to update the UI
    await waitFor(() => {
      expect(screen.getByText('Hi')).toBeInTheDocument();
    });

    // Verify message content
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByText('How are you?')).toBeInTheDocument();

    // Verify message grouping
    const messageGroups = document.querySelectorAll('.message-bubble-group');
    expect(messageGroups).toHaveLength(3);

    // Verify sender classes
    const sentGroups = Array.from(messageGroups).filter(group => 
      group.classList.contains('sent')
    );
    const receivedGroups = Array.from(messageGroups).filter(group => 
      group.classList.contains('received')
    );

    expect(sentGroups).toHaveLength(2); // 'Hi' and 'How are you?' from 'me'
    expect(receivedGroups).toHaveLength(1); // 'Hello' from 'other'
  });

  it('handles initial load messages error', async () => {
    const error = new Error('Failed to load');
    mockGetMessages.mockRejectedValueOnce(error);

    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith(expect.any(String), error);
    });
  });

  it('scrolls to bottom when messages are updated', async () => {
    const messages = [
      { id: '1', text: 'Hi', timestamp: '2025-05-20T12:00:00Z', sender: 'me' }
    ];

    mockGetMessages.mockResolvedValueOnce(messages);
    
    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    render(<ChatArea contact={mockContact} />);

    // Wait for messages to be rendered
    await waitFor(() => {
      expect(screen.getByText('Hi')).toBeInTheDocument();
    });

    // Add a new message
    const newMessage = { id: '2', text: 'Hello', timestamp: '2025-05-20T12:01:00Z', sender: 'other' };
    mockSendMessage.mockResolvedValueOnce([newMessage]);

    // Trigger a re-render by sending a new message
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Hello' } });
    fireEvent.click(screen.getByTestId('send-button'));

    // Wait for the scroll to happen
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
    });
  });

  it('handles initial load messages error', async () => {
    const error = new Error('Failed to load messages');
    mockGetMessages.mockRejectedValue(error);

    const consoleSpy = jest.spyOn(console, 'error');

    render(<ChatArea contact={mockContact} />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load messages:', error);
    });

    // Wait for the error to be handled and state to be updated
    await waitFor(() => {
      const messageElements = screen.queryAllByTestId('message-content');
      expect(messageElements).toHaveLength(0);
    });

    consoleSpy.mockRestore();
  });

  it('handles empty message groups correctly', async () => {
    // Mock an empty messages array
    mockGetMessages.mockResolvedValueOnce([]);

    render(<ChatArea contact={mockContact} />);

    // Wait for the component to render
    await waitFor(() => {
      // There should be no message groups
      const messageGroups = document.querySelectorAll('.message-bubble-group');
      expect(messageGroups).toHaveLength(0);
    });
  });

  it('handles null messagesEndRef gracefully', async () => {
    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    // Mock messages with specific dates to test grouping
    const messages = [
      { id: '1', text: 'Hi', timestamp: '2025-05-19T12:00:00Z', sender: 'me' },
      { id: '2', text: 'Hello', timestamp: '2025-05-20T12:00:00Z', sender: 'other' }
    ];

    mockGetMessages.mockResolvedValueOnce(messages);
    
    render(<ChatArea contact={mockContact} />);

    // Wait for messages to be rendered
    await waitFor(() => {
      expect(screen.getByText('Hi')).toBeInTheDocument();
    });

    // Verify that messages are grouped by date
    expect(screen.getByText('Monday, May 19, 2025')).toBeInTheDocument();
    expect(screen.getByText('Tuesday, May 20, 2025')).toBeInTheDocument();

    // Reset the mock to verify it's called the expected number of times
    scrollIntoViewMock.mockReset();

    // Add a new message to trigger scrollToBottom
    const newMessage = { id: '3', text: 'Test', timestamp: '2025-05-20T12:01:00Z', sender: 'me' };
    mockSendMessage.mockResolvedValueOnce([newMessage]);

    // Trigger a re-render by sending a new message
    fireEvent.change(screen.getByTestId('message-input'), { target: { value: 'Test' } });
    fireEvent.click(screen.getByTestId('send-button'));

    // Wait for the new message to be rendered
    await waitFor(() => {
      expect(screen.getByText('Test')).toBeInTheDocument();
    });

    // Verify scrollIntoView was called exactly once for the new message
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('groups consecutive messages from the same sender', async () => {
    const messages = [
      { id: '1', text: 'Hi', timestamp: '2025-05-20T12:00:00Z', sender: 'me' },
      { id: '2', text: 'How are you?', timestamp: '2025-05-20T12:01:00Z', sender: 'me' },
      { id: '3', text: 'Hello', timestamp: '2025-05-20T12:02:00Z', sender: 'other' },
      { id: '4', text: 'I am good', timestamp: '2025-05-20T12:03:00Z', sender: 'other' },
      { id: '5', text: 'Great!', timestamp: '2025-05-20T12:04:00Z', sender: 'me' }
    ];

    mockGetMessages.mockResolvedValueOnce(messages);
    
    render(<ChatArea contact={mockContact} />);

    // Wait for all messages to be rendered
    await waitFor(() => {
      expect(screen.getAllByTestId('message-content')).toHaveLength(5);
    });

    // Verify message grouping
    const messageGroups = document.querySelectorAll('.message-bubble-group');
    expect(messageGroups).toHaveLength(3); // Should be grouped as [me, me], [other, other], [me]

    // Verify sender classes
    const sentGroups = Array.from(messageGroups).filter(group => 
      group.classList.contains('sent')
    );
    const receivedGroups = Array.from(messageGroups).filter(group => 
      group.classList.contains('received')
    );

    expect(sentGroups).toHaveLength(2); // Two groups from 'me'
    expect(receivedGroups).toHaveLength(1); // One group from 'other'

    // Verify messages are in correct order
    const messageElements = screen.getAllByTestId('message-content');
    expect(messageElements[0]).toHaveTextContent('Hi');
    expect(messageElements[1]).toHaveTextContent('How are you?');
    expect(messageElements[2]).toHaveTextContent('Hello');
    expect(messageElements[3]).toHaveTextContent('I am good');
    expect(messageElements[4]).toHaveTextContent('Great!');
  });
});
