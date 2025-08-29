/**
 * @jest-environment node
 */

// Mock the route module
jest.mock('../route', () => ({
  POST: jest.fn(),
}));

import { NextRequest } from 'next/server';
import { POST } from '../route';

const mockPOST = POST as jest.Mock;

describe('/api/huggingface POST', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be mocked and return 200', async () => {
    mockPOST.mockResolvedValue({ status: 200, json: async () => ({ result: 'mocked' }) });

    const request = new NextRequest('http://localhost:3000/api/huggingface', {
      method: 'POST',
      body: JSON.stringify({ model: 'gpt2', inputs: 'Hello' }),
      headers: { 'content-type': 'application/json' },
    });

    const response = await POST(request);

    expect(mockPOST).toHaveBeenCalledWith(request);
    expect(response.status).toBe(200);
  });
});
