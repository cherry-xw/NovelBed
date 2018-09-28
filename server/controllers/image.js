const utils = require('../tools/utils')

module.exports = async ctx => {
  try {
    const body = await utils.getImage('https://gss0.bdstatic.com/5bVWsj_p_tVS5dKfpU_Y_D3/res/r/image/2018-07-13/6e8ebeb4121b3ce8fe215f64de39e5ee.jpg')
    ctx.type = 'jpg'
    ctx.length = Buffer.byteLength(body)
    ctx.body = body
  } catch (error) {
    console.error(error)
  }
}
