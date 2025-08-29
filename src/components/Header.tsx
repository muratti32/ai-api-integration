"use client"

interface HeaderProps {
  activeTab: 'chat' | 'image' | 'huggingface';
  setActiveTab: React.Dispatch<React.SetStateAction<'chat' | 'image' | 'huggingface'>>;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ 
  activeTab, 
  setActiveTab, 
  isDarkMode, 
  toggleDarkMode 
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-4 py-4 sm:py-6">
          {/* Title and Dark Mode Toggle */}
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 bg-clip-text text-transparent">
                AI Integration Hub
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the power of AI with ChatGPT conversations and Stability AI image generation
              </p>
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex justify-center">
            <div className="inline-flex bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-1 shadow-inner">
              <button
                onClick={() => setActiveTab('chat')}
                className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === 'chat'
                    ? 'bg-white dark:bg-gray-700 text-indigo-600 dark:text-indigo-400 shadow-md scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Chat GPT</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === 'image'
                    ? 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 shadow-md scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Generate Images</span>
                </span>
              </button>
              <button
                onClick={() => setActiveTab('huggingface')}
                className={`relative px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-200 ${
                  activeTab === 'huggingface'
                    ? 'bg-white dark:bg-gray-700 text-green-600 dark:text-green-400 shadow-md scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v4M6.2 4.8L4 8m16 0l-2.2-3.2M4 16l2.2 3.2M20 16l-2.2 3.2M2 12h4m16 0h-4M8 12a4 4 0 118 0 4 4 0 01-8 0z" />
                  </svg>
                  <span>Hugging Face</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
