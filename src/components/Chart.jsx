import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Chart({ type, data, height = 300 }) {
  switch (type) {
    case 'bar':
      return (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} />
            <YAxis tickLine={false} tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} tickFormatter={(val) => data[0]?.revenue ? `₵${val}` : val} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgb(17 24 39)', 
                border: '1px solid rgb(51 65 85)', 
                borderRadius: '12px',
                color: 'white'
              }}
              formatter={(value, name) => [name === "Revenue" ? `₵${value}` : value, name]}
            />
            <Legend />
            {data[0]?.revenue && <Bar dataKey="revenue" fill="#10b981" name="Revenue" radius={[4, 4, 0, 0]} />}
            {data[0]?.quantity && <Bar dataKey="quantity" fill="#3b82f6" name="Quantity" radius={[4, 4, 0, 0]} />}
          </BarChart>
        </ResponsiveContainer>
      );
    case 'pie':
      return (
        <ResponsiveContainer width="100%" height={height}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    case 'line':
      return (
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" strokeOpacity={0.3} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} />
            <YAxis tickLine={false} tick={{ fontSize: 12, fill: 'rgb(156 163 175)' }} tickFormatter={(val) => `₵${val}`} />
            <Tooltip formatter={(value) => [`₵${value}`, "Revenue"]} contentStyle={{ backgroundColor: 'rgb(17 24 39)', border: '1px solid rgb(51 65 85)', borderRadius: '12px', color: 'white' }} />
            <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      );
    default:
      return null;
  }
}
