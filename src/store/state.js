const state = {
  openId: '',
  tabAnimationDirection: 500, // 阅读页面头部和底部标签动画显示状态延迟时间
  tabSearchDirection: 1000, // 搜索页面动画速度
  styNvCnt: {
    color: 'rgba(0, 0, 0, 1)',
    fontSize: '32rpx',
    lineHeight: '57rpx',
    backgroundColor: 'rgba(255,255,255,1)'
  },
  selectedBgColor: {
    id: 'white',
    icon: '../../static/img/right.png',
    color: 'white'
  },
  searchHistory: [], // 搜索历史 （只保存5个）
  bright: 0.1, // 控制遮罩亮度
  follow: [], // 追更新的小说
  followID: [], // 追更新小说(保存id数据)
  readChapter: [], // 当前阅读的小说列表
  currentReadID: '' // 当前点击进入阅读页面的小说ID，用于给getters找出当前阅读的小说
}
export default state
