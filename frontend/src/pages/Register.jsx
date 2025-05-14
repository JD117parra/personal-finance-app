import { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [contraseña, setContraseña] = useState('')
  const [confirmar, setConfirmar] = useState('')    // faltaba este
  const [error, setError] = useState('')

  const navigate = useNavigate()

 const handleSubmit = async (e) => {
  e.preventDefault()

  // Validar contraseñas
  if (contraseña !== confirmar) {
    setError('Las contraseñas no coinciden')
    return
  }

  try {
    // 1) Registro → recibes { token }
    const { data } = await api.post('/auth/register', { nombre, email, contraseña })
    const { token } = data
    localStorage.setItem('token', token)

    // 2) Header con el token
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // 3) Pide el perfil y guarda el nombre
    const { data: me } = await api.get('/auth/me')
    localStorage.setItem('userName', me.nombre)

    // 4) Redirige
    localStorage.setItem('userName', me.nombre)

    navigate('/')
  } catch (err) {
    setError(err.response?.data?.msg || 'Error registrando usuario')
  }
}

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        <h2>Crear cuenta</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              id="nombre"
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">Contraseña:</label>
            <input
              id="password"
              type="password"
              value={contraseña}
              onChange={e => setContraseña(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirm">Confirmar contraseña:</label>
            <input
              id="confirm"
              type="password"
              value={confirmar}
              onChange={e => setConfirmar(e.target.value)}
              required
            />
          </div>

          <button type="submit">Registrarme</button>
        </form>

        <p className="register-link">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  )
}