import { NextRequest, NextResponse } from 'next/server';

// Basic in-memory rate limiting (for demos only)
const requestCounts = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 10; // requests per minute
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
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 });
  }

  if (!process.env.HUGGINGFACE_API_TOKEN) {
    console.error('Hugging Face API token is not configured');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { model, inputs, options } = body || {};

    if (!model || typeof model !== 'string') {
      return NextResponse.json({ error: 'Model is required and must be a string' }, { status: 400 });
    }

    if (!inputs || (typeof inputs !== 'string' && !Array.isArray(inputs))) {
      return NextResponse.json({ error: 'Inputs is required and must be a string or array' }, { status: 400 });
    }

    // Call Hugging Face Inference API
    const hfUrl = `https://api-inference.huggingface.co/models/${encodeURIComponent(model)}`;

    const res = await fetch(hfUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        Accept: 'application/json, image/*',
      },
      body: JSON.stringify({ inputs, options }),
    });

    const contentType = res.headers.get('content-type') || '';

    if (!res.ok) {
      // try to parse JSON or text error body
      const textBody = await res.text().catch(() => '');
      let parsedBody: any = textBody;
      try {
        parsedBody = JSON.parse(textBody);
      } catch (e) {
        // leave parsedBody as text
      }

      console.error('Hugging Face API error', res.status, parsedBody);

      // Forward helpful error information to the client for debugging
      if (res.status === 401) {
        return NextResponse.json({ error: 'Invalid Hugging Face API token', hfStatus: 401, hfBody: parsedBody }, { status: 401 });
      }

      if (res.status === 404) {
        return NextResponse.json({ error: 'Model not found. Check the model name and visibility (private models require proper token)', hfStatus: 404, hfBody: parsedBody }, { status: 404 });
      }

      if (res.status === 429) {
        return NextResponse.json({ error: 'Hugging Face rate limit exceeded', hfStatus: 429, hfBody: parsedBody }, { status: 429 });
      }

      // For other statuses, forward the HF status and body so caller can diagnose
      return NextResponse.json({ error: 'Hugging Face API error', hfStatus: res.status, hfBody: parsedBody }, { status: res.status });
    }

    // If HF returned JSON (text models usually do)
    if (contentType.includes('application/json')) {
      const data = await res.json();

      // common output shapes: string, { generated_text }, [{generated_text}], or other
      let resultText: string | null = null;

      if (typeof data === 'string') resultText = data;
      else if (Array.isArray(data) && data[0]?.generated_text) resultText = data[0].generated_text;
      else if (data?.generated_text) resultText = data.generated_text;
      else if (Array.isArray(data) && typeof data[0] === 'string') resultText = data[0];
      
      return NextResponse.json({ result: resultText, raw: data });
    }

    // If HF returned an image or binary (some image models return image/*)
    if (contentType.startsWith('image/') || contentType.startsWith('application/octet-stream')) {
      const buffer = await res.arrayBuffer();
      const b64 = Buffer.from(buffer).toString('base64');
      const dataUrl = `data:${contentType};base64,${b64}`;
      return NextResponse.json({ imageUrl: dataUrl });
    }

    // Fallback: return raw text
    const text = await res.text().catch(() => '');
    return NextResponse.json({ result: text });
  } catch (error: any) {
    console.error('Hugging Face integration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
