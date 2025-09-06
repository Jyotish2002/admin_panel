import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'orange' | 'red';
}

export function StatsCard({ title, value, change, changeType, icon: Icon, color }: StatsCardProps) {
  const colorClasses = {
    primary: 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800',
    secondary: 'bg-secondary-50 dark:bg-secondary-900/20 text-secondary-600 dark:text-secondary-400 border-secondary-200 dark:border-secondary-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-200 dark:border-orange-800',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800',
  };

  const changeColorClasses = {
    positive: 'text-primary-600 dark:text-primary-400',
    negative: 'text-red-600 dark:text-red-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  };

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value.toLocaleString()}</p>
          <p className={`text-sm mt-2 font-medium ${changeColorClasses[changeType]}`}>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl border ${colorClasses[color]} shadow-sm`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}