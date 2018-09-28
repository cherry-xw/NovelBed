<template>
	<scroll-view
		scroll-y="true"
		class="container"
    :style="{
      backgroundColor: styNvCnt.backgroundColor
    }"
	>
  <div class="title">男生</div>
  <navigator
    :url="item.url"
    class="item"
    hover-class="hover-dark"
    v-for="item in boyRankType"
    :key="item.id"
  >
    <img class="icon" src="/static/img/rank_hot.png">
    {{item.title}}
  </navigator>
  <div class="title">女生</div>
  <navigator
    :url="item.url"
    class="item"
    hover-class="hover-dark"
    v-for="item in girlRankType"
    :key="item.id"
  >
    <img class="icon" src="/static/img/rank_icon.png">
    {{item.title}}
  </navigator>
	</scroll-view>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'rankTab',
  data () {
    return {
      boyRankType: [{
        id: '1b',
        url: '../listBooks/main?id=1b&page=0',
        title: '小被几最热TOP100'
      }, {
        id: '2b',
        url: '../listBooks/main?id=2b&page=-1',
        title: '好评榜'
      }, {
        id: '3b',
        url: '../listBooks/main?id=3b&page=-1',
        title: '热搜榜'
      }, {
        id: '4b',
        url: '../listBooks/main?id=4b&page=0',
        title: '本周潜力榜'
      }, {
        id: '5b',
        url: '../listBooks/main?id=5b&page=0',
        title: '读者留存率TOP100'
      }, {
        id: '6b',
        url: '../listBooks/main?id=6b&page=0',
        title: '完结榜'
      }, {
        id: '7b',
        url: '../listBooks/main?id=7b&page=0',
        title: 'VIP排行榜'
      }, {
        id: '8b',
        url: '../listBooks/main?id=8b&page=-1',
        title: '圣诞热搜榜'
      }, {
        id: '9b',
        url: '../listBooks/main?id=9b&page=-1',
        title: '百度热搜榜'
      }, {
        id: '10b',
        url: '../listBooks/main?id=10b&page=-1',
        title: '掌阅热搜榜'
      }, {
        id: '11b',
        url: '../listBooks/main?id=11b&page=-1',
        title: '书旗热搜榜'
      }, {
        id: '12b',
        url: '../listBooks/main?id=12b&page=-1',
        title: '17K鲜花榜'
      }, {
        id: '13b',
        url: '../listBooks/main?id=13b&page=-1',
        title: '起点月票榜'
      }, {
        id: '14b',
        url: '../listBooks/main?id=14b&page=-1',
        title: '纵横月票榜'
      }, {
        id: '15b',
        url: '../listBooks/main?id=15b&page=-1',
        title: '和阅读原创榜'
      }, {
        id: '16b',
        url: '../listBooks/main?id=16b&page=-1',
        title: '逐浪点击榜'
      }],
      girlRankType: [{
        id: '1g',
        url: '../listBooks/main?id=1g&page=0',
        title: '小被几最热TOP100'
      }, {
        id: '2g',
        url: '../listBooks/main?id=2g&page=-1',
        title: '好评榜'
      }, {
        id: '3g',
        url: '../listBooks/main?id=3g&page=-1',
        title: '热搜榜'
      }, {
        id: '4g',
        url: '../listBooks/main?id=4g&page=0',
        title: 'VIP排行榜'
      }, {
        id: '5g',
        url: '../listBooks/main?id=5g&page=0',
        title: '本周潜力榜'
      }, {
        id: '6g',
        url: '../listBooks/main?id=6g&page=0',
        title: '读者留存率TOP100'
      }, {
        id: '7g',
        url: '../listBooks/main?id=7g&page=0',
        title: '完结榜TOP100'
      }, {
        id: '8g',
        url: '../listBooks/main?id=8g&page=-1',
        title: '圣诞热搜榜'
      }, {
        id: '9g',
        url: '../listBooks/main?id=9g&page=-1',
        title: '掌阅热搜榜'
      }, {
        id: '10g',
        url: '../listBooks/main?id=10g&page=-1',
        title: '书旗热搜榜'
      }, {
        id: '11g',
        url: '../listBooks/main?id=11g&page=-1',
        title: '17K订阅榜'
      }, {
        id: '12g',
        url: '../listBooks/main?id=12g&page=-1',
        title: '起点粉红票榜'
      }, {
        id: '13g',
        url: '../listBooks/main?id=13g&page=-1',
        title: '潇湘月票榜'
      }]
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ])
  }
}
</script>

<style lang="stylus" scoped>
	@import '~@/styles/common.styl'
	.container
		position absolute
		width 100%
		top 141rpx
		bottom 71rpx
		background-color rgba(180, 180, 180, 0.2)
		.title
			height 80rpx
			line-height 80rpx
			background-color rgba(180, 180, 180, 0.1)
			font-size 35rpx
			padding-left 13rpx
		.item
			padding 0 20rpx
			width 100%
			height 72rpx
			line-height 72rpx
			font-size 30rpx
			text-overflow ellipsis
			white-space nowrap
			border-bottom 1px solid #dddddd
			.icon
				width 40rpx
				height 40rpx
				margin 16rpx
				margin-top 18rpx
				opacity 0.5
				float left
</style>
