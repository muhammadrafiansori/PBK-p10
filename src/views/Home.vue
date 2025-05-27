<template>
  <div class="container welcome-page">
    <h1>Selamat Datang di Aplikasi Film</h1>
    <p>Temukan informasi detail tentang berbagai film populer favorit Anda.</p>
    <router-link to="/films" class="button primary-button">Lihat Daftar Film</router-link>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style scoped>
.welcome-page {
  text-align: center;
  padding: 50px 20px; /* Padding di dalam kontainer */
}
h1 {
  color: #2c3e50;
  font-size: 3em;
  margin-bottom: 20px;
}
p {
  color: #666;
  font-size: 1.2em;
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 600px;
}
.button {
  padding: 12px 25px;
  font-size: 1.1em;
  font-weight: bold;
  text-decoration: none; /* Penting untuk router-link */
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.primary-button {
  background-color: #007bff;
  color: white;
}
.primary-button:hover {
  background-color: #0056b3;
}
</style>