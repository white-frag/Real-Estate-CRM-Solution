import React, { useState } from 'react';
import { LayoutGrid, List } from 'lucide-react';
import LeadKanban from '../components/Leads/LeadKanban';
import LeadList from '../components/Leads/LeadList';

const Leads: React.FC = () => {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 mt-2 text-sm lg:text-base">Manage your leads with our intuitive Kanban board or detailed list view</p>
        </div>
        
        <div className="flex bg-white rounded-lg border border-gray-200 p-1">
          <button
            onClick={() => setViewMode('kanban')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'kanban'
                ? 'bg-midnight-blue text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Kanban</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'list'
                ? 'bg-midnight-blue text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? <LeadKanban /> : <LeadList />}
    </div>
  );
};

export default Leads;