import React from 'react'
import { useRouter } from 'next/router'
import PortfolioApi from 'lib/api/portfolios'

// interface PostProps {
//   post: PortfolioModel | null | undefined
// }

const Portfolio = ({ portfolio }) => {
  const router = useRouter();
  // const { data, error, loading } = useGetDataById(router.query.id);
  // debugger
  return (
    <div>
      { portfolio.title }
    </div>
  )
}

export default Portfolio

// export const getServerSideProps = async({ query }) => {
//   const json = await new PortfolioApi().getById(query.id);
//   const portfolio = json.data;
//   return { props: { portfolio } }
// }

/*
  아래의 로직은 데이터를 이미 형성한 상태에서 데이터를 통으로
  웹 build를 하게됨
  그렇기 때문에 데이터가 변경이 되더라도 이미 build 되어진 
  데이터를 보여주기 때문에 실시간으로 변경된 데이터를 볼 수 없음
  정적인 데이터라면 사용해도 좋지만 실시간데이터인 경우 
  getServerSideProps를 사용하여 실시간 데이터 반영을 하도록 하자.
  만약 어쩌다 한번 올리고 수정이 필요없는 데이터라면 아래의 로직을 사용하여
  static page로 만들어 사용해도 된다.
*/
// This function is executed at the build time
export const getStaticPaths = async () => {
  const json = await new PortfolioApi().getAll();
  const portfolios = json.data;

  // Get the paths we want pre-render based on portfolio ID
  const paths = portfolios.map(portfolio => {
    return { params: { id: portfolio._id } }
  })

  // fallback: false means that "not found pages" will be resolved into 404 page
  return { paths, fallback: false };
}

export const getStaticProps = async ({ params }) => {
  const json = await new PortfolioApi().getById(params.id);
  const portfolio = json.data;
  return { props: { portfolio } , revalidate: 1 }
}


// using getServerSideProps
// export const getServerSideProps: GetServerSideProps<PostProps> = async (ctx) => {
//   // route를 통해서 들어온 경우 ctx.param 이 아닌 ctx.query로 변경해주어야함
//   const id = ctx.query.id;
//   const post = await axios.get<PortfolioModel | undefined>(`http://jsonplaceholder.typicode.com/posts/${id}`)
//                           .then(res => res.data)
//                           .catch(err => null);
//   return { props: { post: post || null } };
// };

