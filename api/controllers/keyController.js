const pool = require('../config/db');
const crypto = require('crypto');

// Generate API Key Baru
exports.generateKey = async (req, res) => {
  const userId = req.user.id;

  try {
    // Generate String Acak untuk API Key
    const newApiKey = 'weather_live_' + crypto.randomBytes(16).toString('hex');

    const result = await pool.query(
      'INSERT INTO public.api_keys (user_id, key_value) VALUES ($1, $2) RETURNING id, key_value, created_at',
      [userId, newApiKey]
    );

    // Mengubah properti balasan agar langsung terbaca key_value-ya oleh frontend
    res.status(201).json({
      message: 'API Key berhasil dibuat!',
      api_key: result.rows[0].key_value,
      apiKeyData: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: 'Server error',
      error_detail: err.message,
      error_code: err.code
    });
  }
};