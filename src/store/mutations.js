import * as types from './mutation-types'
const matations = {
/**
 * state:当前状态树
 * v: 提交matations时传的参数
 */
  // 添加用户id
  [types.SET_OPEN_ID] (state, v) {
    state.openId = v
  },
  // 修改主题
  [types.SET_THEME] (state, item) {
    state.selectedBgColor = item
    state.styNvCnt.backgroundColor = item.color
    state.styNvCnt.color = item.fontColor
  },
  // 小说,true传完整信息，false仅传id，flag删除还是添加操作
  [types.FOLLOW_NOVEL] (state, {novel, flag}) {
    if (flag) {
      state.followID.push(novel._id)
      state.follow.push(novel)
    } else {
      const idx = state.followID.indexOf(novel)
      if (idx !== -1) {
        state.follow.splice(idx, 1)
        state.followID.splice(idx, 1)
      }
    }
  },
  // 阅读小说列表(read是当前的阅读信息， flag值为add表示增，modify表示改,delete表示删)
  [types.CHANGE_READ_CHAPTER] (state, {read, flag}) {
    if (flag === 'add') {
      state.readChapter.push(read)
    } else if (flag === 'modify') {
      // 以bookID作为查询条件，修改内容
      for (let i = 0, len = state.readChapter.length; i < len; i++) {
        if (state.readChapter[i].id === read.id) {
          state.readChapter[i].status = read.status || state.readChapter[i].status
          state.readChapter[i].source = read.source || state.readChapter[i].source
          state.readChapter[i].index = read.index || state.readChapter[i].index
          state.readChapter[i].page = read.page || state.readChapter[i].page
          break
        }
      }
    } else if (flag === 'delete') {
      for (let i = 0, len = state.readChapter.length; i < len; i++) {
        if (state.readChapter[i].id === read.id) {
          state.readChapter.splice(i, 1)
          break
        }
      }
    } else {
      console.log('当前阅读记录操作错误')
    }
  },
  changeBright (state, bright) {
    state.bright = bright
  },
  changeFontSize (state, fontSize) {
    state.styNvCnt.fontSize = `${parseInt(fontSize)}rpx`
    state.styNvCnt.lineHeight = `${parseInt(fontSize) * 1.5}rpx`
  },
  handleSearchHistory (state, data) {
    console.log(data)
    if (data === 'to_remove_search_data') {
      state.searchHistory = []
      return
    }
    if (state.searchHistory.length > 4) {
      state.searchHistory.shift()
    }
    state.searchHistory.push(data)
  },
  changeCurrentReadID (state, id) {
    state.currentReadID = id
  },
  changeFollowNovel (state, msg) {
    const idx = state.followID.indexOf(msg._id)
    if (idx !== -1) {
      state.follow[idx].chaptersCount = msg.chaptersCount
      state.follow[idx].lastChapter = msg.lastChapter
      state.follow[idx].updated = msg.updated
    }
  }
}
export default matations
