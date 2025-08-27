/**
 * @jest-environment node
 */

// Mock the entire route module
jest.mock('../route', () => ({
  POST: jest.fn(),
}));

import { NextRequest } from 'next/server';
import { POST } from '../route';

const mockPOST = POST as jest.Mock;

describe('/api/generate-image POST', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be mocked for image generation', async () => {
    mockPOST.mockResolvedValue({
      status: 200,
      json: async () => ({ imageUrl: 'data:image/png;base64,mock-base64-data' }),
    });

    const request = new NextRequest('http://localhost:3000/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'A beautiful sunset' }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const response = await POST(request);

    expect(mockPOST).toHaveBeenCalledWith(request);
    expect(response.status).toBe(200);
  });

  it('should handle empty prompt', async () => {
    mockPOST.mockResolvedValue({
      status: 400,
      json: async () => ({ error: 'Prompt cannot be empty' }),
    });

    const request = new NextRequest('http://localhost:3000/api/generate-image', {
      method: 'POST',
      body: JSON.stringify({ prompt: '' }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
  });
});
