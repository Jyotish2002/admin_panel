import React from 'react';
import {
  Home,
  MessageSquare,
  TrendingUp,
  BarChart3,
  MapPin,
  Megaphone,
  FileText,
  Users
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'queries', label: 'Farmer Queries', icon: MessageSquare },
  { id: 'crops', label: 'Crop Trends', icon: TrendingUp },
  { id: 'yield', label: 'Yield Insights', icon: BarChart3 },
  { id: 'hotspots', label: 'Disease Map', icon: MapPin },
  { id: 'advisories', label: 'Advisories', icon: Megaphone },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 min-h-screen transition-colors">
      <nav className="p-6 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}