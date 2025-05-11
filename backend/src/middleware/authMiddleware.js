import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Leer token del header Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, autorización denegada' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ msg: 'Token mal formateado' });
  }

  try {
    // Verificar y extraer payload
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token no válido' });
  }
};