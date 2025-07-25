import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Navbar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/Homepage';
import VotingListPage from './pages/VotingListPage';
import VotingDetailPage from './pages/VotingDetailPage';
import VendorDetailView from './pages/VendorDetailPage';
import RegisterPage from './pages/RegisterPage';

const AppLayout = () => {
  const location = useLocation();

  // Daftar path yang TIDAK ingin menampilkan Navbar dan Footer
  const hideLayoutPaths = ['/register'];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/voting" element={<VotingListPage />} />
        <Route path="/voting/:id" element={<VotingDetailPage />} />
        <Route path="/voting/:id/vendor/:vendorId" element={<VendorDetailView />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
