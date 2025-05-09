// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');
jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const mockAxiosClient = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosClient);
  });
  test('should create instance with provided base url', async () => {
    const mockResponseData = { id: 1, data: 'Test Post' };
    (axios.create as jest.Mock).mockReturnValue({
      get: jest.fn().mockResolvedValue({ data: mockResponseData }),
    });
    await throttledGetDataFromApi('/posts');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });
  test('should perform request to correct provided url', async () => {
    const mockResponseData = { id: 1, data: 'Test Post' };
    mockAxiosClient.get.mockResolvedValueOnce({ data: mockResponseData });

    const result = await throttledGetDataFromApi('/posts/1');
    expect(mockAxiosClient.get).toHaveBeenCalledWith('/posts/1');
    expect(result).toEqual(mockResponseData);
  });
});

test('should return response data', async () => {
  const mockResponseData = { id: 1, data: 'Test Post' };
  (axios.create as jest.Mock).mockReturnValue({
    get: jest.fn().mockResolvedValue({ data: mockResponseData }),
  });

  const result = await throttledGetDataFromApi('/posts/1');
  expect(result).toEqual(mockResponseData);
});
