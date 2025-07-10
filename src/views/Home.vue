<template>
  <div class="home-bg">
    <div class="welcome-card">
      <div class="icon-wrapper">
        <svg class="main-icon" viewBox="0 0 48 48" width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="#e3f0ff"/>
          <rect x="10" y="22" width="28" height="14" rx="3" fill="#1976d2"/>
          <rect x="10" y="14" width="28" height="8" rx="2" fill="#90caf9"/>
          <rect x="12" y="16" width="6" height="4" rx="1" fill="#1976d2"/>
          <rect x="20" y="16" width="6" height="4" rx="1" fill="#1976d2"/>
          <rect x="28" y="16" width="6" height="4" rx="1" fill="#1976d2"/>
        </svg>
      </div>
      <h1>Selamat Datang di <span class="brand">Poys Movie</span></h1>
      <p class="subtitle">Temukan, simpan, dan kelola film favoritmu dengan mudah dan cepat!</p>
      <router-link to="/films" class="button explore-button">
        <span class="icon">🍿</span> Jelajahi Daftar Film
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home-bg {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%, #e3f0ff 0%, #f8fbff 60%, #f4f7fa 100%);
}
.welcome-card {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 8px 40px rgba(25, 118, 210, 0.13), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 56px 48px 48px 48px;
  max-width: 520px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-wrapper {
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-icon {
  width: 64px;
  height: 64px;
  display: block;
}
h1 {
  color: #1a237e;
  font-size: 2.3em;
  font-weight: 900;
  margin: 0 0 18px 0;
  letter-spacing: 0.5px;
  line-height: 1.18;
}
.brand {
  color: #1976d2;
  font-weight: 900;
  letter-spacing: 1px;
}
.subtitle {
  color: #1976d2;
  font-size: 1.18em;
  margin-bottom: 38px;
  font-weight: 600;
}
.button.explore-button {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 16px 38px;
  font-size: 1.18em;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.10);
  transition: background 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s;
  text-decoration: none;
  margin-top: 8px;
}
.button.explore-button .icon {
  font-size: 1.3em;
}
.button.explore-button:hover {
  background: #1565c0;
  color: #fff;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 6px 24px rgba(25, 118, 210, 0.16);
}
@media (max-width: 700px) {
  .welcome-card {
    padding: 28px 8px 28px 8px;
    max-width: 98vw;
  }
  h1 {
    font-size: 1.2em;
  }
  .subtitle {
    font-size: 1em;
  }
}
</style>