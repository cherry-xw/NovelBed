<template>
	<div
    class="containe"
    :style="{
      backgroundColor: styNvCnt.backgroundColor
    }">
    <img src="/static/img/building.png">
		<div>
      正在开发
    </div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'typesTab',
  computed: {
    ...mapState([
      'styNvCnt'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  vendors = official
  @keyframes rotater
    0%
      transform rotate(0)
    100%
      transform rotate(360deg)

  .containe
    display flex
    justify-content center
    flex-direction column
    position absolute
    width 100%
    top 211rpx
    bottom 0
    img
      width 250rpx
      height 250rpx
      margin-left auto
      margin-right auto
      animation rotater 4s linear infinite
    div
      width 250rpx
      height 60rpx
      text-align center
      margin-left auto
      margin-right auto
</style>
