import React from 'react';
import { Vote, Shield, Users, ArrowRight, Briefcase, FileText } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-yellow-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-purple-900 leading-tight">
              Transparent Government Tender Platform
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Empowering fair competition in government procurement through blockchain technology and public voting. Create equal opportunities for all vendors without inside connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-purple-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-yellow-500 text-purple-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-50 transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-100">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Government</p>
                      <p className="text-sm text-gray-600">Posts Projects</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white rotate-90" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Vendors</p>
                      <p className="text-sm text-gray-600">Submit Proposals</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white rotate-90" />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-purple-900">Public</p>
                      <p className="text-sm text-gray-600">Votes for Best</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-900 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <Vote className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;