import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Lead, Agent, Property, User, Communication } from '../types';
import toast from 'react-hot-toast';

interface AppContextType {
  user: User | null;
  leads: Lead[];
  agents: Agent[];
  properties: Property[];
  language: 'en' | 'hi';
  notifications: boolean;
  setUser: (user: User | null) => void;
  setLeads: (leads: Lead[]) => void;
  setAgents: (agents: Agent[]) => void;
  setProperties: (properties: Property[]) => void;
  setLanguage: (language: 'en' | 'hi') => void;
  setNotifications: (enabled: boolean) => void;
  addLead: (lead: Lead) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  deleteLead: (leadId: string) => void;
  addAgent: (agent: Agent) => void;
  updateAgent: (agentId: string, updates: Partial<Agent>) => void;
  deleteAgent: (agentId: string) => void;
  addProperty: (property: Property) => void;
  updateProperty: (propertyId: string, updates: Partial<Property>) => void;
  deleteProperty: (propertyId: string) => void;
  addCommunication: (leadId: string, communication: Communication) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@realestate.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  });

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: '1',
      name: 'Priya Sharma',
      email: 'priya@example.com',
      phone: '+91 9876543210',
      source: 'website',
      status: 'new',
      budget: 5000000,
      propertyType: 'apartment',
      location: 'Gurgaon',
      assignedAgent: 'agent-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: 'Looking for 3BHK apartment',
      communicationHistory: []
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh@example.com',
      phone: '+91 9876543211',
      source: 'magicbricks',
      status: 'contacted',
      budget: 8000000,
      propertyType: 'villa',
      location: 'Noida',
      assignedAgent: 'agent-2',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: 'Interested in luxury villa',
      communicationHistory: []
    },
    {
      id: '3',
      name: 'Anita Verma',
      email: 'anita@example.com',
      phone: '+91 9876543212',
      source: '99acres',
      status: 'scheduled',
      budget: 3500000,
      propertyType: 'apartment',
      location: 'Delhi',
      assignedAgent: 'agent-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: 'Meeting scheduled for tomorrow',
      communicationHistory: []
    },
    {
      id: '4',
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      phone: '+91 9876543213',
      source: 'referral',
      status: 'closed',
      budget: 12000000,
      propertyType: 'villa',
      location: 'Mumbai',
      assignedAgent: 'agent-2',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: 'Deal closed successfully',
      communicationHistory: []
    },
    {
      id: '5',
      name: 'Sunita Patel',
      email: 'sunita@example.com',
      phone: '+91 9876543214',
      source: 'website',
      status: 'lost',
      budget: 2500000,
      propertyType: 'plot',
      location: 'Pune',
      assignedAgent: 'agent-1',
      createdAt: new Date(),
      updatedAt: new Date(),
      notes: 'Budget constraints',
      communicationHistory: []
    }
  ]);

  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'agent-1',
      name: 'Amit Singh',
      email: 'amit@realestate.com',
      phone: '+91 9876543212',
      role: 'agent',
      leadsAssigned: 25,
      conversions: 8,
      isActive: true
    },
    {
      id: 'agent-2',
      name: 'Neha Patel',
      email: 'neha@realestate.com',
      phone: '+91 9876543213',
      role: 'agent',
      leadsAssigned: 30,
      conversions: 12,
      isActive: true
    },
    {
      id: 'agent-3',
      name: 'Rohit Sharma',
      email: 'rohit@realestate.com',
      phone: '+91 9876543214',
      role: 'agent',
      leadsAssigned: 18,
      conversions: 5,
      isActive: false
    }
  ]);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: '1',
      title: 'Luxury 3BHK Apartment',
      type: 'apartment',
      price: 5500000,
      location: 'Gurgaon',
      area: 1200,
      bedrooms: 3,
      bathrooms: 2,
      images: ['https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400'],
      description: 'Modern apartment with all amenities',
      features: ['Parking', 'Gym', 'Swimming Pool'],
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '2',
      title: 'Premium Villa with Garden',
      type: 'villa',
      price: 12000000,
      location: 'Noida',
      area: 2500,
      bedrooms: 4,
      bathrooms: 3,
      images: ['https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400'],
      description: 'Spacious villa with private garden',
      features: ['Garden', 'Parking', 'Security', 'Club House'],
      isActive: true,
      createdAt: new Date()
    },
    {
      id: '3',
      title: 'Commercial Plot',
      type: 'plot',
      price: 8000000,
      location: 'Delhi',
      area: 1000,
      images: ['https://images.pexels.com/photos/1396125/pexels-photo-1396125.jpeg?auto=compress&cs=tinysrgb&w=400'],
      description: 'Prime location commercial plot',
      features: ['Corner Plot', 'Main Road', 'Metro Connectivity'],
      isActive: true,
      createdAt: new Date()
    }
  ]);

  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [notifications, setNotifications] = useState(true);

  const addLead = (lead: Lead) => {
    setLeads(prev => [...prev, lead]);
    toast.success('Lead added successfully!');
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId ? { ...lead, ...updates, updatedAt: new Date() } : lead
    ));
    toast.success('Lead updated successfully!');
  };

  const deleteLead = (leadId: string) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
    toast.success('Lead deleted successfully!');
  };

  const addAgent = (agent: Agent) => {
    setAgents(prev => [...prev, agent]);
    toast.success('Agent added successfully!');
  };

  const updateAgent = (agentId: string, updates: Partial<Agent>) => {
    setAgents(prev => prev.map(agent => 
      agent.id === agentId ? { ...agent, ...updates } : agent
    ));
    toast.success('Agent updated successfully!');
  };

  const deleteAgent = (agentId: string) => {
    setAgents(prev => prev.filter(agent => agent.id !== agentId));
    toast.success('Agent deleted successfully!');
  };

  const addProperty = (property: Property) => {
    setProperties(prev => [...prev, property]);
    toast.success('Property added successfully!');
  };

  const updateProperty = (propertyId: string, updates: Partial<Property>) => {
    setProperties(prev => prev.map(property => 
      property.id === propertyId ? { ...property, ...updates } : property
    ));
    toast.success('Property updated successfully!');
  };

  const deleteProperty = (propertyId: string) => {
    setProperties(prev => prev.filter(property => property.id !== propertyId));
    toast.success('Property deleted successfully!');
  };

  const addCommunication = (leadId: string, communication: Communication) => {
    setLeads(prev => prev.map(lead => 
      lead.id === leadId 
        ? { ...lead, communicationHistory: [...lead.communicationHistory, communication] }
        : lead
    ));
    toast.success('Message sent successfully!');
  };

  const logout = () => {
    setUser(null);
    toast.success('Logged out successfully!');
  };

  return (
    <AppContext.Provider value={{
      user,
      leads,
      agents,
      properties,
      language,
      notifications,
      setUser,
      setLeads,
      setAgents,
      setProperties,
      setLanguage,
      setNotifications,
      addLead,
      updateLead,
      deleteLead,
      addAgent,
      updateAgent,
      deleteAgent,
      addProperty,
      updateProperty,
      deleteProperty,
      addCommunication,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};