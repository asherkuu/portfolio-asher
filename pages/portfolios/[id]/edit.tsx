import React from 'react'
import withAuth from 'hoc/withAuth'
import { useRouter } from 'next/router'
import useGetPortfolio from 'actions/portfolios'
import HeaderTitle from 'components/shared/HeaderTitle'
import PortfolioForm from 'components/PortfolioForm'
import { Row, Col } from 'reactstrap'

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const { data } = useGetPortfolio(router.query.id);
  return (
    <>
      <HeaderTitle title="Edit Portfolio" />
      {/* {JSON.stringify(data)} */}
      <Row>
        <Col md="8">
          { data &&
            <PortfolioForm onSubmit={data => alert(JSON.stringify(data))} initialData={data} />
          }
        </Col>
      </Row>
    </>
  )
}

export default withAuth(PortfolioEdit)('admin')
