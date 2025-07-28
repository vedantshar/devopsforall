import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Server, Zap, Users, Trophy, BookOpen, ArrowRight, CheckCircle, Calendar, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { user } = useAuth();

  const features = [
    {
      icon: <Code className="h-8 w-8 text-purple-600" />,
      title: 'Hands-on Labs',
      description: 'Practice with real DevOps scenarios across multiple technologies'
    },
    {
      icon: <Server className="h-8 w-8 text-indigo-600" />,
      title: 'Browser-based Environment',
      description: 'No setup required - start coding immediately in your browser'
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: 'Instant Validation',
      description: 'Get immediate feedback on your solutions with automated testing'
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-600" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey and celebrate achievements'
    }
  ];

  const stats = [
    { label: 'Active Learners', value: '50+' },
    { label: 'Hands-on Labs', value: '100+' },
    { label: 'Technologies', value: '15+' },
    { label: 'Success Rate', value: '85%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Master DevOps Through
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Hands-on Practice</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Master DevOps skills with interactive labs covering Linux, Docker, Kubernetes, CI/CD, and more. 
              No setup required - start coding in your browser today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link
                  to="/labs"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Continue Learning
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Learning Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-purple-600 hover:text-purple-600 transition-all"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OpsCurator?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform is designed to make learning DevOps practical, engaging, and accessible to everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Challenge Section */}
      {user && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-indigo-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-8 w-8 text-purple-600 mr-3" />
                <h2 className="text-3xl font-bold text-gray-900">Daily Challenge</h2>
              </div>
              <p className="text-lg text-gray-600">
                Challenge yourself with a new DevOps problem every day
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Today's Challenge</h3>
                    <p className="text-sm text-gray-600">Linux & Bash • Intermediate</p>
                  </div>
                </div>
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                  15 min
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Process Management Challenge</h4>
                <p className="text-gray-700 mb-4">
                  Write a bash script that monitors system processes and automatically restarts a service if it stops running. 
                  Your script should check every 30 seconds and log all activities.
                </p>
                <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                  <p className="text-purple-800 text-sm">
                    <strong>Learning Goal:</strong> Master process monitoring, service management, and automated system administration tasks.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">47 developers</span> completed today's challenge
                </div>
                <Link
                  to="/labs/linux-bash"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Start Challenge
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Learning Path Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Learning Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start with the basics and build your DevOps skills progressively through hands-on practice.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Linux & Bash</h3>
              <p className="text-gray-600 mb-6">Master command line, scripting, and system administration</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  System Administration
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Process Management
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Python for DevOps</h3>
              <p className="text-gray-600 mb-6">Automate infrastructure tasks and build DevOps tools</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Infrastructure Automation
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  API Integration
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Server className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Docker & Kubernetes</h3>
              <p className="text-gray-600 mb-6">Master containerization and orchestration</p>
              <div className="space-y-2">
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Container Management
                </div>
                <div className="flex items-center justify-center text-sm text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Orchestration
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your DevOps Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join thousands of learners mastering DevOps skills through hands-on practice. All labs are free to get you started.
            </p>
            {!user && (
              <Link
                to="/register"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Learning Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}