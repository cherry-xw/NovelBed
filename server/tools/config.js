const host = 'http://api.zhuishushenqi.com'

const config = {
  host, // 请求主机域名
  book: `${host}/book/`, // 小说
  read: `${host}/book?view=updated&id=`, //  当前阅读列表
  chapter: `${host}/toc/[SRCID]?view=chapters`, // 章节列表(混合源http://api.zhuishushenqi.com/mix-toc/[BOOKID])
  source: `${host}/toc?view=summary&book=`, // 换源列表
  content: 'http://chapterup.zhuishushenqi.com/chapter/[LINK]', // 小说某一章的具体内容
  search: { // 搜索
    keywords: `${host}/book/auto-complete?query=[QUERY]`,
    list: `${host}/book/fuzzy-search?query=[QUERY]&start=0&limit=100&v=1`
  },
  rank: { // 排行榜
    url: `${host}/ranking/`,
    // 男
    // 快读最热榜
    '1b0': '54d42d92321052167dfb75e3', // 周榜
    '1b1': '564d820bc319238a644fb408', // 月榜
    '1b2': '564d8494fe996c25652644d2', // 总榜
    // 好评榜
    '2b': '5a6844aafc84c2b8efaa6b6e', // 周榜
    // 热搜榜
    '3b': '5a6844f8fc84c2b8efaa8bc5',
    // 本周潜力榜
    '4b0': '54d42e72d9de23382e6877fb', // 周榜
    '4b1': '564eee3ea82e3ada6f14b195', // 月榜
    '4b2': '564eeeabed24953671f2a577', // 总榜
    // 读者留存率Top100
    '5b0': '564547c694f1c6a144ec979b', // 周榜
    '5b1': '564d898f59fd983667a5e3fa', // 月榜
    '5b2': '564d8a004a15bb8369d9e28d', // 总榜
    // 完结榜
    '6b0': '564eb878efe5b8e745508fde', // 周榜
    '6b1': '564eb12c3edb8b45511139ff', // 月榜
    '6b2': '564eea0b731ade4d6c509493', // 总榜
    // VIP排行榜
    '7b0': '57eb86f0ef9e5a8f20543d7d', // 周榜
    '7b1': '57eb9283f031bfcc219389af', // 月榜
    '7b2': '5848d4a4602c289505581f6f', // 总榜
    // 其他
    '8b': '582ed5fc93b7e855163e707d', // 圣诞热搜榜
    '9b': '564ef4f985ed965d0280c9c2', // 百度热搜榜
    '10b': '564d8003aca44f4f61850fcd', // 掌阅热销榜
    '11b': '564d80457408cfcd63ae2dd0', // 书旗热搜榜
    '12b': '54d430e9a8cb149d07282496', // 17k 鲜花榜
    '13b': '54d4306c321052167dfb75e4', // 起点月票榜
    '14b': '54d430962c12d3740e4a3ed2', // 纵横月票榜
    '15b': '54d4312d5f3c22ae137255a1', // 和阅读原创榜
    '16b': '5732aac02dbb268b5f037fc4', // 逐浪点击榜
    // 女
    // 最热榜Top100
    '1g0': '54d43437d47d13ff21cad58b', // 周榜
    '1g1': '564d853484665f97662d0810', // 月榜
    '1g2': '564d85b6dd2bd1ec660ea8e2', // 总榜
    // 好评榜
    '2g': '5a684551fc84c2b8efaab179', // 周榜
    // 热搜榜
    '3g': '5a684515fc84c2b8efaa9875', // 周榜
    // VIP排行榜
    '4g0': '57eb959df60eb7e21fb3a8b7', // 周榜
    '4g1': '57eb98afcf7ddb81588947b4', // 月榜
    '4g2': '57eb98fe1ae40b985292051e', // 总榜
    // 本周潜力榜
    '5g0': '54d43709fd6ec9ae04184aa5', // 周榜
    '5g1': '564eee77e3a44c9f0e5fd7ae', // 月榜
    '5g2': '564eeeca5e6ba6ae074f10ec', // 总榜
    // 读者留存率Top100
    '6g0': '5645482405b052fe70aeb1b5', // 周榜
    '6g1': '564d8b6b36d10ccd6951195d', // 月榜
    '6g2': '564d8c37752bcca16a976168', // 总榜
    // 快读完结榜Top100
    '7g0': '564eb8a9cf77e9b25056162d', // 周榜
    '7g1': '564ee8ec146f8f1739777740', // 月榜
    '7g2': '564eeae6c3345baa6bf06e38', // 总榜
    // 其他排行榜
    '8g': '582fb5c412a401a20ea50275', // 圣诞热搜榜
    '9g': '564d80d0e8c613016446c5aa', // 掌阅热销榜
    '10g': '564d81151109835664770ad7', // 书旗热搜榜
    '11g': '550b841715db45cd4b022107', // 17k 订阅榜
    '12g': '550b836229cd462830ff4d1d', // 起点粉红票榜
    '13g': '550b8397de12381038ad8c0b' // 潇湘月票榜
  }
}

module.exports = config
