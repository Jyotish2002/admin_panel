import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { mockHotspots } from '../utils/mockData';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle, MapPin, Send } from 'lucide-react';

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

  // Custom icon for severity
  const createCustomIcon = (severity: string) => {
    const iconUrl = `data:image/svg+xml;base64,${btoa(`
      <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
        <circle cx="15" cy="15" r="12" fill="${
          severity === 'high' ? '#ef4444' : 
          severity === 'medium' ? '#f97316' : 
          severity === 'low' ? '#eab308' : '#6b7280'
        }" stroke="white" stroke-width="3"/>
        <circle cx="15" cy="15" r="6" fill="white" fill-opacity="0.8"/>
      </svg>
    `)}`;

    return new Icon({
      iconUrl,
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  // Mock coordinates for Indian states
  const stateCoordinates: Record<string, [number, number]> = {
    'Punjab': [31.1471, 75.3412],
    'Haryana': [29.2387, 76.4313],
    'Uttar Pradesh': [27.1301, 80.3467],
    'Maharashtra': [19.6633, 75.3009],
    'Gujarat': [22.3094, 72.1362],
    'Tamil Nadu': [11.1271, 78.6569],
    'Kerala': [10.8505, 76.2711],
    'Karnataka': [15.3173, 75.7139],
    'Andhra Pradesh': [15.9129, 79.7400],
    'West Bengal': [22.9868, 87.8550],
    'Bihar': [25.6794, 85.5953],
    'Madhya Pradesh': [23.4733, 77.9475]
  };

  const hotspotsWithCoords = filteredHotspots.map(hotspot => ({
    ...hotspot,
    coordinates: stateCoordinates[hotspot.state] || [20.5937, 78.9629]
  }));

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Disease Hotspot Map</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Monitor and manage agricultural disease outbreaks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <div className="card p-4 lg:p-6 h-96">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Interactive Disease Map</h3>
              <div className="flex space-x-2">
                <select
                  value={filterCrop}
                  onChange={(e) => setFilterCrop(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Crops</option>
                  {crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
                <select
                  value={filterSeverity}
                  onChange={(e) => setFilterSeverity(e.target.value)}
                  className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">All Severity</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            {/* Map with Markers */}
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-80 relative overflow-hidden">
              <MapContainer
                center={[20.5937, 78.9629]}
                zoom={5}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                whenReady={() => {
                  setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                  }, 100);
                }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />

                {hotspotsWithCoords.map((hotspot) => (
                  <Marker
                    key={hotspot.id}
                    position={hotspot.coordinates}
                    icon={createCustomIcon(hotspot.severity)}
                    eventHandlers={{
                      click: () => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h4 className="font-semibold text-gray-900">{hotspot.disease}</h4>
                        <p className="text-sm text-gray-600">{hotspot.district}, {hotspot.state}</p>
                        <p className="text-sm text-gray-500">Crop: {hotspot.crop}</p>
                        <p className="text-sm">
                          Severity: <span className={`font-medium ${getSeverityColor(hotspot.severity).split(' ')[0]}`}>
                            {hotspot.severity.toUpperCase()}
                          </span>
                        </p>
                        <p className="text-sm text-gray-500">{hotspot.reportCount} reports</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>

        {/* Hotspots List */}
        <div className="card p-4 lg:p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Hotspots</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {filteredHotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedHotspot === hotspot.id
                    ? 'border-primary-300 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setSelectedHotspot(selectedHotspot === hotspot.id ? null : hotspot.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{hotspot.disease}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{hotspot.district}, {hotspot.state}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(hotspot.severity)}`}>
                    {hotspot.severity.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full text-xs font-medium">
                    {hotspot.crop}
                  </span>
                  <span>{hotspot.reportCount} reports</span>
                </div>
                
                {selectedHotspot === hotspot.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200">
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

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">High Risk Areas</h3>
              <p className="text-2xl font-bold text-red-600">
                {filteredHotspots.filter(h => h.severity === 'high').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Medium Risk Areas</h3>
              <p className="text-2xl font-bold text-orange-600">
                {filteredHotspots.filter(h => h.severity === 'medium').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Reports</h3>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                {filteredHotspots.reduce((sum, h) => sum + h.reportCount, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
