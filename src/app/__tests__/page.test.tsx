import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

// Mock fetch
global.fetch = jest.fn();

describe('Home Component', () => {
  it('renders the chat interface', () => {
    render(<Home />);

    expect(screen.getByText('ChatGPT Integration')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });
});
