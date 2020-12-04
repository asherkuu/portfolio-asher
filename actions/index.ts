import { useState } from 'react'

// custom fetcher function
export const fetcher =  (url) =>  fetch(url).then(async r => {
  const result = await r.json();

  if(r.status !== 200) return Promise.reject(result);
  else return result;
});

export function useApiHandler(apiCall) {
  const [reqState, setReqState] = useState({
      error: null,
      data: null,
      loading: false,
  });

  const handler = async (...data) => {
      setReqState({ error: null, data: null, loading: true });
      try {
          const json = await apiCall(...data);
          setReqState({ error: null, data: json.data, loading: false });
      } catch (err) {
          const message = (err.response && err.response.data) || "Oooops, something went wrong...";
          setReqState({ error: message, data: null, loading: false });
      }
  };
  return [ handler, { ...reqState }];
}

// using hooks
// import React, { useEffect, useState } from 'react'

// 포스트 리스트 데이터 호출
// export const useGetData = (url) => {
//   const [ data, setData ] = useState();
//   const [ error, setError ] = useState();
//   const [ loading, setLoading ] = useState(true);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch(url);
//       const result = await res.json();
      
//       if(res.status !== 200) 
//         setError(result)
//       else 
//         setData(result);

//       setLoading(false);
//     }
//     url && fetchData();
//   }, [url])

//   return { data, error, loading }
// }
