const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser())

app.get('/', function (req, res) {
  console.log('Home Page')
  res.sendFile(path.join(__dirname + '../../views/index.html'))
})

app.get('/login', function (req, res) {
  console.log('Login Page')
  res.sendFile(path.join(__dirname + '../../views/login.html'))
})

app.get('/signup_success', function (req, res) {
  res.sendFile(path.join(__dirname + '../../views/signup_success.html'))
})

app.post('/auth', async function (req, res) {
  const name = req.body.name
  const password = req.body.password
  const body = {
    name: name,
    password: password
  }

  try {
    const response = await axios.post(`${process.env.RAILS_BASE_URL}/auth`, body)
    const token = response.data.token

    res.cookie('token', `${token}`)
    console.log('Sign up Successful')
    res.sendFile(path.join(__dirname + '../../views/signup_success.html'))
  } catch (err) {
    console.log('Wrong Login')
    return res.status(401).sendFile(path.join(__dirname + '../../views/error401.html'))
  }
})

app.get('/data', async function (req, res) {
  const token = req.cookies.token
  const response = await axios.get(`${process.env.RAILS_BASE_URL}/data?token=${token}`)
  res.render('data', {
    hello: response.data
  })
})

/* eslint-disable */
app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname + '/background.js'))
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`Server Has Started at http://localhost:${port} !`)
})
