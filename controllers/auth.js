const axios = require('axios')
const path = require('path')

const auth = async (req, res) =>  {
    const name = req.body.username
    const password = req.body.password
    const body = {
      name: name,
      password: password
    }

    try {
      console.log(`RAILS BASE URL : ${process.env.RAILS_BASE_URL}`)

      const response = await axios.post(`${process.env.RAILS_BASE_URL}/auth`, body)

      const token = response.data.token
      console.log(`token --> ${token}`)

      if (!token) {
        throw new Error('Invalid Token')
      }

      res.cookie('token', `${token}`)
      console.log('Sign up Successful')

      res.sendFile(path.join(__dirname + '../../views/signup_success.html'))

      return true
    } catch (err) {
      console.log('Wrong Login ' + err)
      res.status(401).sendFile(path.join(__dirname + '../../views/error401.html'))

      return false
    }
}

module.exports = auth