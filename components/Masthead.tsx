import Link from 'next/link'
import React from 'react'
import { Button, Container, Row } from 'reactstrap'

const Masthead = ({ background }) => {
  return (
    <div className="masthead" style={{"backgroundImage": `url(${background})`}}>
      <div className="overlay"></div>
      <Container>
          <Row>
              <div className="col-lg-8 col-md-10 mx-auto">
              <div className="site-heading">
                  <h1>Blogs Dashboard</h1>
                  <span className="subheading">
                  Let's write some nice blog today{' '}
                      <Link href='/blogs/editor'>
                      <Button color="primary">Create a new Blog</Button>
                  </Link></span>
              </div>
              </div>
          </Row>
      </Container>
  </div>
  )
}

export default Masthead
