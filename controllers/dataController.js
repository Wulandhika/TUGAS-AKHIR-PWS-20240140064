// Perbaikan path db.js sesuai struktur folder api/
const pool = require('../api/db') || require('./db'); 

// GET: Ambil Semua Data Cuaca
exports.getWeatherData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.weather_data ORDER BY id DESC');
    return res.status(200).json({
      status: 'success',
      message: 'Berhasil mengambil data cuaca',
      data: result.rows
    });
  } catch (err) {
    console.error('Error GET Weather:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Server error saat mengambil data cuaca',
      error_detail: err.message
    });
  }
};

// POST: Tambah Data Cuaca Baru
exports.createWeatherData = async (req, res) => {
  const { city, temperature, humidity, wind_speed, air_quality, status } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO public.weather_data (city, temperature, humidity, wind_speed, air_quality, status) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [city, temperature, humidity, wind_speed, air_quality, status]
    );

    return res.status(201).json({
      status: 'success',
      message: 'Data cuaca berhasil ditambahkan!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error POST Weather:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Server error saat menambah data cuaca',
      error_detail: err.message
    });
  }
};