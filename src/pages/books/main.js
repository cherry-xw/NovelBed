import Vue from 'vue'
import Books from './Books'

const books = new Vue(Books)
books.$mount()

export default {
  config: {
    navigationBarTitleText: '小被几书架',
    enablePullDownRefresh: true,
    backgroundTextStyle: 'light',
    backgroundColor: '#666',
    onReachBottomDistance: 50
  }
}
