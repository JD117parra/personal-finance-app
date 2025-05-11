export default function Balance({ transactions }) {
  const ingresos = transactions
    .filter(t => t.tipo === 'ingreso')
    .reduce((sum, t) => sum + t.monto, 0);

  const gastos = transactions
    .filter(t => t.tipo === 'gasto')
    .reduce((sum, t) => sum + t.monto, 0);

  const balance = ingresos - gastos;

  return (
    <div className="balance-container">
      <h3>Resumen financiero</h3>
      <div className="balance-details">
        <div className="balance-item ingresos">Ingresos: ${ingresos.toFixed(2)}</div>
        <div className="balance-item gastos">Gastos: ${gastos.toFixed(2)}</div>
        <div className="balance-item total">
          Balance Total: ${balance.toFixed(2)}
        </div>
      </div>
    </div>
  );
}