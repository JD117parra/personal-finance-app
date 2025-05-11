// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PrivateRoute from './components/PrivateRoute'
import Logout from './components/Logout'

function App() {
  return (
    <div className="app-root">
      {/* Logout siempre visible en la esquina */}
      <header className="logout-wrapper">
        <Logout />
      </header>

      {/* Contenido principal de la app */}
      <main className="app-container">
        <Routes>
          <Route path="/login" element={<Login />} />
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