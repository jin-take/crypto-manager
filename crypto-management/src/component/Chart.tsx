import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: '7/20', stacks: 4000, bitcoin: 2400, ethreum: 5000, amt: 2400 },
  { name: '7/21', stacks: 3000, bitcoin: 1398, ethreum: 1212, amt: 2210 },
  { name: '7/22', stacks: 2000, bitcoin: 9800, ethreum: 3013, amt: 2290 },
  { name: '7/23', stacks: 2780, bitcoin: 3908, ethreum: 5000, amt: 2000 },
  { name: '7/24', stacks: 1890, bitcoin: 4800, ethreum: 1234, amt: 2181 },
  { name: '7/25', stacks: 2390, bitcoin: 3800, ethreum: 4333, amt: 2500 },
  { name: '7/26', stacks: 3490, bitcoin: 4300, ethreum: 2086, amt: 2100 },
];

const Chart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="stacks" stroke="#8884d8" />
        <Line type="monotone" dataKey="bitcoin" stroke="#82ca9d" />
        <Line type="monotone" dataKey="ethreum" stroke="#937845" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
 