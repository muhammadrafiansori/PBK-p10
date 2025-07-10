import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Fallback data jika API tidak tersedia
const fallbackFilms = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    year: 1994,
    director: 'Frank Darabont',
    genre: 'Drama',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://via.placeholder.com/300x450/0066cc/ffffff?text=Shawshank'
  },
  {
    id: 2,
    title: 'The Godfather',
    year: 1972,
    director: 'Francis Ford Coppola',
    genre: 'Crime',
    rating: 9.2,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://via.placeholder.com/300x450/8b0000/ffffff?text=Godfather'
  },
  {
    id: 3,
    title: 'Pulp Fiction',
    year: 1994,
    director: 'Quentin Tarantino',
    genre: 'Crime',
    rating: 8.9,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster: 'https://via.placeholder.com/300x450/ff8c00/ffffff?text=Pulp+Fiction'
  }
]

export const useFilmStore = defineStore('film', () => {
  // State
  const films = ref([])
  const loading = ref(false)
  const error = ref(null)
  const favorites = ref([])
  const isOffline = ref(false)

  // Getters
  const getFilmById = computed(() => {
    return (id) => films.value.find(film => film.id == id)
  })

  const getFavoriteFilms = computed(() => {
    return films.value.filter(film => favorites.value.includes(film.id))
  })

  const getFilmsByGenre = computed(() => {
    return (genre) => films.value.filter(film => film.genre === genre)
  })

  const getTopRatedFilms = computed(() => {
    return films.value
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 5)
  })

  // Actions
  const fetchFilms = async () => {
    loading.value = true
    error.value = null
    isOffline.value = false
    
    try {
      const response = await fetch('http://localhost:3000/films', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(5000)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      films.value = data
      isOffline.value = false
      
    } catch (err) {
      console.error('Error fetching films:', err)
      
      // Check if it's a network error or server not running
      if (err.name === 'AbortError' || err.message.includes('fetch')) {
        error.value = 'Server tidak tersedia. Menggunakan data offline.'
        isOffline.value = true
        // Use fallback data
        films.value = [...fallbackFilms]
      } else {
        error.value = `Gagal memuat data: ${err.message}`
        // Still use fallback data
        films.value = [...fallbackFilms]
      }
    } finally {
      loading.value = false
    }
  }

  const addFilm = async (film) => {
    if (isOffline.value) {
      // Add to local data if offline
      const newFilm = {
        ...film,
        id: Math.max(...films.value.map(f => f.id), 0) + 1
      }
      films.value.push(newFilm)
      return newFilm
    }

    try {
      const response = await fetch('http://localhost:3000/films', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(film),
        signal: AbortSignal.timeout(5000)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const newFilm = await response.json()
      films.value.push(newFilm)
      return newFilm
    } catch (err) {
      error.value = `Gagal menambah film: ${err.message}`
      console.error('Error adding film:', err)
      throw err
    }
  }

  const updateFilm = async (id, updates) => {
    if (isOffline.value) {
      // Update local data if offline
      const index = films.value.findIndex(film => film.id === id)
      if (index !== -1) {
        films.value[index] = { ...films.value[index], ...updates }
        return films.value[index]
      }
      throw new Error('Film tidak ditemukan')
    }

    try {
      const response = await fetch(`http://localhost:3000/films/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(5000)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const updatedFilm = await response.json()
      const index = films.value.findIndex(film => film.id === id)
      if (index !== -1) {
        films.value[index] = updatedFilm
      }
      return updatedFilm
    } catch (err) {
      error.value = `Gagal mengupdate film: ${err.message}`
      console.error('Error updating film:', err)
      throw err
    }
  }

  const deleteFilm = async (id) => {
    if (isOffline.value) {
      // Delete from local data if offline
      films.value = films.value.filter(film => film.id !== id)
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/films/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(5000)
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      films.value = films.value.filter(film => film.id !== id)
    } catch (err) {
      error.value = `Gagal menghapus film: ${err.message}`
      console.error('Error deleting film:', err)
      throw err
    }
  }

  const toggleFavorite = (filmId) => {
    const index = favorites.value.indexOf(filmId)
    if (index === -1) {
      favorites.value.push(filmId)
    } else {
      favorites.value.splice(index, 1)
    }
  }

  const isFavorite = (filmId) => {
    return favorites.value.includes(filmId)
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    films,
    loading,
    error,
    favorites,
    isOffline,
    
    // Getters
    getFilmById,
    getFavoriteFilms,
    getFilmsByGenre,
    getTopRatedFilms,
    
    // Actions
    fetchFilms,
    addFilm,
    updateFilm,
    deleteFilm,
    toggleFavorite,
    isFavorite,
    clearError
  }
}) 