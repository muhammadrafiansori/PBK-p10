<template>
  <div class="about-bg">
    <div class="about-card">
      <div class="icon-wrapper">
        <svg class="main-icon" viewBox="0 0 48 48" width="56" height="56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="#e3f0ff"/>
          <rect x="10" y="22" width="28" height="14" rx="3" fill="#1976d2"/>
          <rect x="10" y="14" width="28" height="8" rx="2" fill="#90caf9"/>
          <rect x="12" y="16" width="6" height="4" rx="1" fill="#1976d2"/>
          <rect x="20" y="16" width="6" height="4" rx="1" fill="#1976d2"/>
          <rect x="28" y="16" width="6" height="4" rx="1" fill="#1976d2"/>
        </svg>
      </div>
      <h1 class="about-title">Tentang Aplikasi Ini</h1>
      <div class="about-desc">
        <p>Poys Movie adalah aplikasi web sederhana yang berfungsi sebagai sistem informasi film. Aplikasi ini dikembangkan menggunakan Vue.js dan Vue Router sebagai bagian dari pembelajaran pemrograman berbasis komponen dan penerapan routing.</p>
        <p>Tujuan utama dari aplikasi ini adalah untuk mendemonstrasikan:</p>
        <ul>
          <li>Implementasi routing antar halaman menggunakan Vue Router.</li>
          <li>Struktur komponen dalam Vue.js.</li>
          <li>Penyajian data film secara statis melalui pendekatan hardcoded.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
}
</script>

<style scoped>
.about-bg {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at 50% 30%, #e3f0ff 0%, #f8fbff 60%, #f4f7fa 100%);
}
.about-card {
  background: #fff;
  border-radius: 28px;
  box-shadow: 0 8px 40px rgba(25, 118, 210, 0.13), 0 1.5px 8px rgba(0,0,0,0.04);
  padding: 48px 44px 44px 44px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-wrapper {
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.main-icon {
  width: 56px;
  height: 56px;
  display: block;
}
.about-title {
  color: #1a237e;
  font-size: 2em;
  font-weight: 900;
  margin: 0 0 18px 0;
  letter-spacing: 0.5px;
}
.about-desc {
  color: #222;
  font-size: 1.13em;
  text-align: left;
  margin: 0 auto;
  max-width: 480px;
  line-height: 1.7;
}
.about-desc p {
  margin-bottom: 12px;
}
@media (max-width: 700px) {
  .about-card {
    padding: 24px 8px 24px 8px;
    max-width: 98vw;
  }
  .about-title {
    font-size: 1.1em;
  }
  .about-desc {
    font-size: 0.98em;
    max-width: 98vw;
  }
}
</style>