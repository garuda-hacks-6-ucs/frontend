import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockVendorData from '../data/mockVendorData';
import mockVotingData from '../data/mockVotingData';
import {
  Download,
  ArrowLeft,
  Trophy,
  Users,
  DollarSign,
  CheckCircle,
  XCircle,
  Upload,
  Clock,
  User
} from 'lucide-react';

const VendorDetailPage = () => {
  const { id, vendorId } = useParams();
  const navigate = useNavigate();

  const [vendor, setVendor] = useState(null);
  const [votingStatus, setVotingStatus] = useState('voting');
  const [hasVoted, setHasVoted] = useState(false);
  const [role, setRole] = useState('community');

  const [proofFile, setProofFile] = useState(null);
  const [communityVotes, setCommunityVotes] = useState([]);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [winningVendorId, setWinningVendorId] = useState(null);

  const [countdown, setCountdown] = useState(5);
  const [countdownStarted, setCountdownStarted] = useState(false);
  const [finalizedVoting, setFinalizedVoting] = useState(false);

  useEffect(() => {
    const currentVendor = mockVendorData.find(v => v.id === parseInt(vendorId));
    const relatedVoting = mockVotingData.find(v => v.id === parseInt(id));

    if (!currentVendor || !relatedVoting) {
      navigate(`/voting/${id}`);
      return;
    }

    setVendor(currentVendor);

    const isExpired = relatedVoting.deadline < Date.now();
    setVotingStatus(isExpired ? 'expired' : 'voting');

    const relatedVendors = mockVendorData.filter(v => v.projectVotingId === parseInt(id));
    if (relatedVendors.length > 0) {
      const winner = relatedVendors.reduce((prev, curr) =>
        curr.voteCount > prev.voteCount ? curr : prev
      );
      setWinningVendorId(winner.id);
    }
  }, [id, vendorId, navigate]);

  const handleVoteVendor = () => {
    if (votingStatus === 'voting') {
      setVendor(prev => ({
        ...prev,
        voteCount: prev.voteCount + 1,
      }));
      setHasVoted(true);
      alert('Thank you for voting!');
    }
  };

  const handleCommunityVote = (vote) => {
    setCommunityVotes(prev => [...prev, vote]);
  };

  const handleWithdraw = () => {
    alert('Withdraw successful! Funds have been transferred to the vendor account.');
  };

  useEffect(() => {
    if (proofFile && communityVotes.length > 0 && !countdownStarted) {
      setCountdownStarted(true);
      let seconds = 5;
      setCountdown(seconds);

      const interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(interval);

            if (!finalizedVoting) {
              const yesCount = communityVotes.filter(v => v === 'yes').length;
              const noCount = communityVotes.filter(v => v === 'no').length;

              setCanWithdraw(yesCount > noCount);
              setFinalizedVoting(true);
            }

            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [proofFile, communityVotes, countdownStarted, finalizedVoting]);

  if (!vendor) return null;

  const isWinner = vendor.id === winningVendorId;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(`/voting/${id}`)}
        className="mb-8 flex items-center gap-2 text-purple-900 hover:text-purple-700 transition-colors duration-200"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Voting Detail
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="mb-8">
            <img
              src={vendor.thumbnail}
              alt={vendor.title}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-purple-900 mb-4">Proposal Description</h3>
            <p className="text-gray-700 leading-relaxed text-lg">{vendor.description}</p>
          </div>

          <div className="space-y-6 mb-8">
            {votingStatus === 'voting' && role === 'community' && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <h3 className="text-lg font-bold text-purple-900 mb-4">Cast Your Vote</h3>
                <button
                  onClick={handleVoteVendor}
                  disabled={hasVoted}
                  className={`w-full py-4 rounded-xl font-bold transition-colors duration-200 ${
                    hasVoted
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-purple-900 text-white hover:bg-purple-800'
                  }`}
                >
                  {hasVoted ? 'You have voted' : 'Vote for this Vendor'}
                </button>
              </div>
            )}

            {role === 'vendor' && isWinner && votingStatus === 'expired' && !proofFile && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <Upload className="w-5 h-5 text-gray-500" />
                  <h3 className="text-lg font-bold text-purple-900">Upload Work Proof</h3>
                </div>
                <input
                  type="file"
                  onChange={(e) => setProofFile(e.target.files[0])}
                  className="w-full border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-purple-400 transition-colors cursor-pointer"
                />
              </div>
            )}

            {role === 'vendor' && isWinner && finalizedVoting && canWithdraw && (
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
                <button
                  onClick={handleWithdraw}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-5 h-5" />
                  Withdraw Funds
                </button>
              </div>
            )}

            {role === 'vendor' && isWinner && finalizedVoting && !canWithdraw && (
              <div className="bg-red-50 rounded-2xl p-6 shadow-lg border-2 border-red-200">
                <div className="text-center">
                  <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-700 font-bold">
                    Community rejected the proof. Withdrawal denied.
                  </p>
                </div>
              </div>
            )}
          </div>

          {role === 'community' && proofFile && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border-2 border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Community Verification</h3>
              <p className="text-blue-800 mb-6 text-lg">
                Do you agree the vendor has completed the project as proposed?
              </p>

              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => handleCommunityVote('yes')}
                  className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  Agree
                </button>
                <button
                  onClick={() => handleCommunityVote('no')}
                  className="flex-1 bg-red-500 text-white py-4 px-6 rounded-xl font-semibold hover:bg-red-600 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" />
                  Disagree
                </button>
              </div>

              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Total Votes</p>
                    <p className="text-2xl font-bold text-gray-800">{communityVotes.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Agree</p>
                    <p className="text-2xl font-bold text-green-600">
                      {communityVotes.filter(v => v === 'yes').length}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Disagree</p>
                    <p className="text-2xl font-bold text-red-600">
                      {communityVotes.filter(v => v === 'no').length}
                    </p>
                  </div>
                </div>

                {countdownStarted && !finalizedVoting && (
                  <div className="mt-4 text-center">
                    <div className="bg-blue-100 rounded-lg p-4">
                      <div className="flex items-center justify-center gap-2 text-blue-700">
                        <Clock className="w-5 h-5" />
                        <span className="font-semibold">
                          Final result in {countdown} seconds...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-bold text-purple-900">Login as</h3>
            </div>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border-2 border-gray-200 px-4 py-3 rounded-xl font-semibold focus:border-purple-500 focus:outline-none transition-colors"
            >
              <option value="community">Community Member</option>
              <option value="vendor">Vendor</option>
            </select>
          </div>

          <div className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${isWinner ? 'border-amber-300 bg-gradient-to-br from-amber-50 via-white to-orange-50' : 'border-gray-100'}`}>
            {isWinner && (
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-full p-3 shadow-xl border-4 border-white">
                  <Trophy className="w-6 h-6" />
                </div>
              </div>
            )}

            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-purple-900 mb-2">{vendor.title}</h1>
              <p className="text-gray-600 font-medium">by {vendor.vendorName}</p>
            </div>

            <div className="flex justify-center mb-6">
              {isWinner ? (
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-sm font-bold px-4 py-2 rounded-full">
                  <Trophy className="w-4 h-4" />
                  Tender Winner
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-600 text-sm font-bold px-4 py-2 rounded-full">
                  <XCircle className="w-4 h-4" />
                  Not Selected
                </span>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Proposed Budget</p>
                  <p className="font-bold text-2xl text-purple-900">{vendor.budget} ETH</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Total Votes</p>
                  <p className="font-semibold text-gray-900">{vendor.voteCount} votes</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100">
            <h3 className="text-lg font-bold text-purple-900 mb-4">Proposal Document</h3>
            <a
              href="#"
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download ({vendor.proposalFile})
            </a>
          </div>

          {votingStatus === 'expired' && !proofFile && role === 'community' && isWinner && (
            <div className="bg-orange-50 rounded-2xl p-6 shadow-lg border-2 border-orange-200">
              <div className="text-center">
                <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                <p className="text-orange-700 font-bold">
                  Vendor has not uploaded the work proof yet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VendorDetailPage;
