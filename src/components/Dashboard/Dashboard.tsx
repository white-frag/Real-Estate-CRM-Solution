import React from 'react';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';
import StatsCard from './StatsCard';
import RecentLeads from './RecentLeads';
import ConversionChart from './ConversionChart';
import { useApp } from '../../context/AppContext';

const Dashboard: React.FC = () => {
  const { leads, agents } = useApp();

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(lead => lead.status === 'new').length,
    conversions: leads.filter(lead => lead.status === 'closed').length,
    conversionRate: Math.round((leads.filter(lead => lead.status === 'closed').length / leads.length) * 100)
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">Welcome back! Here's what's happening with your real estate business.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatsCard
          title="Total Leads"
          value={stats.totalLeads}
          change="+12% from last month"
          changeType="positive"
          icon={Users}
          color="bg-midnight-blue"
        />
        <StatsCard
          title="New Leads"
          value={stats.newLeads}
          change="+8% from last week"
          changeType="positive"
          icon={TrendingUp}
          color="bg-green-500"
        />
        <StatsCard
          title="Conversions"
          value={stats.conversions}
          change="+5% from last month"
          changeType="positive"
          icon={Target}
          color="bg-blue-500"
        />
        <StatsCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change="+2% from last month"
          changeType="positive"
          icon={DollarSign}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ConversionChart />
        <RecentLeads leads={leads.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Dashboard;