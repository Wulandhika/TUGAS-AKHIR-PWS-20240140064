const pool = require('../config/db');

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

// PUT: Update / Edit Data Cuaca Berdasarkan ID
exports.updateWeatherData = async (req, res) => {
  const { id } = req.params;
  const { city, temperature, humidity, wind_speed, air_quality, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE public.weather_data 
       SET city = $1, temperature = $2, humidity = $3, wind_speed = $4, air_quality = $5, status = $6 
       WHERE id = $7 
       RETURNING *`,
      [city, temperature, humidity, wind_speed, air_quality, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Data cuaca tidak ditemukan'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Data cuaca berhasil diperbarui!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error PUT Weather:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Server error saat memperbarui data cuaca',
      error_detail: err.message
    });
  }
};

// DELETE: Hapus Data Cuaca Berdasarkan ID
exports.deleteWeatherData = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `DELETE FROM public.weather_data WHERE id = $1 RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Data cuaca tidak ditemukan'
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Data cuaca berhasil dihapus!',
      data: result.rows[0]
    });
  } catch (err) {
    console.error('Error DELETE Weather:', err);
    return res.status(500).json({
      status: 'error',
      message: 'Server error saat menghapus data cuaca',
      error_detail: err.message
    });
  }
};