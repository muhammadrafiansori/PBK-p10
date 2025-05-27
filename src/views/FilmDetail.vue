<template>
  <div class="container">
    <div v-if="film" class="film-detail-card">
      <h1>{{ film.title }} ({{ film.year }})</h1>
      <p class="description">{{ film.description }}</p>
      <router-link to="/films" class="button back-button">Kembali ke Daftar Film</router-link>
    </div>
    <div v-else class="not-found">
      <p>Film tidak ditemukan.</p>
      <router-link to="/films" class="button primary-button">Kembali ke Daftar Film</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilmDetail',
  props: ['id'], // Vue Router akan meneruskan parameter :id sebagai prop
  data() {
    return {
      film: null,
      filmsData: [ // Data film hardcoded
        { id: 1, title: 'Inception', year: 2010, description: 'Seorang pencuri yang masuk ke mimpi orang lain untuk mencuri rahasia, menggunakan teknologi canggih untuk memanipulasi alam bawah sadar. Film ini dikenal dengan alur cerita yang kompleks dan visual yang memukau.' },
        { id: 2, title: 'The Matrix', year: 1999, description: 'Seorang programmer komputer menemukan bahwa realitas hanyalah simulasi yang dikendalikan oleh mesin. Film ini mengubah genre sci-fi dengan filosofi mendalam dan efek visual revolusioner.' },
        { id: 3, title: 'Interstellar', year: 2014, description: 'Sekelompok penjelajah melakukan perjalanan melalui lubang cacing untuk mencari rumah baru bagi umat manusia setelah Bumi tidak lagi layak huni. Sebuah eksplorasi tentang waktu, gravitasi, dan cinta.' },
        { id: 4, title: 'Pulp Fiction', year: 1994, description: 'Beberapa kisah kriminal yang saling terkait di Los Angeles, disajikan dengan narasi non-linear yang ikonik. Film ini terkenal dengan dialognya yang tajam dan karakter-karakter yang unik.' }
      ]
    };
  },
  created() {
    this.fetchFilm();
  },
  methods: {
    fetchFilm() {
      // Cari film berdasarkan ID yang diterima dari props
      this.film = this.filmsData.find(f => f.id === parseInt(this.id));
    }
  },
  watch: {
    // Watch prop 'id' untuk update jika navigasi antar detail film
    id: 'fetchFilm'
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.film-detail-card {
  padding: 30px;
}
h1 {
  color: #007bff;
  font-size: 2.5em;
  margin-bottom: 20px;
}
.description {
  color: #555;
  font-size: 1.1em;
  line-height: 1.8;
  margin-bottom: 30px;
}
.button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 1em;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.back-button {
  background-color: #6c757d; /* Abu-abu */
  color: white;
}
.back-button:hover {
  background-color: #5a6268;
}
.primary-button { /* Untuk tombol di not-found */
  background-color: #007bff;
  color: white;
}
.primary-button:hover {
  background-color: #0056b3;
}
.not-found {
  padding: 50px;
  color: #dc3545;
}
</style>