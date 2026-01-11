import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Calendar, MapPin, Briefcase, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { Requirement } from '../types';
import { mockRequirements } from '../data/mockData';

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
  open: 'bg-green-100 text-green-800',
  filled: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export default function Requirements() {
  const [requirements] = useState<Requirement[]>(mockRequirements);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const filteredRequirements = requirements.filter(req =>
    req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.domain.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Requirements</h1>
          <p className="text-gray-600 mt-1">Manage open positions and staffing needs</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>New Requirement</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Requirements</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{requirements.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {requirements.filter(r => r.status === 'open').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Filled</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {requirements.filter(r => r.status === 'filled').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Urgent</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {requirements.filter(r => r.priority === 'urgent').length}
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-4">
        {filteredRequirements.map((requirement) => (
          <RequirementCard key={requirement.id} requirement={requirement} />
        ))}
      </div>

      {filteredRequirements.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No requirements found.</p>
        </div>
      )}

      {/* New Requirement Form Modal */}
      {showForm && (
        <RequirementFormModal onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

function RequirementCard({ requirement }: { requirement: Requirement }) {
  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{requirement.title}</h3>
          <p className="text-gray-600 mb-4">{requirement.description}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`badge ${statusColors[requirement.status]}`}>
            {requirement.status}
          </span>
          <span className={`badge ${priorityColors[requirement.priority]}`}>
            {requirement.priority}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {requirement.location}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Briefcase className="w-4 h-4 mr-2" />
          {requirement.domain}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          Start: {new Date(requirement.startDate).toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium mr-2">Experience:</span>
          {requirement.experienceLevel}
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
        <div className="flex flex-wrap gap-2">
          {requirement.requiredSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-primary-100 text-primary-700"
            >
              {skill.name}
            </span>
          ))}
        </div>
        {requirement.preferredSkills.length > 0 && (
          <>
            <p className="text-sm font-medium text-gray-700 mb-2 mt-3">Preferred Skills</p>
            <div className="flex flex-wrap gap-2">
              {requirement.preferredSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-200">
        <Link
          to={`/requirement/${requirement.id}`}
          className="flex-1 btn-primary text-sm py-2 text-center"
        >
          View Details
        </Link>
        <button className="flex-1 btn-secondary text-sm py-2">
          Edit
        </button>
      </div>
    </div>
  );
}

function RequirementFormModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">New Requirement</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input type="text" className="input-field" placeholder="e.g., Senior React Developer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea className="input-field" rows={4} placeholder="Detailed description of the role..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input type="text" className="input-field" placeholder="Bangalore" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
              <input type="text" className="input-field" placeholder="Retail" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select className="input-field">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
            <input type="text" className="input-field" placeholder="React, TypeScript, Node.js" />
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button className="btn-primary">Create Requirement</button>
        </div>
      </div>
    </div>
  );
}
