import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, Calendar, User, Plus, X } from 'lucide-react';
import { SoftBlock } from '../types';
import { mockResources } from '../data/mockData';

interface SoftBlockWithResource extends SoftBlock {
  resourceName: string;
  resourceDesignation: string;
  resourceLocation: string;
}

const allSoftBlocks: SoftBlockWithResource[] = mockResources
  .filter(r => r.softBlocks.length > 0)
  .flatMap(resource =>
    resource.softBlocks.map(block => ({
      ...block,
      resourceName: resource.name,
      resourceDesignation: resource.designation,
      resourceLocation: resource.location,
    }))
  );

export default function SoftBlockManager() {
  const [softBlocks] = useState<SoftBlockWithResource[]>(allSoftBlocks);
  const [showForm, setShowForm] = useState(false);
  const [filterActive, setFilterActive] = useState<boolean | 'all'>('all');

  const now = new Date();
  const filteredBlocks = softBlocks.filter(block => {
    if (filterActive === 'all') return true;
    const endDate = new Date(block.endDate);
    return filterActive ? endDate > now : endDate <= now;
  });

  const activeBlocks = softBlocks.filter(b => new Date(b.endDate) > now);
  const expiredBlocks = softBlocks.filter(b => new Date(b.endDate) <= now);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="w-8 h-8 text-primary-600" />
            <span>Soft Block Management</span>
          </h1>
          <p className="text-gray-600 mt-1">Prevent double booking and manage resource reservations</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Soft Block</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Soft Blocks</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{softBlocks.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{activeBlocks.length}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-600 mt-1">{expiredBlocks.length}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <X className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="card">
        <label className="block text-sm font-medium text-gray-700 mb-2">Filter</label>
        <select
          value={filterActive === true ? 'active' : filterActive === false ? 'expired' : 'all'}
          onChange={(e) => {
            const value = e.target.value;
            setFilterActive(value === 'active' ? true : value === 'expired' ? false : 'all');
          }}
          className="input-field"
        >
          <option value="all">All Soft Blocks</option>
          <option value="active">Active Only</option>
          <option value="expired">Expired Only</option>
        </select>
      </div>

      {/* Soft Blocks List */}
      <div className="space-y-4">
        {filteredBlocks.map((block) => (
          <SoftBlockCard key={block.id} block={block} />
        ))}
      </div>

      {filteredBlocks.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No soft blocks found.</p>
        </div>
      )}

      {/* New Soft Block Form Modal */}
      {showForm && (
        <SoftBlockFormModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

function SoftBlockCard({ block }: { block: SoftBlockWithResource }) {
  const now = new Date();
  const endDate = new Date(block.endDate);
  const isActive = endDate > now;
  const daysRemaining = isActive
    ? Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <div className={`card hover:shadow-lg transition-shadow ${isActive ? 'border-l-4 border-l-yellow-500' : 'opacity-75'}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Link
              to={`/resource/${block.resourceId}`}
              className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors"
            >
              {block.resourceName}
            </Link>
            {isActive ? (
              <span className="badge bg-yellow-100 text-yellow-800">
                Active
              </span>
            ) : (
              <span className="badge bg-gray-100 text-gray-800">
                Expired
              </span>
            )}
          </div>
          <p className="text-gray-600 mb-1">{block.resourceDesignation} • {block.resourceLocation}</p>
          <p className="text-sm text-gray-500 mb-3">{block.reason}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <div>
            <p className="text-xs text-gray-500">Start Date</p>
            <p className="font-medium text-gray-900">
              {new Date(block.startDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <div>
            <p className="text-xs text-gray-500">End Date</p>
            <p className="font-medium text-gray-900">
              {new Date(block.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        {isActive && (
          <div className="flex items-center text-sm text-yellow-600">
            <AlertTriangle className="w-4 h-4 mr-2" />
            <div>
              <p className="text-xs text-yellow-500">Time Remaining</p>
              <p className="font-medium">
                {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <User className="w-4 h-4 mr-2" />
        <span>Created by {block.createdBy} on {new Date(block.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        {isActive && (
          <>
            <button className="flex-1 btn-secondary text-sm py-2">
              Extend Block
            </button>
            <button className="flex-1 btn-secondary text-sm py-2">
              Remove Block
            </button>
          </>
        )}
        <Link
          to={`/resource/${block.resourceId}`}
          className="btn-secondary text-sm py-2 text-center"
        >
          View Resource
        </Link>
      </div>
    </div>
  );
}

function SoftBlockFormModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Create Soft Block</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Resource</label>
            <select className="input-field">
              <option value="">Select a resource...</option>
              {mockResources.map(r => (
                <option key={r.id} value={r.id}>{r.name} - {r.designation}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
            <textarea
              className="input-field"
              rows={3}
              placeholder="Reason for soft blocking this resource..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <input type="date" className="input-field" />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button className="btn-primary">Create Soft Block</button>
        </div>
      </div>
    </div>
  );
}
