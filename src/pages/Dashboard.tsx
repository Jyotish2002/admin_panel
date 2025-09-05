import React from 'react';
import { Users, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { Chart } from '../components/Dashboard/Chart';

export function Dashboard() {
  const statsData = [
    {
      title: 'Total Farmer Queries',
      value: 12486,
      change: '+18% from last week',
      changeType: 'positive' as const,
      icon: MessageCircle,
      color: 'blue' as const
    },
    {
      title: 'Advisories Sent',
      value: 247,
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'green' as const
    },
    {
      title: 'Active Farmers',
      value: 8932,
      change: '+5% from last week',
      changeType: 'positive' as const,
      icon: Users,
      color: 'orange' as const
    },
    {
      title: 'Disease Alerts',
      value: 23,
      change: '-8% from last week',
      changeType: 'positive' as const,
      icon: AlertTriangle,
      color: 'red' as const
    }
  ];

  const dailyQueriesData = [
    { label: 'Mon', value: 145, color: 'bg-blue-500' },
    { label: 'Tue', value: 198, color: 'bg-blue-500' },
    { label: 'Wed', value: 167, color: 'bg-blue-500' },
    { label: 'Thu', value: 223, color: 'bg-blue-500' },
    { label: 'Fri', value: 189, color: 'bg-blue-500' },
    { label: 'Sat', value: 134, color: 'bg-blue-500' },
    { label: 'Sun', value: 156, color: 'bg-blue-500' }
  ];

  const queryTypesData = [
    { label: 'Crop Issues', value: 35, color: '#3B82F6' },
    { label: 'Disease', value: 28, color: '#EF4444' },
    { label: 'Weather', value: 20, color: '#10B981' },
    { label: 'Market Price', value: 17, color: '#F59E0B' }
  ];

  const topCropsData = [
    { label: 'Wheat', value: 1245, color: 'bg-green-500' },
    { label: 'Rice', value: 987, color: 'bg-green-500' },
    { label: 'Maize', value: 756, color: 'bg-green-500' },
    { label: 'Cotton', value: 543, color: 'bg-green-500' },
    { label: 'Sugarcane', value: 432, color: 'bg-green-500' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">Monitor farmer activities and agricultural trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Chart
          title="Daily Farmer Queries"
          data={dailyQueriesData}
          type="bar"
        />
        <Chart
          title="Query Types Distribution"
          data={queryTypesData}
          type="pie"
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart
          title="Most Discussed Crops"
          data={topCropsData}
          type="bar"
        />
        
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">New disease outbreak reported</p>
                <p className="text-xs text-gray-600">Yellow rust detected in Punjab wheat fields</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Advisory sent successfully</p>
                <p className="text-xs text-gray-600">Monsoon preparation guide sent to 1,200 farmers</p>
                <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">High query volume alert</p>
                <p className="text-xs text-gray-600">Crop disease queries increased by 45%</p>
                <p className="text-xs text-gray-500 mt-1">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}