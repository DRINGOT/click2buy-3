describe('Am I a string ?', () => {
    it(`Should be not valid`, () => {
      expect(typeof true === 'string').toBeFalsy()
      expect(typeof 1 === 'string').toBeFalsy()
    })

    it(`Should be valid`, () => {
      expect(typeof 'foo' === 'string').toBeTruthy()
    })
  })