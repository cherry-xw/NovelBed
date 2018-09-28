// 工具类
import config from './config'

export function get (url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      data,
      success (res) {
        if (res.data.code === 0) {
          resolve(res.data.data)
        } else {
          reject(res.data.data)
        }
      },
      fail (res) {
        reject(res)
      }
    })
  })
}

export function toast (title, icon = 'success', image = '../../static/img/close_light.png', duration = 1500) {
  if (icon === 'success' || icon === 'loading') {
    wx.showToast({
      title,
      icon,
      duration
    })
  } else if (icon === 'none' || image) {
    wx.showToast({
      title,
      icon,
      duration,
      image
    })
  } else {
    console.error('提示必须为success、loading、none三种情况之一')
  }
}

export function loading (status, title = '加载中') {
  if (status) {
    wx.showLoading({
      title,
      mask: true
    })
  } else {
    wx.hideLoading()
  }
}

// 动态设置标题内容
export function setTitle (title) {
  wx.setNavigationBarTitle({
    title
  })
}

// 设置标题栏颜色
export function setTitleBarStyle (theme) {
  const frontColor = theme === 'black' ? '#ffffff' : '#000000'
  const backgroundColor = theme === 'black' ? '#0f0f0f' : '#EA5149'
  wx.setNavigationBarColor({
    frontColor,
    backgroundColor
  })
}

// 返回上一页
export function navigateBack (delta = 1) {
  wx.navigateBack({
    delta
  })
}

// 设置底部标签颜色
export function setTabBarStyle (theme) {
  const backgroundColor = theme === 'black' ? '#202020' : '#f0f0f0'
  wx.setTabBarStyle({
    backgroundColor: backgroundColor,
    borderStyle: 'white'
  })
}

export function showModal (title, content, confirmText = '确认', confirmFun, showCancel = false, cancelFun) {
  wx.showModal({
    title,
    content,
    showCancel,
    confirmText,
    success (res) {
      if (res.confirm) {
        confirmFun()
      } else if (res.cancel) {
        cancelFun()
      }
    }
  })
}

export function setScreenBrightness (bright) {
  return new Promise((resolve, reject) => {
    wx.setScreenBrightness({
      value: bright, // 屏幕亮度值，范围 0~1，0 最暗，1 最亮
      success (data) {
        resolve(data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export function getScreenBrightness () {
  return new Promise((resolve, reject) => {
    wx.getScreenBrightness({
      success (data) {
        resolve(data)
      },
      fail (err) {
        reject(err)
      }
    })
  })
}
