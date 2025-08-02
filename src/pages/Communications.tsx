import React, { useState } from 'react';
import { MessageSquare, Mail, Phone, Send, Clock, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Communication } from '../types';

const Communications: React.FC = () => {
  const { leads, addCommunication } = useApp();
  const [selectedLead, setSelectedLead] = useState<string>('');
  const [message, setMessage] = useState('');
  const [communicationType, setCommunicationType] = useState<'whatsapp' | 'email' | 'sms'>('whatsapp');
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!selectedLead || !message.trim()) return;
    
    setIsSending(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const communication: Communication = {
      id: Math.random().toString(36).substr(2, 9),
      type: communicationType,
      message: message.trim(),
      timestamp: new Date(),
      direction: 'outbound'
    };
    
    addCommunication(selectedLead, communication);
    setMessage('');
    setIsSending(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'whatsapp':
        return <MessageSquare className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      case 'sms':
        return <Phone className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const templates = [
    {
      title: 'Welcome Message',
      content: 'Thank you for your interest in our properties. We will get back to you soon with the best options matching your requirements!'
    },
    {
      title: 'Follow Up',
      content: 'Hi! Just following up on your property inquiry. Are you available for a quick call to discuss your requirements?'
    },
    {
      title: 'Property Update',
      content: 'We have new properties matching your requirements. Would you like to schedule a visit this weekend?'
    },
    {
      title: 'Appointment Reminder',
      content: 'This is a reminder about your property viewing appointment tomorrow at 2 PM. Please let us know if you need to reschedule.'
    },
    {
      title: 'Price Update',
      content: 'Great news! The property you were interested in has a special offer this month. Would you like to know more details?'
    },
    {
      title: 'Documentation Request',
      content: 'To proceed with your property booking, we need a few documents. Could you please share your ID proof and income certificate?'
    }
  ];

  const selectedLeadData = leads.find(lead => lead.id === selectedLead);

  return (
    <div className="space-y-4 lg:space-y-6">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Communications</h1>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">Send WhatsApp messages, emails, and SMS to your leads</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
          </div>
          <div className="p-4 lg:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Lead *
              </label>
              <select
                value={selectedLead}
                onChange={(e) => setSelectedLead(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent text-sm"
              >
                <option value="">Choose a lead...</option>
                {leads.map((lead) => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} - {lead.phone} ({lead.status})
                  </option>
                ))}
              </select>
            </div>

            {selectedLeadData && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 text-sm lg:text-base">{selectedLeadData.name}</h4>
                <p className="text-xs lg:text-sm text-blue-700">
                  {selectedLeadData.email} • {selectedLeadData.phone}
                </p>
                <p className="text-xs lg:text-sm text-blue-600">
                  Looking for {selectedLeadData.propertyType} in {selectedLeadData.location}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Communication Type
              </label>
              <div className="flex flex-wrap gap-2 lg:gap-4">
                {['whatsapp', 'email', 'sms'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCommunicationType(type as any)}
                    className={`flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-lg border transition-colors text-sm ${
                      communicationType === type
                        ? 'border-midnight-blue bg-midnight-blue text-white'
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {getIcon(type)}
                    <span className="capitalize">{type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Type your message here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-midnight-blue focus:border-transparent text-sm"
              />
              <div className="text-right text-xs lg:text-sm text-gray-500 mt-1">
                {message.length}/500 characters
              </div>
            </div>

            <button
              onClick={handleSendMessage}
              disabled={!selectedLead || !message.trim() || isSending}
              className="flex items-center justify-center space-x-2 bg-midnight-blue text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              {isSending ? (
                <>
                  <Clock className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Quick Templates</h3>
          </div>
          <div className="p-4 lg:p-6 space-y-3 max-h-96 overflow-y-auto">
            {templates.map((template, index) => (
              <div
                key={index}
                className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setMessage(template.content)}
              >
                <h4 className="font-medium text-gray-900 text-sm">{template.title}</h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{template.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Communications</h3>
        </div>
        <div className="p-4 lg:p-6">
          {leads.some(lead => lead.communicationHistory.length > 0) ? (
            <div className="space-y-4">
              {leads
                .filter(lead => lead.communicationHistory.length > 0)
                .slice(0, 5)
                .map(lead => (
                  <div key={lead.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 space-y-2 sm:space-y-0">
                      <h4 className="font-medium text-gray-900 text-sm lg:text-base">{lead.name}</h4>
                      <span className="text-xs lg:text-sm text-gray-500">
                        {lead.communicationHistory.length} message(s)
                      </span>
                    </div>
                    <div className="space-y-2">
                      {lead.communicationHistory.slice(-2).map(comm => (
                        <div key={comm.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {getIcon(comm.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-xs lg:text-sm font-medium capitalize">{comm.type}</span>
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span className="text-xs text-gray-500">
                                {comm.timestamp.toLocaleString()}
                              </span>
                            </div>
                            <p className="text-xs lg:text-sm text-gray-600 mt-1 break-words">{comm.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm lg:text-base">No communication history available</p>
              <p className="text-xs lg:text-sm">Start sending messages to see your communication history here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Communications;