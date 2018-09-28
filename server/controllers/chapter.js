const utils = require('../tools/utils')
const config = require('../tools/config')
const queryString = require('querystring')
const url = require('url')

// 根据换源接口中的
module.exports = async ctx => {
  const urlStr = url.parse(ctx.request.url)
  const param = queryString.parse(urlStr.query)
  console.log(param)
  try {
    let srcID = param['source']
    // 如果是使用默认源，则去请求实际ID
    if (srcID === 'default') {
      let srcList = await utils.getJSON(config.source + param['bookID'])
      if (srcList.length) {
        let srcIndex = 0
        // 去掉笔趣阁源
        for (let i = 0, len = srcList.length; i < len; i++) {
          if (srcList[i].source === 'biquge') {
            srcList.splice(i, 1)
            break
          }
        }
        // 去掉vip源
        for (let i = 0, len = srcList.length; i < len; i++) {
          if (srcList[i].source === 'zhuishuvip') {
            srcList.splice(i, 1)
            break
          }
        }
        srcID = srcList[srcIndex]._id
        console.log(srcList)
      } else {
        ctx.state = {
          code: 0,
          data: {
            msg: 'data get failed'
          }
        }
        return
      }
    }
    // 使用当前源获取数据
    let msg = await utils.getJSON(config.chapter.replace('[SRCID]', srcID))
    const msgLen = msg.chapters.length
    msg.total = msgLen
    let reqIdx = param['readIndex'] > msgLen ? msgLen : param['readIndex']
    let idx = parseInt(reqIdx / 100)
    console.log(idx, msg.total)
    let endValue = ((idx + 1) * 100) > msgLen ? msgLen : ((idx + 1) * 100)
    msg.chapters = msg.chapters.slice(idx * 100, endValue)
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
        msg: error
      }
    }
  }
}
