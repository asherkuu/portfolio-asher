import BaseApi from "lib/api";

class PortfolioApi extends BaseApi {
    constructor(accessToken) {
        super(accessToken, "/portfolios");
    }
}
export default PortfolioApi;
