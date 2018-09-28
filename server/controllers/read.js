const utils = require('../tools/utils')
const config = require('../tools/config')

module.exports = async ctx => {
  // 获取请求的参数
  const id = ctx.request.body.id
  try {
    let data = await utils.getJSON(config.read + id.join(','))
    data = data.map(item => {
      item.updated = utils.latelyUpdate(item.updated)
      return item
    })
    ctx.state.code = 1
    ctx.state.data = {
      msg: data
    }
  } catch (error) {
    console.log(error)
  }
}
