import React from 'react'
import withAuth from 'hoc/withAuth'

const Secret = ({ user, loading }) => {
    return (
      <h1>
        Hi ! { user.name }
      </h1>
    )
}

// Hight Order Component - HOC ( 고차 컴포넌트 )
// Simple function that takes a component and returns new component
// with some extended functionality
// >> 인자로 컴포넌트를 받아 새로운 컴포넌트를 반환하는 함수
// 컴포넌트 로직을 재사용하기 위한 방식
// 명명 규칙 : with<Name>

export default withAuth(Secret)('admin');
