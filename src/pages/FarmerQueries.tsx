import React, { useState } from 'react';
import { Search, Filter, Download, ThumbsUp, ThumbsDown, Calendar, MapPin } from 'lucide-react';
import { mockQueries } from '../utils/mockData';

export function FarmerQueries() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterState, setFilterState] = useState('');
  const [filterCrop, setFilterCrop] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredQueries = mockQueries.filter(query => {
    return (
      query.query.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterState === '' || query.state === filterState) &&
      (filterCrop === '' || query.crop === filterCrop) &&
      (filterType === '' || query.queryType === filterType)
    );
  });

  const states = [...new Set(mockQueries.map(q => q.state))];
  const crops = [...new Set(mockQueries.map(q => q.crop))];
  const queryTypes = [...new Set(mockQueries.map(q => q.queryType))];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'answered': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getQueryTypeColor = (type: string) => {
    switch (type) {
      case 'disease': return 'bg-red-100 text-red-800';
      case 'crop': return 'bg-green-100 text-green-800';
      case 'weather': return 'bg-blue-100 text-blue-800';
      case 'market': return 'bg-orange-100 text-orange-800';
      case 'irrigation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Farmer Queries Analytics</h1>
        <p className="text-gray-600 mt-2">Analyze farmer questions and AI responses</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All States</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          
          <select
            value={filterCrop}
            onChange={(e) => setFilterCrop(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Crops</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {queryTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
        
        <div className="flex justify-end mt-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Query Results */}
      <div className="space-y-4">
        {filteredQueries.map((query) => (
          <div key={query.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{query.farmerName}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{query.district}, {query.state}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{query.timestamp.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getQueryTypeColor(query.queryType)}`}>
                  {query.queryType.charAt(0).toUpperCase() + query.queryType.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(query.status)}`}>
                  {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">Query:</p>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg italic">"{query.query}"</p>
            </div>
            
            <div className="mb-4">
              <p className="text-gray-700 font-medium mb-2">AI Response:</p>
              <p className="text-gray-600 bg-blue-50 p-3 rounded-lg">{query.response}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Crop:</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                  {query.crop}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Feedback:</span>
                {query.feedback === 'positive' && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span className="text-sm font-medium">Helpful</span>
                  </div>
                )}
                {query.feedback === 'negative' && (
                  <div className="flex items-center space-x-1 text-red-600">
                    <ThumbsDown className="h-4 w-4" />
                    <span className="text-sm font-medium">Not Helpful</span>
                  </div>
                )}
                {query.feedback === null && (
                  <span className="text-gray-400 text-sm">No feedback</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}