<template>
  <div class="container" :style="{backgroundColor, color}">
    <div class="message">
      <span class="novelname">{{ novelname }}</span>
      <span class="chapter">{{ chapter }} {{read}}%</span>
    </div>
    <progress
      class="progress"
      :percent='read'
      activeColor='#EA5A49'
      stroke-width='1'
    ></progress>
    <div class="mask" :style="{'background-color': brightColor}"></div>
  </div>
</template>

<script>

export default {
  name: 'progressbar',
  props: {
    novelMsg: {
      type: Object,
      required: true
    }
  },
  computed: {
    novelname () {
      return this.novelMsg.name
    },
    chapter () {
      return this.novelMsg.chapter
    },
    read () {
      return this.novelMsg.progress
    },
    backgroundColor () {
      return this.novelMsg.backgroundColor
    },
    color () {
      return this.novelMsg.color
    },
    brightColor () {
      return `rgba(0, 0, 0, ${this.novelMsg.mask})`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .container
    width 100%
    height 50rpx
    margin 0
    padding 0
    position relative
    .mask
      position absolute
      bottom 0
      top 0
      width 100%
      background-color maskColor
    .message
      height 100%
      width 100%
      .novelname
        float left
        height 48rpx
        line-height 48rpx
        font-size 25rpx
        padding 0 15rpx
      .chapter
        float right
        height 48rpx
        line-height 48rpx
        font-size 25rpx
        padding 0 15rpx
    .progress
      position absolute
      width 100%
      bottom 0

</style>
