//  signIn, singnUp頁面都會從這邊抓資料
import { apiHelper } from './../utils/helpers'


export default {
  // 註冊
  register({ name, email, account, password, checkPassword }) {
    return apiHelper.post('/users', {
      name,
      email,
      account,
      password,
      checkPassword
    })
  },
  // 登入
  login({ account, password }) {
    // post, get取決於你要怎麼向後端抓資料，return為Promise，但由該頁面去做.then的動作
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },
  // 更新設定資料
  updateSetting({userId, formData}) {
    return apiHelper.put(`/users/${userId}/setting`, formData)
  },
  // 更新個人資料
  updateProfile({userId, formData}) {
    console.log(userId, formData)
    return apiHelper.put(`/users/${userId}`, formData,)
  },
  // 刪除個人帳號資訊頁面的封面照，使用新增(patch)的方式來刪除
  removeCoverPhoto({userId}){
    return apiHelper.patch(`/users/${userId}/cover`)
  },
  getUser ({userId}) {
      return apiHelper.get(`/users/${userId}`)
  },
  //得到當前登入user的資料
  getCurrentUser () {
      return apiHelper.get('/users')
  },
  //得到某user發的所有推文
  getUserTweets ({userId}) {
      return apiHelper.get(`/users/${userId}/tweets`)
  },
  getUserReplies ({userId}) {
      return apiHelper.get(`/users/${userId}/replied_tweets`)
  },
  getUserLikes ({userId}) {
      return apiHelper.get(`/users/${userId}/likes`)
  },
  getUserFollowrs ({userId}) {
      return apiHelper.get(`/users/${userId}/followers`)
  },
  getUserFollowings ({userId}) {
      return apiHelper.get(`/users/${userId}/followings`)
  },
}