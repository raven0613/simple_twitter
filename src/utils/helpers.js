import axios from 'axios'
import Swal from 'sweetalert2'


const baseURL = 'https://floating-badlands-66539.herokuapp.com/api'
// const baseURL = 'https://murmuring-cliffs-53127.herokuapp.com/api'



const axiosInstance = axios.create({
  baseURL
})

//在呼叫API之前就先驗證token
axiosInstance.interceptors.request.use(config => {
  // 從 localStorage 將 token 取出
  const token = localStorage.getItem('token')

  // 如果 token 存在的話，則帶入到 headers 當中
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
}, err => Promise.reject(err))


export const apiHelper = axiosInstance




export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end', // 顯示的位置
  showConfirmButton: false, // 要不要顯示確認按鈕
  timer: 3000, // 顯示時間
  
})


// 統一把SweetAlert2的html寫在這邊
export const innerHtml = (message,state) => {
  return `
  <div class="alert__container">
    <div class="alert-message">${message}</div>
    <div class="alert-photo__container alert-photo__container__${state}">
      <div class="alert-photo alert-photo__${state}"></div>
    </div>
  </div>
  `
}

// AdminTweet的刪除Toast
export const innerHtmlConfirm = (message,state) => {
  return `
  <div class="alert__container">
    <div class="alert-message">${message}</div>
    <div class="alert-photo__container alert-photo__container__${state}">
      <div class="alert-photo alert-photo__${state}"></div>
    </div>
  </div>
  `
}