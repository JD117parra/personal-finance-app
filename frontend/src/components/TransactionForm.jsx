import { useState } from 'react'
import api from '../api'

export default function TransactionForm({ onTransactionAdded }) {
  const [tipo, setTipo] = useState('gasto')
  const [monto, setMonto] = useState('')
  const [categoria, setCategoria] = useState('')
  const [fecha, setFecha] = useState('')
  const [descripcion, setDescripcion] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await api.post('/transactions', {
        tipo, monto, categoria, fecha, descripcion
      })
      onTransactionAdded(data)
      setMonto('')
      setCategoria('')
      setFecha('')
      setDescripcion('')
      setError('')
    } catch (err) {
      setError(err.response?.data?.msg || 'Error creando transacción')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Tipo */}
      <div>
        <label htmlFor="tipo">Tipo</label>
        <select
          id="tipo"
          value={tipo}
          onChange={e => setTipo(e.target.value)}
          required
        >
          <option value="gasto">Gasto</option>
          <option value="ingreso">Ingreso</option>
        </select>
      </div>

      {/* Monto */}
      <div>
        <label htmlFor="monto">Monto</label>
        <input
          id="monto"
          type="number"
          placeholder="0.00"
          value={monto}
          onChange={e => setMonto(e.target.value)}
          required
        />
      </div>

      {/* Categoría */}
      <div>
        <label htmlFor="categoria">Categoría</label>
        <input
          id="categoria"
          type="text"
          placeholder="Supermercado"
          value={categoria}
          onChange={e => setCategoria(e.target.value)}
          required
        />
      </div>

      {/* Fecha */}
      <div>
        <label htmlFor="fecha">Fecha</label>
        <input
          id="fecha"
          type="date"
          value={fecha}
          onChange={e => setFecha(e.target.value)}
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="descripcion">Descripción (opcional)</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Añade más detalles"
          rows={2}
        />
      </div>

      {/* Botón */}
      <button type="submit">Agregar Transacción</button>
    </form>
  )
}