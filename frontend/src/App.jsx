import { Routes, Route, useLocation } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Logout from './components/Logout'

function App() {
  const location = useLocation()
  const hideHeader = ['/login', '/register'].includes(location.pathname)

  // Leemos directamente localStorage en cada render
  const userName = localStorage.getItem('userName') || ''
  console.log('username en App:', userName)


  return (
    <div className="app-root">
      {!hideHeader && (
        <header className="app-header">
          <span className="page-title">Dashboard</span>
          <span className="user-name">Hola, {userName}</span>
          <div className="logout-wrapper">
            <Logout />
          </div>
        </header>
      )}

      <main className="app-container">
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App