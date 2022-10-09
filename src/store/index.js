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
    },
    revokeAuthentication(state){
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
    }
  },
  actions: {
    async fetchCurrentUser ({commit, state}) {
      try {
        const userId = state.currentUser.id
        const { data } = await usersAPI.getUser({userId})
        const { FollowerCount, FollowingsCount, account, coverPhoto, id, introduction, name, profilePhoto, role } = data
        commit('setCurrentUser', {
          FollowerCount, FollowingsCount, account, coverPhoto, id, introduction, name, profilePhoto, role
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
