
import { render, screen, fireEvent } from '@testing-library/react';
import ContactItem from '../ContactItem';

describe('ContactItem', () => {
  const mockContact = {
    id: 1,
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
    lastMessage: 'Hello there!',
    status: 'Online',
  };

  const mockOnClick = jest.fn();

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders contact information correctly', () => {
    render(
      <ContactItem
        contact={mockContact}
        isActive={false}
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Hello there!')).toBeInTheDocument();
  });

  it('applies active class when isActive is true', () => {
    const { container } = render(
      <ContactItem
        contact={mockContact}
        isActive={true}
        onClick={mockOnClick}
      />
    );

    expect(container.firstChild).toHaveClass('contact-item');
    expect(container.firstChild).toHaveClass('active');
  });

  it('calls onClick handler when clicked', () => {
    render(
      <ContactItem
        contact={mockContact}
        isActive={false}
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByText('John Doe'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
