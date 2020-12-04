const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    webpack: (config) => {
        // tsconfig.json 의 "baseUrl" : "." 과 비슷한 의미이다.
        // 타 js, jsx, ts, tsx 파일음 import 하려할 때 'components/shared' 가 tsconfig.json 방식이라면
        // next.config.js 의 방식은 '@/components/shared' 이다.
        config.resolve.alias["@"] = path.resolve(__dirname);
        config.plugins.push(new Dotenv({ silent: true, path: ".env.development.local" }));
        // path 설정되어진 .env 파일의 경로를 잡아서 환경변수 사용
        return config;
    },
};
