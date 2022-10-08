import { apiHelper } from "../utils/helpers";
const getToken = () => {
  localStorage.getItem('token')
}


export default {
  // 登入
  login({ account, password }) {
    // post, get取決於你要怎麼向後端抓資料，return為Promise，但由該頁面去做.then的動作
    return apiHelper.post('/admin/signin', {
      account,
      password
    })
  },
  getAdminTweets() {
    return apiHelper.get('/admin/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteAdminTweets({ id }) {
    return apiHelper.delete(`/admin/tweets/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },

}