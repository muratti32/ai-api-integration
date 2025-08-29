"use client"
import { Message } from '@/types';

interface MessagesAreaProps {
  messages: Message[];
  activeTab: 'chat' | 'image';
  isLoading: boolean;
  isGeneratingImage: boolean;
}

export default function MessagesArea({ 
  messages, 
  activeTab, 
  isLoading, 
  isGeneratingImage 
}: MessagesAreaProps) {
  return (
    <div className="h-[60vh] sm:h-[65vh] overflow-y-auto p-4 sm:p-6">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full flex items-center justify-center">
            {activeTab === 'chat' ? (
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            ) : (
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
              {activeTab === 'chat' ? 'Start a Conversation' : 'Create Amazing Images'}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base max-w-md">
              {activeTab === 'chat' 
                ? 'Ask me anything! I\'m here to help with questions, creative writing, coding, and more.' 
                : 'Describe any image you can imagine and watch AI bring it to life in seconds.'
              }
            </p>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] sm:max-w-md lg:max-w-lg px-4 py-3 rounded-2xl shadow-sm ${
                message.isUser
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600'
              }`}
            >
              <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
              {message.imageUrl && (
                <div className="mt-3">
                  <img 
                    src={message.imageUrl} 
                    alt="Generated image" 
                    className="w-full h-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-600"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {(isLoading || isGeneratingImage) && (
        <div className="flex justify-start mt-4">
          <div className="bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-4 py-3 rounded-2xl">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 dark:bg-gray-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-sm">
                {isLoading ? 'ChatGPT is thinking...' : 'Generating your image...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
