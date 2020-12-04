import React from 'react'
import PortfolioApi from 'lib/api/portfolios'
import PortolioCard from 'components/PortfolioCard'
import { Row, Col } from 'reactstrap';
import { useRouter } from 'next/router';
import HeaderTitle from 'components/shared/HeaderTitle'

// 포트폴리오 메인
const Portfolios = ({ portfolios }) => {
  // useSWR는 불러온 데이터를 cash로 저장하여 재호출시 가지고 있는 cash를 가져와서 제 랜더링을 하지 않아
  // 속도가 빠르다
  const router = useRouter();
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
            <PortolioCard portfolio={portfolio}/>
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
  return { props: { portfolios: portfolios }}
}

export default Portfolios
