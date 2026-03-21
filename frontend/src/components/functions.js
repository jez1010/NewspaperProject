export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString();
};

export const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString();
};