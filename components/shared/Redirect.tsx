import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Redirect = ({ to, ssr = null }) => {
  const router  = useRouter();

  useEffect(() => {
    if(ssr) window.location.pathname = to;
    else router.push(to); 
  }, [])

  return (
    <div>Loading...</div>
  )
}

export default Redirect
