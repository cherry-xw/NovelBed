import Vue from 'vue'
import SrcList from './SrcList'

const srcList = new Vue(SrcList)
srcList.$mount()

export default {
  config: {
    navigationBarTitleText: '小被几排行'
  }
}
