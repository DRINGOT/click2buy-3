const axios = require('axios')
const { mockRequest, mockResponse } = require('mock-req-res')
const authController = require('../controllers/auth')
jest.mock('axios')


describe('I want to login from the home page', () => {
    beforeAll(async () => {
      await page.goto('http://localhost:3000')
      await page.click('a[href="/login"]')
    })

    it('should be login page', async () => {
      await expect(page.url()).toMatch('http://localhost:3000/login');
    })

    it('should have "Login Form" as title', async () => {
      const title = await page.$eval('h1', element => element.textContent)
      await expect(title).toMatch('Login Form')
    })

    it('should have a form', async () => {
      const form = await page.$eval('form', element => element)
      await expect(form).toBeTruthy()
    })

    it('should not log me in', async () => {
      await page.type('input[name="username"]', 'foo')
      await page.type('input[name="password"]', 'bar')
      await page.click('input[type=submit]')
      page.on('response', (response) => {
        if ( response.request().method === 'POST' && response.url === `http://localhost:3000/auth`) {
          expect(response.status).toEqual(401)
        }
      })
    })

    it('should log me in', async () => {
      await page.goto('http://localhost:3000/login')
      axios.post.mockResolvedValue({
        data: {token: 'azerty123'}
      })
      await page.type('input[name="username"]', 'foo')
      await page.type('input[name="password"]', 'bar')
      await page.click('input[type=submit]')
      page.on('response', (response) => {
        if ( response.request().method === 'POST' && response.url === `http://localhost:3000/auth`) {
          expect(response.status).toEqual(200)
        }
      })
    })
  })

  describe('Testing Auth Controller', () => {
    const res = mockResponse()
    const req = mockRequest({
      body: {
        username: 'name',
        password: 'password'
      }
    })

    it('should not logged in user', async () => {
      axios.post.mockResolvedValue({
        data: {token: undefined}
      })

      await expect(await authController(req,res)).toBeFalsy()
    })

    it('should not logged in user', async () => {
      axios.post.mockResolvedValue({
        data: {}
      })

      await expect(await authController(req,res)).toBeFalsy()
    })

    it('should logged in user', async () => {
      axios.post.mockResolvedValue({
        data: {token: 'azerty123'}
      })

      await expect(await authController(req,res)).toBeTruthy()
    })
  })