import moment from 'moment'

// 記得把他export出來
export const fromNowFilter = {
  filters: {
    fromNow(dateTime) {
      return dateTime ? moment(dateTime).fromNow() : '-'
    }
  }
}

// 照片跑不出來或無，就使用假圖片
export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://fakeimg.pl/350x220/DFDFDF/?text=No+Image'
    }
  }
}

// 推文只會顯示特定長度的文字，有兩個參數(推文＆特定長度)
export const showDescriptionFilter = {
  filters: {
    showDescription(des, length) {
      const lengthOfDes = des.trim().length;
      return lengthOfDes < length ? des : des.slice(0, length) + "..."
    }
  }
}
