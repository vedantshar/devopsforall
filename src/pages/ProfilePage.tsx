import React from 'react';
import { User, Trophy, Clock, BookOpen, Calendar, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLabs } from '../contexts/LabsContext';

export function ProfilePage() {
  const { user } = useAuth();
  const { labs } = useLabs();

  if (!user) return null;

  const completedLabs = labs.filter(lab => user.completedLabs.includes(lab.id));
  const totalTime = completedLabs.reduce((acc, lab) => acc + lab.estimatedTime, 0);
  
  const categoryProgress = {
    bash: {
      completed: completedLabs.filter(lab => lab.category === 'bash').length,
      total: labs.filter(lab => lab.category === 'bash').length
    },
    python: {
      completed: completedLabs.filter(lab => lab.category === 'python').length,
      total: labs.filter(lab => lab.category === 'python').length
    },
    ansible: {
      completed: completedLabs.filter(lab => lab.category === 'ansible').length,
      total: labs.filter(lab => lab.category === 'ansible').length
    }
  };

  const achievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lab',
      icon: <BookOpen className="h-6 w-6" />,
      earned: completedLabs.length >= 1,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Bash Master',
      description: 'Complete all Bash labs',
      icon: <Trophy className="h-6 w-6" />,
      earned: categoryProgress.bash.completed === categoryProgress.bash.total && categoryProgress.bash.total > 0,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'Python Pro',
      description: 'Complete all Python labs',
      icon: <Award className="h-6 w-6" />,
      earned: categoryProgress.python.completed === categoryProgress.python.total && categoryProgress.python.total > 0,
      color: 'bg-yellow-500'
    },
    {
      id: 4,
      title: 'Ansible Expert',
      description: 'Complete all Ansible labs',
      icon: <Trophy className="h-6 w-6" />,
      earned: categoryProgress.ansible.completed === categoryProgress.ansible.total && categoryProgress.ansible.total > 0,
      color: 'bg-red-500'
    },
    {
      id: 5,
      title: 'DevOps Champion',
      description: 'Complete all available labs',
      icon: <Award className="h-6 w-6" />,
      earned: completedLabs.length === labs.length && labs.length > 0,
      color: 'bg-purple-500'
    }
  ];

  const earnedAchievements = achievements.filter(achievement => achievement.earned);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
              <User className="h-12 w-12 text-white" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <p className="text-gray-600 mb-4">{user.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.registeredAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>{earnedAchievements.length} achievements</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Stats */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overall Progress */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Learning Progress</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{completedLabs.length}</div>
                  <div className="text-sm text-gray-600">Labs Completed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">{totalTime}</div>
                  <div className="text-sm text-gray-600">Minutes Practiced</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-1">
                    {Math.round((completedLabs.length / labs.length) * 100) || 0}%
                  </div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
              </div>

              {/* Category Progress */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Progress by Category</h3>
                
                {Object.entries(categoryProgress).map(([category, progress]) => (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="capitalize font-medium text-gray-700">{category}</span>
                      <span className="text-sm text-gray-600">{progress.completed}/{progress.total}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          category === 'bash' ? 'bg-green-500' :
                          category === 'python' ? 'bg-blue-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${progress.total > 0 ? (progress.completed / progress.total) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              
              {completedLabs.length > 0 ? (
                <div className="space-y-4">
                  {completedLabs.slice(-5).reverse().map((lab) => (
                    <div key={lab.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-green-100 p-2 rounded-full">
                        <BookOpen className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{lab.title}</p>
                        <p className="text-sm text-gray-600 capitalize">{lab.category} • {lab.difficulty}</p>
                      </div>
                      <div className="text-sm text-gray-500">
                        Completed
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                  <p>No completed labs yet. Start your first lab to see activity here!</p>
                </div>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Achievements</h2>
            
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border transition-all ${
                    achievement.earned
                      ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-full ${achievement.earned ? achievement.color : 'bg-gray-400'} text-white`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.earned && (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Achievement Progress</p>
                <div className="text-2xl font-bold text-gray-900">
                  {earnedAchievements.length}/{achievements.length}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(earnedAchievements.length / achievements.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}