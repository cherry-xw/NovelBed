const url = require('url')
const queryString = require('querystring')
const utils = require('../tools/utils')
const config = require('../tools/config')

module.exports = async ctx => {
  // 获取请求头中的参数
  const urlStr = url.parse(ctx.request.url)
  const params = queryString.parse(urlStr.query)
  const bookID = params['bookID']
  try {
    const data = await utils.getJSON(config.book + bookID)
    data.cover = unescape(data.cover.slice(7, -3))
    data.updated = utils.latelyUpdate(data.updated)
    data.wordCount = data.wordCount > 10000 ? parseInt(data.wordCount / 10000 + 0.5) + '万' : data.wordCount
    data.isSerial = data.isSerial ? '连载中' : '完结'
    ctx.state = {
      code: 1,
      data: {
        msg: data
      }
    }
  } catch (error) {
    ctx.state = {
      code: 0,
      data: {
        msg: error
      }
    }
  }
}
