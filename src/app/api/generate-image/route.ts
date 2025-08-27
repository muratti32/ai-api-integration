import { NextRequest, NextResponse } from 'next/server';

// Simple rate limiting (in production, use Redis or similar)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests per minute for image generation
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userData = requestCounts.get(ip);

  if (!userData || now > userData.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userData.count >= RATE_LIMIT) {
    return false;
  }

  userData.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    );
  }

  if (!process.env.STABILITY_API_KEY) {
    console.error('Stability API key is not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Prompt is required and must be a string' }, { status: 400 });
    }

    if (prompt.trim().length === 0) {
      return NextResponse.json({ error: 'Prompt cannot be empty' }, { status: 400 });
    }

    if (prompt.length > 1000) {
      return NextResponse.json({ error: 'Prompt is too long (max 1000 characters)' }, { status: 400 });
    }

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: prompt,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        steps: 30,
        samples: 1,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      console.error('Stability API error:', errorData);
      
      if (response.status === 401) {
        return NextResponse.json({ error: 'Invalid Stability API key' }, { status: 401 });
      } else if (response.status === 429) {
        return NextResponse.json({ error: 'Stability API rate limit exceeded' }, { status: 429 });
      } else if (response.status === 400) {
        return NextResponse.json({ error: 'Invalid request to Stability API' }, { status: 400 });
      } else {
        return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
      }
    }

    const result = await response.json();
    
    if (!result.artifacts || !result.artifacts[0] || !result.artifacts[0].base64) {
      return NextResponse.json({ error: 'No image generated' }, { status: 500 });
    }

    const imageBase64 = result.artifacts[0].base64;
    const imageUrl = `data:image/png;base64,${imageBase64}`;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('Stability API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
