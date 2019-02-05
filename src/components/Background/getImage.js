const getImage = () => {
  const min = 0
  const max = 33
  const i = Math.floor(Math.random() * (max - min + 1)) + min
  const image = require(`./backgrounds/background${i}.jpg`)
  return image
}

export default getImage
