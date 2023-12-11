const options = {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
};

const formatDate = (today) => {
  return today.toLocaleDateString("en-US", options);
};

export { formatDate };