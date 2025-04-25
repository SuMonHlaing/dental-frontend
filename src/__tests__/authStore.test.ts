import { act } from "@testing-library/react";
import useAuthStore from "../store/authStore";

// Mock the global fetch function
global.fetch = jest.fn() as jest.Mock;

describe('authStore', () => {
  beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    (fetch as jest.Mock).mockClear();
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  describe('login', () => {
    it('should set user and token on successful login', async () => {
      const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
      const mockToken = 'mock-token';
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, access_token: mockToken }),
      });

      await act(async () => {
        await useAuthStore.getState().login('test@example.com', 'password123');
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toEqual(mockToken);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should throw error on failed login', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      });

      await expect(
        useAuthStore.getState().login('wrong@example.com', 'wrongpass')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('register', () => {
    it('should set user and token on successful registration', async () => {
      const mockUser = { id: '1', email: 'new@example.com', name: 'New User' };
      const mockToken = 'mock-token';
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, access_token: mockToken }),
      });

      await act(async () => {
        await useAuthStore.getState().register('New User', 'new@example.com', 'password');
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toEqual(mockToken);
      expect(state.isAuthenticated).toBe(true);
    });

    it('should throw error on failed registration', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: 'Email already exists' }),
      });

      await expect(
        useAuthStore.getState().register('Existing User', 'exists@example.com', 'password')
      ).rejects.toThrow('Email already exists');
    });
  });

  it('should clear user data on logout', () => {
    // First set some user data
    useAuthStore.getState().setUser(
      { id: '1', email: 'test@example.com', name: 'Test User' },
      'mock-token'
    );

    // Then logout
    act(() => {
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should persist state in localStorage', async () => {
    const mockUser = { id: '1', email: 'test@example.com', name: 'Test User' };
    const mockToken = 'mock-token';
    
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser, access_token: mockToken }),
    });

    await act(async () => {
      await useAuthStore.getState().login('test@example.com', 'password');
    });

    // Check if data was persisted
    const storedData = localStorage.getItem('auth-storage');
    expect(storedData).not.toBeNull();
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      expect(parsedData.state.user).toEqual(mockUser);
      expect(parsedData.state.token).toEqual(mockToken);
      expect(parsedData.state.isAuthenticated).toBe(true);
    }
  });
});