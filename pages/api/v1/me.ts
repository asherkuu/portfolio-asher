import auth0 from 'utils/auth0'

const Me = async (req, res) => {
  try {
    await auth0.handleProfile(req, res);
  } catch (err) {
    console.error(err)
    res.status(err.status || 400).end(err.message);
  }
}

export default Me
