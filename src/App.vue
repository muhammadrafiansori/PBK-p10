<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/" class="nav-item">Beranda</router-link>
      <router-link to="/films" class="nav-item">Film</router-link>
      <router-link to="/about" class="nav-item">Tentang</router-link>
    </nav>
    <main>
      <router-view /> </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
/* Global Styles */
html, body {
  margin: 0;
  padding: 0;
  height: 100%; /* Penting: Pastikan html dan body mengisi 100% tinggi viewport */
  overflow: hidden; /* Penting: Sembunyikan scrollbar di body secara default */
}

body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f4;
  color: #333;
  display: flex;
  flex-direction: column; /* Untuk menumpuk nav dan main */
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  flex-grow: 1; /* Biarkan #app mengambil sisa ruang yang tersedia */
  display: flex;
  flex-direction: column;
}

.main-nav {
  background-color: #333;
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  flex-shrink: 0; /* Pastikan navbar tidak menyusut */
}

.nav-item {
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  margin: 0 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: #007bff;
}

main {
  flex-grow: 1; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding: 0; 
  overflow-y: auto; 
}

.button {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}
</style>