const pool = require('../config/db');

// Get All Weather Data (Diakses publik dengan API Key)
exports.getWeatherData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM weather_data ORDER BY id ASC');
    res.json({
      status: 'success',
      total_data: result.rows.length,
      data: result.rows
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};