export default {
  read (state) {
    if (state.currentReadID === '') {
      return {
        index: 0
      }
    }
    for (let i = 0, len = state.readChapter.length; i < len; i++) {
      if (state.readChapter[i].id === state.currentReadID) {
        let read = state.readChapter[i]
        read.i = i
        // console.error(read)
        return read
      }
    }
  }
}
