import React, { useState } from 'react';
import { AlertTriangle, MapPin, Calendar, Filter, Send } from 'lucide-react';
import { mockHotspots } from '../utils/mockData';

export function DiseaseHotspots() {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [filterCrop, setFilterCrop] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');

  const filteredHotspots = mockHotspots.filter(hotspot => {
    return (
      (filterCrop === '' || hotspot.crop === filterCrop) &&
      (filterSeverity === '' || hotspot.severity === filterSeverity)
    );
  });

  const crops = [...new Set(mockHotspots.map(h => h.crop))];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityDotColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Disease Hotspot Map</h1>
        <p className="text-gray-600 mt-2">Monitor and manage agricultural disease outbreaks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Interactive Disease Map</h3>
              <div className="flex space-x-2">
                <select
                  value={filterCrop}
                  onChange={(e) => setFilterCrop(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Crops</option>
                  {crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Severity</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            {/* Map visualization placeholder */}
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Interactive Map View</p>
                <p className="text-sm text-gray-500 mt-1">Disease hotspots marked by severity</p>
              </div>
              
              {/* Sample hotspot markers */}
              {filteredHotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className={`absolute w-4 h-4 rounded-full cursor-pointer ${getSeverityDotColor(hotspot.severity)} opacity-80 hover:opacity-100 hover:scale-125 transition-all`}
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + index * 10}%`
                  }}
                  onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Hotspots List */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Hotspots</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {filteredHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedHotspot === hotspot.id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{hotspot.disease}</h4>
                    <p className="text-sm text-gray-600">{hotspot.district}, {hotspot.state}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(hotspot.severity)}`}>
                    {hotspot.severity.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                    {hotspot.crop}
                  </span>
                  <span>{hotspot.reportCount} reports</span>
                </div>
                
                {selectedHotspot === hotspot.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      <Send className="h-4 w-4" />
                      <span>Send Alert to Region</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">High Risk Areas</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredHotspots.filter(h => h.severity === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Medium Risk Areas</h3>
              <p className="text-2xl font-bold text-orange-600">
                {filteredHotspots.filter(h => h.severity === 'medium').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Reports</h3>
              <p className="text-2xl font-bold text-green-600">
                {filteredHotspots.reduce((sum, h) => sum + h.reportCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}