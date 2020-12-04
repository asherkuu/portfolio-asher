import React from 'react'
import { withAuth } from 'utils/auth0'

const OnlyAdminSSR = ({ user, title }) => {
    return (
      <div>
        <h1>
          Only Admin SSR ! { user.name }
        </h1>
        <h3>{ title }</h3>
      </div>
    )
}

const getTitle = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res({ title: 'My new title!' })
    }, 500)
  })
}

export const getServerSideProps = withAuth(async ({ req, res }, user) => {
  const title = await getTitle();
  return title;
})('admin');

export default OnlyAdminSSR;
