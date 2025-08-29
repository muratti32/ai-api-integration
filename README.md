# AI Integration Hub

A modern Next.js application that integrates multiple AI services into a single, unified interface. Experience the power of ChatGPT conversations, Stability AI image generation, and Hugging Face model inference all in one place.

## Features

- 🤖 **ChatGPT Integration**: Interactive conversations powered by OpenAI's GPT-3.5-turbo
- 🎨 **AI Image Generation**: Create stunning images using Stability AI's SDXL model
- 🤗 **Hugging Face Models**: Direct access to thousands of open-source AI models
- 🌙 **Dark Mode Support**: Beautiful light and dark themes
- 📱 **Responsive Design**: Optimized for desktop and mobile devices
- 🛡️ **Rate Limiting**: Built-in protection against API abuse
- ⚡ **Real-time Updates**: Instant responses with loading states

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest with React Testing Library
- **APIs**: OpenAI, Stability AI, Hugging Face Inference API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- API keys for the services you want to use (see setup below)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/muratti32/ai-api-integration.git
cd ai-api-integration
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:
```bash
# OpenAI (required for ChatGPT)
OPENAI_API_KEY=sk-proj-your-openai-key-here

# Stability AI (required for image generation)
STABILITY_API_KEY=sk-your-stability-key-here

# Hugging Face (required for HF models)
HUGGINGFACE_API_TOKEN=hf_your-huggingface-token-here
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys Setup

### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add billing information (pay-per-use model)
4. Copy the key to `OPENAI_API_KEY` in `.env.local`

### Stability AI API Key
1. Sign up at [Stability AI](https://platform.stability.ai/account/keys)
2. Generate a new API key
3. Add credits to your account
4. Copy the key to `STABILITY_API_KEY` in `.env.local`

### Hugging Face Token
1. Create an account at [Hugging Face](https://huggingface.co)
2. Go to [Settings → Access Tokens](https://huggingface.co/settings/tokens)
3. Create a new token with "Read" permissions
4. Copy the token to `HUGGINGFACE_API_TOKEN` in `.env.local`

## Usage

### ChatGPT Tab
- Ask questions, get coding help, creative writing assistance
- Supports conversations up to 2000 characters per message
- Rate limited to 10 requests per minute

### Image Generation Tab
- Describe any image you want to create
- Powered by Stable Diffusion XL (1024x1024 resolution)
- Rate limited to 5 requests per minute

### Hugging Face Tab
- Test small to medium-sized models directly
- Choose from text generation models like GPT-2
- Supports both public and private models (with proper token permissions)

## API Endpoints

- `POST /api/chat` - OpenAI ChatGPT integration
- `POST /api/generate-image` - Stability AI image generation
- `POST /api/huggingface` - Hugging Face model inference

## Testing

Run the test suite:
```bash
npm test
```

For watch mode during development:
```bash
npm run test:watch
```

## Project Structure

```
src/
├── app/                 # Next.js app router pages and API routes
│   ├── api/            # Backend API endpoints
│   │   ├── chat/       # ChatGPT integration
│   │   ├── generate-image/ # Stability AI integration
│   │   └── huggingface/    # Hugging Face integration
│   └── __tests__/      # Page-level tests
├── components/         # React components
│   ├── ChatGPTComponent.tsx
│   ├── ImageGenerationComponent.tsx
│   ├── HuggingFaceComponent.tsx
│   └── ...
└── types/             # TypeScript type definitions
```

## Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all required environment variables in your deployment platform:
- `OPENAI_API_KEY`
- `STABILITY_API_KEY`
- `HUGGINGFACE_API_TOKEN`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Common Issues

**"Model not found" error in Hugging Face tab:**
- Check that the model name is correct (e.g., `gpt2`, `username/model-name`)
- Ensure your token has access to the model (especially for private models)
- Verify the token is correctly set in `.env.local`

**Rate limiting errors:**
- Each service has different rate limits - wait a minute and try again
- For production use, consider implementing Redis-based rate limiting

**API key errors:**
- Double-check that all environment variables are correctly set
- Restart the development server after changing `.env.local`
- Ensure you have sufficient credits/quota for each service
