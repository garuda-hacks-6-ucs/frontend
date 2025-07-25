import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">BlocTenderId</h3>
            <p className="text-purple-200">
              Revolutionizing government procurement through transparency and blockchain technology.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-purple-200 hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/voting" className="text-purple-200 hover:text-yellow-400 transition-colors">Voting</Link></li>
              <li><a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Government Projects</a></li>
              <li><a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Vendor Registration</a></li>
              <li><a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Public Voting</a></li>
              <li><a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Smart Contracts</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-2 text-purple-200">
              <p>Email: info@blocTenderId.com</p>
              <p>Phone: +62 21 1234 5678</p>
              <p>Address: Jakarta, Indonesia</p>
            </div>
          </div>
        </div>
        
        <hr className="border-purple-700 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-purple-200">
            © 2025 BlocTenderID. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-purple-200 hover:text-yellow-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;