<template>
	<div
    class="container"
    :style="{
      backgroundColor: styNvCnt.backgroundColor
    }"
  >
		<div class="header">
			<input
				class="search-input"
				type="text"
				maxlength="15"
				confirm-type="搜索"
				placeholder="输入书名或作者名"
				@confirm="confirm"
				@input="input"
				@focus="focus"
				@blur="blur"
				:focus="focusStatus"
        :style="{
          backgroundColor: styNvCnt.backgroundColor
        }"
			>
			<div
        @click="cancel"
        class="cancel"
        :class="[removed]"
      >取消</div>
		</div>
    <scroll-view
			class="panel"
			scroll-y="true"
			:class="[removed]"
      :style="{
        backgroundColor: styNvCnt.backgroundColor
      }"
		>
      <div
				class="panel-item"
        hover-class="hover"
				@click="goSearch(idx, false)"
				v-for="(item, idx) in searchData"
				:key="idx"
			>{{item}}</div>
    </scroll-view>
		<div class="search-history">
			<div class="history-top">
				<div class="title">搜索历史</div>
				<div class="remove-search" @click="removeSearch">
					<img src="/static/img/delete.png">
					<span>清空</span>
				</div>
			</div>
			<div
				class="search-item"
        hover-class="hover"
				@click="goSearch(idx, true)"
				v-for="(item, idx) in searchHistory"
				:key="idx"
			>{{item}}</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex'
import {get} from '@/http/api'
import config from '@/config'
export default {
  name: 'searchTab',
  data () {
    return {
      focusStatus: false,
      removed: 'removed',
      searchData: [],
      searchHistory: []
    }
  },
  methods: {
    confirm (e) {
      this.$store.commit('handleSearchHistory', e.target.value)
      wx.navigateTo({
        url: '../listBooks/main?page=-2&query=' + e.target.value
      })
    },
    input (e) {
      get({
        url: config.keywords,
        data: {
          query: e.target.value
        }
      }).then(data => {
        if (data.code === 1) {
          this.searchData = data.data.msg.keywords
        }
      })
    },
    focus () {
      this.removed = ''
      this.focusStatus = true
    },
    blur () {
      this.searchData = []
      this.focusStatus = false
    },
    cancel () {
      this.removed = 'removed'
      this.focusStatus = false
    },
    goSearch (index, flag) {
      if (flag) {
        wx.navigateTo({
          url: '../listBooks/main?page=-2&query=' + this.searchHistory[index]
        })
      } else {
        this.$store.commit('handleSearchHistory', this.searchData[index])
        wx.navigateTo({
          url: '../listBooks/main?page=-2&query=' + this.searchData[index]
        })
      }
      this.removed = 'removed'
    },
    removeSearch () {
      this.searchHistory = []
      this.$store.commit('handleSearchHistory', 'to_remove_search_data')
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ])
  },
  updated () {
    this.searchHistory = this.$store.state.searchHistory
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
	.removed
		display none
	.container
		width 100%
		position absolute
		top 71rpx
		bottom 141rpx
		.header
			height 80rpx
			background-color #bbb
			display flex
			.search-input
				flex 1
				margin 15rpx
				padding 5rpx 30rpx
				height 40rpx
				line-height 40rpx
				font-size 30rpx
				border-radius 3px
				text-align center
				overflow hidden
				text-overflow ellipsis
				white-space nowrap
			.cancel
				width 100rpx
				text-align center
				font-size 32rpx
				height 80rpx
				line-height 80rpx
				color blue
		.panel
			width 100%
			z-index 2
			position absolute
			background-color white
			top 80rpx
			bottom 0
			.panel-item
				height 80rpx
				padding-left 15rpx
				line-height 50rpx
				font-size 30rpx
				border-bottom 1px solid #ddd
		.search-history
			padding 15rpx
			height 60rpx
			line-height 60rpx
			.history-top
				height 70rpx
				.title
					float left
					font-size 32rpx
				.remove-search
					float right
					display flex
					flex-direction row
					justify-content center
					align-items center
					img
						width 30rpx
						height 30rpx
					span
						font-size 27rpx
						padding-left 10rpx
						height 60rpx
			.search-item
				height 60rpx
				padding-left 15rpx
				line-height 50rpx
				font-size 30rpx
				border-bottom 1px solid #ddd
</style>
