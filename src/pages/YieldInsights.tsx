import React, { useState, useMemo } from 'react';
import { TrendingUp, BarChart3, Calendar, MapPin, Filter } from 'lucide-react';

interface YieldData {
  id: string;
  crop: string;
  season: string;
  region: string;
  yieldPerHectare: number;
  previousYield: number;
  areaHectares: number;
  date: string;
}

interface YieldStats {
  totalYield: number;
  averageYield: number;
  growthRate: number;
  bestPerformingCrop: string;
  bestPerformingRegion: string;
}

const YieldInsights: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');

  // Mock data for yield insights
  const yieldData: YieldData[] = [
    { id: '1', crop: 'Wheat', season: 'Rabi 2023', region: 'Punjab', yieldPerHectare: 4.2, previousYield: 3.8, areaHectares: 120, date: '2023-04-15' },
    { id: '2', crop: 'Rice', season: 'Kharif 2023', region: 'West Bengal', yieldPerHectare: 3.8, previousYield: 3.5, areaHectares: 180, date: '2023-11-20' },
    { id: '3', crop: 'Cotton', season: 'Kharif 2023', region: 'Gujarat', yieldPerHectare: 2.1, previousYield: 1.9, areaHectares: 95, date: '2023-12-10' },
    { id: '4', crop: 'Sugarcane', season: 'Annual 2023', region: 'Maharashtra', yieldPerHectare: 85.5, previousYield: 82.3, areaHectares: 65, date: '2023-06-30' },
    { id: '5', crop: 'Maize', season: 'Kharif 2023', region: 'Karnataka', yieldPerHectare: 3.2, previousYield: 2.9, areaHectares: 110, date: '2023-10-25' },
    { id: '6', crop: 'Wheat', season: 'Rabi 2023', region: 'Haryana', yieldPerHectare: 4.5, previousYield: 4.1, areaHectares: 140, date: '2023-04-20' },
    { id: '7', crop: 'Rice', season: 'Kharif 2023', region: 'Andhra Pradesh', yieldPerHectare: 4.1, previousYield: 3.8, areaHectares: 160, date: '2023-11-15' },
  ];

  const filteredData = useMemo(() => {
    return yieldData.filter(item => {
      return (selectedSeason === 'all' || item.season === selectedSeason) &&
             (selectedRegion === 'all' || item.region === selectedRegion) &&
             (selectedCrop === 'all' || item.crop === selectedCrop);
    });
  }, [selectedSeason, selectedRegion, selectedCrop]);

  const stats: YieldStats = useMemo(() => {
    const totalYield = filteredData.reduce((sum, item) => sum + (item.yieldPerHectare * item.areaHectares), 0);
    const averageYield = filteredData.length > 0 ? filteredData.reduce((sum, item) => sum + item.yieldPerHectare, 0) / filteredData.length : 0;
    
    const previousTotal = filteredData.reduce((sum, item) => sum + (item.previousYield * item.areaHectares), 0);
    const growthRate = previousTotal > 0 ? ((totalYield - previousTotal) / previousTotal) * 100 : 0;

    // Find best performing crop and region
    const cropPerformance = filteredData.reduce((acc, item) => {
      acc[item.crop] = (acc[item.crop] || 0) + item.yieldPerHectare;
      return acc;
    }, {} as Record<string, number>);

    const regionPerformance = filteredData.reduce((acc, item) => {
      acc[item.region] = (acc[item.region] || 0) + item.yieldPerHectare;
      return acc;
    }, {} as Record<string, number>);

    const bestPerformingCrop = Object.entries(cropPerformance).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
    const bestPerformingRegion = Object.entries(regionPerformance).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

    return {
      totalYield,
      averageYield,
      growthRate,
      bestPerformingCrop,
      bestPerformingRegion
    };
  }, [filteredData]);

  const seasons = ['all', ...Array.from(new Set(yieldData.map(item => item.season)))];
  const regions = ['all', ...Array.from(new Set(yieldData.map(item => item.region)))];
  const crops = ['all', ...Array.from(new Set(yieldData.map(item => item.crop)))];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Yield Insights</h1>
        <p className="text-gray-600 dark:text-gray-400">Analyze crop yield performance across seasons and regions</p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {seasons.map(season => (
                <option key={season} value={season}>
                  {season === 'all' ? 'All Seasons' : season}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {regions.map(region => (
                <option key={region} value={region}>
                  {region === 'all' ? 'All Regions' : region}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>
                  {crop === 'all' ? 'All Crops' : crop}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Yield</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalYield.toLocaleString()} kg
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Yield/Hectare</p>
              <p className="text-2xl font-bold text-gray-90 dark:text-white">
                {stats.averageYield.toFixed(1)} kg
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Growth Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.growthRate > 0 ? '+' : ''}{stats.growthRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Best Region</p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {stats.bestPerformingRegion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Yield Data</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Season</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Region</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Yield (kg/ha)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Area (ha)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.crop}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.season}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.region}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{item.yieldPerHectare}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.areaHectares}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
        <h4 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">Key Insights</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Wheat shows the highest yield improvement in Rabi season</li>
          <li>• Punjab region leads in wheat production with 4.5 kg/ha</li>
          <li>• Overall growth rate of {stats.growthRate.toFixed(1)}% compared to previous season</li>
          <li>• Sugarcane continues to be the highest yielding crop by weight</li>
        </ul>
      </div>
    </div>
  );
};

export default YieldInsights;