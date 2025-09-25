import React, { useState, useEffect } from 'react';
import { TrendingUp, BarChart3, Calendar, MapPin, Filter, Download } from 'lucide-react';
import { Chart } from '../components/Dashboard/Chart';
import { StatsCardSkeleton, ChartSkeleton } from '../components/Layout/Skeleton';

interface CropTrend {
  crop: string;
  queries: number;
  growth: number;
  regions: string[];
  season: 'kharif' | 'rabi' | 'summer';
}

interface CropData {
  label: string;
  value: number;
  color: string;
}

export function CropTrends() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState<'all' | 'kharif' | 'rabi' | 'summer'>('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [cropTrends, setCropTrends] = useState<CropTrend[]>([]);
  const [trendsData, setTrendsData] = useState<{
    popularCrops: CropData[];
    seasonalTrends: CropData[];
    regionalDistribution: CropData[];
  }>({
    popularCrops: [],
    seasonalTrends: [],
    regionalDistribution: []
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      const mockCropTrends: CropTrend[] = [
        {
          crop: 'Wheat',
          queries: 1245,
          growth: 18,
          regions: ['Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh'],
          season: 'rabi'
        },
        {
          crop: 'Rice',
          queries: 987,
          growth: 12,
          regions: ['West Bengal', 'Bihar', 'Andhra Pradesh', 'Tamil Nadu'],
          season: 'kharif'
        },
        {
          crop: 'Maize',
          queries: 756,
          growth: 25,
          regions: ['Karnataka', 'Maharashtra', 'Rajasthan', 'Telangana'],
          season: 'kharif'
        },
        {
          crop: 'Cotton',
          queries: 543,
          growth: 8,
          regions: ['Gujarat', 'Maharashtra', 'Telangana', 'Andhra Pradesh'],
          season: 'kharif'
        },
        {
          crop: 'Sugarcane',
          queries: 432,
          growth: 15,
          regions: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
          season: 'summer'
        },
        {
          crop: 'Pulses',
          queries: 321,
          growth: 22,
          regions: ['Madhya Pradesh', 'Rajasthan', 'Maharashtra', 'Karnataka'],
          season: 'rabi'
        }
      ];

      setCropTrends(mockCropTrends);

      setTrendsData({
        popularCrops: mockCropTrends
          .sort((a, b) => b.queries - a.queries)
          .slice(0, 5)
          .map(crop => ({
            label: crop.crop,
            value: crop.queries,
            color: 'bg-gradient-to-r from-primary-500 to-primary-600'
          })),
        seasonalTrends: [
          { label: 'Kharif', value: 2300, color: 'bg-gradient-to-r from-green-500 to-green-600' },
          { label: 'Rabi', value: 1800, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
          { label: 'Summer', value: 800, color: 'bg-gradient-to-r from-orange-500 to-orange-600' }
        ],
        regionalDistribution: [
          { label: 'North', value: 1200, color: 'bg-gradient-to-r from-red-500 to-red-600' },
          { label: 'South', value: 980, color: 'bg-gradient-to-r from-purple-500 to-purple-600' },
          { label: 'East', value: 850, color: 'bg-gradient-to-r from-indigo-500 to-indigo-600' },
          { label: 'West', value: 720, color: 'bg-gradient-to-r from-pink-500 to-pink-600' },
          { label: 'Central', value: 650, color: 'bg-gradient-to-r from-teal-500 to-teal-600' }
        ]
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredTrends = cropTrends.filter(trend => {
    const seasonMatch = selectedSeason === 'all' || trend.season === selectedSeason;
    const regionMatch = selectedRegion === 'all' || trend.regions.includes(selectedRegion);
    return seasonMatch && regionMatch;
  });

  const getGrowthColor = (growth: number) => {
    if (growth > 20) return 'text-green-600 dark:text-green-400';
    if (growth > 10) return 'text-blue-600 dark:text-blue-400';
    if (growth > 0) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return '↗';
    if (growth < 0) return '↘';
    return '→';
  };

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Crop Recommendation Trends</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Analyze crop popularity and farmer query patterns across regions
            </p>
          </div>
          
          <button className="btn-secondary flex items-center space-x-2 text-sm lg:text-base mt-4 lg:mt-0">
            <Download className="h-4 w-4" />
            <span>Export Report</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value as any)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Seasons</option>
              <option value="kharif">Kharif</option>
              <option value="rabi">Rabi</option>
              <option value="summer">Summer</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-gray-500" />
            <select 
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Regions</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <StatsCardSkeleton key={index} />
          ))
        ) : (
          <>
            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Queries</h3>
                  <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {filteredTrends.reduce((sum, trend) => sum + trend.queries, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Avg Growth</h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {Math.round(filteredTrends.reduce((sum, trend) => sum + trend.growth, 0) / filteredTrends.length)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg">
                  <Calendar className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Crops</h3>
                  <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                    {filteredTrends.length}
                  </p>
                </div>
              </div>
            </div>
          </>
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
              title="Most Popular Crops"
              data={trendsData.popularCrops}
              type="bar"
            />
            <Chart
              title="Seasonal Distribution"
              data={trendsData.seasonalTrends}
              type="pie"
            />
          </>
        )}
      </div>

      {/* Crop Trends Table */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Crop Performance Details</h3>
        
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Crop</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Queries</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Growth</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Season</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">Regions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrends.map((trend, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">
                      {trend.crop}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">
                      {trend.queries.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`font-medium ${getGrowthColor(trend.growth)}`}>
                        {getGrowthIcon(trend.growth)} {trend.growth}%
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium">
                        {trend.season}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex flex-wrap gap-1">
                        {trend.regions.slice(0, 2).map(region => (
                          <span key={region} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-xs font-medium">
                            {region}
                          </span>
                        ))}
                        {trend.regions.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                            +{trend.regions.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}