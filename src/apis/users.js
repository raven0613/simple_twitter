//  signIn, singnUp頁面都會從這邊抓資料
import { apiHelper } from './../utils/helpers'


export default {
  // 註冊
  register({name, email, account, password, checkPassword}){
    return apiHelper.post('/users', {
      name, 
      email, 
      account,
      password, 
      checkPassword
    })
  },
  // 登入
  login({account, password}) {
    // post, get取決於你要怎麼向後端抓資料，return為Promise，但由該頁面去做.then的動作
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },
  //得到某user的資料
  getUser ({userId}) {
      const getToken = () => {
          localStorage.getItem('token')
      }
      return apiHelper.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${getToken()}` }
      })
  },
  //得到某user發的所有推文
  getUserTweets ({userId}) {
      const getToken = () => {
          localStorage.getItem('token')
      }
      return apiHelper.get(`/users/${userId}/tweets`, {
          headers: { Authorization: `Bearer ${getToken()}` }
      })
  }
}