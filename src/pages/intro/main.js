import Vue from 'vue'
import Intro from './Intro'

const intor = new Vue(Intro)
intor.$mount()

export default {
  config: {
    navigationBarTitleText: '小被几简介'
  }
}
