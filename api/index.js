const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const apiRoutes = require('./routes/apiRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Menyajikan file statis dari folder 'public' (Dashboard UI & Landing Page)
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRoutes);

// Fallback untuk menghandle routing HTML jika diakses langsung (Opsional tapi aman untuk SPA/Static)
app.get('*', (req, res, next) => {
  // Jika request mengarah ke API, teruskan ke router API
  if (req.path.startsWith('/api')) {
    return next();
  }
  // Selain itu, kembalikan file index.html dari folder public
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// Untuk testing di lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;