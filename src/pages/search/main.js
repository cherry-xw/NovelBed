import Vue from 'vue'
import Search from './Search'

const search = new Vue(Search)
search.$mount()

export default {
  config: {
    navigationBarTitleText: '小被几找书'
  }
}
