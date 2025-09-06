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
      color: 'primary' as const
    },
    {
      title: 'Advisories Sent',
      value: 247,
      change: '+12% from last month',
      changeType: 'positive' as const,
      icon: TrendingUp,
      color: 'secondary' as const
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
    { label: 'Mon', value: 145, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { label: 'Tue', value: 198, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { label: 'Wed', value: 167, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { label: 'Thu', value: 223, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { label: 'Fri', value: 189, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { label: 'Sat', value: 134, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
    { label: 'Sun', value: 156, color: 'bg-gradient-to-r from-primary-500 to-primary-600' }
  ];

  const queryTypesData = [
    { label: 'Crop Issues', value: 35, color: '#22c55e' },
    { label: 'Disease', value: 28, color: '#16a34a' },
    { label: 'Weather', value: 20, color: '#15803d' },
    { label: 'Market Price', value: 17, color: '#84cc16' }
  ];

  const topCropsData = [
    { label: 'Wheat', value: 1245, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
    { label: 'Rice', value: 987, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
    { label: 'Maize', value: 756, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
    { label: 'Cotton', value: 543, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
    { label: 'Sugarcane', value: 432, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' }
  ];

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor farmer activities and agricultural trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <Chart
          title="Most Discussed Crops"
          data={topCropsData}
          type="bar"
        />
        
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New disease outbreak reported</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Yellow rust detected in Punjab wheat fields</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg">
              <div className="w-2 h-2 bg-secondary-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Advisory sent successfully</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Monsoon preparation guide sent to 1,200 farmers</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">4 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">High query volume alert</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Crop disease queries increased by 45%</p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">6 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}