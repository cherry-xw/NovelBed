import Vue from 'vue'
import App from './App'
import store from './store/index'
// 添加vuex支持
Vue.prototype.$store = store
// 添加公共事件通知（跨组件）支持
Vue.prototype.$pub = new Vue()

Vue.config.productionTip = false

const app = new Vue(App)
app.$mount()

export default {
  config: {
    pages: ['^pages/books/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EA5149',
      navigationBarTitleText: '小被几小说',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#ccc',
      backgroundColor: '#f0f0f0',
      selectedColor: '#EA5149',
      borderStyle: 'white',
      list: [{
        pagePath: 'pages/books/main',
        text: '书架',
        iconPath: 'static/img/read.png',
        selectedIconPath: 'static/img/read_active.png'
      }, {
        pagePath: 'pages/search/main',
        text: '搜索',
        iconPath: 'static/img/search.png',
        selectedIconPath: 'static/img/search_active.png'
      }, {
        pagePath: 'pages/me/main',
        text: '我的',
        iconPath: 'static/img/user.png',
        selectedIconPath: 'static/img/user_active.png'
      }]
    }
  }
}
