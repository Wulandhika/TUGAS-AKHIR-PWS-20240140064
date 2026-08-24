const pool = require('../config/db');

module.exports = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'] || req.query.api_key;

  if (!apiKey) {
    return res.status(401).json({ 
      status: 'error',
      message: 'API Key diperlukan. Sertakan header "x-api-key" atau parameter "?api_key=".' 
    });
  }

  try {
    // FIX: Ubah api_key menjadi key_value & gunakan public.api_keys
    const keyCheck = await pool.query('SELECT * FROM public.api_keys WHERE key_value = $1', [apiKey]);

    if (keyCheck.rows.length === 0) {
      return res.status(403).json({ 
        status: 'error',
        message: 'API Key tidak valid atau tidak terdaftar.' 
      });
    }

    req.apiKey = keyCheck.rows[0];
    next();
  } catch (err) {
    console.error('Error Validasi API Key:', err);
    return res.status(500).json({ 
      status: 'error',
      message: 'Terjadi kesalahan pada server saat validasi API Key.',
      error_detail: err.message 
    });
  }
};