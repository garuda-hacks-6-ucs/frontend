import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/Homepage";
import VotingListPage from "./pages/VotingListPage";
import VotingDetailPage from "./pages/VotingDetailPage";
import VendorDetailView from "./pages/VendorDetailPage";
import { useAccount } from "wagmi";

const Content = () => {
  const { address } = useAccount();
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar address={address} />

        <Routes>
          <Route path="/" element={<HomePage address={address} />} />
          <Route
            path="/voting"
            element={<VotingListPage address={address} />}
          />
          <Route
            path="/voting/:id"
            element={<VotingDetailPage address={address} />}
          />
          <Route
            path="/voting/:id"
            element={<VotingDetailPage address={address} />}
          />
          <Route
            path="/voting/:id/vendor/:vendorId"
            element={<VendorDetailView />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default Content;
