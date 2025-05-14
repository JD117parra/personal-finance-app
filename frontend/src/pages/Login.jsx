import { useState } from 'react'
import api from '../api'
import { useNavigate, Link } from 'react-router-dom'

  export default function Login() {
    const [email, setEmail] = useState('')
    const [contraseña, setContraseña] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

  const handleSubmit = async (e) => {
  e.preventDefault()
  try {
    const { data } = await api.post('/auth/login', { email, contraseña })
    const token = data.token
    localStorage.setItem('token', token);
    
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    // Intento de /auth/me
    try {
      const { data: me } = await api.get('/auth/me')
      console.log('Perfil OK:', me)
      localStorage.setItem('userName', me.nombre)
    } catch (errMe) {
      console.error('Error en /auth/me:', errMe.response?.status, errMe.response?.data)
      // Si falla, dejamos userName vacío o puedes usar un fallback
      localStorage.setItem('userName', '')
    }

    navigate('/')
  } catch (err) {
    console.error('Error en login:', err.response?.status, err.response?.data)
    setError(err.response?.data?.msg || 'Error al iniciar sesión')
  }
}

  return (
    <div className="auth-wrapper">
      <div className="login-container">
        <h2>Iniciar sesión</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
              required/>

            <label htmlFor="password">Contraseña:</label>
            <input id="password" type="password" value={contraseña} onChange={e => setContraseña(e.target.value)}
              required/>
              
          <button type="submit">Iniciar sesión</button>

        </form>

        <p className="register-link">
          ¿No tienes cuenta?{' '}
          <Link to="/register">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}