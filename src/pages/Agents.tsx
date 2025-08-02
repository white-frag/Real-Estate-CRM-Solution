import React, { useState } from 'react';
import { Plus, Mail, Phone, TrendingUp, Edit, Trash2, UserPlus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AgentForm from '../components/Agents/AgentForm';

const Agents: React.FC = () => {
  const { agents, deleteAgent } = useApp();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAgent, setEditingAgent] = useState<any>(null);

  const handleDelete = (agentId: string, agentName: string) => {
    if (window.confirm(`Are you sure you want to delete agent "${agentName}"?`)) {
      deleteAgent(agentId);
    }
  };

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Agents</h1>
          <p className="text-gray-600 mt-2 text-sm lg:text-base">Manage your sales team and track performance</p>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center space-x-2 bg-midnight-blue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          <span>Add Agent</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {agents.map((agent) => (
          <div key={agent.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-midnight-blue rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-base">
                  {agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-gray-900 truncate">{agent.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                    agent.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {agent.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 flex-shrink-0">
                <button
                  onClick={() => setEditingAgent(agent)}
                  className="text-midnight-blue hover:text-blue-700 transition-colors p-1"
                  title="Edit Agent"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(agent.id, agent.name)}
                  className="text-red-600 hover:text-red-700 transition-colors p-1"
                  title="Delete Agent"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-xs lg:text-sm text-gray-600">
                <Mail className="h-3 w-3 lg:h-4 lg:w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{agent.email}</span>
              </div>
              <div className="flex items-center text-xs lg:text-sm text-gray-600">
                <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{agent.phone}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4">
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-midnight-blue">{agent.leadsAssigned}</div>
                <div className="text-xs text-gray-600">Leads Assigned</div>
              </div>
              <div className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-green-600">{agent.conversions}</div>
                <div className="text-xs text-gray-600">Conversions</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 space-y-2 sm:space-y-0">
              <div className="flex items-center text-xs lg:text-sm text-gray-600">
                <TrendingUp className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                <span>{Math.round((agent.conversions / agent.leadsAssigned) * 100)}% Success Rate</span>
              </div>
              <span className="text-xs text-gray-500 capitalize">{agent.role}</span>
            </div>
          </div>
        ))}

        {/* Add Agent Card */}
        <div 
          onClick={() => setShowAddForm(true)}
          className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-4 lg:p-6 hover:border-midnight-blue hover:bg-blue-50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[250px] lg:min-h-[280px]"
        >
          <UserPlus className="h-8 w-8 lg:h-12 lg:w-12 text-gray-400 mb-3 lg:mb-4" />
          <h3 className="text-base lg:text-lg font-medium text-gray-600 mb-2 text-center">Add New Agent</h3>
          <p className="text-xs lg:text-sm text-gray-500 text-center">Click here to add a new agent to your team</p>
        </div>
      </div>

      {(showAddForm || editingAgent) && (
        <AgentForm
          agent={editingAgent}
          onClose={() => {
            setShowAddForm(false);
            setEditingAgent(null);
          }}
        />
      )}
    </div>
  );
};

export default Agents;