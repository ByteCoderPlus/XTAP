import { Calendar, Download, Users, TrendingUp, MapPin, Award } from 'lucide-react';
import { mockResources } from '../data/mockData';

export default function WeeklyATP() {
  const atpResources = mockResources.filter(r => r.status === 'ATP');
  
  // Group by skill
  const bySkill: Record<string, number> = {};
  atpResources.forEach(resource => {
    resource.skills.forEach(skill => {
      if (skill.type === 'primary') {
        bySkill[skill.name] = (bySkill[skill.name] || 0) + 1;
      }
    });
  });

  // Group by location
  const byLocation: Record<string, number> = {};
  atpResources.forEach(resource => {
    byLocation[resource.location] = (byLocation[resource.location] || 0) + 1;
  });

  const currentWeek = new Date().toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-primary-600" />
            <span>Weekly ATP Summary</span>
          </h1>
          <p className="text-gray-600 mt-1">Tuesday Meeting Report - Week of {currentWeek}</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total ATP</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{atpResources.length}</p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New This Week</p>
              <p className="text-2xl font-bold text-green-600 mt-1">5</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deployed This Week</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">8</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Soft Blocked</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {atpResources.filter(r => r.softBlocks.length > 0).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* ATP by Skill */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Award className="w-5 h-5 text-primary-600" />
          <span>ATP Resources by Primary Skill</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(bySkill)
            .sort(([, a], [, b]) => b - a)
            .map(([skill, count]) => (
              <div key={skill} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{skill}</span>
                  <span className="text-2xl font-bold text-primary-600">{count}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* ATP by Location */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          <span>ATP Resources by Location</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(byLocation)
            .sort(([, a], [, b]) => b - a)
            .map(([location, count]) => (
              <div key={location} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{location}</span>
                  <span className="text-2xl font-bold text-primary-600">{count}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Detailed ATP List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detailed ATP Resource List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Resource
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Primary Skills
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Availability
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {atpResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                      <div className="text-sm text-gray-500">{resource.designation}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resource.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {resource.skills
                        .filter(s => s.type === 'primary')
                        .slice(0, 3)
                        .map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-primary-50 text-primary-700"
                          >
                            {skill.name}
                          </span>
                        ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {resource.availabilityDate
                      ? new Date(resource.availabilityDate).toLocaleDateString()
                      : 'Immediate'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {resource.softBlocks.length > 0 ? (
                      <span className="badge bg-yellow-100 text-yellow-800">
                        Soft Blocked
                      </span>
                    ) : (
                      <span className="badge bg-green-100 text-green-800">
                        Available
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Items */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Action Items for This Week</h3>
        <div className="space-y-3">
          {[
            'Follow up on pending interviews for React developers',
            'Review soft blocks expiring this week',
            'Coordinate with Sales on upcoming proposals requiring Java skills',
            'Schedule reskilling sessions for resources with skill gaps',
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-5 h-5 rounded-full border-2 border-primary-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-primary-600 rounded-full" />
              </div>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
