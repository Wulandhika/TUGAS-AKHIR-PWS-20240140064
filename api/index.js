const express = require('express');
const cors = require('cors');
require('dotenv').config();

// KOREKSI DI BARIS INI: arahkan ke ./routes (bukan ../routes/apiRoutes)
const apiRoutes = require('./routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root Route Test
app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di Weather SaaS Data Service API!' });
});

// Mounting API Routes
app.use('/api', apiRoutes);

// Untuk testing di lokal
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

module.exports = app;