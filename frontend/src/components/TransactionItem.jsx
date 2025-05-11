import { useState } from 'react';
import api from '../api';

export default function TransactionItem({ transaction, onTransactionUpdated, onTransactionDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [monto, setMonto] = useState(transaction.monto);
  const [categoria, setCategoria] = useState(transaction.categoria);
  const [fecha, setFecha] = useState(transaction.fecha.slice(0,10));
  const [descripcion, setDescripcion] = useState(transaction.descripcion);

  const handleUpdate = async () => {
    try {
      const { data } = await api.put(`/transactions/${transaction._id}`, {
        tipo: transaction.tipo,
        monto,
        categoria,
        fecha,
        descripcion,
      });
      onTransactionUpdated(data);
      setIsEditing(false);
    } catch (error) {
      alert('Error actualizando transacción');
    }
  };

  const handleDelete = async () => {
    if (confirm('¿Seguro que deseas eliminar esta transacción?')) {
      try {
        await api.delete(`/transactions/${transaction._id}`);
        onTransactionDeleted(transaction._id);
      } catch (error) {
        alert('Error eliminando transacción');
      }
    }
  };

  return (
    <li>
      {isEditing ? (
        <>
          <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} />
          <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setIsEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          {transaction.tipo.toUpperCase()} - {transaction.categoria}: ${transaction.monto} ({transaction.fecha.slice(0,10)})
          <button onClick={() => setIsEditing(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </>
      )}
    </li>
  );
}