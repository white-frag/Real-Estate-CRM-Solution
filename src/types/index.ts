export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'website' | 'magicbricks' | '99acres' | 'referral' | 'other';
  status: 'new' | 'contacted' | 'scheduled' | 'closed' | 'lost';
  budget: number;
  propertyType: 'apartment' | 'villa' | 'plot' | 'commercial';
  location: string;
  assignedAgent?: string;
  createdAt: Date;
  updatedAt: Date;
  notes: string;
  communicationHistory: Communication[];
}

export interface Communication {
  id: string;
  type: 'whatsapp' | 'email' | 'sms' | 'call';
  message: string;
  timestamp: Date;
  direction: 'inbound' | 'outbound';
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'agent' | 'marketing' | 'viewer';
  avatar?: string;
  leadsAssigned: number;
  conversions: number;
  isActive: boolean;
}

export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'villa' | 'plot' | 'commercial';
  price: number;
  location: string;
  area: number;
  bedrooms?: number;
  bathrooms?: number;
  images: string[];
  description: string;
  features: string[];
  isActive: boolean;
  createdAt: Date;
}

export interface DashboardStats {
  totalLeads: number;
  newLeads: number;
  conversions: number;
  revenue: number;
  conversionRate: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'marketing' | 'viewer';
  avatar?: string;
}