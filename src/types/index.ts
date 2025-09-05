export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'expert';
  avatar?: string;
}

export interface FarmerQuery {
  id: string;
  farmerId: string;
  farmerName: string;
  query: string;
  response: string;
  crop: string;
  state: string;
  district: string;
  queryType: 'crop' | 'disease' | 'weather' | 'market' | 'irrigation';
  timestamp: Date;
  feedback: 'positive' | 'negative' | null;
  status: 'pending' | 'answered' | 'resolved';
}

export interface Advisory {
  id: string;
  title: string;
  message: string;
  crop: string;
  regions: string[];
  createdBy: string;
  expertName: string;
  sentDate: Date;
  readCount: number;
  status: 'draft' | 'pending_approval' | 'approved' | 'sent' | 'rejected' | 'scheduled';
  approvedBy?: string;
  rejectionReason?: string;
}

export interface DiseaseHotspot {
  id: string;
  state: string;
  district: string;
  crop: string;
  disease: string;
  severity: 'low' | 'medium' | 'high';
  reportCount: number;
  coordinates: [number, number];
}

export interface YieldData {
  region: string;
  crop: string;
  predicted: number;
  actual?: number;
  year: number;
  season: 'kharif' | 'rabi' | 'summer';
}