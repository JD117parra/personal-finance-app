import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import TransactionForm from '../components/TransactionForm'
import TransactionItem from '../components/TransactionItem'
import Chart from '../components/Chart'
import Logout from '../components/Logout'
import Balance from '../components/Balance'
import { CSVLink } from 'react-csv'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function Dashboard() {
  const [transactions, setTransactions] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // 1) Fetch inicial
  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/transactions')
      setTransactions(data)
    } catch (err) {
      setError(err.response?.data?.msg || 'Error cargando transacciones')
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    }
  }

  // 2) Exportar a PDF
  const exportToPDF = () => {
    const doc = new jsPDF()
    doc.text('Transacciones', 14, 20)
    const tableData = transactions.map(t => [
      t.tipo.toUpperCase(),
      t.categoria,
      `$${t.monto.toFixed(2)}`,
      new Date(t.fecha).toLocaleDateString(),
      t.descripcion || '',
    ])
    autoTable(doc, {
      head: [['Tipo','Categoría','Monto','Fecha','Descripción']],
      body: tableData,
      startY: 30,
    })
    doc.save('transacciones.pdf')
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  // 3) Handlers para añadir, actualizar y borrar
  const handleTransactionAdded = newTransaction => {
    setTransactions(prev => [newTransaction, ...prev])
  }

  const handleTransactionUpdated = updatedTransaction => {
    setTransactions(prev =>
      prev.map(t => (t._id === updatedTransaction._id ? updatedTransaction : t))
    )
  }

  const handleTransactionDeleted = id => {
    setTransactions(prev => prev.filter(t => t._id !== id))
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-left">
        <h2>Nueva Transacción</h2>
        <TransactionForm onTransactionAdded={handleTransactionAdded} />
        <div className="balance-container">
        <h2>Resumen Financiero</h2>
          <Balance transactions={transactions} />
        </div>
   </div>


     <div className="dashboard-right">
      <h2>Distribución por Categoría</h2>
      <div>
        <Chart transactions={transactions} />
      </div>
      {transactions.length > 0 && (
        <div className="export-buttons">
          <CSVLink
            data={transactions} filename="transacciones.csv" className="export-button">
             CSV
          </CSVLink>
          <button onClick={exportToPDF} >PDF</button>
        </div>
      )}

      <ul className="transaction-list">
        {transactions.map(transaction => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            onTransactionUpdated={handleTransactionUpdated}
            onTransactionDeleted={handleTransactionDeleted}
          />
        ))}
      </ul>
    </div>
  </div>
  )
}