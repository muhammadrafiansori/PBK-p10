<template>
  <div class="container not-found-page">
    <h1>404 - Halaman Tidak Ditemukan</h1>
    <p>Maaf, halaman yang Anda cari tidak ada.</p>
    <router-link to="/" class="button primary-button">Kembali ke Beranda</router-link>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style scoped>
.not-found-page {
  text-align: center;
  padding: 50px;
  color: #dc3545;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 50px auto;
}
h1 {
  font-size: 2.5em;
  margin-bottom: 20px;
  color: #dc3545;
}
p {
  font-size: 1.2em;
  margin-bottom: 30px;
  color: #555;
}
.button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.button:hover {
  background-color: #0056b3;
}
.primary-button {
  background-color: #007bff;
  color: white;
}
</style>