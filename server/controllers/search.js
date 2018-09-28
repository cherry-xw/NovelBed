const utils = require('../tools/utils')
const config = require('../tools/config')
const queryString = require('querystring')
const url = require('url')

async function keywords (ctx) {
  const urlStr = url.parse(ctx.request.url)
  const param = queryString.parse(urlStr.query)
  try {
    const msg = await utils.getJSON(config.search.keywords.replace('[QUERY]', encodeURIComponent(param['query'])))
    ctx.state = {
      code: 1,
      data: {
        msg
      }
    }
  } catch (error) {
    console.log(error)
    ctx.state = {
      code: 0,
      data: {
        msg: 'server has failed'
      }
    }
  }
}

async function list (ctx) {
  const urlStr = url.parse(ctx.request.url)
  const param = queryString.parse(urlStr.query)
  try {
    let msg = await utils.getJSON(config.search.list.replace('[QUERY]', encodeURIComponent(param['query'])))
    for (let i = 0, len = msg.books.length; i < len; i++) {
      msg.books[i].cover = unescape(msg.books[i].cover.slice(7, -3))
      msg.books[i]['path'] = `../intro/main?id=${msg.books[i]._id}`
    }
    ctx.state = {
      code: 1,
      data: {
        msg
      }
    }
  } catch (error) {
    ctx.state = {
      code: 0,
      data: {
        msg: 'server has error'
      }
    }
  }
}

module.exports = {
  list,
  keywords
}
