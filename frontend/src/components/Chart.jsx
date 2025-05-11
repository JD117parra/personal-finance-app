import {
  PieChart, Pie, Tooltip, Cell, ResponsiveContainer,
} from 'recharts';

export default function Chart({ transactions }) {
  // Calcula los totales por categoría
  const dataMap = transactions.reduce((acc, { categoria, monto, tipo }) => {
    const key = `${categoria} (${tipo})`;
    acc[key] = (acc[key] || 0) + monto;
    return acc;
  }, {});

  const data = Object.keys(dataMap).map((key) => ({
    name: key,
    value: dataMap[key],
  }));

  // Colores aleatorios
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560', '#775DD0'];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}