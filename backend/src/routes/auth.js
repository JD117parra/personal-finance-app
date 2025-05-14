import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js'


const router = express.Router();

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

router.get(
  '/me',
  authMiddleware,            // valida el JWT y deja req.userId
  async (req, res) => {
    try {
      const user = await User
        .findById(req.userId)
        .select('nombre email')
      if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' })
      return res.json({ nombre: user.nombre, email: user.email })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ msg: 'Error en el servidor' })
    }
  }
)

export default router;