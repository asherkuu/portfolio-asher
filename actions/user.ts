import useSWR from 'swr';
import { fetcher } from 'actions';

const useGetUser = () => {
  const { data, error, ...rest } = useSWR('/api/v1/me', fetcher, {
    onErrorRetry: (error) => {
      if (error.status === 401) return  false; // no more retry maybe
    }
  } )
  return { data, error, loading: !data && !error, ...rest }
}

export default useGetUser
