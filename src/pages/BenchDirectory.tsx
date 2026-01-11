import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Award, TrendingUp, Calendar, DollarSign, Grid, List } from 'lucide-react';
import { Resource, ResourceStatus } from '../types';
import { mockResources } from '../data/mockData';
import Pagination from '../components/Pagination';
import { useToastContext } from '../context/ToastContext';

const statusColors: Record<ResourceStatus, string> = {
  ATP: 'bg-green-100 text-green-800',
  deployed: 'bg-blue-100 text-blue-800',
  'soft-blocked': 'bg-yellow-100 text-yellow-800',
  notice: 'bg-red-100 text-red-800',
  leave: 'bg-purple-100 text-purple-800',
  trainee: 'bg-indigo-100 text-indigo-800',
  'interview-scheduled': 'bg-orange-100 text-orange-800',
};

export default function BenchDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<ResourceStatus | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [selectedSkill, setSelectedSkill] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const itemsPerPage = 9;

  const locations = useMemo(() => {
    const locs = new Set(mockResources.map(r => r.location));
    return Array.from(locs);
  }, []);

  const skills = useMemo(() => {
    const skillSet = new Set<string>();
    mockResources.forEach(r => {
      r.skills.forEach(s => skillSet.add(s.name));
    });
    return Array.from(skillSet);
  }, []);

  const filteredResources = useMemo(() => {
    return mockResources.filter(resource => {
      const matchesSearch = 
        resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.skills.some(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesStatus = selectedStatus === 'all' || resource.status === selectedStatus;
      const matchesLocation = selectedLocation === 'all' || resource.location === selectedLocation;
      const matchesSkill = selectedSkill === 'all' || resource.skills.some(s => s.name === selectedSkill);

      return matchesSearch && matchesStatus && matchesLocation && matchesSkill;
    });
  }, [searchTerm, selectedStatus, selectedLocation, selectedSkill]);

  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, selectedLocation, selectedSkill]);

  const stats = useMemo(() => {
    const total = mockResources.length;
    const atp = mockResources.filter(r => r.status === 'ATP').length;
    const deployed = mockResources.filter(r => r.status === 'deployed').length;
    const softBlocked = mockResources.filter(r => r.status === 'soft-blocked').length;
    return { total, atp, deployed, softBlocked };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bench Resource Directory</h1>
          <p className="text-gray-600 mt-1">Manage and track all ATP resources</p>
        </div>
        <button className="btn-primary">
          Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ATP Available</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.atp}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deployed</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{stats.deployed}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Soft Blocked</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.softBlocked}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as ResourceStatus | 'all')}
            className="input-field"
          >
            <option value="all">All Status</option>
            <option value="ATP">ATP</option>
            <option value="deployed">Deployed</option>
            <option value="soft-blocked">Soft Blocked</option>
            <option value="notice">Notice</option>
            <option value="leave">Leave</option>
            <option value="trainee">Trainee</option>
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="input-field"
          >
            <option value="all">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="input-field"
          >
            <option value="all">All Skills</option>
            {skills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {paginatedResources.length} of {filteredResources.length} resources
        </p>
        <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'
            }`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list' ? 'bg-white shadow-sm text-primary-600' : 'text-gray-600'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Resources Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {paginatedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedResources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} isList />
          ))}
        </div>
      )}

      {filteredResources.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No resources found matching your criteria.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            totalItems={filteredResources.length}
          />
        </div>
      )}
    </div>
  );
}

function ResourceCard({ resource, isList = false }: { resource: Resource; isList?: boolean }) {
  const primarySkills = resource.skills.filter(s => s.type === 'primary').slice(0, 3);
  const hasSoftBlock = resource.softBlocks.length > 0;
  const { success } = useToastContext();

  if (isList) {
    return (
      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <Link
                  to={`/resource/${resource.id}`}
                  className="text-lg font-semibold text-gray-900 hover:text-primary-600"
                >
                  {resource.name}
                </Link>
                <span className={`badge ${statusColors[resource.status]}`}>
                  {resource.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">{resource.designation} • {resource.employeeId}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {resource.location}
                </span>
                {resource.availabilityDate && (
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Available from {new Date(resource.availabilityDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 max-w-xs">
              {primarySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-700"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          <div className="ml-4 flex gap-2">
            <Link
              to={`/resource/${resource.id}`}
              className="btn-primary text-sm py-2 px-4"
            >
              View Details
            </Link>
            <button className="btn-secondary text-sm py-2 px-4">
              Consider
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{resource.name}</h3>
          <p className="text-sm text-gray-600">{resource.designation}</p>
          <p className="text-xs text-gray-500 mt-1">{resource.employeeId}</p>
        </div>
        <span className={`badge ${statusColors[resource.status]}`}>
          {resource.status}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2" />
          {resource.location}
        </div>

        {resource.availabilityDate && (
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Available from {new Date(resource.availabilityDate).toLocaleDateString()}
          </div>
        )}

        {hasSoftBlock && (
          <div className="flex items-center text-sm text-yellow-600 bg-yellow-50 px-3 py-2 rounded">
            <Calendar className="w-4 h-4 mr-2" />
            Soft blocked until {new Date(resource.softBlocks[0].endDate).toLocaleDateString()}
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-gray-500 mb-2">Primary Skills</p>
          <div className="flex flex-wrap gap-2">
            {primarySkills.map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-primary-50 text-primary-700"
              >
                {skill.name}
                <span className="ml-1 text-primary-500">({skill.level})</span>
              </span>
            ))}
          </div>
        </div>

        {resource.certifications.length > 0 && (
          <div>
            <p className="text-xs font-medium text-gray-500 mb-2">Certifications</p>
            <div className="flex flex-wrap gap-2">
              {resource.certifications.slice(0, 2).map((cert, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-gray-100 text-gray-700"
                >
                  <Award className="w-3 h-3 mr-1" />
                  {cert.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {resource.ctc && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>CTC: ₹{(resource.ctc / 100000).toFixed(1)}L {resource.ctcCurrency && `(${resource.ctcCurrency})`}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 flex gap-2">
        <Link
          to={`/resource/${resource.id}`}
          className="flex-1 btn-primary text-sm py-2 text-center"
        >
          View Details
        </Link>
        <button
          onClick={() => success(`${resource.name} added to consideration list`)}
          className="flex-1 btn-secondary text-sm py-2"
        >
          Consider for Role
        </button>
      </div>
    </div>
  );
}
