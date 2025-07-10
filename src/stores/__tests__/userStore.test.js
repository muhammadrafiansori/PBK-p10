import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '../userStore'

describe('User Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('State', () => {
    it('should have initial state', () => {
      const store = useUserStore()
      
      expect(store.currentUser).toBe(null)
      expect(store.users).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
    })
  })

  describe('Getters', () => {
    it('should check if user is logged in', () => {
      const store = useUserStore()
      
      expect(store.isLoggedIn).toBe(false)
      
      store.currentUser = { id: 1, username: 'test' }
      expect(store.isLoggedIn).toBe(true)
    })

    it('should check if user is admin', () => {
      const store = useUserStore()
      
      expect(store.isAdmin).toBe(false)
      
      store.currentUser = { id: 1, username: 'admin', role: 'admin' }
      expect(store.isAdmin).toBe(true)
      
      store.currentUser = { id: 2, username: 'user', role: 'user' }
      expect(store.isAdmin).toBe(false)
    })

    it('should get user by id', () => {
      const store = useUserStore()
      const mockUser = { id: 1, username: 'test' }
      store.users = [mockUser]
      
      const result = store.getUserById(1)
      expect(result).toEqual(mockUser)
    })

    it('should return undefined for non-existent user', () => {
      const store = useUserStore()
      store.users = [{ id: 1, username: 'test' }]
      
      const result = store.getUserById(999)
      expect(result).toBeUndefined()
    })
  })

  describe('Actions', () => {
    it('should fetch users successfully', async () => {
      const store = useUserStore()
      const mockUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' }
      ]
      
      global.testUtils.mockFetchResponse(mockUsers)
      
      await store.fetchUsers()
      
      expect(store.users).toEqual(mockUsers)
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users')
    })

    it('should handle fetch users error', async () => {
      const store = useUserStore()
      const errorMessage = 'Failed to fetch users'
      
      global.testUtils.mockFetchError(new Error(errorMessage))
      
      await store.fetchUsers()
      
      expect(store.error).toBe(errorMessage)
      expect(store.loading).toBe(false)
      expect(store.users).toEqual([])
    })

    it('should login successfully with valid credentials', async () => {
      const store = useUserStore()
      const mockUsers = [
        { id: 1, username: 'admin', email: 'admin@example.com', role: 'admin' },
        { id: 2, username: 'user1', email: 'user1@example.com', role: 'user' }
      ]
      store.users = mockUsers
      
      const result = await store.login('admin', 'admin@example.com')
      
      expect(result).toEqual(mockUsers[0])
      expect(store.currentUser).toEqual(mockUsers[0])
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
    })

    it('should handle login with invalid credentials', async () => {
      const store = useUserStore()
      const mockUsers = [
        { id: 1, username: 'admin', email: 'admin@example.com' }
      ]
      store.users = mockUsers
      
      await expect(store.login('wrong', 'wrong@example.com')).rejects.toThrow('Invalid credentials')
      
      expect(store.currentUser).toBe(null)
      expect(store.error).toBe('Invalid credentials')
      expect(store.loading).toBe(false)
    })

    it('should logout successfully', () => {
      const store = useUserStore()
      store.currentUser = { id: 1, username: 'test' }
      store.error = 'Some error'
      
      store.logout()
      
      expect(store.currentUser).toBe(null)
      expect(store.error).toBe(null)
    })

    it('should add user successfully', async () => {
      const store = useUserStore()
      const newUser = { username: 'newuser', email: 'new@example.com' }
      const addedUser = { id: 1, ...newUser }
      
      global.testUtils.mockFetchResponse(addedUser)
      
      const result = await store.addUser(newUser)
      
      expect(result).toEqual(addedUser)
      expect(store.users).toContain(addedUser)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
    })

    it('should update user successfully', async () => {
      const store = useUserStore()
      const existingUser = { id: 1, username: 'oldname', email: 'old@example.com' }
      const updatedUser = { id: 1, username: 'newname', email: 'new@example.com' }
      store.users = [existingUser]
      
      global.testUtils.mockFetchResponse(updatedUser)
      
      const result = await store.updateUser(1, { username: 'newname', email: 'new@example.com' })
      
      expect(result).toEqual(updatedUser)
      expect(store.users[0]).toEqual(updatedUser)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'newname', email: 'new@example.com' })
      })
    })

    it('should update current user when updating own profile', async () => {
      const store = useUserStore()
      const user = { id: 1, username: 'oldname', email: 'old@example.com' }
      const updatedUser = { id: 1, username: 'newname', email: 'new@example.com' }
      store.users = [user]
      store.currentUser = user
      
      global.testUtils.mockFetchResponse(updatedUser)
      
      await store.updateUser(1, { username: 'newname', email: 'new@example.com' })
      
      expect(store.currentUser).toEqual(updatedUser)
    })

    it('should delete user successfully', async () => {
      const store = useUserStore()
      const users = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' }
      ]
      store.users = users
      
      global.testUtils.mockFetchResponse({})
      
      await store.deleteUser(1)
      
      expect(store.users).toEqual([{ id: 2, username: 'user2' }])
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/users/1', {
        method: 'DELETE'
      })
    })

    it('should logout when deleting current user', async () => {
      const store = useUserStore()
      const users = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' }
      ]
      store.users = users
      store.currentUser = users[0]
      
      global.testUtils.mockFetchResponse({})
      
      await store.deleteUser(1)
      
      expect(store.currentUser).toBe(null)
      expect(store.users).toEqual([{ id: 2, username: 'user2' }])
    })
  })
}) 