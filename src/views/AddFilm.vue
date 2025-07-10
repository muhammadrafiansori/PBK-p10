<template>
  <div class="add-film-page">
    <div class="container">
      <div class="header">
        <h1>Tambah Film Baru</h1>
        <router-link to="/films" class="btn btn-secondary">
          ← Kembali ke Daftar Film
        </router-link>
      </div>

      <FilmForm 
        @saved="handleSaved"
        @cancel="handleCancel"
      />
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import FilmForm from '../components/FilmForm.vue'

export default {
  name: 'AddFilm',
  components: {
    FilmForm
  },
  setup() {
    const router = useRouter()

    const handleSaved = () => {
      router.push('/films')
    }

    const handleCancel = () => {
      router.push('/films')
    }

    return {
      handleSaved,
      handleCancel
    }
  }
}
</script>

<style scoped>
.add-film-page {
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