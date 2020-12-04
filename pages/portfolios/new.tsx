import React from 'react'
import withAuth from 'hoc/withAuth'
import HeaderTitle from 'components/shared/HeaderTitle';
import { Row, Col } from 'reactstrap'
import PortfolioForm from 'components/PortfolioForm'
import { useCreatePortfolio } from 'actions/portfolios'
import Redirect from 'components/shared/Redirect';

const PortfolioNew = ({ user, loading: userLoading }) => {
  const [ createPortfolio, { data, loading, error } ]: any[] = useCreatePortfolio();
  
  if(data) { return <Redirect to="/portfolios"/> }

  return (
    <>
      <HeaderTitle title="Create Portfolio"/>
      <Row>
        <Col md='8'>
          <PortfolioForm onSubmit={createPortfolio}/>
          { error && 
            <div className="alert alert-danger">{ error }</div>
          }
        </Col>
      </Row>
    </>
  )
}

export default withAuth(PortfolioNew)('admin')
