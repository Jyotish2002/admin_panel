import React, { useState, useEffect } from 'react';
import { Users, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { Chart } from '../components/Dashboard/Chart';
import { StatsCardSkeleton, ChartSkeleton, CardSkeleton } from '../components/Layout/Skeleton';
import { realtimeService } from '../utils/realtimeService';

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState<any[]>([]);
  const [chartsData, setChartsData] = useState<any>({});
  const [liveStats, setLiveStats] = useState({
    totalQueries: 12486,
    advisoriesSent: 247,
    activeFarmers: 8932,
    diseaseAlerts: 23
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setStatsData([
        {
          title: 'Total Farmer Queries',
          value: liveStats.totalQueries,
          change: '+18% from last week',
          changeType: 'positive' as const,
          icon: MessageCircle,
          color: 'primary' as const
        },
        {
          title: 'Advisories Sent',
          value: liveStats.advisoriesSent,
          change: '+12% from last month',
          changeType: 'positive' as const,
          icon: TrendingUp,
          color: 'secondary' as const
        },
        {
          title: 'Active Farmers',
          value: liveStats.activeFarmers,
          change: '+5% from last week',
          changeType: 'positive' as const,
          icon: Users,
          color: 'orange' as const
        },
        {
          title: 'Disease Alerts',
          value: liveStats.diseaseAlerts,
          change: '-8% from last week',
          changeType: 'positive' as const,
          icon: AlertTriangle,
          color: 'red' as const
        }
      ]);

      setChartsData({
        dailyQueries: [
          { label: 'Mon', value: 145, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
          { label: 'Tue', value: 198, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
          { label: 'Wed', value: 167, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
          { label: 'Thu', value: 223, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
          { label: 'Fri', value: 189, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
          { label: 'Sat', value: 134, color: 'bg-gradient-to-r from-primary-500 to-primary-600' },
          { label: 'Sun', value: 156, color: 'bg-gradient-to-r from-primary-500 to-primary-600' }
        ],
        queryTypes: [
          { label: 'Crop Issues', value: 35, color: '#22c55e' },
          { label: 'Disease', value: 28, color: '#16a34a' },
          { label: 'Weather', value: 20, color: '#15803d' },
          { label: 'Market Price', value: 17, color: '#84cc16' }
        ],
        topCrops: [
          { label: 'Wheat', value: 1245, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
          { label: 'Rice', value: 987, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
          { label: 'Maize', value: 756, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
          { label: 'Cotton', value: 543, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' },
          { label: 'Sugarcane', value: 432, color: 'bg-gradient-to-r from-secondary-500 to-secondary-600' }
        ]
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe((update) => {
      setLiveStats(prev => ({
        totalQueries: prev.totalQueries + (update.type === 'query' ? 1 : 0),
        advisoriesSent: prev.advisoriesSent + (update.type === 'advisory' ? 1 : 0),
        activeFarmers: prev.activeFarmers + (update.type === 'query' ? Math.random() > 0.9 ? 1 : 0 : 0),
        diseaseAlerts: prev.diseaseAlerts + (update.type === 'hotspot' ? 1 : 0)
      }));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor farmer activities and agricultural trends</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatsCardSkeleton key={index} />
          ))
        ) : (
          statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))
        )}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {isLoading ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <Chart
              title="Daily Farmer Queries"
              data={chartsData.dailyQueries}
              type="bar"
            />
            <Chart
              title="Query Types Distribution"
              data={chartsData.queryTypes}
              type="pie"
            />
          </>
        )}
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <Chart
            title="Most Discussed Crops"
            data={chartsData.topCrops}
            type="bar"
          />
        )}
        
        {isLoading ? (
          <CardSkeleton />
        ) : (
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
        )}
      </div>
    </div>
  );
}