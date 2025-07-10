<template>
  <div class="edit-film-page">
    <div class="container">
      <div class="header">
        <h1>Edit Film</h1>
        <router-link :to="`/films/${filmId}`" class="btn btn-secondary">
          ← Kembali ke Detail Film
        </router-link>
      </div>

      <div v-if="loading" class="loading">
        Loading film data...
      </div>

      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>

      <div v-else-if="!film" class="not-found">
        Film tidak ditemukan
      </div>

      <FilmForm 
        v-else
        :film="film"
        @saved="handleSaved"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFilmStore } from '../stores/filmStore'
import FilmForm from '../components/FilmForm.vue'

export default {
  name: 'EditFilm',
  components: {
    FilmForm
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const filmStore = useFilmStore()
    
    const filmId = parseInt(route.params.id)
    const film = ref(null)
    const loading = ref(true)
    const error = ref(null)

    onMounted(async () => {
      try {
        await filmStore.fetchFilms()
        film.value = filmStore.getFilmById(filmId)
        
        if (!film.value) {
          error.value = 'Film tidak ditemukan'
        }
      } catch (err) {
        error.value = 'Gagal memuat data film'
        console.error('Error loading film:', err)
      } finally {
        loading.value = false
      }
    })

    const handleSaved = () => {
      router.push(`/films/${filmId}`)
    }

    const handleCancel = () => {
      router.push(`/films/${filmId}`)
    }

    return {
      filmId,
      film,
      loading,
      error,
      handleSaved,
      handleCancel
    }
  }
}
</script>

<style scoped>
.edit-film-page {
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 20px 0;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

h1 {
  color: #2c3e50;
  margin: 0;
  font-size: 2em;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.95em;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.btn-secondary {
  background-color: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background-color: #545b62;
  transform: translateY(-2px);
}

.loading {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 1.1em;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 15px;
  border-radius: 6px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  text-align: center;
}

.not-found {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-size: 1.1em;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }
  
  h1 {
    font-size: 1.5em;
  }
}
</style> 