<template>
    <div class="container" hover-class="hover" @click="changeChapter">
      <div class="tag-left">
        <img src="/static/img/circle_light.png">
      </div>
      <div class="tag-middle">{{index + 1}}. {{item.title}}</div>
      <div class="tag-right">
        <img src="/static/img/go_light.png">
      </div>
    </div>
</template>

<script>
export default {
  name: 'chapterItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    pageIdx: { // 百页坐标
      type: Number,
      required: true
    }
  },
  methods: {
    changeChapter () { // 章节列表被点击，通知各页面关闭tabs
      this.$pub.$emit('closeTabs') // 通知read.vue关闭上下标签(事件注册在read.vue页面)
      this.$pub.$emit('closeTabMiddle') // tabbarmiddle.vue关闭标签(事件注册在tabBarBottom.vue页面)
      this.$pub.$emit('changeChapter', this.item, this.index + this.pageIdx * 100, this.pageIdx) // 通知read.vue重新获取小说章节
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
  .container
    height 70rpx
    line-height 70rpx
    margin 0 15rpx
    display flex
    border-bottom 1px dotted rgba(255,255,255,0.6)
    .tag-left
      width 60rpx
      height 70rpx
      line-height 70rpx
      float left
      text-align center
      img
        width 20rpx
        height 20rpx
    .tag-middle
      font-size 32rpx
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
      flex 1
    .tag-right
      width 60rpx
      height 70rpx
      float right
      text-align center
      img
        width 30rpx
        height 40rpx
        margin 15rpx
</style>
