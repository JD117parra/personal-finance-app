import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Registrar un nuevo usuario
// @access  Pública
router.post('/register', async (req, res) => {
  const { nombre, email, contraseña } = req.body;
  try {
    // Verificar si ya existe
    const existe = await User.findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear y guardar
    const user = new User({ nombre, email, contraseñaHash: contraseña });
    await user.save();

    // Crear token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

// @route   POST /api/auth/login
// @desc    Autenticar usuario y devolver token
// @access  Pública
router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const isMatch = await user.matchPassword(contraseña);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor');
  }
});

export default router;