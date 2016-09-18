const nova = require('nova-colors')
const Handlebars = require('handlebars')
const hexRgb = require('hex-rgb')
const fs = require('fs')

const toSrgb = (color) => color / 255

const hexToRGB = (hex) => {
  const [red, green, blue] = hexRgb(hex).map(toSrgb)
  return { red, green, blue}
}

const rgbaNova = Object.keys(nova).reduce((result, key) => {
  const mapOfRGB = Object.keys(nova[key]).reduce((memo, colorName) => {
    memo[colorName] = hexToRGB(nova[key][colorName])
    return memo
  }, {})
  result[key] = mapOfRGB
  return result
}, {})

Handlebars.registerPartial('color',
  fs.readFileSync('src/color.handlebars').toString())
const template = Handlebars.compile(fs.readFileSync('src/nova.handlebars').toString())

process.stdout.write(template(rgbaNova))
