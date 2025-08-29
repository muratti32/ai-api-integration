"use client"
import { useState } from 'react';
import { Message } from '@/types';

interface HuggingFaceComponentProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export default function HuggingFaceComponent({ messages, setMessages }: HuggingFaceComponentProps) {
  const [model, setModel] = useState('gpt2');
  const [input, setInput] = useState('Hello from Hugging Face!');
  const [isLoading, setIsLoading] = useState(false);

  const callHuggingFace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch('/api/huggingface', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model, inputs: input }),
      });

      const data = await res.json();

      if (res.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.result || JSON.stringify(data.raw) || 'No output',
          isUser: false,
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `HF Error: ${data.error}`,
          isUser: false,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (err) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Failed to call Hugging Face API',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={callHuggingFace} className="space-y-4">
      <div className="flex gap-3">
        <select value={model} onChange={e => setModel(e.target.value)} className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-700">
          <option value="gpt2">gpt2 (text)</option>
          <option value="sshleifer/tiny-gpt2">tiny-gpt2</option>
        </select>
        <input value={input} onChange={e => setInput(e.target.value)} className="flex-1 px-4 py-2 rounded-lg border bg-white dark:bg-gray-700" />
        <button type="submit" disabled={isLoading} className="px-4 py-2 rounded-lg bg-indigo-600 text-white disabled:opacity-50">Call HF</button>
      </div>
    </form>
  );
}
