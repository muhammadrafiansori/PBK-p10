<template>
  <div class="film-detail-container">
    <div v-if="loading" class="loading">Memuat detail film...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else-if="film" class="film-detail-card">
      <div class="film-detail-header">
        <div class="poster-wrapper">
          <img :src="film.poster || 'https://via.placeholder.com/300x450/cccccc/222222?text=No+Image'" :alt="film.title" class="film-poster" />
        </div>
        <div class="film-detail-info">
          <h1 class="film-title">{{ film.title }} <span class="film-year">({{ film.year }})</span></h1>
          <div class="film-meta">
            <span class="film-genre">{{ film.genre }}</span>
            <span class="film-rating">⭐ {{ film.rating }}/10</span>
          </div>
          <div class="film-director"><b>Sutradara:</b> {{ film.director }}</div>
          <div class="film-description">{{ film.description }}</div>
          <div class="film-actions">
            <button @click="toggleFavorite(film.id)" class="button favorite-button" :class="{ 'favorited': isFavorite(film.id) }">
              {{ isFavorite(film.id) ? '❤️ Favorit' : '🤍 Favorit' }}
            </button>
            <router-link :to="`/films/${film.id}/edit`" class="button edit-button">✏️ Edit</router-link>
            <button @click="confirmDelete" class="button delete-button">🗑️ Hapus</button>
          </div>
        </div>
      </div>
      <div class="navigation-actions">
        <router-link to="/films" class="button back-button">← Kembali ke Daftar Film</router-link>
      </div>
    </div>
    <div v-else class="not-found">
      <span class="not-found-icon">🎬</span>
      <p>Film tidak ditemukan.</p>
      <router-link to="/films" class="button back-button">Kembali ke Daftar Film</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFilmStore } from '../stores/filmStore'

const route = useRoute()
const router = useRouter()
const filmStore = useFilmStore()

const filmId = ref(parseInt(route.params.id))
const film = ref(null)
const loading = ref(true)
const error = ref(null)

const loadFilm = async (id) => {
  loading.value = true
  error.value = null
  try {
    await filmStore.fetchFilms()
    film.value = filmStore.getFilmById(id)
    if (!film.value) {
      error.value = 'Film tidak ditemukan'
    }
  } catch (err) {
    error.value = 'Gagal memuat data film'
    console.error('Error loading film:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadFilm(filmId.value)
})

watch(
  () => route.params.id,
  (newId) => {
    filmId.value = parseInt(newId)
    loadFilm(filmId.value)
  }
)

const toggleFavorite = (id) => {
  filmStore.toggleFavorite(id)
}
const isFavorite = (id) => {
  return filmStore.isFavorite(id)
}
const confirmDelete = () => {
  if (confirm('Apakah Anda yakin ingin menghapus film ini?')) {
    deleteFilm()
  }
}
const deleteFilm = async () => {
  try {
    await filmStore.deleteFilm(filmId.value)
    router.push('/films')
  } catch (err) {
    console.error('Error deleting film:', err)
    alert('Gagal menghapus film')
  }
}
</script>

<style scoped>
.film-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f0ff 0%, #f8fbff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0 60px 0;
}
.loading {
  text-align: center;
  color: #1976d2;
  font-size: 1.1em;
  margin-top: 60px;
}
.error-message {
  background: #f8d7da;
  color: #721c24;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  margin: 40px auto;
  max-width: 400px;
  font-weight: 600;
}
.film-detail-card {
  background: #fff;
  border-radius: 22px;
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.10), 0 1.5px 6px rgba(0,0,0,0.04);
  padding: 36px 32px 32px 32px;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.film-detail-header {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.poster-wrapper {
  width: 220px;
  min-width: 120px;
  aspect-ratio: 2/3;
  background: #e3f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
}
.film-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.film-detail-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.film-title {
  color: #1a237e;
  font-size: 2em;
  font-weight: 800;
  margin: 0 0 8px 0;
}
.film-year {
  color: #1976d2;
  font-size: 0.9em;
  font-weight: 700;
}
.film-meta {
  color: #1976d2;
  font-size: 1.08em;
  display: flex;
  gap: 18px;
  margin-bottom: 2px;
  font-weight: 600;
}
.film-rating {
  color: #ff9800;
  font-weight: 700;
  font-size: 1em;
}
.film-director {
  color: #1976d2;
  font-size: 1em;
  margin-bottom: 4px;
}
.film-description {
  color: #555;
  font-size: 1.08em;
  line-height: 1.7;
  margin: 0 0 8px 0;
}
.film-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}
.button {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 8px 20px;
  font-size: 1em;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 1.5px 6px rgba(25, 118, 210, 0.08);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.button:hover {
  background: #1565c0;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
.favorite-button.favorited {
  background: #fff;
  color: #1976d2;
  border: 2px solid #1976d2;
}
.edit-button {
  background: #fff;
  color: #1976d2;
  border: 2px solid #1976d2;
}
.edit-button:hover {
  background: #e3f0ff;
}
.delete-button {
  background: #fff;
  color: #d32f2f;
  border: 2px solid #d32f2f;
}
.delete-button:hover {
  background: #ffebee;
}
.navigation-actions {
  text-align: center;
  margin-top: 18px;
}
.back-button {
  background: #1976d2;
  color: #fff;
  border-radius: 7px;
  padding: 10px 28px;
  font-size: 1.1em;
  font-weight: 700;
  text-decoration: none;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 1.5px 6px rgba(25, 118, 210, 0.08);
}
.back-button:hover {
  background: #1565c0;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
.not-found {
  text-align: center;
  margin-top: 80px;
  color: #1976d2;
}
.not-found-icon {
  font-size: 3em;
  display: block;
  margin-bottom: 12px;
}
@media (max-width: 900px) {
  .film-detail-card {
    padding: 18px 4px 18px 4px;
  }
  .film-detail-header {
    flex-direction: column;
    align-items: center;
    gap: 18px;
  }
  .poster-wrapper {
    width: 180px;
  }
  .film-title {
    font-size: 1.3em;
  }
}
</style>