import React, { useState, useEffect } from 'react';
import { Download, Filter, MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface Report {
  id: string;
  title: string;
  type: 'analytics' | 'performance' | 'compliance' | 'financial';
  generatedDate: string;
  period: string;
  status: 'completed' | 'processing' | 'failed';
  downloadUrl?: string;
  size: string;
}

interface Feedback {
  id: string;
  farmerName: string;
  farmerId: string;
  category: 'suggestion' | 'complaint' | 'question' | 'appreciation';
  message: string;
  date: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedTo?: string;
}

const ReportsFeedback: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedTab, setSelectedTab] = useState<'reports' | 'feedback'>('reports');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API calls
    const mockReports: Report[] = [
      {
        id: '1',
        title: 'Monthly Crop Performance Report',
        type: 'performance',
        generatedDate: '2024-12-19',
        period: 'December 2024',
        status: 'completed',
        downloadUrl: '#',
        size: '2.4MB'
      },
      {
        id: '2',
        title: 'Quarterly Financial Summary',
        type: 'financial',
        generatedDate: '2024-12-15',
        period: 'Q4 2024',
        status: 'completed',
        downloadUrl: '#',
        size: '1.8MB'
      },
      {
        id: '3',
        title: 'Regional Yield Analysis',
        type: 'analytics',
        generatedDate: '2024-12-18',
        period: '2024 Annual',
        status: 'processing',
        size: 'Processing...'
      },
      {
        id: '4',
        title: 'Compliance Audit Report',
        type: 'compliance',
        generatedDate: '2024-12-10',
        period: '2024',
        status: 'completed',
        downloadUrl: '#',
        size: '3.1MB'
      }
    ];

    const mockFeedback: Feedback[] = [
      {
        id: '1',
        farmerName: 'Rajesh Kumar',
        farmerId: 'FARM001',
        category: 'suggestion',
        message: 'Please add more local language support in the mobile app. Many farmers in my village struggle with English.',
        date: '2024-12-18',
        status: 'new',
        priority: 'high'
      },
      {
        id: '2',
        farmerName: 'Suresh Patel',
        farmerId: 'FARM045',
        category: 'complaint',
        message: 'The weather predictions have been inaccurate for our region this week. Lost some crops due to unexpected rain.',
        date: '2024-12-17',
        status: 'in-progress',
        priority: 'critical',
        assignedTo: 'Weather Team'
      },
      {
        id: '3',
        farmerName: 'Lakshmi Devi',
        farmerId: 'FARM123',
        category: 'appreciation',
        message: 'The advisory about pest control saved my cotton crop this season. Thank you!',
        date: '2024-12-16',
        status: 'closed',
        priority: 'low'
      },
      {
        id: '4',
        farmerName: 'Vijay Singh',
        farmerId: 'FARM087',
        category: 'question',
        message: 'When will the new subsidy schemes be available in the app?',
        date: '2024-12-15',
        status: 'resolved',
        priority: 'medium',
        assignedTo: 'Support Team'
      }
    ];

    setReports(mockReports);
    setFeedback(mockFeedback);
    setLoading(false);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
      case 'resolved':
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'processing':
      case 'in-progress':
        return <Clock className="h-4 w-4 text-blue-600" />;
      case 'failed':
      case 'new':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'performance':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'financial':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'analytics':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'compliance':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
          <div className="grid grid-cols-1 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Reports & Feedback Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Access generated reports and manage farmer feedback</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button
          onClick={() => setSelectedTab('reports')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'reports'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Reports
        </button>
        <button
          onClick={() => setSelectedTab('feedback')}
          className={`px-4 py-2 font-medium text-sm ${
            selectedTab === 'feedback'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
        >
          Feedback
        </button>
      </div>

      {selectedTab === 'reports' && (
        <div>
          {/* Report Actions */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Filter reports</span>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Download className="h-4 w-4" />
              Generate New Report
            </button>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div key={report.id} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(report.type)}`}>
                    {report.type}
                  </span>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(report.status)}
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{report.status}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{report.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Period: {report.period}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Generated: {new Date(report.generatedDate).toLocaleDateString()}</span>
                  <span>{report.size}</span>
                </div>

                {report.status === 'completed' && report.downloadUrl && (
                  <button className="w-full mt-4 btn-secondary flex items-center justify-center gap-2">
                    <Download className="h-4 w-4" />
                    Download Report
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {reports.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Reports</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {reports.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {reports.filter(r => r.status === 'processing').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {reports.filter(r => r.status === 'failed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Failed</div>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'feedback' && (
        <div>
          {/* Feedback Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {feedback.length} feedback items
              </span>
            </div>
            <button className="btn-primary">
              Export Feedback
            </button>
          </div>

          {/* Feedback List */}
          <div className="space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="card p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(item.status)}
                    <span className="text-xs text-gray-600 dark:text-gray-400 capitalize">{item.status}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">{item.farmerName}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">ID: {item.farmerId}</p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
                  {item.message}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Received: {new Date(item.date).toLocaleDateString()}</span>
                  {item.assignedTo && (
                    <span className="text-blue-600 dark:text-blue-400">Assigned to: {item.assignedTo}</span>
                  )}
                </div>

                <div className="flex gap-2 mt-3">
                  <button className="btn-secondary text-xs px-3 py-1">
                    View Details
                  </button>
                  <button className="btn-primary text-xs px-3 py-1">
                    Respond
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Feedback Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {feedback.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Feedback</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                {feedback.filter(f => f.status === 'new').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">New</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {feedback.filter(f => f.status === 'in-progress').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
            </div>
            <div className="card p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {feedback.filter(f => f.status === 'resolved' || f.status === 'closed').length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Resolved</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsFeedback;