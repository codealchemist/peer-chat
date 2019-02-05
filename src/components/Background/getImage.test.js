import getImage from './getImage'

describe('getImage', () => {
  it('should return a random background image', () => {
    const image = getImage()
    expect(image).toMatch(/background([0-9]|[0-2][0-9]|3[0-3]).jpg/)
  })
})
