import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Layout/Header';
import { Sidebar } from './components/Layout/Sidebar';
import { LoginForm } from './components/Login/LoginForm';
import { Dashboard } from './pages/Dashboard';
import { FarmerQueries } from './pages/FarmerQueries';
import { DiseaseHotspots } from './pages/DiseaseHotspots';
import { AdvisoryManagement } from './pages/AdvisoryManagement';
import { CropTrends } from './pages/CropTrends';
import YieldInsights from './pages/YieldInsights';
import ReportsFeedback from './pages/ReportsFeedback';
import { User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
  };

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    if (isMobile) {
      setIsMobileSidebarOpen(false);
    }
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
        return <CropTrends />;
      case 'yield':
          return <YieldInsights />;
      case 'reports':
          return <ReportsFeedback />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header user={user} onLogout={handleLogout} />
        <div className="flex">
          {/* Mobile sidebar overlay */}
          {isMobile && isMobileSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMobileSidebarOpen(false)}
            />
          )}
          
          {/* Sidebar */}
          <div className={`
            ${isMobile ? 'fixed inset-y-0 left-0 z-50 transform transition-transform duration-300' : 'relative'}
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
          </div>
          
          <main className="flex-1 min-w-0 md:ml-0">
            {renderPage()}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;