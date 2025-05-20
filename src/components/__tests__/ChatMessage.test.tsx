
import { render, screen } from '@testing-library/react';
import ChatMessage from '../ChatMessage';

describe('ChatMessage', () => {
  const mockMessage = {
    id: 1,
    text: 'Hello, world!',
    sender: 'me',
    timestamp: '2025-05-20T12:00:00.000Z'
  };

  it('renders message text correctly', () => {
    render(<ChatMessage message={mockMessage} isSent={true} />);
    expect(screen.getByText('Hello, world!')).toBeInTheDocument();
  });

  it('applies correct class for sent messages', () => {
    const { container } = render(<ChatMessage message={mockMessage} isSent={true} />);
    expect(container.firstChild).toHaveClass('chat-message');
    expect(container.firstChild).toHaveClass('sent');
  });

  it('applies correct class for received messages', () => {
    const receivedMessage = { ...mockMessage, sender: 'server' };
    const { container } = render(<ChatMessage message={receivedMessage} isSent={false} />);
    expect(container.firstChild).toHaveClass('chat-message');
    expect(container.firstChild).toHaveClass('received');
  });
});
