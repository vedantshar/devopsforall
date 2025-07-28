import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, Code, Server, Terminal, Construction, Trophy, Users, Target } from 'lucide-react';
import { useLabs } from '../contexts/LabsContext';
import { useAuth } from '../contexts/AuthContext';

export function LabsPage() {
  const { labs, categories } = useLabs();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('foundational');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'linux-bash':
        return <Terminal className="h-6 w-6" />;
      case 'python':
        return <Code className="h-6 w-6" />;
      case 'docker':
        return <Server className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'linux-bash':
        return 'from-green-500 to-green-600';
      case 'python':
        return 'from-blue-500 to-blue-600';
      case 'docker':
        return 'from-blue-600 to-indigo-600';
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

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);
  const categoryLabs = labs.filter(lab => {
    if (selectedCategory === 'foundational') {
      return ['linux-bash', 'python'].includes(lab.category);
    }
    return false; // Other categories don't have labs yet
  });

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">DevOps Learning Labs</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master DevOps skills through hands-on practice. Follow our structured learning path from basics to advanced topics.
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
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{completedCount}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
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
                    stroke="#8b5cf6"
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

        {/* Learning Roadmap */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Suggested Learning Roadmap</h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              { stage: 'Stage 1', title: 'Basics', topics: 'Bash, Git, Docker, Python', color: 'bg-green-100 text-green-800' },
              { stage: 'Stage 2', title: 'Infrastructure', topics: 'Terraform, Ansible, Jenkins', color: 'bg-blue-100 text-blue-800' },
              { stage: 'Stage 3', title: 'K8s & CD', topics: 'Kubernetes, ArgoCD, Helm', color: 'bg-purple-100 text-purple-800' },
              { stage: 'Stage 4', title: 'Cloud & Observability', topics: 'AWS/GCP, Prometheus, Vault', color: 'bg-orange-100 text-orange-800' },
              { stage: 'Stage 5', title: 'Advanced', topics: 'GitOps, Security, Service Mesh', color: 'bg-red-100 text-red-800' }
            ].map((stage, index) => (
              <div key={index} className="text-center">
                <div className={`${stage.color} rounded-lg p-4 mb-2`}>
                  <div className="font-bold text-sm">{stage.stage}</div>
                  <div className="font-semibold">{stage.title}</div>
                </div>
                <p className="text-xs text-gray-600">{stage.topics}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Category Navigation */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Categories</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedCategory === category.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-bold text-gray-900">{category.name}</h3>
                  </div>
                  {category.status === 'construction' && (
                    <Construction className="h-5 w-5 text-orange-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                <div className="space-y-1">
                  {category.topics.slice(0, 2).map((topic, index) => (
                    <div key={index} className="text-xs text-gray-500 flex items-start">
                      <span className="mr-1">•</span>
                      <span>{topic.split(' - ')[0]}</span>
                    </div>
                  ))}
                  {category.topics.length > 2 && (
                    <div className="text-xs text-purple-600 font-medium">
                      +{category.topics.length - 2} more topics
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category Content */}
        {selectedCategoryData && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="text-3xl mr-3">{selectedCategoryData.icon}</span>
                  {selectedCategoryData.name}
                </h2>
                <p className="text-gray-600 mt-2">{selectedCategoryData.description}</p>
              </div>
              {selectedCategoryData.status === 'construction' && (
                <div className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-lg">
                  <Construction className="h-5 w-5" />
                  <span className="font-medium">Under Construction</span>
                </div>
              )}
            </div>

            {selectedCategoryData.status === 'construction' ? (
              <div className="text-center py-12">
                <Construction className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Coming Soon!</h3>
                <p className="text-gray-600 mb-6">
                  We're working hard to bring you comprehensive labs for {selectedCategoryData.name.toLowerCase()}.
                </p>
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
                  <h4 className="font-semibold text-orange-900 mb-2">What's Coming:</h4>
                  <div className="space-y-2">
                    {selectedCategoryData.topics.map((topic, index) => (
                      <div key={index} className="text-sm text-orange-800 flex items-start">
                        <span className="mr-2">•</span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Linux & Bash Labs */}
                {selectedCategory === 'foundational' && (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg mr-4">
                          <Terminal className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Linux & Bash Scripting</h3>
                          <p className="text-gray-600">
                            {categoryLabs.filter(lab => lab.category === 'linux-bash' && user?.completedLabs.includes(lab.id)).length} of {categoryLabs.filter(lab => lab.category === 'linux-bash').length} completed
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {categoryLabs.filter(lab => lab.category === 'linux-bash').map((lab) => {
                          const isCompleted = user?.completedLabs.includes(lab.id);
                          return (
                            <Link
                              key={lab.id}
                              to={`/lab/${lab.id}`}
                              className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 p-6 border border-gray-200"
                            >
                              <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <h4 className="text-lg font-bold text-gray-900 mr-3">{lab.title}</h4>
                                    {isCompleted && (
                                      <CheckCircle className="h-5 w-5 text-green-500" />
                                    )}
                                  </div>
                                  <p className="text-gray-600 text-sm mb-3">{lab.description}</p>
                                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mb-3">
                                    <p className="text-blue-800 text-xs font-medium">Learning Outcome:</p>
                                    <p className="text-blue-700 text-xs">{lab.learningOutcome}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lab.difficulty)}`}>
                                    {lab.difficulty}
                                  </span>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {lab.estimatedTime} min
                                  </div>
                                </div>
                                <div className="text-right">
                                  {isCompleted ? (
                                    <span className="text-green-600 font-medium text-sm">Completed</span>
                                  ) : (
                                    <span className="text-purple-600 font-medium hover:text-purple-700 text-sm">
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

                    {/* Other foundational topics placeholder */}
                    <div className="border-t pt-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-lg mr-4">
                          <Code className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">Python for DevOps</h3>
                          <div className="flex items-center space-x-2">
                            <Construction className="h-4 w-4 text-orange-500" />
                            <span className="text-orange-600 text-sm font-medium">Coming Soon</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                        <p className="text-orange-800">
                          Python labs for DevOps automation, API integration, and infrastructure scripting are coming soon!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* Leaderboard Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Trophy className="h-6 w-6 text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-900">Leaderboard</h2>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Users className="h-4 w-4" />
              <span>47 active learners</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { rank: 1, name: 'Alex Chen', completed: 8, points: 850, avatar: '👨‍💻' },
              { rank: 2, name: 'Sarah Johnson', completed: 7, points: 720, avatar: '👩‍💻' },
              { rank: 3, name: 'Mike Rodriguez', completed: 6, points: 680, avatar: '👨‍🔧' },
              { rank: 4, name: 'Emily Davis', completed: 6, points: 650, avatar: '👩‍🔬' },
              { rank: 5, name: 'You', completed: completedCount, points: completedCount * 100, avatar: '🚀' }
            ].map((leader) => (
              <div key={leader.rank} className={`flex items-center justify-between p-4 rounded-lg ${
                leader.name === 'You' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    leader.rank === 1 ? 'bg-yellow-400 text-yellow-900' :
                    leader.rank === 2 ? 'bg-gray-300 text-gray-700' :
                    leader.rank === 3 ? 'bg-orange-400 text-orange-900' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {leader.rank}
                  </div>
                  <span className="text-2xl">{leader.avatar}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{leader.name}</div>
                    <div className="text-sm text-gray-600">{leader.completed} labs completed</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-purple-600">{leader.points}</div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}