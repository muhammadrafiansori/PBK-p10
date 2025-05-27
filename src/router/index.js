// src/router/index.js

import { createRouter, createWebHistory } from 'vue-router';
// Import semua komponen halaman yang akan digunakan
import Home from '../views/Home.vue';
import FilmList from '../views/FilmList.vue';
import FilmDetail from '../views/FilmDetail.vue';
import About from '../views/About.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/films',
    name: 'FilmList',
    component: FilmList,
  },
  {
    // Routing dinamis untuk detail film, :id akan menjadi parameter
    path: '/films/:id',
    name: 'FilmDetail',
    component: FilmDetail,
    props: true, // Meneruskan parameter ID sebagai prop ke komponen FilmDetail
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  // Catch-all route for 404 (harus di paling bawah)
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(), // Menggunakan HTML5 History Mode untuk URL bersih
  routes,
});

export default router;