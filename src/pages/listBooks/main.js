import Vue from 'vue'
import ListBooks from './ListBooks'

const listBooks = new Vue(ListBooks)
listBooks.$mount()

export default {
  config: {
    navigationBarTitleText: '小被几找书'
  }
}
