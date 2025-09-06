import React, { useState } from 'react';
import { Plus, Send, Calendar, Eye, Users, Edit, Check, X, Clock } from 'lucide-react';
import { mockAdvisories } from '../utils/mockData';
import { Advisory } from '../types';
import { User } from '../types';

interface AdvisoryManagementProps {
  user: User;
}

export function AdvisoryManagement({ user }: AdvisoryManagementProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    crop: '',
    regions: [] as string[],
  });

  const handleCreateAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdvisory = {
      ...formData,
      id: `A${Date.now()}`,
      createdBy: user.name,
      expertName: user.name,
      sentDate: new Date(),
      readCount: 0,
      status: user.role === 'admin' ? 'sent' : 'pending_approval'
    };
    console.log('Creating advisory:', newAdvisory);
    setShowCreateForm(false);
    setFormData({ title: '', message: '', crop: '', regions: [] });
  };

  const handleApproveAdvisory = (advisoryId: string) => {
    console.log('Approving advisory:', advisoryId);
    setShowApprovalModal(null);
  };

  const handleRejectAdvisory = (advisoryId: string) => {
    console.log('Rejecting advisory:', advisoryId, 'Reason:', rejectionReason);
    setShowApprovalModal(null);
    setRejectionReason('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingAdvisories = mockAdvisories.filter(a => a.status === 'pending_approval');
  const displayAdvisories = user.role === 'admin' ? mockAdvisories : mockAdvisories.filter(a => a.createdBy === user.name);

  return (
    <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Advisory Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {user.role === 'admin' ? 'Review and approve expert advisories' : 'Create advisories for government approval'}
            </p>
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="btn-primary flex items-center space-x-2 text-sm lg:text-base"
          >
            <Plus className="h-4 w-4" />
            <span>New Advisory</span>
          </button>
        </div>
      </div>

      {/* Pending Approvals for Admin */}
      {user.role === 'admin' && pendingAdvisories.length > 0 && (
        <div className="card mb-6">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <span>Pending Approvals ({pendingAdvisories.length})</span>
            </h2>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {pendingAdvisories.map((advisory) => (
              <div key={advisory.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{advisory.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">{advisory.message}</p>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                        {advisory.crop}
                      </span>
                      <span>by {advisory.expertName}</span>
                      <div className="flex flex-wrap gap-1">
                        {advisory.regions.map(region => (
                          <span key={region} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs rounded-full font-medium">
                            {region}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleApproveAdvisory(advisory.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <Check className="h-4 w-4" />
                      <span>Approve & Send</span>
                    </button>
                    <button
                      onClick={() => setShowApprovalModal(advisory.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 text-sm"
                    >
                      <X className="h-4 w-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Advisory Form */}
      {showCreateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Create New Advisory</h2>
            
            <form onSubmit={handleCreateAdvisory} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Advisory Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  placeholder="Enter advisory title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="input-field"
                  placeholder="Enter advisory message"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Crop
                </label>
                <select
                  value={formData.crop}
                  onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select crop</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Rice">Rice</option>
                  <option value="Maize">Maize</option>
                  <option value="Cotton">Cotton</option>
                  <option value="All Crops">All Crops</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Target Regions
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['Punjab', 'Bihar', 'Maharashtra', 'Gujarat', 'Kerala', 'Tamil Nadu'].map(region => (
                    <label key={region} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.regions.includes(region)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, regions: [...formData.regions, region] });
                          } else {
                            setFormData({ ...formData, regions: formData.regions.filter(r => r !== region) });
                          }
                        }}
                        className="text-primary-600 focus:ring-primary-500 rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{region}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  type="submit"
                  className="btn-primary flex-1 flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>{user.role === 'admin' ? 'Send Advisory' : 'Submit for Approval'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Reject Advisory</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Please provide a reason for rejection:</p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
              className="input-field mb-4"
              placeholder="Enter rejection reason..."
              required
            />
            
            <div className="flex space-x-4">
              <button
                onClick={() => handleRejectAdvisory(showApprovalModal)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
                disabled={!rejectionReason.trim()}
              >
                Reject Advisory
              </button>
              <button
                onClick={() => {
                  setShowApprovalModal(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Advisory Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
              <Send className="h-6 w-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Sent</h3>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{mockAdvisories.filter(a => a.status === 'sent').length}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-secondary-100 dark:bg-secondary-900/20 rounded-lg">
              <Eye className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Views</h3>
              <p className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                {mockAdvisories.reduce((sum, a) => sum + a.readCount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Pending</h3>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {pendingAdvisories.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Advisory List */}
      <div className="card">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {user.role === 'admin' ? 'All Advisories' : 'My Advisories'}
          </h2>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {displayAdvisories.map((advisory) => (
            <div key={advisory.id} className="p-4 lg:p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{advisory.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{advisory.message}</p>
                  
                  <div className="flex flex-wrap items-center gap-2 lg:gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{advisory.sentDate.toLocaleDateString()}</span>
                    </div>
                    {advisory.status === 'sent' && (
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{advisory.readCount.toLocaleString()} views</span>
                      </div>
                    )}
                    <span className="bg-secondary-100 dark:bg-secondary-900/30 text-secondary-800 dark:text-secondary-300 px-2 py-1 rounded-full text-xs font-medium">
                      {advisory.crop}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-start lg:items-end space-y-2 mt-4 lg:mt-0">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(advisory.status)}`}>
                    {advisory.status.replace('_', ' ').charAt(0).toUpperCase() + advisory.status.replace('_', ' ').slice(1)}
                  </span>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1 mb-2 lg:mb-0">
                  {advisory.regions.map(region => (
                    <span key={region} className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 text-xs rounded-full font-medium">
                      {region}
                    </span>
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {advisory.status === 'sent' && advisory.approvedBy && (
                    <div>
                      <span>Expert: {advisory.expertName}</span>
                      <br />
                      <span>Approved by: {advisory.approvedBy}</span>
                    </div>
                  )}
                  {advisory.status !== 'sent' && (
                    <span>By {advisory.expertName}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}