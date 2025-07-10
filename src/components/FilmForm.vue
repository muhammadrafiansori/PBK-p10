<template>
  <div class="film-form">
    <h2>{{ isEditing ? 'Edit Film' : 'Tambah Film Baru' }}</h2>
    
    <form @submit.prevent="handleSubmit" class="form">
      <div class="form-group">
        <label for="title">Judul Film *</label>
        <input 
          type="text" 
          id="title" 
          v-model="formData.title" 
          required
          class="form-control"
          placeholder="Masukkan judul film"
        >
      </div>

      <div class="form-group">
        <label for="year">Tahun *</label>
        <input 
          type="number" 
          id="year" 
          v-model="formData.year" 
          required
          min="1900"
          max="2030"
          class="form-control"
          placeholder="2023"
        >
      </div>

      <div class="form-group">
        <label for="director">Sutradara *</label>
        <input 
          type="text" 
          id="director" 
          v-model="formData.director" 
          required
          class="form-control"
          placeholder="Masukkan nama sutradara"
        >
      </div>

      <div class="form-group">
        <label for="genre">Genre *</label>
        <select 
          id="genre" 
          v-model="formData.genre" 
          required
          class="form-control"
        >
          <option value="">Pilih genre</option>
          <option value="Action">Action</option>
          <option value="Adventure">Adventure</option>
          <option value="Comedy">Comedy</option>
          <option value="Crime">Crime</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Romance">Romance</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Thriller">Thriller</option>
        </select>
      </div>

      <div class="form-group">
        <label for="rating">Rating (1-10) *</label>
        <input 
          type="number" 
          id="rating" 
          v-model="formData.rating" 
          required
          min="1"
          max="10"
          step="0.1"
          class="form-control"
          placeholder="8.5"
        >
      </div>

      <div class="form-group">
        <label for="description">Deskripsi</label>
        <textarea 
          id="description" 
          v-model="formData.description" 
          rows="4"
          class="form-control"
          placeholder="Masukkan deskripsi film"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="poster">URL Poster</label>
        <input 
          type="url" 
          id="poster" 
          v-model="formData.poster" 
          class="form-control"
          placeholder="https://example.com/poster.jpg"
        >
      </div>

      <div class="form-actions">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="btn btn-secondary"
        >
          Batal
        </button>
        <button 
          type="submit" 
          :disabled="loading"
          class="btn btn-primary"
        >
          {{ loading ? 'Menyimpan...' : (isEditing ? 'Update Film' : 'Tambah Film') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue'
import { useFilmStore } from '../stores/filmStore'

export default {
  name: 'FilmForm',
  props: {
    film: {
      type: Object,
      default: null
    }
  },
  emits: ['cancel', 'saved'],
  setup(props, { emit }) {
    const filmStore = useFilmStore()
    const loading = ref(false)
    
    const formData = reactive({
      title: '',
      year: new Date().getFullYear(),
      director: '',
      genre: '',
      rating: 8.0,
      description: '',
      poster: ''
    })

    const isEditing = ref(false)

    onMounted(() => {
      if (props.film) {
        isEditing.value = true
        Object.assign(formData, props.film)
      }
    })

    const handleSubmit = async () => {
      loading.value = true
      try {
        if (isEditing.value) {
          await filmStore.updateFilm(props.film.id, formData)
        } else {
          await filmStore.addFilm(formData)
        }
        emit('saved')
      } catch (error) {
        console.error('Error saving film:', error)
      } finally {
        loading.value = false
      }
    }

    return {
      formData,
      loading,
      isEditing,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.film-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h2 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

label {
  font-weight: 600;
  color: #2c3e50;
  font-size: 0.9em;
}

.form-control {
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-control:invalid {
  border-color: #dc3545;
}

textarea.form-control {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .film-form {
    margin: 10px;
    padding: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style> 