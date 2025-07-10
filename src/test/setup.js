import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Mock fetch globally
global.fetch = vi.fn()

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
global.sessionStorage = sessionStorageMock

// Global test utilities
global.testUtils = {
  mockFetchResponse: (data, status = 200) => {
    global.fetch.mockResolvedValueOnce({
      ok: status >= 200 && status < 300,
      status,
      json: async () => data,
    })
  },
  
  mockFetchError: (error) => {
    global.fetch.mockRejectedValueOnce(error)
  }
} 