/*
  현재 미사용
*/
const routes = require("next-routes");

// pages/folderName/[id].tsx 대신 routes().add('childFileName', ParentFileName:id) 로 링크 라우트를 함
module.exports = routes().add("portfolio", "/portfolios/:id");

/*
  server.js 추가 설정 필요
  const routes = require("./routes");

     const handle = app.getRequestHandler();
  >> const handle = routes.getRequestHandler(app);

  js, jsx, tsx 파일 추가 설정 필요
  import route from 'routes'
  const { Link } = route;
  <Link route={`/ParentFileName/${id}`} > Name </Link>
*/
