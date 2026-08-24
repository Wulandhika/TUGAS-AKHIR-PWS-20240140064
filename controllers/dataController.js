const pool = require('../config/db');

// GET: Ambil Semua Data Cuaca
exports.getWeatherData = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public.weather_data ORDER BY id DESC');
    res.status(200).json({
      message: 'Berhasil mengambil data cuaca',
      data: result.rows
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

    res.status(201).json({
      message: 'Data cuaca berhasil ditambahkan!',
      data: result.rows[0]
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