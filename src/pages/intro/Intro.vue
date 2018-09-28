<template>
  <scroll-view
    scroll-y="true"
    class="container"
    :style="{
      color: styNvCnt.color,
      backgroundColor: styNvCnt.backgroundColor
    }"
  >
    <div class="card-one">
      <img :src="content.cover">
      <div>
        <div class="title">{{content.title}}</div>
        <div class="author-type-word">
          {{content.author}} | {{content.minorCate}}
        </div>
        <div class="author-type-word">
          {{content.minorCate}} | {{content.wordCount}}字
        </div>
      </div>
    </div>
    <div class="card-two">
      <div class="item-box">
        <div
          class="item"
          :hover-class="itemHover"
          :class="{'item-disable': follower}"
          @click="toFollow(true)"
        >
          {{followTag}}
        </div>
      </div>
      <div class="item-box">
        <navigator
          class="item"
          hover-class="item-hover"
          :url="readURL"
          @click="goBooksPage"
        >
          开始阅读
        </navigator>
      </div>
    </div>
    <div class="card-three">
      <div class="item">
        <div>追书人数</div>
        <div>{{content.latelyFollower}}人</div>
      </div>
      <div class="item">
        <div>读者留存率</div>
        <div>{{content.retentionRatio}}%</div>
      </div>
      <div class="item">
        <div>日更新字数</div>
        <div>{{content.serializeWordCount}}字</div>
      </div>
    </div>
    <div class="card-three">
      <div class="item">
        <div>状态</div>
        <div>{{content.isSerial}}</div>
      </div>
      <div class="item">
        <div>评分</div>
        <div>{{content.rating.score}}分</div>
      </div>
      <div class="item">
        <div>总计</div>
        <div>{{content.rating.count}}</div>
      </div>
    </div>
    <div class="card-four">
      <div>更新：{{content.updated}}</div>
      <div>类型：{{content.majorCate}} | {{content.cat}} </div>
      <div>最新章节：{{content.lastChapter}}</div>
      <div>简介：{{content.longIntro}}</div>
    </div>
  </scroll-view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {FOLLOW_NOVEL, CHANGE_READ_CHAPTER} from '@/store/mutation-types'
import {get} from '@/http/api'
import {loading, toast, setTitleBarStyle, navigateBack} from '@/util'
import config from '@/config'
export default {
  name: 'intro',
  data () {
    return {
      follower: false, // false表示当前没有追这本小说
      content: {
        rating: {
          isEffect: '?'
        }
      }
    }
  },
  methods: {
    ...mapMutations({
      FOLLOW_NOVEL,
      CHANGE_READ_CHAPTER
    }),
    async getData (reqData) { // 列表数据获取函数
      loading(true)
      try {
        let data = await get(reqData)
        if (data.code === 1) {
          this.content = data.data.msg
          loading(false)
        } else {
          loading(false)
          toast('服务异常', 'none')
        }
      } catch (error) {
        loading(false)
        toast('获取失败', 'none')
      }
    },
    toFollow (go) { // 点击追更新事件
      const msg = this.content
      if (msg._id) {
        this.follower = !this.follower
        if (this.follower) {
          this[FOLLOW_NOVEL]({ // 添加追书信息
            novel: {
              _id: msg._id,
              path: '../read/main?id=' + msg._id, // books.vue页面跳转使用
              title: msg.title, // 书名
              cover: msg.cover, // 封面
              updated: msg.updated, // 最后更新时间
              lastChapter: msg.lastChapter // 最新章节
            },
            flag: true
          })
          this[CHANGE_READ_CHAPTER]({ // 创建阅读进度信息
            read: {
              id: msg._id, // bookID
              status: 2, // 状态
              source: 'default', // 新添加小说使用默认源
              index: 0, // 当前阅读
              page: 0 // 当前阅读页（每100章一页）
            },
            flag: 'add'
          })
        } else if (go) {
          this[FOLLOW_NOVEL]({novel: msg._id, flag: false})
          this[CHANGE_READ_CHAPTER]({read: {id: msg._id}, flag: 'delete'})
        }
      }
    },
    goBooksPage () {
      this.toFollow(false)
      navigateBack(3)
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ]),
    itemHover () {
      return this.follower ? '' : 'item-hover'
    },
    setBarStyl () {
      setTitleBarStyle(this.$store.state.selectedBgColor.id)
    },
    followTag () {
      return this.follower ? '不追了' : '追更新'
    },
    readURL () {
      return '../read/main?bookID=' + this.content._id
    }
  },
  onLoad () {
    const bookID = this.$root.$mp.query.id
    this.follower = this.$store.state.followID.indexOf(bookID) !== -1
    console.log(this.$store.state.followID.indexOf(bookID))
    this.getData({
      url: config.book,
      data: {
        bookID
      }
    })
  },
  onUnload () {
    this.content = {
      rating: {}
    }
  }
}
</script>

<style lang="stylus" scoped>
  borderottom()
    border-bottom 1px solid #999
  testStyl($fz)
    flex 1
    font-size $fz
    margin-top auto
    margin-bottom auto
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .container
    width 100%
    position fixed
    top 0
    bottom 0
    .card-one
      borderottom()
      img
        width 120rpx
        height 150rpx
        float left
        margin 15rpx
        margin-left 30rpx
      div
        width calc(100% - 170rpx)
        height 148rpx
        margin 15rpx 0
        float left
        display flex
        flex-direction column
        .title
          testStyl(35rpx)
        .author-type-word
          testStyl(28rpx)
          color #888
    .card-two
      display flex
      flex-direction row
      width 100%
      borderottom()
      .item-box
        flex 1
        height 60rpx
        padding 15rpx 0
        .item
          width 80%
          text-align center
          height 60rpx
          line-height 60rpx
          margin auto
          background #EA5149
          color white
          font-size 35rpx
        .item-hover
          background red
        .item-disable
          background #888
    .card-three
      display flex
      flex-direction row
      width 100%
      borderottom()
      .item
        flex 1
        height 110rpx
        margin 15rpx 0
        text-align center
        .tt1
          color #888
          height 30rpx
          line-height 30rpx
          font-size 32rpx
        .tt2
          height 30rpx
          line-height 30rpx
          font-size 36rpx
    .card-four
      borderottom()
      div
        font-size 32rpx
        line-height 58rpx
        margin 25rpx
</style>
