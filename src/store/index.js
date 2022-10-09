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
      profilePhoto: '',
      coverPhoto:'',
      introduction: '',
      createdAt: '',
    },
    isAuthenticated: false
  },
  getters: {
  },
  mutations: {
    setCurrentUser (state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.isAuthenticated = true
    }
  },
  actions: {
    async fetchCurrentUser ({commit}) {
      try {
        const response = await usersAPI.getUser()
        console.log(response)
        commit('setCurrentUser', {
          ...response.data
        })
      }
      catch (error) {
        console.log(error.message)
      }
    }
  },
  modules: {
  }
})
