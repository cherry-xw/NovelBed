const config = require('../tools/config')
const utils = require('../tools/utils')
const queryString = require('querystring')
const url = require('url')

module.exports = async ctx => {
  const urlStr = url.parse(ctx.request.url)
  const param = queryString.parse(urlStr.query)
  try {
    const msg = await utils.getJSON(config.source + param.bookID)
    if (msg.length) {
      // 去掉vip和笔趣阁源
      for (let i = 0, len = msg.length; i < len; i++) {
        if (msg[i].source === 'zhuishuvip') {
          msg.splice(i, 1)
          break
        }
      }
      for (let i = 0, len = msg.length; i < len; i++) {
        if (msg[i].source === 'biquge') {
          msg.splice(i, 1)
          break
        }
      }
      if (param['source'] === 'default') {
        msg[0].isCharge = true
      } else {
        for (let i = 0, len = msg.length; i < len; i++) {
          if (msg[i]._id === param['source']) {
            msg[i].isCharge = true
            break
          }
        }
      }
      msg.updated = utils.latelyUpdate(msg.updated)
      ctx.state = {
        code: 1,
        data: {
          msg: msg.map(item => {
            item.updated = utils.latelyUpdate(item.updated)
            return item
          })
        }
      }
    } else {
      ctx.state = {
        code: 0,
        data: {
          msg: 'data get failed'
        }
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
