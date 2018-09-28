<template>
  <scroll-view class="container" :style="{
    color: styNvCnt.color,
    backgroundColor: styNvCnt.backgroundColor
  }">
    <div
      class="item"
      v-for="(item, idx) in content"
      :key="item._id"
      hover-class="hover"
      @click="goBack(item._id)"
    >
      <div class="icon-box">
        <img :src="icon[idx]" class="icon">
      </div>
      <div class="content">
        <div class="title">
          {{item.name}}
        </div>
        <div class="message">
          {{item.updated}} | {{item.lastChapter}}
        </div>
      </div>
    </div>
  </scroll-view>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {CHANGE_READ_CHAPTER} from '@/store/mutation-types'
import {setTitleBarStyle, toast, loading, navigateBack} from '@/util'
import {get} from '@/http/api'
import config from '@/config'
export default {
  name: 'srcList',
  data () {
    return {
      bookID: '',
      content: []
    }
  },
  methods: {
    ...mapMutations([
      CHANGE_READ_CHAPTER
    ]),
    async getData (reqData) { // 小说获取换源列表数据
      loading(true)
      try {
        let data = await get(reqData)
        if (data.code === 1) {
          this.content = data.data.msg
          console.log(data.data.msg)
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
    goBack (srcID) { // 换源并返回上一页
      this[CHANGE_READ_CHAPTER]({ // 修改阅读源及状态
        read: {
          id: this.bookID,
          source: srcID,
          status: 1
        },
        flag: 'modify'
      })
      navigateBack()
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ]),
    icon () {
      return this.content.map(item => item.isCharge ? '../../static/img/chosed.png' : '../../static/img/gear.png')
    },
    setBarStyl () {
      setTitleBarStyle(this.$store.state.selectedBgColor.id)
    }
  },
  onLoad () {
    this.bookID = this.$root.$mp.query.id
    this.getData({
      url: config.source,
      data: {
        bookID: this.bookID,
        source: this.$root.$mp.query.src
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
vendors = official
@keyframes wheel
  0%
    transform rotate(0)
  100%
    transform rotate(360deg)
.hover
  background rgba(100, 100, 100, 0.5)
.container
  position fixed
  width 100%
  top 0
  bottom 0
  .item
    height 100rpx
    width 100%
    border-bottom 1px solid #888
    .icon-box
      width 100rpx
      height 100rpx
      text-align center
      line-height 100rpx
      float left
      .icon
        width 50rpx
        height 50rpx
        animation wheel 4s linear infinite
        margin auto
    .content
      float left
      height 100rpx
      width calc(100% - 100rpx)
      .title
        font-size 29rpx
        height 50rpx
        line-height 50rpx
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
      .message
        font-size 25rpx
        height 50rpx
        color #888
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
</style>
