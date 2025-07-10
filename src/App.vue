<template>
  <div id="app">
    <nav class="main-nav">
      <div class="nav-logo">
        <span class="logo-icon">🎬</span>
        <span class="logo-text">PBK Movie</span>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-item">Beranda</router-link>
        <router-link to="/films" class="nav-item">Film</router-link>
        <router-link to="/about" class="nav-item">Tentang</router-link>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
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
  height: 100%;
  background: #f8fbff;
}
body {
  font-family: 'Segoe UI', Arial, sans-serif;
  color: #222;
  display: flex;
  flex-direction: column;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.main-nav {
  background: #fff;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.08);
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 62px;
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 900;
  font-size: 1.18em;
  color: #1976d2;
  letter-spacing: 1px;
}
.logo-icon {
  font-size: 1.5em;
}
.logo-text {
  font-weight: 900;
  color: #1976d2;
}
.nav-links {
  display: flex;
  gap: 8px;
}
.nav-item {
  color: #1976d2;
  background: none;
  text-decoration: none;
  padding: 10px 18px;
  margin: 0 2px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.08em;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s;
  position: relative;
  letter-spacing: 0.5px;
}
.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  background: #1976d2;
  color: #fff;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.10);
  transform: translateY(-2px) scale(1.04);
}
.nav-item:hover {
  background: #e3f0ff;
  color: #1976d2;
}
main {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  overflow-y: auto;
}
@media (max-width: 700px) {
  .main-nav {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 8px;
    min-height: 54px;
  }
  .nav-logo {
    font-size: 1em;
    padding: 8px 0 0 0;
  }
  .nav-links {
    width: 100%;
    justify-content: flex-start;
    gap: 2px;
    padding-bottom: 8px;
  }
  .nav-item {
    font-size: 1em;
    padding: 8px 10px;
  }
}
</style>