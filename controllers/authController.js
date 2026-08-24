const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register User
exports.register = async (req, res) => {
  const { username, name, email, password } = req.body;
  const userIdentifier = username || name;

  try {
    const userExist = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ message: 'Email sudah terdaftar.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO public.users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [userIdentifier, email, hashedPassword]
    );

    res.status(201).json({
      message: 'Registrasi berhasil!',
      user: newUser.rows[0]
    });
  } catch (err) {
    console.error(err);
    // TAMPILKAN ERROR ASLI KE RESPONSE THUNDER CLIENT
    res.status(500).json({ 
      message: 'Server error', 
      error_detail: err.message,
      error_code: err.code 
    });
  }
};

// 2. Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM public.users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Email atau password salah.' });
    }

    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      process.env.JWT_SECRET || 'secretkey',
      { expiresIn: process.env.JWT_EXPIRES || '1d' }
    );

    res.json({
      message: 'Login berhasil!',
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      message: 'Server error', 
      error_detail: err.message 
    });
  }
};