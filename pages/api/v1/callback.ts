import auth0 from 'utils/auth0'

const callback = async (req, res) => {
  try {
    await auth0.handleCallback(req, res, { redirectTo: '/' }); 
    // redirectTo >> 로그인 성공 또는 로그인 되었을때 리다이렉트 시켜준다.
  } catch (err) {
    console.error(err)
    res.status(err.status || 400).end(err.message);
  }
}

export default callback
