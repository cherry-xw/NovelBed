<template>
  <div
  class="container"
  :style="{
    backgroundColor: styNvCnt.backgroundColor,
    color: styNvCnt.color
  }"
  >
    <div
      class="option-box"
      hover-class="hover-red"
      @click="handleTabShow(0)"
    >
      <div class="tag-left">
        <img :src="items[0].icon">
      </div>
      <div class="title">{{ items[0].title }}</div>
      <div class="tag-right">
        <img src="/static/img/go.png">
      </div>
    </div>
    <div :class="[isActive[0], animate[0]]" v-if="firstIn">
      <search-tab></search-tab>
    </div>
    <div
      class="option-box"
      hover-class="hover-red"
      @click="handleTabShow(1)"
    >
      <div class="tag-left">
        <img :src="items[1].icon">
      </div>
      <div class="title">{{ items[1].title }}</div>
      <div class="tag-right">
        <img src="/static/img/go.png">
      </div>
    </div>
    <div :class="[isActive[1], animate[1]]" v-if="firstIn">
      <rank-tab></rank-tab>
    </div>
    <div
      class="option-box"
      hover-class="hover-red"
      @click="handleTabShow(2)"
    >
      <div class="tag-left">
        <img :src="items[2].icon">
      </div>
      <div class="title">{{ items[2].title }}</div>
      <div class="tag-right">
        <img src="/static/img/go.png">
      </div>
    </div>
    <div :class="[isActive[2], animate[2]]" v-if="firstIn">
      <types-tab></types-tab>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { setTitleBarStyle } from '@/util'
import SearchTab from './components/SearchTab'
import RankTab from './components/RankTab'
import TypesTab from './components/TypesTab'
export default {
  name: 'searchPage',
  components: {
    SearchTab,
    RankTab,
    TypesTab
  },
  data () {
    return {
      items: [{
        id: 'search',
        title: '查询',
        icon: '../../static/img/search.red.png'
      }, {
        id: 'ranking',
        title: '排行榜',
        icon: '../../static/img/rank.red.png'
      }, {
        id: 'types',
        title: '分类',
        icon: '../../static/img/types.red.png'
      }],
      animate: ['tab-out', 'tab-out', 'tab-out'],
      isActive: ['removed', 'removed', 'removed'],
      isTimeout: 0,
      showTab: -1, // 当前显示的标签内容，-1表示都不显示，0,1,2表示显示对应内容
      firstIn: false
    }
  },
  methods: {
    handleTabShow (flag) {
      switch (flag) {
        case 0:
          this.showTab = this.showTab === 0 ? -1 : 0
          break
        case 1:
          this.showTab = this.showTab === 1 ? -1 : 1
          break
        case 2:
          this.showTab = this.showTab === 2 ? -1 : 2
          break
      }
    }
  },
  watch: {
    showTab () {
      if (this.showTab === -1) {
        this.animate = ['tab-out', 'tab-out', 'tab-out']
        this.isActive = ['removed', 'removed', 'removed']
      } else {
        this.animate = this.animate.map((v, i) => {
          if (i === this.showTab) {
            this.isActive[i] = ''
            return 'tab-in'
          } else {
            return 'tab-out'
          }
        })
        setTimeout(() => {
          this.isActive = this.isActive.map((v, i) => {
            if (i === this.showTab) {
              return 'active'
            } else {
              return 'removed'
            }
          })
        }, this.$store.state.tabSearchDirection - 80)
      }
    }
  },
  computed: {
    ...mapState([
      'styNvCnt'
    ]),
    setBarStyl () {
      setTitleBarStyle(this.$store.state.selectedBgColor.id)
    }
  },
  mounted () {
    this.firstIn = true
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/styles/common.styl'
  .tab-in
    keyframeS('tab-show-s', #eee, #fff, 0, 80%, 0, 1)
    animation tab-show-s tabMiddleAnimationDuration ease-in
  .tab-out
    keyframeS('tab-hide-s', #fff, #eee, 100%, 0, 1, 0)
    animation tab-hide-s tabMiddleAnimationDuration ease-out
  .container
    width 100%
    height 100%
    display flex
    position fixed
    flex-direction column
    background-color #eee
    .option-box
      height 70rpx
      line-height 70rpx
      padding 0 15rpx
      font-size 30rpx
      display flex
      border-bottom 1px solid #ccc;
      .tag-left
        width 70rpx
        height 70rpx
        line-height 70rpx
        float left
        text-align center
        img
          width 40rpx
          height 40rpx
          margin 15rpx 0
          opacity 0.7
      .title
        flex 1
      .tag-right
        float right
        width 70rpx
        height 70rpx
        text-align center
        img
          width 30rpx
          height 40rpx
          margin 15rpx 0
          opacity 0.4
    .removed
      height 0
      display none
    .active
      flex 1
      border-bottom 1px solid #ddd;
      background-color white
</style>
