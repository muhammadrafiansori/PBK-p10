<template>
  <div class="container">
    <div class="header-section">
      <h1>Daftar Film Populer</h1>
    </div>

    <ul class="film-list">
      <li v-for="film in films" :key="film.id" class="film-item">
        <h3 class="film-title">{{ film.title }} ({{ film.year }})</h3>
        <router-link :to="`/films/${film.id}`" class="button detail-button">Lihat Detail</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'FilmList',
  data() {
    return {
      films: [
        { id: 1, title: 'Inception', year: 2010, description: 'Seorang pencuri yang masuk ke mimpi orang lain untuk mencuri rahasia.' },
        { id: 2, title: 'The Matrix', year: 1999, description: 'Seorang programmer komputer menemukan bahwa realitas hanyalah simulasi.' },
        { id: 3, title: 'Interstellar', year: 2014, description: 'Sekelompok penjelajah melakukan perjalanan melalui lubang cacing untuk mencari rumah baru bagi umat manusia.' },
        { id: 4, title: 'Pulp Fiction', year: 1994, description: 'Beberapa kisah kriminal yang saling terkait di Los Angeles.' }
      ],
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 900px; /* Batasi lebar container */
  margin: 20px auto; /* Tengahkan container */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}
h1 {
  color: #2c3e50;
  font-size: 2.2em;
  margin: 0;
  text-align: center; /* Tengahkan judul di dalam header */
  flex-grow: 1;
}

/* Styling untuk tombol */
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.95em;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.button:hover {
  transform: translateY(-2px);
}
.detail-button {
  background-color: #28a745; /* Hijau */
  color: white;
}
.detail-button:hover {
  background-color: #218838;
}

/* Daftar film */
.film-list {
  list-style: none;
  padding: 0;
  margin-top: 30px;
}
.film-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fcfcfc;
  border: 1px solid #e0e0e0;
  padding: 20px 25px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.film-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}
.film-title {
  margin: 0;
  color: #007bff;
  font-size: 1.4em;
  font-weight: 700;
}

/* Responsif dasar */
@media (max-width: 768px) {
  .film-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }
  .film-title {
    margin-bottom: 10px;
  }
  .button {
    width: 100%; /* Tombol detail mengisi lebar penuh di mobile */
    text-align: center;
  }
}
</style>