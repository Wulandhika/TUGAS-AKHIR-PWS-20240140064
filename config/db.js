const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Otomatis aktifkan SSL jika di-deploy ke Vercel/Supabase
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('Database PostgreSQL terhubung!');
});

module.exports = pool;