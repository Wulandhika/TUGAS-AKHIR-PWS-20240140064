const express = require('express');
const cors = require('cors');
const path = require('path'); // Tambahkan modul path bawaan Node.js
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// TAMBAHKAN INI: Agar folder 'public' (HTML/CSS/JS) bisa dibaca
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRoutes);

// Untuk testing di lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;