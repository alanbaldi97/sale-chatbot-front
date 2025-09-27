export const mapFilters = (filters: Record<string, any>) => {
  const mapped: Record<string, any> = {};
  for (const key in filters) {
    if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
      mapped[`filter[${key}]`] = filters[key];
    }
  }
  return mapped;
};