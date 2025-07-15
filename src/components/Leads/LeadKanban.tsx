import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Phone, Mail, MapPin, User, DollarSign } from 'lucide-react';
import { Lead } from '../../types';
import { useApp } from '../../context/AppContext';

const LeadKanban: React.FC = () => {
  const { leads, updateLead } = useApp();

  const columns = {
    new: { title: 'New Leads', color: 'border-blue-200 bg-blue-50' },
    contacted: { title: 'Contacted', color: 'border-yellow-200 bg-yellow-50' },
    scheduled: { title: 'Scheduled', color: 'border-purple-200 bg-purple-50' },
    closed: { title: 'Closed', color: 'border-green-200 bg-green-50' },
    lost: { title: 'Lost', color: 'border-red-200 bg-red-50' }
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination || destination.droppableId === source.droppableId) {
      return;
    }

    updateLead(draggableId, { status: destination.droppableId as Lead['status'] });
  };

  const getLeadsByStatus = (status: string) => {
    return leads.filter(lead => lead.status === status);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {Object.entries(columns).map(([status, config]) => (
          <div key={status} className={`border-2 rounded-lg ${config.color} p-4`}>
            <h3 className="font-semibold text-gray-900 mb-4">
              {config.title} ({getLeadsByStatus(status).length})
            </h3>
            <Droppable droppableId={status}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-32 ${snapshot.isDraggingOver ? 'bg-white/50' : ''} rounded`}
                >
                  {getLeadsByStatus(status).map((lead, index) => (
                    <Draggable key={lead.id} draggableId={lead.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-3 ${
                            snapshot.isDragging ? 'shadow-lg' : ''
                          } hover:shadow-md transition-shadow cursor-move`}
                        >
                          <div className="space-y-2">
                            <h4 className="font-medium text-gray-900">{lead.name}</h4>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="h-3 w-3 mr-1" />
                              <span className="truncate">{lead.phone}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="h-3 w-3 mr-1" />
                              <span className="truncate">{lead.email}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <MapPin className="h-3 w-3 mr-1" />
                              <span className="truncate">{lead.location}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-gray-600">
                              <DollarSign className="h-3 w-3 mr-1" />
                              <span>{formatCurrency(lead.budget)}</span>
                            </div>
                            
                            {lead.assignedAgent && (
                              <div className="flex items-center text-sm text-gray-600">
                                <User className="h-3 w-3 mr-1" />
                                <span className="truncate">Agent ID: {lead.assignedAgent}</span>
                              </div>
                            )}
                            
                            <div className="pt-2 border-t border-gray-100">
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                                {lead.propertyType}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default LeadKanban;