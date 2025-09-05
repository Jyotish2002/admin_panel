import { FarmerQuery, Advisory, DiseaseHotspot, YieldData } from '../types';

export const mockQueries: FarmerQuery[] = [
  {
    id: '1',
    farmerId: 'F001',
    farmerName: 'Ram Kumar',
    query: 'My wheat crop is showing yellow spots. What should I do?',
    response: 'This appears to be yellow rust. Apply fungicide spray and ensure proper drainage.',
    crop: 'Wheat',
    state: 'Punjab',
    district: 'Ludhiana',
    queryType: 'disease',
    timestamp: new Date('2024-01-15'),
    feedback: 'positive',
    status: 'resolved'
  },
  {
    id: '2',
    farmerId: 'F002',
    farmerName: 'Priya Sharma',
    query: 'Best time to plant rice in Bihar?',
    response: 'Plant rice during monsoon season, typically June-July in Bihar.',
    crop: 'Rice',
    state: 'Bihar',
    district: 'Patna',
    queryType: 'crop',
    timestamp: new Date('2024-01-14'),
    feedback: 'positive',
    status: 'answered'
  },
  {
    id: '3',
    farmerId: 'F003',
    farmerName: 'Suresh Patel',
    query: 'Market price for maize today?',
    response: 'Current maize price: ₹2,200/quintal in Madhya Pradesh markets.',
    crop: 'Maize',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    queryType: 'market',
    timestamp: new Date('2024-01-13'),
    feedback: null,
    status: 'answered'
  }
];

export const mockAdvisories: Advisory[] = [
  {
    id: 'A001',
    title: 'Pest Alert: Cotton Bollworm',
    message: 'Cotton farmers in Gujarat should spray insecticide immediately. Bollworm infestation detected.',
    crop: 'Cotton',
    regions: ['Gujarat', 'Maharashtra'],
    createdBy: 'Dr. Agri Expert',
    expertName: 'Dr. Agri Expert',
    sentDate: new Date('2024-01-15'),
    readCount: 1250,
    status: 'sent',
    approvedBy: 'Dr. Agriculture Admin'
  },
  {
    id: 'A002',
    title: 'Weather Warning: Heavy Rain Expected',
    message: 'Harvest ready crops immediately. Heavy rainfall predicted in next 48 hours.',
    crop: 'All Crops',
    regions: ['Kerala', 'Tamil Nadu'],
    createdBy: 'Govt Official',
    expertName: 'Expert Analyst',
    sentDate: new Date('2024-01-14'),
    readCount: 890,
    status: 'sent',
    approvedBy: 'Dr. Agriculture Admin'
  },
  {
    id: 'A003',
    title: 'Fertilizer Application Guidelines',
    message: 'Apply nitrogen-rich fertilizer for wheat crops in the next 2 weeks for optimal growth.',
    crop: 'Wheat',
    regions: ['Punjab', 'Haryana'],
    createdBy: 'Expert Analyst',
    expertName: 'Expert Analyst',
    sentDate: new Date('2024-01-16'),
    readCount: 0,
    status: 'pending_approval'
  }
];

export const mockHotspots: DiseaseHotspot[] = [
  {
    id: 'H001',
    state: 'Punjab',
    district: 'Ludhiana',
    crop: 'Wheat',
    disease: 'Yellow Rust',
    severity: 'high',
    reportCount: 45,
    coordinates: [30.9, 75.85]
  },
  {
    id: 'H002',
    state: 'Maharashtra',
    district: 'Nashik',
    crop: 'Cotton',
    disease: 'Bollworm',
    severity: 'medium',
    reportCount: 23,
    coordinates: [19.99, 73.79]
  }
];

export const mockYieldData: YieldData[] = [
  {
    region: 'Punjab',
    crop: 'Wheat',
    predicted: 4500,
    actual: 4200,
    year: 2024,
    season: 'rabi'
  },
  {
    region: 'Bihar',
    crop: 'Rice',
    predicted: 3800,
    actual: 3950,
    year: 2024,
    season: 'kharif'
  }
];