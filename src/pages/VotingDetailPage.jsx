import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  Clock,
  DollarSign,
  Download,
  Users,
  Trophy,
} from "lucide-react";
import {
  governmentProposal,
  governmentProposalState,
} from "../services/proposal";
import {
  getGovernmentProposal,
  getVendorProfile,
  getVendorProposal,
} from "../server/proposal";
import { formatEther } from "viem";
import { convertStatus, formatDeadline, statusColors } from "../utils/helper";

const VotingDetailPage = ({ address }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [voting, setVoting] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [votedVendorId, setVotedVendorId] = useState(null);
  const [winningVendorId, setWinningVendorId] = useState(null);
  const [deadline, setDeadline] = useState(0);

  const [status, setStatus] = useState(null);

  const fetchProposal = async () => {
    const proposals = await getGovernmentProposal();
    const proposal = proposals.find((item) => item.ID === String(id));
    console.log(proposal);
    setVoting(proposal);
  };

  const fetchVendor = async () => {
    const _vendors = await getVendorProposal(voting.ID);

    const enrichedVendors = await Promise.all(
      _vendors.map(async (vendor) => {
        const profile = await getVendorProfile(vendor.VendorWallet);
        const vendorName = getCompanyName(profile.Details);
        const vendorImages = getVendorImages(profile.Details);
        return {
          ...vendor,
          vendorName,
        };
      })
    );
    console.log("enriched vendors", enrichedVendors);
    setVendors(enrichedVendors);
  };

  const getCompanyName = (details) => {
    if (!Array.isArray(details)) return "Unknown Company";
    const company = details.find((item) => item.Key === "company_name");
    return company ? company.Value : "Unknown Company";
  };

  const getVendorImages = (details) => {
    if (!Array.isArray(details)) return "Unknown Company";
    const company = details.find((item) => item.Key === "company_name");
    return company ? company.Value : "Unknown Company";
  };

  const fetchCountdown = async () => {
    const government = await governmentProposal(voting.ID);
    console.log(government);
    console.log(status);
    let targetTime;

    if (status === 0) {
      targetTime = Number(government.vendorSubmissionStart) * 1000;
    } else if (status === 1) {
      targetTime = Number(government.voteStart) * 1000;
    } else if (status === 2) {
      targetTime = Number(government.voteEnd) * 1000;
    }
    console.log(status);

    setDeadline(targetTime);
  };

  useEffect(() => {
    if (voting && status >= 0) {
      fetchCountdown();
      fetchVendor();
    }
  }, [status, voting, id]);

  useEffect(() => {
    if (voting) {
      fetchProposalState();
    }
  }, [voting]);

  useEffect(() => {
    if (id) {
      console.log(id);
      fetchProposal();
    }
  }, [id]);

  const fetchProposalState = async () => {
    const state = await governmentProposalState(voting.ID);
    setStatus(state);
  };

  if (!voting) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">
          Voting project not found
        </h1>
        <button
          onClick={() => navigate("/voting")}
          className="bg-purple-900 text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors duration-200"
        >
          Back to Voting List
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate("/voting")}
        className="mb-8 flex items-center gap-2 text-purple-900 hover:text-purple-700 transition-colors duration-200"
      >
        <ArrowRight className="w-4 h-4 rotate-180" />
        Back to Voting List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <img
              src={voting.Images[0]}
              alt={voting.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-8">
            {voting.Images.map((img, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                  currentImageIndex === index
                    ? "ring-4 ring-purple-500 shadow-lg"
                    : "hover:shadow-md opacity-70 hover:opacity-100"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={img}
                  alt={`${voting.title} ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">
              Project AI Summary
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              {voting.description}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100">
            <div
              className={`mb-6 ${statusColors(status).text} ${
                statusColors(status).bg
              } rounded-lg p-2 max-w-38 text-center`}
            >
              {convertStatus(status)}
            </div>

            <h1 className="text-3xl font-bold text-purple-900 mb-4">
              {voting.ProjectName}
            </h1>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Agency</p>
                  <p className="font-semibold text-gray-900">
                    {"Kementerian Komunikasi dan Informatika"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Budget</p>
                  <p className="font-bold text-2xl text-purple-900">
                    {formatEther(voting.BudgetWei)} ETH
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 flex items-center gap-1">
                    {status == 0 && `Accepting vendor start at: `}
                    {status == 1 && `Vote start at: `}
                    {status == 2 && `Vote end at: `}
                  </span>
                  <span className="ml-1">
                    {formatDeadline(parseInt(deadline))}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <h3 className="text-lg font-bold text-purple-900 mb-4">
              Project Documents
            </h3>
            <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download Proposal
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-purple-900">
            Applied Vendors
          </h3>
          <span className="text-sm text-gray-500">
            {vendors.length} vendor{vendors.length !== 1 ? "s" : ""} applied
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, index) => {
            const isWinner = vendor.id === winningVendorId;
            const rank = index + 1;

            return (
              <div
                key={vendor.id}
                onClick={() => navigate(`/voting/${id}/vendor/${vendor.ID}`)}
                className={`relative border rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 
                                    ${
                                      isWinner
                                        ? "border-yellow-400 ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50"
                                        : "border-gray-200 hover:border-purple-300"
                                    }`}
              >
                {isWinner && (
                  <div className="absolute -top-3 -right-3 bg-yellow-500 text-white rounded-full p-2 shadow-lg">
                    <Trophy className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`absolute top-4 left-4 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold
                                    ${
                                      rank === 1
                                        ? "bg-yellow-500 text-white"
                                        : rank === 2
                                        ? "bg-gray-400 text-white"
                                        : rank === 3
                                        ? "bg-orange-600 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                >
                  {rank}
                </div>

                <img
                  src={vendor.Images[0]}
                  alt={vendor.title}
                  className="w-full h-48 object-cover rounded-lg mb-4 shadow-sm"
                />

                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-lg text-purple-800 line-clamp-2 leading-tight">
                      {vendor.ProposalName}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      by {vendor.vendorName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600">
                        {vendor.voteCount} vote
                        {vendor.voteCount !== 1 ? "s" : ""}
                      </span>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-900">
                        {formatEther(vendor.RequestedBudgetWei)} ETH
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    {isWinner ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                        <Trophy className="w-3 h-3" />
                        Winner
                      </span>
                    ) : (
                      <span className="text-xs text-gray-500">
                        Rank #{rank}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {vendors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No vendors have applied yet</p>
            <p className="text-gray-400 text-sm">
              Applications will appear here once vendors submit their proposals
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotingDetailPage;
