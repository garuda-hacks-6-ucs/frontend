import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import mockVotingData from "../data/mockVotingData";
import VotingCard from "../components/VotingCard";
import { Filter, Vote } from "lucide-react";
import getCountdown from "../utils/TimeUtils";
import { getGovernmentProposal } from "../server/proposal";

const VotingListPage = () => {
  const [statusFilter, setStatusFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [votings, setVotings] = useState([]);
  const [proposals, setProposals] = useState([]);
  const navigate = useNavigate();

  const fetchGovernmentProposal = async () => {
    const proposals = await getGovernmentProposal();
    if (!proposals) return;
    console.log(proposals)

    setVotings(proposals);
  };

  useEffect(() => {
    fetchGovernmentProposal();
  }, []);

  const filtered = votings.filter(
    (v) => statusFilter === "all" || v.status === statusFilter
  );

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="mb-4 flex justify-between">
        <span>
          Showing {filtered.length} of {votings.length} projects
        </span>
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="border px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Filter className="w-4 h-4" /> Filter
          </button>
          {isFilterOpen && (
            <div className="absolute bg-white shadow-lg p-2 rounded-lg mt-2 right-0">
              {["all", "voting", "expired"].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status);
                    setIsFilterOpen(false);
                  }}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-100"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((voting) => (
          <VotingCard
            key={voting.id}
            voting={voting}
            onViewDetail={() => navigate(`/voting/${voting.id}`)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <Vote className="w-16 h-16 mx-auto text-gray-400" />
          <p className="text-gray-600">No voting projects found.</p>
        </div>
      )}
    </div>
  );
};

export default VotingListPage;
