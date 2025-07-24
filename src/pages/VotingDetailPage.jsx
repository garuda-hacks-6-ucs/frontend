import React from 'react';
import { useParams } from 'react-router-dom';

const VotingDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-purple-900 mb-4">
            Voting Detail - Project #{id}
          </h1>
          <p className="text-xl text-gray-600">
            Review project details and vendor proposals before voting
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">Project Details Coming Soon</h2>
            <p className="text-gray-600">
              Detailed project information, vendor proposals, and voting interface will be available here.
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <button className="bg-purple-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200">
              Back to Voting List
            </button>
            <button className="border-2 border-yellow-500 text-purple-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-50 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingDetailPage;