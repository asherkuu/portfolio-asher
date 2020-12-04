import React from 'react'
import withAuth from 'hoc/withAuth'

const OnlyAdmin = ({ user, loading }) => {
  return (
    <div>
      only admin
      { user.name }
    </div>
  )
}

export default withAuth(OnlyAdmin)('admin');


