"use client"
import { useState } from 'react';
import { Message } from '@/types';

interface ImageGenerationComponentProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isGeneratingImage: boolean;
  setIsGeneratingImage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageGenerationComponent({ 
  messages, 
  setMessages, 
  isGeneratingImage, 
  setIsGeneratingImage 
}: ImageGenerationComponentProps) {
  const [imagePrompt, setImagePrompt] = useState('');

  const generateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imagePrompt.trim() || isGeneratingImage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: `Generate image: ${imagePrompt}`,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setImagePrompt('');
    setIsGeneratingImage(true);

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: imagePrompt }),
      });

      const data = await response.json();

      if (response.ok) {
        const imageMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Generated image for: "${imagePrompt}"`,
          isUser: false,
          imageUrl: data.imageUrl,
        };
        setMessages(prev => [...prev, imageMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `Image generation error: ${data.error}`,
          isUser: false,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Failed to generate image. Please try again.',
        isUser: false,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <form onSubmit={generateImage} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={imagePrompt}
            onChange={(e) => setImagePrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="w-full px-4 py-3 sm:py-4 pr-12 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent text-sm sm:text-base shadow-sm transition-all text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isGeneratingImage}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <button
          type="submit"
          disabled={isGeneratingImage || !imagePrompt.trim()}
          className="px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-600 dark:from-purple-400 dark:to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-700 dark:hover:from-purple-500 dark:hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base shadow-md transition-all transform hover:scale-105 active:scale-95"
        >
          {isGeneratingImage ? (
            <div className="flex items-center space-x-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span>Generate</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          )}
        </button>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
        💡 Try: "A futuristic city at sunset", "Cute cat wearing sunglasses", "Abstract art with vibrant colors"
      </p>
    </form>
  );
}
