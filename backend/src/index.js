import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import testRoutes from './routes/test.js';
import transactionsRoutes from './routes/transactions.js';


// 1. Carga variables de entorno
dotenv.config();

// 2. Crea la instancia de Express
const app = express();

// 3. Conecta a MongoDB
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/finanzas';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB conectado ✔️'))
.catch(err => {
  console.error('Error conectando a MongoDB:', err);
  process.exit(1);
});

// 4. Middlewares globales
app.use(cors());
app.use(express.json());

// 5. Rutas
app.use('/api/auth', authRoutes);
app.use('/api/test', testRoutes); 
app.use('/api/transactions', transactionsRoutes);


// 6. Ruta raíz de prueba
app.get('/', (req, res) => {
  res.send('API de Finanzas Personales funcionando 🚀');
});

// 7. Arranque del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});