const config = require('../tools/config')
const utils = require('../tools/utils')
const url = require('url')
const queryString = require('querystring')

module.exports = async ctx => {
  const urlStr = url.parse(ctx.request.url)
  const param = queryString.parse(urlStr.query)
  const content = await utils.getJSON(config.content.replace('[LINK]', encodeURIComponent(param['link'])))
  try {
    ctx.state = {
      code: 1,
      data: {
        msg: content
      }
    }
  } catch (error) {
    ctx.state = {
      code: 0,
      data: {
        msg: 'get data error'
      }
    }
  }
}
