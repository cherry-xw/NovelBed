<template>
  <div
    :class='isActive'
    class='container'
  >
    <div class="top-title" :class="isActive">
      <div class="top-left">目录（共{{total}}章）</div>
      <picker
        mode="selector"
        :range="range"
        class="top-right"
        @change="changeChapter"
      >{{selectedValue}} ▽</picker>
    </div>
    <scroll-view
      class="scroll-style"
      scroll-y='true'
    >
      <chapter-item
        v-for='(item, index) in chapters'
        :key='index'
        :item='item'
        :index='index'
        :pageIdx="selectedIdx"
      >
      </chapter-item>
    </scroll-view>
  </div>
</template>

<script>
import ChapterItem from './ChapterItem'
export default {
  name: 'tabBarBottom',
  components: {
    ChapterItem
  },
  props: {
    middleStatus: {
      type: Boolean,
      required: true
    },
    chapters: {
      type: Array,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    selectedIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isActive: 'removed', // 隐藏当前页面显示
      isTimeout: 0, // 当前动画是否已经在执行状态
      selectedIdx: this.selectedIndex
    }
  },
  methods: {
    changeChapter (e) { // 修改了当前显示的章节页
      this.selectedIdx = parseInt(e.target.value)
      this.$emit('changeChapterPage', this.selectedIdx)
    }
  },
  computed: {
    range () {
      let item = []
      for (let i = 0, len = parseInt(this.total / 100); i <= len; i++) {
        let endValue = (i + 1) * 100 > this.total ? this.total : (i + 1) * 100
        item.push(`${i * 100 + 1}-${endValue}`)
      }
      return item
    },
    selectedValue () {
      return this.range[this.selectedIdx]
    }
  },
  watch: {
    middleStatus () {
      if (this.middleStatus) {
        this.isActive = 'active'
        this.isTimeout = new Date().getTime()
      } else {
        setTimeout(() => {
          if (new Date().getTime() - this.isTimeout > 700) {
            this.isActive = 'removed'
            this.isTimeout = new Date().getTime()
          }
        }, 800)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  @import '~@/styles/common.styl'
  .container
    height 100%
    .top-title
      width 100%
      height 90rpx
      font-size 38rpx
      background-color #666
      .top-left
        display inline
        height 90rpx
        line-height 90rpx
        padding-left 15rpx
        float left
      .top-right
        display inline
        height 60rpx
        line-height 60rpx
        font-size 28rpx
        margin 15rpx
        padding 0 15rpx
        background-color black
        border 2px solod white
        border-radius 3px
        float right
      .hover
        background-color #ccc
        color black
    .scroll-style
      width 100%
      height calc(100% - 90rpx)
  .active
    width 100%
    display block
    color white
  .removed
    width 0
    display none
</style>
