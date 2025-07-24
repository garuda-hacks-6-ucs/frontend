import React, { useEffect, useState } from "react";
import { Briefcase, Clock, Eye } from "lucide-react";
import { formatEther } from "viem";
import { governmentProposalState } from "../services/proposal";
import { statusColors } from "../utils/helper";

const VotingCard = ({ voting, onViewDetail }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchProposalState();
  }, [voting]);

  const fetchProposalState = async () => {
    const state = await governmentProposalState(voting.ID);
    setStatus(state);
    console.log(state);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={voting.Images[0]}
          alt={voting.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors(
              status
            )}`}
          >
            {voting.status === "voting" ? "Voting Active" : "Expired"}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-purple-900 mb-2 group-hover:text-purple-700 transition-colors duration-200">
          {voting.ProjectName}
        </h3>

        <p className="text-gray-600 mb-4 flex items-center gap-2">
          <Briefcase className="w-4 h-4" />
          {voting.agency}
        </p>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Budget:</span>
            <span className="font-bold text-purple-900">
              {formatEther(voting.BudgetWei)} ETH
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              Countdown:
            </span>
            <span
              className={`font-semibold ${
                voting.status === "voting" ? "text-green-600" : "text-red-600"
              }`}
            >
              {voting.countdown}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => onViewDetail(voting.id)}
            className="w-full bg-purple-900 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default VotingCard;
