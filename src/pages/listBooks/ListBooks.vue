<template>
  <div
    class="container"
    :style="{
      backgroundColor: styNvCnt.backgroundColor,
      color: styNvCnt.color
    }"
  >
    <div class="tabs">
      <div
        class="tab-item"
        :class="{active: whoIsActive === idx}"
        :hover-class="hover"
        v-for="(item, idx) in tabs"
        @click="checkTab(idx)"
        :key="idx"
      >{{item}}</div>
    </div>
    <scroll-view
      class="content"
      scroll-y="true"
    >
      <navigator
        class="cnt-item"
        v-for="item in content"
        :key="item._id"
        :url="item.path"
      >
        <img :src="item.cover">
        <div>
          <div class="title">{{item.title}}</div>
          <div class="author-follow-retention">
            作者：{{item.author}}
          </div>
          <div class="author-follow-retention">
            {{item.latelyFollower}}人在追 | {{item.retentionRatio}}%读者留存
          </div>
        </div>
      </navigator>
    </scroll-view>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import config from '@/config'
import {get} from '@/http/api'
import {loading, toast, setTitle} from '@/util'
export default {
  name: 'listBooks',
  data () {
    return {
      whoIsActive: 0,
      canClick: true,
      card: '',
      hover: 'hover',
      tabs: ['周榜', '月榜', '总榜'],
      content: []
    }
  },
  methods: {
    checkTab (tab) { // 根据tab(周榜。月榜。总榜)获取数据，并存到content中
      if (this.canClick) {
        this.whoIsActive = tab
        this.getData({
          url: config.rank,
          data: {
            card: this.card + tab
          }
        })
      }
    },
    async getData (reqData) { // 列表数据获取函数
      loading(true)
      try {
        let data = await get(reqData)
        if (data.code === 1) {
          if (this.card === '') {
            this.content = data.data.msg.books
          } else {
            this.content = data.data.msg.ranking.books
          }
          loading(false)
        } else {
          loading(false)
          toast('服务异常', 'none')
        }
      } catch (error) {
        loading(false)
        toast('获取失败', 'none')
      }
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ])
  },
  onLoad () {
    const tag = parseInt(this.$root.$mp.query.page)
    if (tag === -1) { // 从排行榜页面跳转
      setTitle('小被几找书')
      this.card = this.$root.$mp.query.id
      this.whoIsActive = 1
      this.canClick = false
      this.hover = ''
      this.tabs = ['', '总榜', '']
      this.getData({
        url: config.rank,
        data: {
          card: this.$root.$mp.query.id
        }
      })
    } else if (tag === -2) { // 从搜索页面跳转
      setTitle('查询结果')
      this.card = ''
      this.whoIsActive = 1
      this.canClick = false
      this.hover = ''
      this.tabs = ['', this.$root.$mp.query.query, '']
      this.getData({
        url: config.search,
        data: {
          query: encodeURIComponent(this.$root.$mp.query.query)
        }
      })
    } else { // 从排行榜页面跳转(默认page为0)
      setTitle('小被几找书')
      this.card = this.$root.$mp.query.id
      this.tabs = ['周榜', '月榜', '总榜']
      this.canClick = true
      this.hover = 'hover'
      this.whoIsActive = tag
      this.getData({
        url: config.rank,
        data: {
          card: this.$root.$mp.query.id + tag
        }
      })
    }
  },
  onUnload () {
    this.content = []
  }
}
</script>

<style lang="stylus" scoped>
  testStyl($fz)
    flex 1
    font-size $fz
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .container
    width 100%
    top 0
    bottom 0
    position fixed
    .tabs
      position absolute
      top 0
      height 80rpx
      display flex
      flex-direction row
      width 100%
      .tab-item
        flex 1
        height 80rpx
        line-height 80rpx
        text-align center
        background rgba(100, 100, 100, 0.2)
        border-bottom 4rpx solid rgba(80, 80, 80, 0.5)
      .active
        border-bottom 4rpx solid red
      .hover
        background rgba(100, 100, 100, 0.5)
    .content
      width 100%
      position absolute
      top 82rpx
      bottom 0
      .cnt-item
        width 100%
        height 150rpx
        border-bottom 1px solid #999
        img
          width 90rpx
          height 120rpx
          float left
          margin 15rpx
          box-shadow 4rpx 4rpx 2rpx #888
        div
          width calc(100% - 120rpx)
          height 148rpx
          float left
          display flex
          flex-direction column
          .title
            testStyl(35rpx)
          .author-follow-retention
            testStyl(28rpx)
            color #888
</style>
