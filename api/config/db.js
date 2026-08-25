const { Pool } = require('pg');
require('dotenv').config();

// Ambil connection string dan bersihkan parameter sslmode dari URL jika ada
let connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString: connectionString,
  // Cek apakah menggunakan localhost/127.0.0.1 (jika lokal, ssl false; jika cloud Supabase, aktifkan ssl)
  ssl: connectionString && connectionString.includes('localhost') 
    ? false 
    : { rejectUnauthorized: false }
});

pool.on('connect', () => {
  console.log('Database PostgreSQL terhubung!');
});

module.exports = pool;