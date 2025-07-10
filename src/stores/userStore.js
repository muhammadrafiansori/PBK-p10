import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const currentUser = ref(null)
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isLoggedIn = computed(() => {
    return currentUser.value !== null
  })

  const isAdmin = computed(() => {
    return currentUser.value?.role === 'admin'
  })

  const getUserById = computed(() => {
    return (id) => users.value.find(user => user.id === id)
  })

  // Actions
  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch('http://localhost:3000/users')
      if (!response.ok) {
        throw new Error('Failed to fetch users')
      }
      users.value = await response.json()
    } catch (err) {
      error.value = err.message
      console.error('Error fetching users:', err)
    } finally {
      loading.value = false
    }
  }

  const login = async (username, email) => {
    loading.value = true
    error.value = null
    try {
      const user = users.value.find(u => 
        u.username === username && u.email === email
      )
      
      if (user) {
        currentUser.value = user
        return user
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (err) {
      error.value = err.message
      console.error('Error logging in:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const logout = () => {
    currentUser.value = null
    error.value = null
  }

  const addUser = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      })
      if (!response.ok) {
        throw new Error('Failed to add user')
      }
      const newUser = await response.json()
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err.message
      console.error('Error adding user:', err)
      throw err
    }
  }

  const updateUser = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates)
      })
      if (!response.ok) {
        throw new Error('Failed to update user')
      }
      const updatedUser = await response.json()
      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      if (currentUser.value?.id === id) {
        currentUser.value = updatedUser
      }
      return updatedUser
    } catch (err) {
      error.value = err.message
      console.error('Error updating user:', err)
      throw err
    }
  }

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) {
        throw new Error('Failed to delete user')
      }
      users.value = users.value.filter(user => user.id !== id)
      if (currentUser.value?.id === id) {
        logout()
      }
    } catch (err) {
      error.value = err.message
      console.error('Error deleting user:', err)
      throw err
    }
  }

  return {
    // State
    currentUser,
    users,
    loading,
    error,
    
    // Getters
    isLoggedIn,
    isAdmin,
    getUserById,
    
    // Actions
    fetchUsers,
    login,
    logout,
    addUser,
    updateUser,
    deleteUser
  }
}) 