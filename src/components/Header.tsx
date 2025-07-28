import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Header() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-2 rounded-lg">
              <Code2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">OpsCurator</h1>
              <p className="text-xs text-gray-500">Master DevOps Skills</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'text-purple-600 bg-purple-50' 
                  : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/labs"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/labs') 
                      ? 'text-purple-600 bg-purple-50' 
                      : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                  }`}
                >
                  Labs
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive('/admin') 
                        ? 'text-purple-600 bg-purple-50' 
                        : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="h-4 w-4 inline mr-1" />
                    Admin
                  </Link>
                )}
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/profile"
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                >
                  <User className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}