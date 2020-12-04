import React from 'react'
import useGetUser from 'actions/user'
import { useRouter } from 'next/router'
import { ReactNode } from 'typings'
import { Header  } from 'components/shared'

interface IProps {
   children?: ReactNode | null | undefined
   className?: string
   // user?: string
   // navClass: string
   // loading: boolean
}

const BaseLayout = (props) => {
   const { className, /*user,  loading,*/ children } = props;
   const { data, error, loading } = useGetUser();
   const router = useRouter();
   const navClass = router.pathname === '/' ? 'transparent' : 'with-bg';
   return (
      <div className="layout-container">
         <Header className={ navClass } user={ data } loading={ loading }/>
         <main className={`cover ${ className }`}>
            <div className="wrapper">
               { children }
            </div>
         </main>
      </div>
   )
}

export default BaseLayout
