import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Code, Server, Terminal } from 'lucide-react';
import { useLabs } from '../contexts/LabsContext';
import { useAuth } from '../contexts/AuthContext';

export function LabsPage() {
  const { labs } = useLabs();
  const { user } = useAuth();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'bash':
        return <Terminal className="h-6 w-6" />;
      case 'python':
        return <Code className="h-6 w-6" />;
      case 'ansible':
        return <Server className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bash':
        return 'from-green-500 to-green-600';
      case 'python':
        return 'from-blue-500 to-blue-600';
      case 'ansible':
        return 'from-red-500 to-red-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = user?.completedLabs.length || 0;
  const totalLabs = labs.length;
  const progressPercentage = (completedCount / totalLabs) * 100;

  const categorizedLabs = {
    bash: labs.filter(lab => lab.category === 'bash'),
    python: labs.filter(lab => lab.category === 'python'),
    ansible: labs.filter(lab => lab.category === 'ansible')
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DevOps Labs</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master DevOps skills through hands-on practice. Complete labs at your own pace and track your progress.
          </p>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h2>
              <p className="text-gray-600">
                {completedCount} of {totalLabs} labs completed
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3b82f6"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${progressPercentage * 3.14} ${(100 - progressPercentage) * 3.14}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{Math.round(progressPercentage)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Labs by Category */}
        {Object.entries(categorizedLabs).map(([category, categoryLabs]) => (
          <div key={category} className="mb-12">
            <div className="flex items-center mb-6">
              <div className={`bg-gradient-to-r ${getCategoryColor(category)} p-3 rounded-lg mr-4`}>
                <div className="text-white">
                  {getCategoryIcon(category)}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{category}</h2>
                <p className="text-gray-600">
                  {categoryLabs.filter(lab => user?.completedLabs.includes(lab.id)).length} of {categoryLabs.length} completed
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {categoryLabs.map((lab) => {
                const isCompleted = user?.completedLabs.includes(lab.id);
                return (
                  <Link
                    key={lab.id}
                    to={`/lab/${lab.id}`}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border border-gray-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-gray-900 mr-3">{lab.title}</h3>
                          {isCompleted && (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{lab.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                          {lab.difficulty}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          {lab.estimatedTime} min
                        </div>
                      </div>
                      <div className="text-right">
                        {isCompleted ? (
                          <span className="text-green-600 font-medium">Completed</span>
                        ) : (
                          <span className="text-blue-600 font-medium hover:text-blue-700">
                            Start Lab →
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Empty State for No Labs */}
        {labs.length === 0 && (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No labs available</h3>
            <p className="text-gray-600">Labs will be added soon. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  );
}