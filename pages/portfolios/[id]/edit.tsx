import React from 'react'
import withAuth from 'hoc/withAuth'
import { useRouter } from 'next/router'
import { useGetPortfolio, useUpdatePortfolio } from 'actions/portfolios'
import HeaderTitle from 'components/shared/HeaderTitle'
import PortfolioForm from 'components/PortfolioForm'
import { Row, Col } from 'reactstrap'
import { toast } from 'react-toastify'

const PortfolioEdit = ({ user }) => {
  const router = useRouter();
  const [ updatePortfolio, { error } ]:any = useUpdatePortfolio();
  const { data: initialData } = useGetPortfolio(router.query.id);
  
  const _updatePortfolio = async data => {
    // try {
    //   await updatePortfolio(router.query.id, data);
    //   toast.success("ehil", { autoClose: 2000 });  
    // } catch (err) {
    //   toast.error(err, { autoClose: 2000 });  
    // }
    // promise 로 리턴받은경우
    updatePortfolio(router.query.id, data)
    .then(() => { toast.success("Done !!", { autoClose: 2000 });})
  }

  return (
    <>
      <HeaderTitle title="Edit Portfolio" />
      <Row>
        <Col md="8">
          { initialData &&
            <PortfolioForm onSubmit={_updatePortfolio} initialData={initialData} />
          }
          { error &&
            <div className="alert alert-danger mt-2">{ error }</div>
          }
        </Col>
      </Row>
    </>
  )
}

export default withAuth(PortfolioEdit)('admin')
