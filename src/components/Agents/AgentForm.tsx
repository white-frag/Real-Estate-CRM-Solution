import React from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { Agent } from '../../types';
import { useApp } from '../../context/AppContext';

interface AgentFormProps {
  agent?: Agent | null;
  onClose: () => void;
}

const AgentForm: React.FC<AgentFormProps> = ({ agent, onClose }) => {
  const { addAgent, updateAgent } = useApp();
  const isEditing = !!agent;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: agent || {
      name: '',
      email: '',
      phone: '',
      role: 'agent',
      leadsAssigned: 0,
      conversions: 0,
      isActive: true
    }
  });

  const onSubmit = (data: any) => {
    if (isEditing && agent) {
      updateAgent(agent.id, data);
    } else {
      const newAgent: Agent = {
        ...data,
        id: Math.random().toString(36).substr(2, 9),
      };
      addAgent(newAgent);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? 'Edit Agent' : 'Add New Agent'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone *
            </label>
            <input
              type="tel"
              {...register('phone', { required: 'Phone is required' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
            />
            {errors.phone && (
              <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              {...register('role')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
            >
              <option value="agent">Agent</option>
              <option value="admin">Admin</option>
              <option value="marketing">Marketing</option>
              <option value="viewer">Viewer</option>
            </select>
          </div>

          {isEditing && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Leads Assigned
                  </label>
                  <input
                    type="number"
                    {...register('leadsAssigned', { min: 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Conversions
                  </label>
                  <input
                    type="number"
                    {...register('conversions', { min: 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  {...register('isActive')}
                  className="h-4 w-4 text-midnight-blue focus:ring-midnight-blue border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Active Agent
                </label>
              </div>
            </>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-midnight-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update Agent' : 'Add Agent'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgentForm;