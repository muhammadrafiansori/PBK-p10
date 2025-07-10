import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFilmStore } from '../filmStore'

describe('Film Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('State', () => {
    it('should have initial state', () => {
      const store = useFilmStore()
      
      expect(store.films).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
      expect(store.favorites).toEqual([])
    })
  })

  describe('Getters', () => {
    it('should get film by id', () => {
      const store = useFilmStore()
      const mockFilm = { id: 1, title: 'Test Film' }
      store.films = [mockFilm]
      
      const result = store.getFilmById(1)
      expect(result).toEqual(mockFilm)
    })

    it('should return null for non-existent film', () => {
      const store = useFilmStore()
      store.films = [{ id: 1, title: 'Test Film' }]
      
      const result = store.getFilmById(999)
      expect(result).toBeUndefined()
    })

    it('should get favorite films', () => {
      const store = useFilmStore()
      const films = [
        { id: 1, title: 'Film 1' },
        { id: 2, title: 'Film 2' },
        { id: 3, title: 'Film 3' }
      ]
      store.films = films
      store.favorites = [1, 3]
      
      const result = store.getFavoriteFilms
      expect(result).toEqual([
        { id: 1, title: 'Film 1' },
        { id: 3, title: 'Film 3' }
      ])
    })

    it('should get films by genre', () => {
      const store = useFilmStore()
      const films = [
        { id: 1, title: 'Action Film', genre: 'Action' },
        { id: 2, title: 'Drama Film', genre: 'Drama' },
        { id: 3, title: 'Action Film 2', genre: 'Action' }
      ]
      store.films = films
      
      const result = store.getFilmsByGenre('Action')
      expect(result).toEqual([
        { id: 1, title: 'Action Film', genre: 'Action' },
        { id: 3, title: 'Action Film 2', genre: 'Action' }
      ])
    })

    it('should get top rated films', () => {
      const store = useFilmStore()
      const films = [
        { id: 1, title: 'Film 1', rating: 8.0 },
        { id: 2, title: 'Film 2', rating: 9.5 },
        { id: 3, title: 'Film 3', rating: 7.5 },
        { id: 4, title: 'Film 4', rating: 9.0 },
        { id: 5, title: 'Film 5', rating: 8.5 },
        { id: 6, title: 'Film 6', rating: 7.0 }
      ]
      store.films = films
      
      const result = store.getTopRatedFilms
      expect(result).toHaveLength(5)
      expect(result[0].rating).toBe(9.5)
      expect(result[1].rating).toBe(9.0)
    })
  })

  describe('Actions', () => {
    it('should fetch films successfully', async () => {
      const store = useFilmStore()
      const mockFilms = [
        { id: 1, title: 'Film 1' },
        { id: 2, title: 'Film 2' }
      ]
      
      global.testUtils.mockFetchResponse(mockFilms)
      
      await store.fetchFilms()
      
      expect(store.films).toEqual(mockFilms)
      expect(store.loading).toBe(false)
      expect(store.error).toBe(null)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/films')
    })

    it('should handle fetch films error', async () => {
      const store = useFilmStore()
      const errorMessage = 'Failed to fetch films'
      
      global.testUtils.mockFetchError(new Error(errorMessage))
      
      await store.fetchFilms()
      
      expect(store.error).toBe(errorMessage)
      expect(store.loading).toBe(false)
      expect(store.films).toEqual([])
    })

    it('should add film successfully', async () => {
      const store = useFilmStore()
      const newFilm = { title: 'New Film', director: 'Director' }
      const addedFilm = { id: 1, ...newFilm }
      
      global.testUtils.mockFetchResponse(addedFilm)
      
      const result = await store.addFilm(newFilm)
      
      expect(result).toEqual(addedFilm)
      expect(store.films).toContain(addedFilm)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/films', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFilm)
      })
    })

    it('should update film successfully', async () => {
      const store = useFilmStore()
      const existingFilm = { id: 1, title: 'Old Title', director: 'Director' }
      const updatedFilm = { id: 1, title: 'New Title', director: 'Director' }
      store.films = [existingFilm]
      
      global.testUtils.mockFetchResponse(updatedFilm)
      
      const result = await store.updateFilm(1, { title: 'New Title' })
      
      expect(result).toEqual(updatedFilm)
      expect(store.films[0]).toEqual(updatedFilm)
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/films/1', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'New Title' })
      })
    })

    it('should delete film successfully', async () => {
      const store = useFilmStore()
      const films = [
        { id: 1, title: 'Film 1' },
        { id: 2, title: 'Film 2' }
      ]
      store.films = films
      
      global.testUtils.mockFetchResponse({})
      
      await store.deleteFilm(1)
      
      expect(store.films).toEqual([{ id: 2, title: 'Film 2' }])
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:3000/films/1', {
        method: 'DELETE'
      })
    })

    it('should toggle favorite', () => {
      const store = useFilmStore()
      
      // Add to favorites
      store.toggleFavorite(1)
      expect(store.favorites).toEqual([1])
      expect(store.isFavorite(1)).toBe(true)
      
      // Remove from favorites
      store.toggleFavorite(1)
      expect(store.favorites).toEqual([])
      expect(store.isFavorite(1)).toBe(false)
    })

    it('should check if film is favorite', () => {
      const store = useFilmStore()
      store.favorites = [1, 3]
      
      expect(store.isFavorite(1)).toBe(true)
      expect(store.isFavorite(2)).toBe(false)
      expect(store.isFavorite(3)).toBe(true)
    })
  })
}) 