import React, { useState, useEffect } from 'react';
import { X, Bell, TrendingUp, AlertTriangle, MessageCircle, Sprout } from 'lucide-react';
import { realtimeService, RealTimeUpdate } from '../../utils/realtimeService';

interface Notification {
  id: number;
  type: RealTimeUpdate['type'];
  message: string;
  timestamp: number;
  read: boolean;
}

interface RealTimeNotificationProps {
  maxNotifications?: number;
}

export function RealTimeNotification({ maxNotifications = 5 }: RealTimeNotificationProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const unsubscribe = realtimeService.subscribe((update: RealTimeUpdate) => {
      const message = getNotificationMessage(update);
      
      setNotifications(prev => [
        {
          id: Date.now(),
          type: update.type,
          message,
          timestamp: update.timestamp,
          read: false
        },
        ...prev.slice(0, maxNotifications - 1)
      ]);
      
      setUnreadCount(prev => prev + 1);
    });

    realtimeService.connect();

    return () => {
      unsubscribe();
      realtimeService.disconnect();
    };
  }, [maxNotifications]);

  const getNotificationMessage = (update: RealTimeUpdate): string => {
    switch (update.type) {
      case 'query':
        return `New query from ${update.data.farmerName} about ${update.data.crop} ${update.data.issue}`;
      case 'advisory':
        return `Advisory sent: ${update.data.title} for ${update.data.crops} in ${update.data.regions}`;
      case 'hotspot':
        return `Disease alert: ${update.data.disease} detected in ${update.data.crop} (${update.data.region})`;
      case 'yield':
        return `Yield update: ${update.data.crop} prediction ${update.data.predictedYield} kg/ha`;
      default:
        return 'New update received';
    }
  };

  const getNotificationIcon = (type: RealTimeUpdate['type']) => {
    switch (type) {
      case 'query':
        return MessageCircle;
      case 'advisory':
        return Bell;
      case 'hotspot':
        return AlertTriangle;
      case 'yield':
        return TrendingUp;
      default:
        return Sprout;
    }
  };

  const getNotificationColor = (type: RealTimeUpdate['type']) => {
    switch (type) {
      case 'query':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800';
      case 'advisory':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800';
      case 'hotspot':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800';
      case 'yield':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800';
    }
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const toggleNotifications = () => {
    setIsVisible(!isVisible);
    if (!isVisible && unreadCount > 0) {
      setUnreadCount(0);
      // Mark all notifications as read
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
    }
  };

  // Notification bell indicator
  if (!isVisible) {
    return (
      <div className="fixed top-20 right-4 z-50">
        <button
          onClick={toggleNotifications}
          className="relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Bell className="h-6 w-6 text-gray-600 dark:text-gray-400" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Bell className="h-4 w-4 text-primary-600" />
            <span>Live Updates</span>
          </h4>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {notifications.map((notification) => {
            const Icon = getNotificationIcon(notification.type);
            
            return (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${getNotificationColor(notification.type)} transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-tight">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatTime(notification.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => dismissNotification(notification.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {notifications.length > 1 && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setNotifications([])}
              className="w-full text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-center"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
}