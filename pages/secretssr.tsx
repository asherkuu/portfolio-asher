import React from 'react'
import { withAuth } from 'utils/auth0'

// 101강
const SecretSSR = ({ user, title }) => {
    
    return (
      <div>
        <h1>
          A yo ! { user.name }
        </h1>
        <h3>{ title }</h3>
      </div>
    )
}

// export const getServerSideProps = async ({ req, res }) => {
//   const user = await authorizeUser(req, res);
//   return {
//     props: { user: user } 
//   }
// }

const getTitle = () => {
  return new Promise((res) => {
    setTimeout(()=> {
      res({ title: 'Fucking title !' });
    }, 500)
  })
}

export const getServerSideProps = withAuth(async ({req, res}, user) => {
  const title = await getTitle();
  return title;
})();

export default SecretSSR;
