const url = require('url')
const queryString = require('querystring')
const utils = require('../tools/utils')
const config = require('../tools/config')

module.exports = async ctx => {
  const urlStr = url.parse(ctx.request.url)
  const params = queryString.parse(urlStr.query)
  const card = params['card']
  try {
    const data = await utils.getJSON(config.rank.url + config.rank[card])
    data.ranking.books = data.ranking.books.map(item => {
      item.cover = unescape(item.cover.slice(7, -3))
      item['path'] = `../intro/main?id=${item._id}`
      return item
    })
    ctx.state.code = 1
    ctx.state.data = {
      msg: data
    }
  } catch (error) {
    ctx.state.code = 0
    ctx.state.data = {
      msg: error
    }
  }
}

