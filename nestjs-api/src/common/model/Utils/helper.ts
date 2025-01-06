export const applyLikeQuery = (filter: any) => {
  // Convert fields with string values to use regex for 'like' queries
  const updatedFilter: any = {};

  for (const [key, value] of Object.entries(filter)) {
    if (typeof value === 'string') {
      updatedFilter[key] = { $regex: new RegExp(value, 'i') }; // 'i' makes the search case-insensitive
    } else {
      updatedFilter[key] = value;
    }
  }

  return updatedFilter;
};
