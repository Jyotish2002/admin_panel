import { mockQueries, mockAdvisories, mockHotspots, mockYieldData } from './mockData';

export interface RealTimeUpdate {
  type: 'query' | 'advisory' | 'hotspot' | 'yield';
  data: any;
  timestamp: number;
}

export class RealTimeService {
  private callbacks: ((update: RealTimeUpdate) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  connect() {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      this.generateRandomUpdate();
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(callback: (update: RealTimeUpdate) => void) {
    this.callbacks.push(callback);
    return () => {
      this.callbacks = this.callbacks.filter(cb => cb !== callback);
    };
  }

  private generateRandomUpdate() {
    const types: RealTimeUpdate['type'][] = ['query', 'advisory', 'hotspot', 'yield'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    let data: any;
    
    switch (type) {
      case 'query':
        data = {
          id: Date.now(),
          farmerName: `Farmer ${Math.floor(Math.random() * 1000)}`,
          crop: ['Wheat', 'Rice', 'Maize', 'Cotton'][Math.floor(Math.random() * 4)],
          issue: ['Disease', 'Weather', 'Pest', 'Soil'][Math.floor(Math.random() * 4)],
          status: 'pending'
        };
        break;
      case 'advisory':
        data = {
          id: Date.now(),
          title: `Advisory ${Math.floor(Math.random() * 100)}`,
          crops: ['Wheat', 'Rice'][Math.floor(Math.random() * 2)],
          regions: ['Punjab', 'Sindh'][Math.floor(Math.random() * 2)],
          urgency: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)]
        };
        break;
      case 'hotspot':
        data = {
          id: Date.now(),
          disease: ['Rust', 'Blight', 'Wilt'][Math.floor(Math.random() * 3)],
          crop: ['Wheat', 'Rice', 'Maize'][Math.floor(Math.random() * 3)],
          region: ['Punjab', 'Sindh', 'KPK'][Math.floor(Math.random() * 3)],
          severity: Math.floor(Math.random() * 100)
        };
        break;
      case 'yield':
        data = {
          crop: ['Wheat', 'Rice', 'Maize'][Math.floor(Math.random() * 3)],
          predictedYield: Math.floor(Math.random() * 1000) + 2000,
          confidence: Math.floor(Math.random() * 100)
        };
        break;
    }

    const update: RealTimeUpdate = {
      type,
      data,
      timestamp: Date.now()
    };

    this.callbacks.forEach(callback => callback(update));
  }

  // Simulate historical data with real-time updates
  getHistoricalData(type: RealTimeUpdate['type'], hours: number = 24) {
    const now = Date.now();
    const data = [];
    
    for (let i = 0; i < hours; i++) {
      const timestamp = now - (i * 3600000);
      const value = Math.floor(Math.random() * 100) + 50;
      data.push({ timestamp, value });
    }
    
    return data.reverse();
  }
}

export const realtimeService = new RealTimeService();