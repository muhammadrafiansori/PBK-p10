# PBK P10 - Vue.js Film Application

Aplikasi Vue.js untuk mengelola daftar film dengan fitur Pinia state management, JSON Server database, dan unit testing.

## Fitur

- ✅ **Pinia State Management** - Mengelola state aplikasi dengan Pinia
- ✅ **JSON Server** - Database lokal dengan REST API
- ✅ **Unit Testing** - Testing dengan Vitest dan Vue Test Utils
- ✅ **Film Management** - CRUD operasi untuk film
- ✅ **User Management** - Sistem login dan manajemen user
- ✅ **Favorites System** - Sistem favorit film
- ✅ **Responsive Design** - Tampilan yang responsif

## Struktur Proyek

```
PBK-p10/
├── src/
│   ├── stores/           # Pinia stores
│   │   ├── filmStore.js  # Store untuk film
│   │   ├── userStore.js  # Store untuk user
│   │   └── __tests__/    # Unit tests untuk stores
│   ├── components/       # Vue components
│   ├── views/           # Vue views/pages
│   ├── router/          # Vue Router
│   └── test/            # Test setup
├── db.json              # JSON Server database
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

## Instalasi

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan JSON Server (database):**
   ```bash
   npm run db
   ```
   Server akan berjalan di `http://localhost:3000`

3. **Jalankan aplikasi development:**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173`

## Scripts

- `npm run dev` - Menjalankan development server
- `npm run build` - Build untuk production
- `npm run preview` - Preview build production
- `npm run test` - Menjalankan unit tests
- `npm run test:ui` - Menjalankan tests dengan UI
- `npm run test:run` - Menjalankan tests sekali
- `npm run db` - Menjalankan JSON Server

## Database (db.json)

Database berisi data contoh:
- **Films**: Daftar film dengan detail lengkap
- **Users**: Data pengguna dengan role
- **Favorites**: Relasi favorit user-film

### Endpoints API:
- `GET http://localhost:3000/films` - Ambil semua film
- `POST http://localhost:3000/films` - Tambah film baru
- `PUT http://localhost:3000/films/:id` - Update film
- `DELETE http://localhost:3000/films/:id` - Hapus film
- `GET http://localhost:3000/users` - Ambil semua user
- `POST http://localhost:3000/users` - Tambah user baru

## Testing

### Menjalankan Tests:
```bash
# Semua tests
npm run test

# Tests dengan UI
npm run test:ui

# Tests sekali
npm run test:run
```

### Coverage Tests:
- **Film Store**: Testing state, getters, dan actions
- **User Store**: Testing authentication dan user management
- **Components**: Testing komponen Vue

## Pinia Stores

### Film Store (`src/stores/filmStore.js`)
- State: films, loading, error, favorites
- Getters: getFilmById, getFavoriteFilms, getFilmsByGenre, getTopRatedFilms
- Actions: fetchFilms, addFilm, updateFilm, deleteFilm, toggleFavorite

### User Store (`src/stores/userStore.js`)
- State: currentUser, users, loading, error
- Getters: isLoggedIn, isAdmin, getUserById
- Actions: fetchUsers, login, logout, addUser, updateUser, deleteUser

## Penggunaan

### CRUD Operations (Create, Read, Update, Delete)

1. **Create (Tambah Film)**:
   - Klik tombol "➕ Tambah Film" di halaman daftar film
   - Isi form dengan data film (judul, tahun, sutradara, genre, rating, deskripsi, poster)
   - Klik "Tambah Film" untuk menyimpan

2. **Read (Baca Film)**:
   - Lihat daftar film di halaman utama (`/films`)
   - Klik "Lihat Detail" untuk melihat detail lengkap film
   - Film detail menampilkan semua informasi film termasuk poster

3. **Update (Edit Film)**:
   - Di halaman detail film, klik tombol "✏️ Edit"
   - Form akan terisi dengan data film yang ada
   - Edit data yang diinginkan
   - Klik "Update Film" untuk menyimpan perubahan

4. **Delete (Hapus Film)**:
   - Di halaman detail film, klik tombol "🗑️ Delete"
   - Konfirmasi penghapusan
   - Film akan dihapus dan kembali ke daftar film

### Fitur Tambahan

- **Favorites System**: Klik tombol hati untuk menambah/menghapus film dari favorit
- **Refresh Data**: Klik tombol "Refresh" untuk memuat ulang data dari server
- **Responsive Design**: Aplikasi responsif untuk desktop dan mobile

### Testing

- Jalankan tests untuk memastikan semua fitur berfungsi
- Tests mencakup stores, components, dan API calls

## Teknologi

- **Vue.js 3** - Framework frontend
- **Pinia** - State management
- **Vue Router** - Routing
- **Vite** - Build tool
- **Vitest** - Unit testing
- **JSON Server** - Mock REST API
- **Vue Test Utils** - Component testing

## Struktur Data

### Film Object:
```json
{
  "id": 1,
  "title": "Film Title",
  "year": 2023,
  "director": "Director Name",
  "genre": "Action",
  "rating": 8.5,
  "description": "Film description",
  "poster": "poster_url"
}
```

### User Object:
```json
{
  "id": 1,
  "username": "username",
  "email": "email@example.com",
  "role": "user|admin"
}
```

## Contributing

1. Fork repository
2. Buat feature branch
3. Commit changes
4. Push ke branch
5. Buat Pull Request

## License

MIT License
