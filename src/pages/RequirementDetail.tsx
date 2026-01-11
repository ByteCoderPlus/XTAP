import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Briefcase, Calendar, AlertCircle, Users, CheckCircle2, Clock, DollarSign } from 'lucide-react';
import { Requirement } from '../types';
import { mockRequirements, mockMatches } from '../data/mockData';
import Breadcrumbs from '../components/Breadcrumbs';

export default function RequirementDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const requirement = mockRequirements.find(r => r.id === id);
  const matches = mockMatches.filter(m => m.requirement.id === id);

  if (!requirement) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 mb-4">Requirement not found</p>
        <button onClick={() => navigate('/requirements')} className="btn-primary">
          Back to Requirements
        </button>
      </div>
    );
  }

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl font-bold text-gray-900">{requirement.title}</h1>
              <span className={`badge ${priorityColors[requirement.priority]}`}>
                {requirement.priority}
              </span>
              <span className={`badge ${requirement.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {requirement.status}
              </span>
            </div>
            <p className="text-gray-600 mt-1">{requirement.domain} • {requirement.location}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary">Edit</button>
          <button className="btn-primary">Find Matches</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600">Matches Found</p>
          <p className="text-2xl font-bold text-primary-600 mt-1">{matches.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Start Date</p>
          <p className="text-xl font-semibold text-gray-900 mt-1 flex items-center">
            <Calendar className="w-4 h-4 mr-1 text-gray-500" />
            {new Date(requirement.startDate).toLocaleDateString()}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Experience Level</p>
          <p className="text-xl font-semibold text-gray-900 mt-1">{requirement.experienceLevel}</p>
        </div>
        {requirement.budget && (
          <div className="card">
            <p className="text-sm text-gray-600">Budget</p>
            <p className="text-xl font-semibold text-gray-900 mt-1 flex items-center">
              <DollarSign className="w-4 h-4 mr-1 text-gray-500" />
              ${requirement.budget.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{requirement.description}</p>
          </div>

          {/* Required Skills */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
              Required Skills
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {requirement.requiredSkills.map((skill, idx) => (
                <div key={idx} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-xs text-gray-500 capitalize">{skill.level}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Preferred Skills */}
          {requirement.preferredSkills.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                Preferred Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {requirement.preferredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                  >
                    {skill.name} ({skill.level})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Top Matches */}
          {matches.length > 0 && (
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Matches</h2>
              <div className="space-y-4">
                {matches.slice(0, 3).map((match, idx) => (
                  <Link
                    key={idx}
                    to={`/resource/${match.resource.id}`}
                    className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 hover:text-primary-600">{match.resource.name}</h3>
                        <p className="text-sm text-gray-600">{match.resource.designation}</p>
                      </div>
                      <div className="text-right">
                        <span className="badge bg-primary-100 text-primary-700">
                          {match.matchScore}% Match
                        </span>
                        {match.grossMargin && (
                          <p className="text-sm text-green-600 mt-1">{match.grossMargin}% Margin</p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {match.skillMatches.slice(0, 4).map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="inline-flex items-center px-2 py-1 rounded text-xs bg-green-100 text-green-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
              {matches.length > 3 && (
                <Link
                  to="/matching"
                  className="mt-4 inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  View all {matches.length} matches →
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Details */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Details</h2>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">Location:</span>
                <span className="ml-2 font-medium text-gray-900">{requirement.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <Briefcase className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">Domain:</span>
                <span className="ml-2 font-medium text-gray-900">{requirement.domain}</span>
              </div>
              <div className="flex items-center text-sm">
                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">Start:</span>
                <span className="ml-2 font-medium text-gray-900">
                  {new Date(requirement.startDate).toLocaleDateString()}
                </span>
              </div>
              {requirement.endDate && (
                <div className="flex items-center text-sm">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">End:</span>
                  <span className="ml-2 font-medium text-gray-900">
                    {new Date(requirement.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              <div className="flex items-center text-sm">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">Experience:</span>
                <span className="ml-2 font-medium text-gray-900">{requirement.experienceLevel}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                to="/matching"
                className="w-full btn-primary text-left flex items-center space-x-2"
              >
                <Users className="w-4 h-4" />
                <span>Find Matches</span>
              </Link>
              <button className="w-full btn-secondary text-left flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Mark as Filled</span>
              </button>
              <button className="w-full btn-secondary text-left flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>Cancel Requirement</span>
              </button>
            </div>
          </div>

          {/* Metadata */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Metadata</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Manager</span>
                <span className="font-medium text-gray-900">{requirement.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created by</span>
                <span className="font-medium text-gray-900">{requirement.createdBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created on</span>
                <span className="font-medium text-gray-900">
                  {new Date(requirement.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last updated</span>
                <span className="font-medium text-gray-900">
                  {new Date(requirement.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
