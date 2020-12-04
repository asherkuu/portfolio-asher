import React from 'react'

import useGetUser from 'actions/user'
import HeaderTitle from 'components/shared/HeaderTitle';

const About = () => {
    const { data, error, loading } = useGetUser();
    
    return (
        <>
            <HeaderTitle title="About" />
            <h1></h1>
        </>
    )
}

export default About
