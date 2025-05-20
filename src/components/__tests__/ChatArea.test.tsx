import { render, screen, waitFor } from '@testing-library/react';
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
});
