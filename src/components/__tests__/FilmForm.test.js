import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import FilmForm from '../FilmForm.vue'

// Mock the film store
vi.mock('../../stores/filmStore', () => ({
  useFilmStore: () => ({
    addFilm: vi.fn(),
    updateFilm: vi.fn()
  })
}))

describe('FilmForm', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders add film form correctly', () => {
    const wrapper = mount(FilmForm)
    
    expect(wrapper.find('h2').text()).toBe('Tambah Film Baru')
    expect(wrapper.find('input[name="title"]').exists()).toBe(true)
    expect(wrapper.find('input[name="year"]').exists()).toBe(true)
    expect(wrapper.find('input[name="director"]').exists()).toBe(true)
    expect(wrapper.find('select[name="genre"]').exists()).toBe(true)
    expect(wrapper.find('input[name="rating"]').exists()).toBe(true)
    expect(wrapper.find('textarea[name="description"]').exists()).toBe(true)
    expect(wrapper.find('input[name="poster"]').exists()).toBe(true)
  })

  it('renders edit film form when film prop is provided', () => {
    const mockFilm = {
      id: 1,
      title: 'Test Film',
      year: 2023,
      director: 'Test Director',
      genre: 'Action',
      rating: 8.5,
      description: 'Test description',
      poster: 'test-poster.jpg'
    }
    
    const wrapper = mount(FilmForm, {
      props: {
        film: mockFilm
      }
    })
    
    expect(wrapper.find('h2').text()).toBe('Edit Film')
    expect(wrapper.find('input[name="title"]').element.value).toBe('Test Film')
    expect(wrapper.find('input[name="year"]').element.value).toBe('2023')
    expect(wrapper.find('input[name="director"]').element.value).toBe('Test Director')
  })

  it('emits saved event when form is submitted for new film', async () => {
    const wrapper = mount(FilmForm)
    
    // Fill form
    await wrapper.find('input[name="title"]').setValue('New Film')
    await wrapper.find('input[name="year"]').setValue('2024')
    await wrapper.find('input[name="director"]').setValue('New Director')
    await wrapper.find('select[name="genre"]').setValue('Action')
    await wrapper.find('input[name="rating"]').setValue('9.0')
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.emitted('saved')).toBeTruthy()
  })

  it('emits saved event when form is submitted for edit film', async () => {
    const mockFilm = {
      id: 1,
      title: 'Original Film',
      year: 2023,
      director: 'Original Director',
      genre: 'Action',
      rating: 8.0,
      description: 'Original description',
      poster: 'original-poster.jpg'
    }
    
    const wrapper = mount(FilmForm, {
      props: {
        film: mockFilm
      }
    })
    
    // Update form
    await wrapper.find('input[name="title"]').setValue('Updated Film')
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent')
    
    expect(wrapper.emitted('saved')).toBeTruthy()
  })

  it('emits cancel event when cancel button is clicked', async () => {
    const wrapper = mount(FilmForm)
    
    await wrapper.find('.btn-secondary').trigger('click')
    
    expect(wrapper.emitted('cancel')).toBeTruthy()
  })

  it('validates required fields', async () => {
    const wrapper = mount(FilmForm)
    
    // Try to submit empty form
    await wrapper.find('form').trigger('submit.prevent')
    
    // Form should not submit and no event should be emitted
    expect(wrapper.emitted('saved')).toBeFalsy()
  })

  it('shows loading state during submission', async () => {
    const wrapper = mount(FilmForm)
    
    // Fill form
    await wrapper.find('input[name="title"]').setValue('Test Film')
    await wrapper.find('input[name="year"]').setValue('2024')
    await wrapper.find('input[name="director"]').setValue('Test Director')
    await wrapper.find('select[name="genre"]').setValue('Action')
    await wrapper.find('input[name="rating"]').setValue('8.0')
    
    // Submit form
    await wrapper.find('form').trigger('submit.prevent')
    
    // Button should show loading state
    const submitButton = wrapper.find('.btn-primary')
    expect(submitButton.text()).toContain('Menyimpan...')
    expect(submitButton.attributes('disabled')).toBeDefined()
  })

  it('has correct form structure', () => {
    const wrapper = mount(FilmForm)
    
    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)
    
    const inputs = wrapper.findAll('input')
    expect(inputs).toHaveLength(5) // title, year, director, rating, poster
    
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    
    const textarea = wrapper.find('textarea')
    expect(textarea.exists()).toBe(true)
  })

  it('has proper labels for all fields', () => {
    const wrapper = mount(FilmForm)
    
    expect(wrapper.find('label[for="title"]').text()).toContain('Judul Film')
    expect(wrapper.find('label[for="year"]').text()).toContain('Tahun')
    expect(wrapper.find('label[for="director"]').text()).toContain('Sutradara')
    expect(wrapper.find('label[for="genre"]').text()).toContain('Genre')
    expect(wrapper.find('label[for="rating"]').text()).toContain('Rating')
    expect(wrapper.find('label[for="description"]').text()).toContain('Deskripsi')
    expect(wrapper.find('label[for="poster"]').text()).toContain('URL Poster')
  })
}) 