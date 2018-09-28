import Vue from 'vue'
import Read from './Read'

const read = new Vue(Read)
read.$mount()

export default {
  config: {
    disableScroll: true
  }
}
