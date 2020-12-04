import axios from "axios";
import useSWR from 'swr';
import { useApiHandler, fetcher } from "actions";

export const createPortfolio = (data) => axios.post("/api/v1/portfolios", data);

export const useCreatePortfolio = () => useApiHandler(createPortfolio);

const useGetPortfolio = (id) => {
  const { data, error, ...rest } = useSWR(id ? `/api/v1/portfolios/${id}` : null
    , fetcher, { // no more retry maybe
    onErrorRetry: (error) => { if (error.status === 401) return  false; }
  })
  return { data, error, loading: !data && !error, ...rest }
}

export default useGetPortfolio
