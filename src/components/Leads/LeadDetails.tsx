import React from 'react';
import { X, Edit, Phone, Mail, MapPin, Calendar, User, DollarSign, Building } from 'lucide-react';
import { Lead } from '../../types';
import { format } from 'date-fns';

interface LeadDetailsProps {
  lead: Lead;
  onClose: () => void;
  onEdit: () => void;
}

const LeadDetails: React.FC<LeadDetailsProps> = ({ lead, onClose, onEdit }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-purple-100 text-purple-800';
      case 'closed': return 'bg-green-100 text-green-800';
      case 'lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Lead Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={onEdit}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-midnight-blue text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Edit className="h-3 w-3" />
              <span>Edit</span>
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{lead.name}</h3>
              <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full mt-2 ${getStatusColor(lead.status)}`}>
                {lead.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-medium">{lead.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{lead.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Location</p>
                  <p className="font-medium">{lead.location}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Lead Information</h4>
              
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Budget</p>
                  <p className="font-medium">₹{lead.budget.toLocaleString('en-IN')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Property Type</p>
                  <p className="font-medium capitalize">{lead.propertyType}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Source</p>
                  <p className="font-medium capitalize">{lead.source}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Timeline</h4>
            
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Created</p>
                <p className="font-medium">{format(lead.createdAt, 'MMMM dd, yyyy at hh:mm a')}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-600">Last Updated</p>
                <p className="font-medium">{format(lead.updatedAt, 'MMMM dd, yyyy at hh:mm a')}</p>
              </div>
            </div>
          </div>

          {lead.notes && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Notes</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{lead.notes}</p>
              </div>
            </div>
          )}

          {lead.communicationHistory.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900">Communication History</h4>
              <div className="space-y-3">
                {lead.communicationHistory.map((comm) => (
                  <div key={comm.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium capitalize">{comm.type}</span>
                      <span className="text-xs text-gray-500">
                        {format(comm.timestamp, 'MMM dd, yyyy hh:mm a')}
                      </span>
                    </div>
                    <p className="text-gray-700">{comm.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;