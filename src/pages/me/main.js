import Vue from 'vue'
import Me from './Me'

const me = new Vue(Me)
me.$mount()

export default {
  config: {
    navigationBarTitleText: '小被几捂头'
  }
}
