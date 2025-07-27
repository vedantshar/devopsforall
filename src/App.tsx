import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { LabsPage } from './pages/LabsPage';
import { LabEnvironment } from './pages/LabEnvironment';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPage } from './pages/AdminPage';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LabsProvider } from './contexts/LabsContext';

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/labs" />} />
        <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/labs" />} />
        <Route path="/labs" element={user ? <LabsPage /> : <Navigate to="/login" />} />
        <Route path="/lab/:labId" element={user ? <LabEnvironment /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.role === 'admin' ? <AdminPage /> : <Navigate to="/labs" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <LabsProvider>
          <AppRoutes />
        </LabsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;