const pool = require('../config/db');
const crypto = require('crypto');

// Generate API Key Baru
exports.generateKey = async (req, res) => {
  const userId = req.user.id;
  const { name } = req.body;

  try {
    // Generate String Acak untuk API Key (Contoh: weather_live_abc123...)
    const newApiKey = 'weather_live_' + crypto.randomBytes(16).toString('hex');

    const result = await pool.query(
      'INSERT INTO api_keys (user_id, api_key, name) VALUES ($1, $2, $3) RETURNING id, api_key, name, created_at',
      [userId, newApiKey, name || 'Default Key']
    );

    res.status(201).json({
      message: 'API Key berhasil dibuat!',
      apiKeyData: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};