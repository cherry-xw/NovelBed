<template>
  <scroll-view
    class="container"
    scroll-y="true"
    :style="{
      backgroundColor: styNvCnt.backgroundColor,
      color: styNvCnt.color,
    }"
  >
    <div
      v-for='(item, index) in novelList'
      :key="item._id"
      class="nav"
    >
      <navigator
        :url="item.path"
        @longpress="longTap(index)"
      >
        <img :src="item.cover" class="icon">
        <div class="content">
          <div class="title">
            {{item.title}}
            <label :class="{removed: !updateTag[index]}">更新</label>
          </div>
          <div class="describe">{{item.updated}} {{item.lastChapter}}</div>
        </div>
      </navigator>
    </div>
  </scroll-view>
</template>

<script>
import {setTitleBarStyle, setTabBarStyle, toast, showModal} from '@/util'
import {FOLLOW_NOVEL, CHANGE_READ_CHAPTER} from '@/store/mutation-types'
import config from '@/config'
import {post} from '@/http/api'
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'books', // 小说列
  data () {
    return {
      novelList: [],
      novelListID: [],
      updateTag: []
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ]),
    setBarStyl () {
      setTitleBarStyle(this.$store.state.selectedBgColor.id)
      setTabBarStyle(this.$store.state.selectedBgColor.id)
    }
  },
  methods: {
    ...mapMutations({
      FOLLOW_NOVEL,
      CHANGE_READ_CHAPTER
    }),
    longTap (index) { // 长按提示删除按钮
      this.cantGo = true
      const id = this.novelListID[index]
      showModal('提示', `确认删除《${this.novelList[index].title}》?`, '删除', () => {
        this[FOLLOW_NOVEL]({novel: id, flag: false})
        this[CHANGE_READ_CHAPTER]({read: {id}, flag: 'delete'})
      }, true, () => {})
    }
  },
  onLoad () {
    wx.startPullDownRefresh()
  },
  async onPullDownRefresh () {
    wx.stopPullDownRefresh()
    this.novelList = this.$store.state.follow
    this.novelListID = this.$store.state.followID
    if (this.novelList.length) {
      try {
        let data = await post({
          url: config.read,
          data: {
            id: this.novelListID
          }
        })
        if (data.code === 1) {
          data.data.msg.map(item => {
            const index = this.novelListID.indexOf(item._id)
            if (index !== -1) {
              for (let attr in item) {
                this.novelList[index][attr] = item[attr]
              }
              if (this.novelList[index].updated !== item.updated) {
                this.updateTag[index] = true
              }
            }
          })
          this.$store.commit('changeFollowNovel', data.data.msg)
        } else {
          toast('服务异常', 'none')
        }
      } catch (error) {
        toast('获取失败', 'none')
      }
    } else {
      toast('当前还未收藏小说(^∇^*)快去找一本吧', 'none', '')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .removed
    display none
  .container
    height 100%
    width 100%
    .nav
      width 100%
      height 110rpx
      padding-top 15rpx
      padding-bottom 10rpx
      padding-left 25rpx
      border-bottom 1px solid #888;
      .icon
        width 80rpx
        height 110rpx
        float left
        box-shadow 5rpx 5rpx 2rpx #888
      .content
        height 110rpx
        padding-left 15rpx
        float left
        .title
          font-size 32rpx
          width 500rpx
          height 70rpx
          line-height 70rpx
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          label
            background #EA5149
            color white
            font-size 15rpx
            padding 2rpx 4rpx
        .describe
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          width 450rpx
          height 40rpx
          font-size 25rpx
          color #888
</style>
