import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics: React.FC = () => {
  const leadData = [
    { month: 'Jan', leads: 40, conversions: 8 },
    { month: 'Feb', leads: 52, conversions: 12 },
    { month: 'Mar', leads: 45, conversions: 9 },
    { month: 'Apr', leads: 60, conversions: 15 },
    { month: 'May', leads: 55, conversions: 14 },
    { month: 'Jun', leads: 48, conversions: 11 },
  ];

  const sourceData = [
    { name: 'Website', value: 35, color: '#191970' },
    { name: 'MagicBricks', value: 25, color: '#3B82F6' },
    { name: '99Acres', value: 20, color: '#06B6D4' },
    { name: 'Referral', value: 15, color: '#10B981' },
    { name: 'Other', value: 5, color: '#838996' },
  ];

  const propertyTypeData = [
    { type: 'Apartment', interested: 45, sold: 12 },
    { type: 'Villa', interested: 30, sold: 8 },
    { type: 'Plot', interested: 20, sold: 5 },
    { type: 'Commercial', interested: 15, sold: 3 },
  ];

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics & Reports</h1>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">Gain insights into your real estate business performance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Lead Generation Trends</h3>
          </div>
          <div className="p-4 lg:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={leadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="leads" stroke="#191970" strokeWidth={2} name="Total Leads" />
                <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} name="Conversions" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Lead Sources</h3>
          </div>
          <div className="p-4 lg:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 lg:col-span-2">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Property Type Performance</h3>
          </div>
          <div className="p-4 lg:p-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={propertyTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="interested" fill="#191970" name="Interested Leads" />
                <Bar dataKey="sold" fill="#10B981" name="Sold Properties" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Monthly Revenue</h4>
          <div className="text-2xl lg:text-3xl font-bold text-green-600">₹45,67,890</div>
          <p className="text-xs lg:text-sm text-gray-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6">
          <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Average Deal Size</h4>
          <div className="text-2xl lg:text-3xl font-bold text-midnight-blue">₹56,78,900</div>
          <p className="text-xs lg:text-sm text-gray-600 mt-2">+5% from last month</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 sm:col-span-2 lg:col-span-1">
          <h4 className="text-base lg:text-lg font-semibold text-gray-900 mb-3 lg:mb-4">Time to Close</h4>
          <div className="text-2xl lg:text-3xl font-bold text-purple-600">28 days</div>
          <p className="text-xs lg:text-sm text-gray-600 mt-2">-3 days from last month</p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;