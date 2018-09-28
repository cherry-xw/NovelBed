<template>
  <div
    class="container"
    :class="[showOrHide, isActive]"
    v-if="isFirstIn"
  >
    <div class="top">
      <img class="left-btn" :src="icons[0]">
      <slider
        class="middle-b"
        activeColor='#EA5A49'
        backgroundColor='#00FFFF'
        block-color = '#FFFF00'
        stroke-width='2'
        block-size='15'
        min="0"
        max="0.8"
        step="0.02"
        @changing="brightChanging"
        @change="brightChange"
        :value="brightValue"
      >
      </slider>
      <img class="right-btn" :src="icons[1]">
    </div>
    <div class="middle">
      <img class="left-btn" :src="icons[2]">
      <slider
        class="middle-b"
        activeColor='#00FFFF'
        backgroundColor='#EA5A49'
        block-color = '#FFFF00'
        stroke-width='2'
        block-size='15'
        min="22"
        max="45"
        step="1"
        @changing="fontSizeChanging"
        @change="fontSizeChange"
        :value="fontSizeValue"
      >
      </slider>
      <img class="right-btn" :src="icons[3]">
    </div>
    <div class="bottom">
      <div class="fx-item-box" v-for="item in selectTheme" :key="item.id">
        <img
          class="fx-item"
          :style="{'background-color': item.color}"
          :src="item.icon"
          @click="handleBgColor(item.id)"
        >
      </div>
    </div>
  </div>
</template>

<script>
import {setTitleBarStyle} from '@/util'
import {mapMutations} from 'vuex'
import {SET_THEME} from '@/store/mutation-types'
export default {
  name: 'setup',
  props: {
    showTab: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      icons: [
        '../../static/img/sun.png',
        '../../static/img/moon.png',
        '../../static/img/wordsub.png',
        '../../static/img/wordplus.png'
      ],
      selectTheme: [{
        id: 'white',
        icon: '../../static/img/right.png',
        color: 'white'
      }, {
        id: 'green',
        icon: '',
        color: 'rgba(199, 238, 206, 1)',
        fontColor: 'rgba(0, 0, 0, 0.7)'
      }, {
        id: 'black',
        icon: '',
        color: 'rgba(40, 40, 40, 1)',
        fontColor: 'rgba(255, 255, 255, 0.7)'
      }, {
        id: 'lightpink',
        icon: '',
        color: 'rgba(249, 204, 226, 1)',
        fontColor: 'rgba(0, 0, 0, 0.7)'
      }, {
        id: 'Moccasin',
        icon: '',
        color: 'rgba(255, 228, 180, 1)',
        fontColor: 'rgba(0, 0, 0, 0.7)'
      }],
      isActive: 'removed',
      isFirstIn: false, // 首次打开页面隐藏所有控件
      brightValue: 0.1, // 亮度值
      fontSizeValue: 32 // 字体大小值
    }
  },
  methods: {
    ...mapMutations([
      SET_THEME
    ]),
    handleBgColor (id) { // 设置背景色按钮点击
      setTitleBarStyle(id)
      this.selectTheme.map((item) => {
        if (item.id === id) {
          item.icon = '../../static/img/right.png'
          this[SET_THEME](item)
        } else {
          item.icon = ''
        }
      })
    },
    brightChanging (e) {
      this.$emit('changeBright', e.target.value.toFixed(2))
    },
    brightChange (e) {
      this.brightValue = e.target.value.toFixed(2)
      this.$emit('changeBright', this.brightValue)
      this.$store.commit('changeBright', this.brightValue)
    },
    fontSizeChanging (e) {
      this.$emit('changeFontSize', e.target.value)
    },
    fontSizeChange (e) {
      this.fontSizeValue = e.target.value
      this.$emit('changeFontSize', this.fontSizeValue)
      this.$store.commit('changeFontSize', this.fontSizeValue)
    }
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
  created () {
    this.$pub.$on('darkLight', flag => {
      this.handleBgColor(flag ? 'black' : 'white')
    })
  },
  mounted () {
    this.brightValue = this.$store.state.bright
    this.fontSizeValue = parseInt(this.$store.state.styNvCnt.fontSize)
    this.selectTheme.map((item) => {
      if (item.id === this.$store.state.selectedBgColor.id) {
        item.icon = '../../static/img/right.png'
      } else {
        item.icon = ''
      }
    })
    this.isFirstIn = true
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
  .tab-in
    show2(300rpx)
  .tab-out
    hide2(300rpx)
  .removed
    display none
  .active
    background-color bgcolor2
    height 300rpx
    color txtColor
    .top
      height 100rpx
      padding 0 30rpx
      display flex
      align-items center
      .left-btn
        width 40rpx
        height 40rpx
      .right-btn
        width 40rpx
        height 40rpx
      .middle-b
        flex 1
        padding 0 30rpx
    .middle
      height 100rpx
      align-items center
      padding 0 30rpx
      display flex
      .left-btn
        width 40rpx
        height 40rpx
      .right-btn
        width 40rpx
        height 40rpx
      .middle-b
        flex 1
        padding 0 30rpx
    .bottom
      display flex
      height 100rpx
      .fx-item-box
        flex 1
        height 100%
        line-height 100rpx
        text-align center
        .fx-item
          border-radius 50%
          width 70rpx
          height 70rpx
          box-shadow 3rpx 3rpx 2rpx #000
</style>
