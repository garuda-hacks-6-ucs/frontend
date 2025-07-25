import { keccak256, toUtf8Bytes } from "ethers";
import { readContract, writeContract } from "wagmi/actions";
import { config } from "../App";
import block_tender from "../builds/block_tender.json";
import { BLOCKTENDERID_ADDRESS } from "../data/address";

export async function voteVendorProposal(
  governmentProposalId,
  vendorProposalId
) {
  try {
    const result = await writeContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "voteVendorProposal",
      args: [governmentProposalId, vendorProposalId],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function withdrawInitialPayment(
  governmentProposalId,
  vendorProposalId
) {
  try {
    const result = await writeContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "withdrawInitialPayment",
      args: [governmentProposalId, vendorProposalId],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function deliverWork(
  targets,
  values,
  calldatas,
  description,
  tokenId,
  tokenURI,
  governmentProposalId
) {
  try {
    const result = await writeContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "deliverWork",
      args: [
        targets,
        values,
        calldatas,
        description,
        tokenId,
        tokenURI,
        governmentProposalId,
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function voteDeliveredWork(proposal, support, reason) {
  try {
    const proposalId = await getProposalId(proposal);
    const result = await writeContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "voteDeliveredWork",
      args: [proposalId, support, reason],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function queue(proposal) {
  try {
    const result = await writeContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "queue",
      args: [
        proposal.sctargets,
        proposal.scvalues,
        proposal.sccalldatas,
        keccak256(toUtf8Bytes(proposal.proposaldescription)),
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function execute(proposal) {
  try {
    const result = await writeContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "execute",
      args: [
        proposal.sctargets,
        proposal.scvalues,
        proposal.sccalldatas,
        keccak256(toUtf8Bytes(proposal.proposaldescription)),
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalVotes(proposal) {
  try {
    const proposalId = await getProposalId(proposal);
    const [totalAgainst, totalFor] = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "proposalVotes",
      args: [proposalId],
    });
    return [totalAgainst, totalFor];
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getProposalId(proposal) {
  try {
    const proposalId = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "getProposalId",
      args: [
        proposal.sctargets,
        proposal.scvalues,
        proposal.sccalldatas,
        keccak256(toUtf8Bytes(proposal.proposaldescription)),
      ],
    });
    return proposalId;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function state(proposalId) {
  try {
    const state = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "state",
      args: [proposalId],
    });
    return state;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function governmentProposalState(governmentProposalId) {
  try {
    const state = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "governmentProposalState",
      args: [governmentProposalId],
    });
    return state;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function governmentProposal(governmentProposalId) {
  try {
    const proposal = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "governmentProposal",
      args: [governmentProposalId],
    });
    return proposal;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function vendorProposal(governmentProposalId, vendorProposalId) {
  try {
    const proposal = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "vendorProposal",
      args: [governmentProposalId, vendorProposalId],
    });
    return proposal;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function vendorSelectionVoteHistory(address) {
  try {
    const voteHistory = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "vendorSelectionVoteHistory",
      args: [address],
    });
    return voteHistory;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function deliveredWorkVoteHistory(address) {
  try {
    const voteHistory = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "deliveredWorkVoteHistory",
      args: [address],
    });
    return voteHistory;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function winnerVendor(governmentProposalId) {
  try {
    const vendorProposalId = await readContract(config, {
      abi: block_tender,
      address: BLOCKTENDERID_ADDRESS,
      functionName: "winnerVendor",
      args: [governmentProposalId],
    });
    return vendorProposalId;
  } catch (error) {
    console.error(error);
    return;
  }
}
