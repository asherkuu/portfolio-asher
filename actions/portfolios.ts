import axios from "axios";
import useSWR from 'swr';
import { useApiHandler, fetcher } from "actions";

export const createPortfolio = (data) => axios.post("/api/v1/portfolios", data);
export const updatePortfolio = (id, data) => axios.patch(`/api/v1/portfolios/${id}`, data);
export const deletePortfolio = (id) => axios.delete(`/api/v1/portfolios/${id}`);

export const useCreatePortfolio = () => useApiHandler(createPortfolio);
export const useUpdatePortfolio = () => useApiHandler(updatePortfolio);
export const useDeletePortfolio = () => useApiHandler(deletePortfolio);

export const useGetPortfolio = (id) => {
  const { data, error, ...rest } = useSWR(id ? `/api/v1/portfolios/${id}` : null
    , fetcher, { // no more retry maybe
    onErrorRetry: (error) => { if (error.status === 401) return  false; }
  })
  return { data, error, loading: !data && !error, ...rest }
}

