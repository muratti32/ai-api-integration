import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../page';

// Mock fetch
global.fetch = jest.fn();

describe('Home Component', () => {
  it('renders the modern AI integration interface', () => {
    render(<Home />);

    expect(screen.getByText('AI Integration Hub')).toBeInTheDocument();
    expect(screen.getByText('Chat GPT')).toBeInTheDocument();
    expect(screen.getByText('Generate Images')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
    expect(screen.getByText('Start a Conversation')).toBeInTheDocument();
  });
});
