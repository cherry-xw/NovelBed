<template>
  <div
    class="container"
    :style="{
      backgroundColor: styNvCnt.backgroundColor
    }"
  >
    <scroll-view
      class="novel-content"
      scroll-y="true"
      :style="{
        color: styNvCnt.color,
        fontSize: styNvCnt.fontSize,
        lineHeight: styNvCnt.lineHeight
      }"
      :scroll-into-view="goTop"
      @scroll="scrollEvent"
      @click="handleTabs"
      @scrolltoupper="toUpper"
    >
      <div id="goTop"></div>
      {{ novelContent}}
    </scroll-view>
    <div class="pogress-bar-box">
      <progress-bar :novelMsg='novel'></progress-bar>
    </div>
    <div class="top-bar">
      <tab-bar-top :showTab="showTab" :bookID="bookID" :source="read.source"></tab-bar-top>
    </div>
    <div :class="[showOrHide, contentTabIsActive]">
      <tab-bar-middle
        :middleStatus="chapterListStatus"
        :chapters="chapters"
        :total="total"
        :selectedIndex="selectedIndex"
        @changeChapterPage="changeChapterPage"
      ></tab-bar-middle>
    </div>
    <div class="setup-bar">
      <setup
        :showTab="setupStatus"
        @changeBright="changeBright"
        @changeFontSize="changeFontSize"
      ></setup>
    </div>
    <div class="bottom-bar">
      <tab-bar-bottom
        :showTab="showTab"
        :changeCurShow="changeCurShow"
        @showChapterList="showChapterList"
        @showSetup="showSetup"
      ></tab-bar-bottom>
    </div>
    <div class="mask" :style="{'background-color': brightColor}"></div>
    <movable-area class="movable">
      <movable-view
        class="move"
        direction="all"
        friction="1"
        out-of-bounds="true"
        inertia="true"
        @click="goPrevOrNext"
        :style="{width:changeWidth}"
      >{{prevOrNext}}</movable-view>
    </movable-area>
  </div>
</template>

<script>
import {mapState, mapMutations, mapGetters} from 'vuex'
import {setTitleBarStyle, toast, loading, setTitle} from '@/util'
import {get} from '@/http/api'
import config from '@/config'
import {CHANGE_READ_CHAPTER} from '@/store/mutation-types'
import ProgressBar from './components/ProgressBar'
import TabBarTop from './components/TabBarTop'
import TabBarBottom from './components/TabBarBottom'
import TabBarMiddle from './components/TabBarMiddle'
import Setup from './components/Setup'
export default {
  name: 'read', // 阅读小说页面
  components: {
    ProgressBar,
    TabBarTop,
    TabBarBottom,
    TabBarMiddle,
    Setup
  },
  data () {
    return {
      percent: 0, // 小说当前滚动百分比
      scrollH: 0, // 小说内容滚动高度
      showTab: false, // 顶部和底部标签显示状态(用于触发子组件的动画)
      isTimeout: 0, // 遮罩动画误触优化
      showOrHide: '', // 小说章节列表遮罩显示状态
      contentTabIsActive: 'removed', // 章节标签显示状态
      chapterListStatus: false, // 小说章节列表显示状态
      setupStatus: false, // 设置页面显示状态
      bright: 0.1, // 亮度值
      changeCurShow: -1, // 默认底部显示所有标签
      novelContent: '', // 小说主体内容显示状态
      bookID: '', // 发送请求的bookid
      chapters: [], // 小说章节列表
      total: 1, // 小说总章节数
      novelName: '', // 小说名称
      prevOrNext: '|||', // 上一章还是下一章按钮
      len: 0, // 当前长度，用于判断跳转上一章还是下一章
      changeWidth: '35rpx', // 当前上一章还是下一章按钮长度
      btnIsTimeout: 0, // 当前按钮所处可否点击的状态
      goTop: ''
    }
  },
  methods: {
    ...mapMutations([
      CHANGE_READ_CHAPTER
    ]),
    scrollEvent (event) { // 计算滚动百分比
      let target = event.target
      let len = target.scrollTop / (target.scrollHeight - this.scrollH)
      len = len < 0 ? 0 : len
      len = len > 1 ? 1 : len
      this.prevOrNext = this.btnIsTimeout ? len < 0.5 ? '上一章' : '下一章' : '|||'
      this.len = len
      this.percent = parseInt(len * 100)
    },

    handleTabs () { // 当前顶部和底部标签状态切换
      this.showTab = !this.showTab
      if (this.setupStatus) {
        this.setupStatus = false // 通知tabbarbottom.vue关闭setup.vue
        this.changeCurShow -= 1
      }
    },
    showChapterList (status) { // 章节列表显示动画控制及状态切换
      this.chapterListStatus = status
      this.showOrHide = status ? 'middle-in' : 'middle-out'
      if (status) {
        this.contentTabIsActive = 'content-tab-show'
        this.isTimeout = new Date().getTime()
      } else {
        const that = this
        setTimeout(() => {
          if (new Date().getTime() - that.isTimeout > 900) {
            this.contentTabIsActive = 'content-tab-hide'
            this.isTimeout = new Date().getTime()
          }
        }, 1000)
      }
    },
    showSetup (status) { // 设置页面显示状态
      this.setupStatus = status
    },
    changeBright (bright) { // 设置页面改变亮度值通知
      this.bright = bright
    },
    changeFontSize (fz) { // 设置页面改变字体大小通知
      this.styNvCnt.fontSize = `${parseInt(fz)}rpx`
      this.styNvCnt.lineHeight = `${parseInt(fz) * 1.8}rpx`
    },
    toUpper () {
      console.log('toUpper')
      this.goTop = ''
    },
    goPrevOrNext () {
      if (this.prevOrNext === '上一章') {
        if (this.read.index === 0) {
          toast('已经是第一章了', 'none')
        } else {
          this.goTop = 'goTop'
          let idx = this.read.index
          let page = parseInt((idx - 1) / 100)
          let pageOld = this.read.page
          console.log('章节p', idx)
          this[CHANGE_READ_CHAPTER]({
            read: {
              id: this.bookID,
              index: idx - 1,
              page
            },
            flag: 'modify'
          })
          if (parseInt(idx / 100) !== page || pageOld !== page) {
            // 先修改read进度情况再获取数据
            this.getData({
              url: config.chapter,
              data: {
                bookID: this.bookID,
                source: this.read.source,
                readIndex: idx - 1
              }
            })
          } else {
            // 更换当前显示的章节名称
            setTitle(this.chapters[(idx - 1) % 100].title)
            // 重新获取章节数据
            this.getContent({
              url: config.content,
              data: {
                link: this.chapters[(idx - 1) % 100].link
              }
            })
          }
        }
      } else if (this.prevOrNext === '下一章') {
        if (this.read.index === this.total) {
          toast('已经是最后一章了', 'none')
        } else {
          this.goTop = 'goTop'
          let idx = this.read.index
          let page = parseInt((idx + 1) / 100)
          let pageOld = this.read.page
          console.log('章节n', idx)
          this[CHANGE_READ_CHAPTER]({
            read: {
              id: this.bookID,
              index: idx + 1,
              page
            },
            flag: 'modify'
          })
          if (parseInt(idx / 100) !== page || pageOld !== page) {
            // 先修改read进度情况再获取数据
            this.getData({
              url: config.chapter,
              data: {
                bookID: this.bookID,
                source: this.read.source,
                readIndex: idx + 1
              }
            })
          } else {
            // 更换当前显示的章节名称
            console.log(this.chapters[(idx + 1) % 100])
            setTitle(this.chapters[(idx + 1) % 100].title)
            // 重新获取章节数据
            this.getContent({
              url: config.content,
              data: {
                link: this.chapters[(idx + 1) % 100].link
              }
            })
          }
        }
      }
      this.changeWidth = '130rpx'
      if (this.len < 0.5) {
        this.prevOrNext = '上一章'
      } else {
        this.prevOrNext = '下一章'
      }
      if (!this.btnIsTimeout) {
        this.btnIsTimeout = setTimeout(() => {
          this.changeWidth = '35rpx'
          this.prevOrNext = '|||'
          this.btnIsTimeout = 0
        }, 5000)
      }
    },
    changeChapterPage (index) { // 监听章节换页
      this[CHANGE_READ_CHAPTER]({
        read: {
          id: this.bookID,
          page: index
        },
        flag: 'modify'
      })
      // index * 100 表示章节数
      this.getChapters({
        url: config.chapter,
        data: {
          bookID: this.bookID,
          source: this.read.source,
          readIndex: index * 100
        }
      })
    },
    // 小说获取函数（章节和内容）
    async getData (reqData) {
      try {
        let data = await get(reqData)
        if (data.code === 1) {
          this.chapters = data.data.msg.chapters
          this.total = data.data.msg.total
          console.log(data.data.msg)
          // 设定显示当前章节名字
          let chapterIdx = this.read.index % 100
          setTitle(this.chapters[chapterIdx].title)
          // 请求当前章节的内容
          const content = await get({
            url: config.content,
            data: {
              link: this.chapters[chapterIdx].link
            }
          })
          console.log(content)
          if (content.code === 1) {
            this.novelContent = content.data.msg.chapter.body
            loading(false)
          } else {
            loading(false)
            toast('服务异常', 'none')
          }
        } else {
          loading(false)
          toast('服务异常', 'none')
        }
      } catch (error) {
        loading(false)
        toast('获取失败', 'none')
      }
    },
    async getContent (req) {
      loading(true)
      try {
        const content = await get(req)
        if (content.code === 1) {
          this.novelContent = content.data.msg.chapter.body
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
    async getChapters (req) {
      loading(true)
      try {
        const chapters = await get(req)
        if (chapters.code === 1) {
          this.chapters = chapters.data.msg.chapters
          this.total = chapters.data.msg.total
          console.log('refreshChapters', this.chapters)
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
    ]),
    ...mapGetters([
      'read' // 当前阅读进度
    ]),
    chapterName () {
      let chapter = ''
      if (this.chapters.length > this.read.index) {
        chapter = this.chapters[this.read.index].title
      }
      return chapter
    },
    novel () { // 底部当前阅读进度标签使用数据
      return {
        name: this.novelName,
        chapter: this.chapterName,
        progress: this.percent,
        backgroundColor: this.styNvCnt.backgroundColor,
        color: this.styNvCnt.color,
        mask: this.bright
      }
    },
    selectedIndex () {
      return parseInt(this.read.index / 100)
    },
    brightColor () { // 亮度遮罩
      return `rgba(0, 0, 0, ${this.bright})`
    },
    setTitleBarStyl () {
      setTitleBarStyle(this.$store.state.selectedBgColor.id)
    }
  },
  created () {
    console.log('created')
    // 监听关闭标签事件
    this.$pub.$on('closeTabs', () => {
      this.handleTabs()
    })
    // 监听切换章节事件
    this.$pub.$on('changeChapter', ({title, link}, index, page) => {
      // 保存当前阅读
      console.log('当前阅读', title, link, index)
      this.goTop = 'goTop'
      this[CHANGE_READ_CHAPTER]({
        read: {
          id: this.bookID,
          index,
          page
        },
        flag: 'modify'
      })
      // 更换当前显示的章节名称
      setTitle(title)
      // 重新获取章节数据
      this.getContent({
        url: config.content,
        data: {
          link
        }
      })
    })
    // 将缓存数据取到本地
    this.bright = this.$store.state.bright
  },
  mounted () {
    wx.createSelectorQuery().select('.novel-content').boundingClientRect(rect => {
      this.scrollH = rect.height
    }).exec() // 计算滚动组件总高度
  },
  onLoad () {
    console.log('onLoad')
    this.bookID = this.$root.$mp.query.id
    this.$store.commit('changeCurrentReadID', this.bookID)
    try {
      this.novelName = this.$store.state.follow[this.$store.state.followID.indexOf(this.bookID)].title
    } catch (e) {
      this.novelName = ''
    }
  },
  onShow () {
    console.log('onShow')
    // 查找当前这本书的阅读进度，并下载对应的章节
    if (this.read) {
      if (this.read.status === 1) { // 换源后重新获取当前阅读进度
        this[CHANGE_READ_CHAPTER]({
          read: {
            id: this.bookID,
            status: 2
          },
          flag: 'modify'
        })
      }
      this.getData({
        url: config.chapter,
        data: {
          bookID: this.bookID,
          source: this.read.source,
          readIndex: this.read.index
        }
      })
    }
  },
  onReady () {
    console.log('onReady')
  },
  onUnload () {
    console.log('onUnload')
    this.showOrHide = '' // 在切出页面后，清除身上动画
    this.novelContent = '' // 在切出页面后，清空当前小说内容，减少内存消耗
  },
  beforeMount () {
    console.log('beforeMount')
  },
  onHide () {
    console.log('onHide')
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
  absl($bott, $zidx)
    position absolute
    width 100%
    bottom $bott
    z-index $zidx
  positionMiddle()
    top 80rpx
    bottom 150rpx

  ::-webkit-scrollbar
    width 0
    height 0
    color transparent
  .removed
    display none
  .container
    width 100%
    height 100%
    position absolute
    overflow-x hidden
    .mask
      width 100%
      height 100%
      background-color maskColor
    .novel-content
      position absolute
      top 0
      bottom 50rpx
      width 92%
      padding-left calc(4%)
    .pogress-bar-box
      absl(0, 2)
      height 50rpx
    .top-bar
      position absolute
      top 0
      width 100%
      z-index 1
    .bottom-bar
      absl(50rpx, 1)
    .setup-bar
      absl(150rpx, 1)
    .content-tab-show
      absl(150rpx, 1)
      positionMiddle()
      width 100%
      background-color bgcolor2
    .content-tab-hide
      position absolute
      positionMiddle()
      width 0
    .middle-in
      positionMiddle()
      showLeft()
    .middle-out
      positionMiddle()
      hideLeft()
    .movable
      position fixed
      bottom 50rpx
      width 100%
      height 40%
      .move
        height 60rpx
        font-size 30rpx
        line-height 60rpx
        text-align center
        color #fff
        border-radius 8rpx
        background #1C86EE
        box-shadow 1px 1px 8rpx #222
</style>
