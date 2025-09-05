import React from 'react';

interface ChartProps {
  title: string;
  data: { label: string; value: number; color?: string }[];
  type: 'bar' | 'pie' | 'line';
}

export function Chart({ title, data, type }: ChartProps) {
  if (type === 'bar') {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-20 text-sm text-gray-600 font-medium">{item.label}</div>
              <div className="flex-1">
                <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ${
                      item.color || 'bg-blue-500'
                    }`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  />
                </div>
              </div>
              <div className="w-12 text-sm font-semibold text-gray-900">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'pie') {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{title}</h3>
        <div className="flex items-center justify-center">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {data.reduce((acc, item, index) => {
                const percentage = (item.value / total) * 100;
                const circumference = 2 * Math.PI * 45;
                const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                const strokeDashoffset = -acc.offset;
                
                acc.elements.push(
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={item.color || `hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth="10"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000"
                  />
                );
                
                acc.offset += (percentage / 100) * circumference;
                return acc;
              }, { elements: [] as JSX.Element[], offset: 0 }).elements}
            </svg>
          </div>
        </div>
        <div className="mt-6 space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color || `hsl(${index * 60}, 70%, 50%)` }}
                />
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {((item.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <div>Chart type not implemented</div>;
}