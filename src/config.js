// 项目配置项

const host = 'http://localhost:5757'

const config = {
  host,
  loginUrl: '/weapp/login', // 登录
  userUrl: '/weapp/user', // 用户
  rank: '/weapp/rank', // 小说排行榜
  book: '/weapp/intro', // 小说详细介绍
  read: '/weapp/read', // 主页阅读列表
  source: '/weapp/source', // 换源列表
  chapter: '/weapp/chapter', // 章节列表
  content: '/weapp/content', // 当前阅读小说内容
  search: '/weapp/search', // 搜索后列表内容
  keywords: '/weapp/search/keywords' // 搜索时显示关键词
}

export default config
