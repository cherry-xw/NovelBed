<template>
  <div class="container">
    <div class="user-info">
      <img :src="userInfo.avatarUrl" alt="" class="avatar">
      <p>{{ userInfo.nickName }}</p>
    </div>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="login" v-if="isLogined">点击登录</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import {toast, setTitleBarStyle} from '@/util'
export default {
  name: 'me',
  data () {
    return {
      userInfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    getWxLogin ({encryptedData, iv, userinfo}) {
      const self = this
      wx.login({
        success (loginResult) {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData,
            iv
          }
          qcloud.requestLogin({
            loginParams,
            success () {
              // 获取用户信息
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  toast('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              // showModal('登录失败', error)
              console.log(error)
            }
          })
        },
        fail (loginError) {
          // showModal('登录失败', loginError)
        }
      })
    },
    login (e) {
      const self = this
      // 查看是否授权
      wx.getSetting({
        success (res) {
          // 授权信息里有用户信息
          if (res.authSetting['scope.userInfo']) {
            // 检查用户登录是否过期
            wx.checkSession({
              success () {
                // 没过期 直接成功
                toast('登录成功')
              },
              fail () {
                // 过期了 重新登录 先清除登录的状态
                qcloud.clearSession()
                // 登录态已过期，需重新登录
                // 登录需要的加密信息
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userInfo
                }
                self.userInfo = e.mp.detail.userInfo
                console.log('login1', options)
                self.getWxLogin(options)
              }
            })
          } else {
            // showModal('用户未授权', e.mp.detail.errMsg)
          }
        }
      })
    }
  },
  computed: {
    isLogined () {
      return this.userInfo.nickName === ''
    },
    setTitleBarStyl () {
      setTitleBarStyle(this.$store.state.selectedBgColor.id)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    text-align center
    padding 0 30rpx
    .user-info
      margin-top 100rpx
      .avatar
        height 256rpx
        width 256rpx
        border-radius 50%
        margin 20rpx
</style>
