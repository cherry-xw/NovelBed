<template>
  <div
    :class="[showOrHide, isActive]"
  >
    <navigator class="change-src" :url="path">换源</navigator>
    <div class="origin-html"></div>
  </div>
</template>

<script>
export default {
  name: 'tabBarTop',
  props: {
    showTab: { // flag标记当前标签是显示还是隐藏
      type: Boolean,
      required: true
    },
    bookID: {
      type: String,
      required: true
    },
    source: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isActive: 'removed',
      isTimeout: 0 // 当前动画是否已经在执行状态
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
    },
    path () {
      return `../srcList/main?id=${this.bookID}&src=${this.source}`
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
  .active
    width 100%
    height 80rpx
    line-height 80rpx
    background-color bgcolor
    color white
  .removed
    display none
  .tab-in
    show(#000, 80rpx)
  .tab-out
    hide(#000, 80rpx)
  .change-src
    font-size 32rpx
    margin-left 15rpx
    float left
  .origin-html
    font-size 22rpx
    margin-left 15rpx
    float right
    color #999
    margin-right 15rpx
</style>
