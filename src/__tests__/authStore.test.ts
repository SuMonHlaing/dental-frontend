import { act } from "@testing-library/react";
import useAuthStore from "../store/authStore";

// Mock the global fetch function
global.fetch = jest.fn() as jest.Mock;

describe("authStore", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it("should initialize with default values", () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  describe("login", () => {
    it("sets user and token on successful login", async () => {
      const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
      const mockToken = "mock-token";
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, access_token: mockToken }),
      });

      await act(async () => {
        await useAuthStore.getState().login("test@example.com", "password123");
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
    });

    it("throws error on failed login", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Invalid credentials" }),
      });

      await expect(
        useAuthStore.getState().login("wrong@example.com", "wrongpass")
      ).rejects.toThrow("Invalid credentials");
    });
  });

  describe("register", () => {
    it("sets user and token on successful registration", async () => {
      const mockUser = { id: "2", email: "new@example.com", name: "New User" };
      const mockToken = "mock-token";
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, access_token: mockToken }),
      });

      await act(async () => {
        await useAuthStore.getState().register("New User", "new@example.com", "password");
      });

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.token).toBe(mockToken);
      expect(state.isAuthenticated).toBe(true);
    });

    it("throws error on failed registration", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: "Email already exists" }),
      });

      await expect(
        useAuthStore.getState().register("Existing User", "exists@example.com", "password")
      ).rejects.toThrow("Email already exists");
    });
  });

  it("clears user data on logout", () => {
    useAuthStore.getState().setUser(
      { id: "1", email: "test@example.com", name: "Test User" },
      "mock-token"
    );

    act(() => {
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it("persists state in localStorage", async () => {
    const mockUser = { id: "1", email: "test@example.com", name: "Test User" };
    const mockToken = "mock-token";
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ user: mockUser, access_token: mockToken }),
    });

    await act(async () => {
      await useAuthStore.getState().login("test@example.com", "password");
    });

    const stored = localStorage.getItem("auth-storage");
    expect(stored).not.toBeNull();
    if (stored) {
      const parsed = JSON.parse(stored);
      expect(parsed.state.user).toEqual(mockUser);
      expect(parsed.state.token).toBe(mockToken);
      expect(parsed.state.isAuthenticated).toBe(true);
    }
  });
});