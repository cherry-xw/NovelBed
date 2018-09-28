const http = require('http')
const request = require('request')

// 获取数据函数
const utils = {
  getJSON (url) {
    return new Promise((resolve, reject) => {
      http.get(url, res => {
        res.setEncoding('utf8')
        let rawData = ''
        res.on('data', chunk => {
          rawData += chunk
        })
        res.on('end', () => {
          try {
            const parseData = JSON.parse(rawData)
            if (parseData.ok || parseData.ok === undefined) {
              resolve(parseData)
            } else {
              reject(parseData)
            }
          } catch (error) {
            reject(error)
          }
        })
      })
    })
  },
  latelyUpdate (time) { // 计算更新时间
    let minutes = parseInt((new Date() - new Date(time)) / 60000)
    if (minutes > 59) {
      let hours = parseInt(minutes / 60)
      if (hours > 23) {
        let day = parseInt(hours / 24)
        if (day > 364) {
          return `${parseInt(day / 365)}年前更新`
        } else {
          return `${day}天前更新`
        }
      } else {
        return `${hours}小时前更新`
      }
    } else {
      return `${minutes}分钟前更新`
    }
  },
  getImage (url) {
    return new Promise((resolve, reject) => {
      request({
        method: 'GET',
        encoding: null,
        uri: url
      }, (err, response, body) => {
        if (err) {
          return reject(err)
        }
        resolve(body)
      })
    })
  }
}

module.exports = utils
