const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const axios = require('axios')
const cookieParser = require('cookie-parser')
const app = express()
const authController = require('../controllers/auth')
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

app.post('/auth', authController)

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
