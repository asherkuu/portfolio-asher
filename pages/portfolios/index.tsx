import React, { useState } from 'react'
import PortfolioApi from 'lib/api/portfolios'
import PortolioCard from 'components/PortfolioCard'
import { Row, Col, Button } from 'reactstrap';
import { useRouter } from 'next/router';
import HeaderTitle from 'components/shared/HeaderTitle'
import useGetUser from 'actions/user';
import { useDeletePortfolio } from 'actions/portfolios';
import { isAuthorized } from 'utils/auth0'

// 포트폴리오 메인
const Portfolios = ({ portfolios:initialPortfolios }) => {
  // useSWR는 불러온 데이터를 cash로 저장하여 재호출시 가지고 있는 cash를 가져와서 제 랜더링을 하지 않아
  // 속도가 빠르다
  const router = useRouter();
  const [ portfolios, setPortfolios ] = useState(initialPortfolios);
  const { data: user, loading: lading } = useGetUser();
  const [ deletePortfolio, { data, error } ]: any = useDeletePortfolio();

  const _deletePortfolio = async (e, id) => {
    e.stopPropagation();
    const isConfirm = confirm('Are you sure you wnat to delete this portfolio ?')
    if(isConfirm) {
      await deletePortfolio(id);
    }
    setPortfolios(portfolios.filter(p => p._id !== id));
  }

  return (
    <>
      <HeaderTitle title="Portfolios" />
      <Row>
        { portfolios.map((portfolio) => (
          <Col 
            key={portfolio._id} 
            onClick={() => {
              router.push('/portfolios/[id]', `/portfolios/${portfolio._id}`);
            }}
            md="4">
            <PortolioCard portfolio={portfolio} >
              { user && isAuthorized(user, 'admin') &&
                <>
                  <Button 
                    className='mr-2' 
                    color='warning' 
                    // onClick={() => {router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`)}}
                    // 이부분에서 edit 페이지로 갔다가 다시 portfolios/id 페이지로 돌아오게 된다 그 이유는
                    // 이 버튼에서 url 이벤트가 이뤄진후 위의 Col url 이벤트도 동시에 이루어지기 때문이다
                    // 즉 버튼클릭만 먹는게 아니라 Col 의 전체 클릭 이벤트도 먹게되는것이다. 이는 아래와 같이 수정한다.
                    onClick={(e) => { 
                      e.stopPropagation(); 
                      router.push('/portfolios/[id]/edit', `/portfolios/${portfolio._id}/edit`) }}
                  >
                  Edit
                  </Button>
                  <Button 
                    color='danger'
                    onClick={ (e) => _deletePortfolio(e, portfolio._id) }
                  >
                    Delete
                  </Button>
                </>
              }
            </PortolioCard>
          </Col>
        ))}
      </Row>
    </>
  )
}
// This function is called during the build time
// Improved perfomance of page,
// It will create static page with dynamic data
export const getStaticProps = async () => {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;
  return { props: { portfolios: portfolios } , revalidate: 1}
}

// export const getServerSideProps = async () => {
//   const json = await new PortfolioApi().getAll();
//   const portfolios = json.data;
//   return { props: { portfolios: portfolios }}
// }

export default Portfolios
