import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: 0,
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
    },
    revokeAuthentication(state){
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  actions: {
    async fetchCurrentUser ({commit}) {
      try {
        const { data } = await usersAPI.getCurrentUser()
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
