import React from 'react';
import { Zap, Brain, DollarSign, Leaf, ArrowRight, CheckCircle } from 'lucide-react';

const BenefitsSection = () => {
  const benefits = [
    {
      icon: CheckCircle,
      title: "Grow Responsibility",
      description: "Vendors compete in a transparent system, ensuring they provide the best offers and maintain accountability. This builds reputation and public trust in businesses."
    },
    {
      icon: Zap,
      title: "Stay Adaptable",
      description: "With projects from various sectors, vendors can adapt their solutions and bidding strategies according to community needs and project types offered."
    },
    {
      icon: ArrowRight,
      title: "Improve Efficiency",
      description: "AI automatically summarizes proposals, so government, vendors, and the public don't need lengthy explanations. Bid values are quickly understood and evaluation becomes faster."
    },
    {
      icon: Brain,
      title: "Support Smarter Decision-Making",
      description: "The tender process becomes more efficient as government requirements and criteria are clearly communicated upfront. Vendors can directly create relevant proposals."
    },
    {
      icon: DollarSign,
      title: "Better Resource Management",
      description: "Project payments are guaranteed safe and timely as funds are locked in smart contracts from the start. Vendors can manage cash flow and resource allocation more stably."
    },
    {
      icon: Leaf,
      title: "Long-Term Sustainable Success",
      description: "Vendor selection is done openly through public voting, making it fair and free from insider practices. This creates healthy competition and long-term trust."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-purple-900 mb-4">
            Why Choose TenderChain?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the benefits of transparent, blockchain-powered government procurement
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-900 to-purple-700 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-purple-900 ml-4">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;