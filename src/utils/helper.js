import { getBlock, getBlockNumber } from "@wagmi/core";
import { config } from "../App";

export function truncate(text, startChar, endChar, maxLength) {
  if (text.length > maxLength) {
    let start = text.substring(0, startChar);
    let end = text.substring(text.length - endChar, text.length);
    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
}

export function convertStatus(state) {
  if (state == 0) {
    return "Pending";
  } else if (state == 1) {
    return "Accepting Vendor";
  } else if (state == 2) {
    return "Voting";
  } else {
    return "End";
  }
}

export function statusColors(state) {
  if (state == 0) {
    return {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
    };
  } else if (state == 1) {
    return {
      bg: "bg-blue-100",
      text: "text-blue-800",
    };
  } else if (state == 2) {
    return {
      bg: "bg-orange-100",
      text: "text-orange-800",
    };
  } else {
    return {
      bg: "bg-green-100",
      text: "text-green-800",
    };
  }
}

export const formatDeadline = (timestamp) => {
  if (!timestamp) return "Loading...";
  const date = new Date(timestamp);
  const options = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-US", options);
};

export async function getSnapshotDate(blockNumber) {
  try {
    const currentBlockNumber = await getBlockNumber(config);
    const now = Math.floor(Date.now() / 1000);

    let timestamp;
    if (blockNumber <= currentBlockNumber) {
      const block = await getBlock(config, {
        blockNumber: BigInt(blockNumber),
      });
      timestamp = Number(block.timestamp);
    } else {
      const diff = Number(blockNumber) - Number(currentBlockNumber);
      timestamp = now + diff * 2;
    }

    return formatDeadline(timestamp * 1000);
  } catch (error) {
    console.error("❌ Error formatting block date:", error);
    return "Unknown";
  }
}

export async function getDescriptionAIProject(project) {
  return "The proposal titled Development of Communication Systems in Papua by the Ministry of Communication and Informatics (Kominfo) aims to accelerate equitable access to information across the Papua region through the development of inclusive and sustainable telecommunications infrastructure. This project involves the construction of fiber optic networks, 4G BTS towers, and other supporting facilities in remote areas that currently experience communication blackouts. Beyond improving connectivity, the initiative is also designed to drive digital transformation in the education, healthcare, and local economic sectors—emphasizing respect for local wisdom and empowering indigenous communities to build a connected, empowered, and digitally equal Papua in line with other regions of Indonesia.";
}

export async function getDescriptionAIProposal(project) {
  return "The proposal titled A Fast and Secure E-Archive System from PT Sinar Harapan Persada outlines a digital archiving solution designed to modernize and safeguard document management processes within government or institutional environments. This system prioritizes speed, data integrity, and ease of access by utilizing encrypted storage, role-based access control, and real-time document retrieval features. By reducing reliance on physical archives, it aims to minimize administrative delays, enhance transparency, and ensure long-term preservation of critical records. The solution also aligns with national efforts toward digital transformation and secure information governance.";
}
