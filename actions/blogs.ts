import axios from "axios";
import useSWR from "swr";
import { useApiHandler, fetcher } from "actions";

export const createBlog = data => axios.post("/api/v1/blogs", data);
export const updateBlog = (id, data) => axios.patch(`/api/v1/blogs/${id}`, data);

export const useCreateBlog = () => useApiHandler(createBlog);
export const useUpdateBlog = () => useApiHandler(updateBlog);

export const useGetBlog = id => {
  const { data, error, ...rest } = useSWR(id ? `/api/v1/blogs/${id}` : null
    , fetcher, { // no more retry maybe
    onErrorRetry: (error) => { if (error.status === 401) return  false; }
  })
  return { data, error, loading: !data && !error, ...rest }
}

export const useGetUserBlogs = () => {
  const { data, error, ...rest } = useSWR(`/api/v1/blogs/me`, fetcher)
  return { data, error, loading: !data && !error, ...rest }
}
