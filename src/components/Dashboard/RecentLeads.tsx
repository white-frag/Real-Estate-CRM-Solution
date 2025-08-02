import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { Lead } from '../../types';
import { format } from 'date-fns';

interface RecentLeadsProps {
  leads: Lead[];
}

const RecentLeads: React.FC<RecentLeadsProps> = ({ leads }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'contacted':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 lg:p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
      </div>
      <div className="p-4 lg:p-6">
        <div className="space-y-3 lg:space-y-4">
          {leads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between p-3 lg:p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 text-sm lg:text-base truncate">{lead.name}</h4>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(lead.status)} ml-2 flex-shrink-0`}>
                    {lead.status}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 text-xs lg:text-sm text-gray-600">
                  <div className="flex items-center">
                    <Phone className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    <span className="truncate">{lead.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
                    <span className="truncate">{lead.location}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Created {format(lead.createdAt, 'MMM dd, yyyy')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentLeads;