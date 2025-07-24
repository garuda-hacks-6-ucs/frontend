export const getCountdown = (deadline) => {
  const now = Date.now();
  const distance = deadline - now;

  if (distance <= 0) return "Expired";

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
};
