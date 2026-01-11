import { Link } from 'react-router-dom';
import { BarChart3, TrendingUp, Users, Briefcase, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { mockRequirements, mockResources } from '../data/mockData';

const utilizationData = [
  { month: 'Jan', utilization: 75, bench: 25 },
  { month: 'Feb', utilization: 78, bench: 22 },
  { month: 'Mar', utilization: 82, bench: 18 },
  { month: 'Apr', utilization: 80, bench: 20 },
  { month: 'May', utilization: 85, bench: 15 },
  { month: 'Jun', utilization: 88, bench: 12 },
];

const skillDemandData = [
  { skill: 'React', demand: 45, available: 12 },
  { skill: 'Java', demand: 38, available: 8 },
  { skill: 'Python', demand: 32, available: 15 },
  { skill: 'AWS', demand: 28, available: 10 },
  { skill: 'Node.js', demand: 25, available: 7 },
];

const statusDistribution = [
  { name: 'Deployed', value: 65, color: '#0ea5e9' },
  { name: 'ATP', value: 20, color: '#10b981' },
  { name: 'Soft Blocked', value: 8, color: '#f59e0b' },
  { name: 'Notice', value: 4, color: '#ef4444' },
  { name: 'Other', value: 3, color: '#6b7280' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bench Utilization</h1>
        <p className="text-gray-600 mt-1">Real-time insights into resource utilization and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Overall Utilization</p>
              <p className="text-3xl font-bold text-primary-600 mt-1">88%</p>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Resources</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">245</p>
              <p className="text-xs text-gray-500 mt-1">Across all locations</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <Link to="/bench" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">ATP Resources</p>
              <p className="text-3xl font-bold text-green-600 mt-1">49</p>
              <p className="text-xs text-gray-500 mt-1">20% of total</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Link>

        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">12</p>
              <p className="text-xs text-gray-500 mt-1">resources</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Client Requirements Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Requirements</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Link to="/requirements" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="text-sm text-gray-600 mb-1">Total Requirements</p>
            <p className="text-2xl font-bold text-gray-900">{mockRequirements.length}</p>
          </Link>
          <Link to="/requirements?status=open" className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
            <p className="text-sm text-gray-600 mb-1">Open Positions</p>
            <p className="text-2xl font-bold text-green-600">{mockRequirements.filter(r => r.status === 'open').length}</p>
          </Link>
          <Link to="/requirements?status=filled" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
            <p className="text-sm text-gray-600 mb-1">Closed Positions</p>
            <p className="text-2xl font-bold text-blue-600">{mockRequirements.filter(r => r.status === 'filled').length}</p>
          </Link>
          <Link to="/requirements?priority=urgent" className="p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer">
            <p className="text-sm text-gray-600 mb-1">Priority / Urgent</p>
            <p className="text-2xl font-bold text-red-600">{mockRequirements.filter(r => r.priority === 'urgent').length}</p>
          </Link>
          <Link to="/requirements?status=cancelled" className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
            <p className="text-sm text-gray-600 mb-1">Obsolete Positions</p>
            <p className="text-2xl font-bold text-gray-600">{mockRequirements.filter(r => r.status === 'cancelled').length}</p>
          </Link>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilization Trend */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Utilization Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={utilizationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="utilization" stroke="#0ea5e9" strokeWidth={2} name="Utilization %" />
              <Line type="monotone" dataKey="bench" stroke="#ef4444" strokeWidth={2} name="Bench %" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Resources by Skillset Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources by Skillset</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={(() => {
            const skillCounts: Record<string, number> = {};
            mockResources.forEach(resource => {
              resource.skills.forEach(skill => {
                if (skill.type === 'primary') {
                  skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1;
                }
              });
            });
            return Object.entries(skillCounts)
              .map(([skill, count]) => ({ skill, count }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 10);
          })()} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="skill" type="category" width={120} />
            <Tooltip />
            <Bar dataKey="count" fill="#0ea5e9" name="Resources" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Skill Demand vs Availability */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Demand vs Availability</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={skillDemandData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="skill" type="category" width={100} />
            <Tooltip />
            <Bar dataKey="demand" fill="#0ea5e9" name="Demand" />
            <Bar dataKey="available" fill="#10b981" name="Available" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'Rajesh Kumar deployed to E-commerce Project', time: '2 hours ago', type: 'deployment', link: '/resource/1' },
            { action: 'New requirement created: Senior Java Developer', time: '4 hours ago', type: 'requirement', link: '/requirement/req2' },
            { action: 'Priya Sharma soft blocked until Feb 5', time: '6 hours ago', type: 'softblock', link: '/soft-blocks' },
            { action: 'Interview scheduled: Amit Patel for Data Engineer role', time: '1 day ago', type: 'interview', link: '/interviews' },
          ].map((activity, idx) => (
            <Link
              key={idx}
              to={activity.link}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'deployment' ? 'bg-green-500' :
                  activity.type === 'requirement' ? 'bg-blue-500' :
                  activity.type === 'softblock' ? 'bg-yellow-500' : 'bg-orange-500'
                }`} />
                <span className="text-sm text-gray-700">{activity.action}</span>
              </div>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
