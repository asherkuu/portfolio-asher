import BaseApi from "lib/api";

class BlogApi extends BaseApi {
    constructor(accessToken) {
        super(accessToken, "/blogs");
    }
}
export default BlogApi;
