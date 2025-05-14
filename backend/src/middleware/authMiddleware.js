import jwt from 'jsonwebtoken'

// Named export
export function verifyToken(req, res, next) {
  const authHeader = req.header('Authorization')
  if (!authHeader) return res.status(401).json({ msg: 'No hay token, acceso denegado' })

  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Formato de token inválido' })
  }
  const token = parts[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' })
  }
}

// Default export (para quienes usan import authMiddleware from …)
export default verifyToken