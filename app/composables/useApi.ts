export const useApi = <T>(url: string, options?: any) => {
  return useSanctumFetch<T>(url, options);
};
