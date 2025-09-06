import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { LoginForm } from './components/Login/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { FarmerQueries } from './pages/FarmerQueries';
import { DiseaseHotspots } from './pages/DiseaseHotspots';
import { AdvisoryManagement } from './pages/AdvisoryManagement';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  if (!user) {
    return (
      <ThemeProvider>
        <LoginForm onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'queries':
        return <FarmerQueries />;
      case 'hotspots':
        return <DiseaseHotspots />;
      case 'advisories':
        return <AdvisoryManagement user={user} />;
      case 'crops':
        return (
          <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <div className="card p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Crop Recommendation Trends</h1>
              <p className="text-gray-600 dark:text-gray-400">Feature coming soon...</p>
            </div>
          </div>
        );
      case 'yield':
        return (
          <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <div className="card p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Yield Prediction Insights</h1>
              <p className="text-gray-600 dark:text-gray-400">Feature coming soon...</p>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="p-4 lg:p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
            <div className="card p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Reports & Feedback</h1>
              <p className="text-gray-600 dark:text-gray-400">Feature coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header user={user} onLogout={handleLogout} />
        <div className="flex">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className="flex-1 min-w-0">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;