import express from 'express';
import Transaction from '../models/Transaction.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/transactions
// @desc    Crear una nueva transacción
// @access  Privada
router.post('/', verifyToken, async (req, res) => {
  try {
    const { tipo, monto, categoria, fecha, descripcion } = req.body;
    const transaction = new Transaction({
      user: req.userId,
      tipo, monto, categoria, fecha, descripcion
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creando la transacción');
  }
});

// @route   GET /api/transactions
// @desc    Obtener todas las transacciones del usuario
// @access  Privada
router.get('/', verifyToken, async (req, res) => {
  try {
    const transactions = await Transaction
      .find({ user: req.userId })
      .sort({ fecha: -1 });   // más recientes primero
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo transacciones');
  }
});

// @route   GET /api/transactions/:id
// @desc    Obtener una transacción por ID
// @access  Privada
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.userId
    });
    if (!transaction) {
      return res.status(404).json({ msg: 'Transacción no encontrada' });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error obteniendo la transacción');
  }
});

// @route   PUT /api/transactions/:id
// @desc    Actualizar una transacción
// @access  Privada
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { tipo, monto, categoria, fecha, descripcion } = req.body;
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { tipo, monto, categoria, fecha, descripcion },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ msg: 'Transacción no encontrada' });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error actualizando la transacción');
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Eliminar una transacción
// @access  Privada
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });
    if (!deleted) {
      return res.status(404).json({ msg: 'Transacción no encontrada' });
    }
    res.json({ msg: 'Transacción eliminada' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error eliminando la transacción');
  }
});

export default router;