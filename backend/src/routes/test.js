import express from 'express';
import verifyToken from '../middleware/authMiddleware.js'
const router = express.Router();

// Ruta protegida de ejemplo
router.get('/protected', verifyToken, (req, res) => {
  res.json({ msg: `Hola usuario ${req.userId}, estás autenticado 🎉` });
});

export default router;