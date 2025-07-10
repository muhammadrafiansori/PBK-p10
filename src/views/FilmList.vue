<template>
  <div class="film-list-container">
    <h1 class="page-title">Daftar Film</h1>
    <div v-if="loading" class="loading">Memuat data film...</div>
    <div v-else-if="error" class="error-message">{{ error }}</div>
    <div v-else>
      <div v-if="films.length === 0" class="empty-state">
        <span class="empty-icon">🎬</span>
        <p>Belum ada film yang tersedia.</p>
        <router-link to="/films/add" class="button add-button">+ Tambah Film</router-link>
      </div>
      <div v-else class="film-grid">
        <div v-for="film in films" :key="film.id" class="film-card">
          <div class="poster-wrapper">
            <img :src="film.poster || 'https://via.placeholder.com/300x450/cccccc/222222?text=No+Image'" :alt="film.title" class="film-poster" />
          </div>
          <div class="film-info">
            <h2 class="film-title">{{ film.title }}</h2>
            <div class="film-meta">
              <span class="film-year">{{ film.year }}</span>
              <span class="film-genre">{{ film.genre }}</span>
            </div>
            <div class="film-rating">⭐ {{ film.rating }}/10</div>
            <router-link :to="`/films/${film.id}`" class="button detail-button">Detail</router-link>
          </div>
        </div>
      </div>
      <div class="add-film-fab">
        <router-link to="/films/add" class="fab">+</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useFilmStore } from '../stores/filmStore'
import { storeToRefs } from 'pinia'

const filmStore = useFilmStore()
const { films, loading, error } = storeToRefs(filmStore)

onMounted(() => {
  filmStore.fetchFilms()
})
</script>

<style scoped>
.film-list-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #e3f0ff 0%, #f8fbff 100%);
  padding: 40px 0 60px 0;
}
.page-title {
  text-align: center;
  color: #1976d2;
  font-size: 2.2em;
  font-weight: 800;
  margin-bottom: 32px;
  letter-spacing: 1px;
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
.film-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 32px;
  padding: 0 32px;
  max-width: 1200px;
  margin: 0 auto;
}
.film-card {
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(25, 118, 210, 0.10), 0 1.5px 6px rgba(0,0,0,0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.18s, box-shadow 0.18s;
  position: relative;
}
.film-card:hover {
  transform: translateY(-6px) scale(1.025);
  box-shadow: 0 8px 32px rgba(25, 118, 210, 0.16), 0 2px 8px rgba(0,0,0,0.06);
}
.poster-wrapper {
  width: 100%;
  aspect-ratio: 2/3;
  background: #e3f0ff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.film-poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom: 1px solid #e3f0ff;
}
.film-info {
  padding: 18px 16px 20px 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
.film-title {
  color: #1a237e;
  font-size: 1.18em;
  font-weight: 700;
  margin: 0 0 2px 0;
}
.film-meta {
  color: #1976d2;
  font-size: 0.98em;
  display: flex;
  gap: 12px;
  margin-bottom: 2px;
}
.film-rating {
  color: #ff9800;
  font-weight: 700;
  font-size: 1em;
  margin-bottom: 8px;
}
.button.detail-button {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 8px 20px;
  font-size: 1em;
  font-weight: 700;
  margin-top: 8px;
  text-decoration: none;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 1.5px 6px rgba(25, 118, 210, 0.08);
}
.button.detail-button:hover {
  background: #1565c0;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
.add-film-fab {
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: 10;
}
.fab {
  background: #1976d2;
  color: #fff;
  font-size: 2.1em;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 18px rgba(25, 118, 210, 0.18);
  text-decoration: none;
  transition: background 0.18s, transform 0.18s;
}
.fab:hover {
  background: #1565c0;
  transform: scale(1.08);
}
.empty-state {
  text-align: center;
  margin-top: 80px;
  color: #1976d2;
}
.empty-icon {
  font-size: 3em;
  display: block;
  margin-bottom: 12px;
}
.button.add-button {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 10px 28px;
  font-size: 1.1em;
  font-weight: 700;
  margin-top: 18px;
  text-decoration: none;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  box-shadow: 0 1.5px 6px rgba(25, 118, 210, 0.08);
}
.button.add-button:hover {
  background: #1565c0;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
}
@media (max-width: 700px) {
  .film-grid {
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    padding: 0 8px;
  }
  .add-film-fab {
    right: 16px;
    bottom: 16px;
  }
}
@media (max-width: 480px) {
  .film-grid {
    grid-template-columns: 1fr;
    gap: 12px;
    padding: 0 2px;
  }
}
</style>