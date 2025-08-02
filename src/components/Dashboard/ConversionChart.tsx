import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ConversionChart: React.FC = () => {
  const data = [
    { name: 'Jan', leads: 40, conversions: 8 },
    { name: 'Feb', leads: 52, conversions: 12 },
    { name: 'Mar', leads: 45, conversions: 9 },
    { name: 'Apr', leads: 60, conversions: 15 },
    { name: 'May', leads: 55, conversions: 14 },
    { name: 'Jun', leads: 48, conversions: 11 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Lead Conversion Trends</h3>
      </div>
      <div className="p-4 lg:p-6">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="leads" fill="#191970" name="Total Leads" />
            <Bar dataKey="conversions" fill="#3B82F6" name="Conversions" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversionChart;