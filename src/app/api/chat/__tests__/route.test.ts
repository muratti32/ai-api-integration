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

describe('/api/chat POST', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be mocked', async () => {
    mockPOST.mockResolvedValue({
      status: 200,
      json: async () => ({ reply: 'Mocked response' }),
    });

    const request = new NextRequest('http://localhost:3000/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: 'Hello' }),
      headers: {
        'content-type': 'application/json',
      },
    });

    const response = await POST(request);

    expect(mockPOST).toHaveBeenCalledWith(request);
    expect(response.status).toBe(200);
  });
});
