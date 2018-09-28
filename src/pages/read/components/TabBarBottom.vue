<template>
  <div :class="[showOrHide, isActive]">
    <div class="fx-one" v-for="item in tabData" :key="item.id">
      <div
        class="tab"
        hover-class="changeBgColor"
        :class="item.isShow"
         @click="handleShow(item.id)"
      >
        <img :src="item.img" class="img-sty">
        <div class="txt-sty">{{item.message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {toast} from '@/util'
export default {
  name: 'tabBarBottom',
  props: {
    showTab: {
      type: Boolean,
      required: true
    },
    changeCurShow: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data () {
    return {
      tabData: [{
        id: 0,
        img: '../../static/img/moon.png',
        isShow: '',
        message: '夜间'
      }, {
        id: 1,
        img: '../../static/img/sign.png',
        isShow: '',
        message: '提示'
      }, {
        id: 2,
        img: '../../static/img/list.png',
        isShow: '',
        message: '目录'
      }, {
        id: 3,
        img: '../../static/img/download.png',
        isShow: '',
        message: '缓存'
      }, {
        id: 4,
        img: '../../static/img/setup.png',
        isShow: '',
        message: '设置'
      }],
      isDark: false, // 是否为夜间模式
      currentShow: -1, // -1表示全部显示（0-4）表示显示对应的那个按钮，其他的隐藏
      isActive: 'removed', // 下部标签内容显示状态
      middleStatus: false, // 列表页面显示状态
      setupStatus: false, // 设置页面显示状态
      isTimeout: 0 // 当前动画是否已经在执行状态
    }
  },
  methods: {
    handleShow (id) { // 显示列表页面
      switch (id) {
        case 0:
          this.isDark = !this.isDark
          this.$pub.$emit('darkLight', this.isDark)
          break
        case 1:
          toast('当前页面上半段可以切出设置栏，下半段操作上下章节切换按钮', 'none', '', 3500)
          break
        case 2:
          this.middleStatus = !this.middleStatus
          this.currentShow = this.middleStatus ? 2 : -1
          this.$emit('showChapterList', this.middleStatus)
          break
        case 3:
          toast('正在开发', 'none')
          break
        case 4:
          this.setupStatus = !this.setupStatus
          this.currentShow = this.setupStatus ? 4 : -1
          this.$emit('showSetup', this.setupStatus)
          break
      }
    }
  },
  created () {
    this.$pub.$on('closeTabMiddle', () => {
      this.handleShow(2)
    })
  },
  mounted () {
    this.isDark = this.$store.state.selectedBgColor.id !== 'white'
  },
  computed: {
    showOrHide () {
      return this.showTab ? 'tab-in' : 'tab-out'
    },
    active () {
      if (this.showTab) {
        this.isActive = 'active'
        this.isTimeout = new Date().getTime()
      } else {
        const dirAnimateTime = this.$store.state.tabAnimationDirection
        setTimeout(() => {
          if (new Date().getTime() - this.isTimeout > dirAnimateTime - 80) {
            this.isActive = 'removed'
            this.isTimeout = new Date().getTime()
          }
        }, dirAnimateTime)
      }
      return this.showTab
    }
  },
  watch: {
    isDark () {
      this.tabData[0].img = this.isDark ? '../../static/img/sun.png' : '../../static/img/moon.png'
      this.tabData[0].message = this.isDark ? '白天' : '夜间'
    },
    changeCurShow () {
      this.currentShow = -1
      this.setupStatus = false
    },
    currentShow () {
      if (this.currentShow === -1) {
        this.tabData = [{
          id: 0,
          img: '../../static/img/sun.png',
          isShow: '',
          message: '夜间'
        }, {
          id: 1,
          img: '../../static/img/sign.png',
          isShow: '',
          message: 'tip'
        }, {
          id: 2,
          img: '../../static/img/list.png',
          isShow: '',
          message: '目录'
        }, {
          id: 3,
          img: '../../static/img/download.png',
          isShow: '',
          message: '缓存'
        }, {
          id: 4,
          img: '../../static/img/setup.png',
          isShow: '',
          message: '设置'
        }]
      } else {
        this.tabData.map((item, i) => {
          if (i !== this.currentShow) {
            item.isShow = 'removed'
          } else {
            item.img = '../../static/img/close.png'
            item.message = '关闭'
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
  .active
    width 100%
    height 100rpx
    background-color bgcolor
    color white
    display flex
  .btn-in
    tabBtnShow()
  .btn-out
    tabBtnHide()
  .removed
    display none
  .tab-in
    show(#000, 100rpx)
  .tab-out
    hide(#000, 100rpx)
  .changeBgColor
    background-color #666
  .fx-one-hide
    flex 1
    display none
    text-align center
  .fx-one
    flex 1
    text-align center
    .tab
      width 100%
      height 100%
    .img-sty
      width 45rpx
      height 45rpx
      margin-top 10rpx
    .txt-sty
      font-size 25rpx
      width 100%
      margin-top -7rpx
</style>
