import React from 'react';
import {
  Home,
  MessageSquare,
  TrendingUp,
  BarChart3,
  MapPin,
  Megaphone,
  FileText,
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
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-700 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}