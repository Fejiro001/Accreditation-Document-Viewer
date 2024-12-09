export const filterItems = (folders, query) => {
  if (!query) return folders;
  return folders.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );
};

export const truncateString = (str, maxLength) => {
  if (str.length > maxLength) return str.slice(0, maxLength) + "...";
  return str;
};
