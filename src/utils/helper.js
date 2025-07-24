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
