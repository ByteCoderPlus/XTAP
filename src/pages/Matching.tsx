import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, AlertTriangle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { MatchRecommendation } from '../types';
import { mockMatches } from '../data/mockData';

export default function Matching() {
  const [matches] = useState<MatchRecommendation[]>(mockMatches);
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null);

  const filteredMatches = selectedRequirement
    ? matches.filter(m => m.requirement.id === selectedRequirement)
    : matches;

  const uniqueRequirements = Array.from(new Set(matches.map(m => m.requirement.id)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-primary-600" />
            <span>AI-Powered Matching</span>
          </h1>
          <p className="text-gray-600 mt-1">Smart resource-role recommendations based on skills, experience, and availability</p>
        </div>
      </div>

      {/* Filter by Requirement */}
      {uniqueRequirements.length > 1 && (
        <div className="card">
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Requirement</label>
          <select
            value={selectedRequirement || 'all'}
            onChange={(e) => setSelectedRequirement(e.target.value === 'all' ? null : e.target.value)}
            className="input-field"
          >
            <option value="all">All Requirements</option>
            {uniqueRequirements.map(reqId => {
              const req = matches.find(m => m.requirement.id === reqId)?.requirement;
              return req ? (
                <option key={reqId} value={reqId}>{req.title}</option>
              ) : null;
            })}
          </select>
        </div>
      )}

      {/* Match Cards */}
      <div className="space-y-6">
        {filteredMatches.map((match, idx) => (
          <MatchCard key={idx} match={match} />
        ))}
      </div>

      {filteredMatches.length === 0 && (
        <div className="card text-center py-12">
          <p className="text-gray-500">No matches found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

function MatchCard({ match }: { match: MatchRecommendation }) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 75) return 'text-blue-600 bg-blue-50';
    if (score >= 60) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="card hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <Link
              to={`/resource/${match.resource.id}`}
              className="text-xl font-semibold text-gray-900 hover:text-primary-600 transition-colors"
            >
              {match.resource.name}
            </Link>
            <span className={`badge ${getScoreColor(match.matchScore)}`}>
              {match.matchScore}% Match
            </span>
          </div>
          <p className="text-gray-600 mb-1">{match.resource.designation} • {match.resource.location}</p>
          <p className="text-sm text-gray-500">
            For: <Link to={`/requirement/${match.requirement.id}`} className="hover:text-primary-600 underline">{match.requirement.title}</Link>
          </p>
        </div>
        {match.grossMargin && (
          <div className="text-right">
            <p className="text-sm text-gray-600">Gross Margin</p>
            <p className="text-2xl font-bold text-green-600">{match.grossMargin}%</p>
          </div>
        )}
      </div>

      {/* Match Score Breakdown */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Match Score</span>
          <span className="text-sm text-gray-600">{match.matchScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              match.matchScore >= 90 ? 'bg-green-500' :
              match.matchScore >= 75 ? 'bg-blue-500' :
              match.matchScore >= 60 ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${match.matchScore}%` }}
          />
        </div>
      </div>

      {/* Skill Matches */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-3">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <h4 className="font-medium text-gray-900">Matched Skills</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {match.skillMatches.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-green-100 text-green-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skill Gaps */}
      {match.skillGaps.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h4 className="font-medium text-gray-900">Skill Gaps</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {match.skillGaps.map((gap, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-800"
              >
                {gap}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Upskilling */}
      {match.recommendedUpskilling.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-medium text-gray-900">Recommended Upskilling</h4>
          </div>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {match.recommendedUpskilling.map((training, idx) => (
              <li key={idx}>{training}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Reasons */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Why this match?</h4>
        <ul className="space-y-1">
          {match.reasons.map((reason, idx) => (
            <li key={idx} className="text-sm text-gray-700 flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              {reason}
            </li>
          ))}
        </ul>
      </div>

      {/* Resource Details */}
      <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-xs text-gray-500 mb-1">Availability</p>
          <p className="text-sm font-medium text-gray-900">
            {match.resource.availabilityDate
              ? new Date(match.resource.availabilityDate).toLocaleDateString()
              : 'Immediate'}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Billing Rate</p>
          <p className="text-sm font-medium text-gray-900">
            ${match.resource.billingHistory.rate}/hr
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Experience</p>
          <p className="text-sm font-medium text-gray-900">
            {match.resource.projectExperience.length} projects
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Certifications</p>
          <p className="text-sm font-medium text-gray-900">
            {match.resource.certifications.length} certified
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Link
          to={`/interviews`}
          className="flex-1 btn-primary flex items-center justify-center space-x-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Consider for Interview</span>
        </Link>
        <Link
          to={`/soft-blocks`}
          className="flex-1 btn-secondary flex items-center justify-center space-x-2"
        >
          <Clock className="w-4 h-4" />
          <span>Soft Block</span>
        </Link>
        <Link
          to={`/resource/${match.resource.id}`}
          className="btn-secondary"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
