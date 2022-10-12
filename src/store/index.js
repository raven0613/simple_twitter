import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      account: '',
      name: '',
      email: '',
      role: '',
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
      state.token = localStorage.getItem('token')
      console.log('在mutation裡面更新了 currentUser 的資料')
    },
    revokeAuthentication(state){
      console.log('你被登出了')
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  actions: {
    async fetchCurrentUser ({commit}) {
      try {
        console.log('token變了 重新拉取使用者資料')
        const { data } = await usersAPI.getCurrentUser()
        console.log('你的使用者資料是:')
        console.log(data)
        const { account, email, id, name, role } = data
        commit('setCurrentUser', {
          account, email, id, name, role
        })
        return true
      }
      catch (error) {
        console.log(error.message)
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
