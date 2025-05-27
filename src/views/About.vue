<template>
  <div class="container about-page">
    <h1>Tentang Aplikasi Ini</h1>
    <p>Aplikasi ini adalah contoh sederhana sistem informasi film statis yang dibuat menggunakan Vue.js dan Vue Router.</p>
    <p>Tujuannya adalah untuk mendemonstrasikan analisis studi kasus dan penerapan routing dalam proyek Vue.js dengan data yang di-hardcode.</p>
    <p>Dibuat sebagai bagian dari tugas Anda.</p>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
h1 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}
p {
  line-height: 1.8;
  color: #555;
  margin-bottom: 10px;
  text-align: justify;
}
</style>