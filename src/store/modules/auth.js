import axios from "axios"
import jwt from 'jsonwebtoken'
import axiosInstance from '@/services/axios'
import { rejectError } from "@/helpers";

function checkTokenValidity(token) {
  if(token) {
    const decodedToken = jwt.decode(token)

    return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  }

  return false
}

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    },
    setAuthState(state, authState) {
      return state.isAuthResolved = authState
    }
  },
  actions: {
    loginWithEmailAndPassword({commit}, formData) {
      return axios.post('/api/v1/users/login', formData)
        .then(res => {
          const user = res.data
          localStorage.setItem('meetuper-jwt', user.token)
          commit('setAuthUser', user)
        })
        .catch(err => rejectError(err))
    },
    registerUser(context, formData) {
      return axios.post('/api/v1/users/register', formData)
        .catch(err => rejectError(err))
    },
    logout({ commit }) {

      // For Session Authentication !
      // return axios.post('/api/v1/users/logout')
      //   .then(() => {
      //     commit('setAuthUser', null)
      //     return true
      //   })
      //   .catch(err => err)

      return new Promise((resolve) => {
        localStorage.removeItem('meetuper-jwt')
        commit('setAuthUser', null)
        resolve(true)
      })
    },
    getAuthUser({commit, getters}) {
      const authUser = getters['authUser']
      const token = localStorage.getItem('meetuper-jwt')
      const isTokenValid = checkTokenValidity(token)

      if(authUser && isTokenValid) { return Promise.resolve(authUser) }

      const config = {
        headers: {
          'Cache-Conterol': 'no-cache'
        }
      }

      return axiosInstance.get('/api/v1/users/me', config)
        .then(res => {
          const user = res.data
          localStorage.setItem('meetuper-jwt', user.token)
          commit('setAuthUser', user)
          commit('setAuthState', true)
          return user
        })
        .catch((err) => {
          commit('setAuthUser', null)
          commit('setAuthState', true)
          return err
        })
    }
  },
  getters: {
    authUser(state) {
      return state.user || null
    },
    isAuthenticated(state) {
      return !!state.user
    }
  }
}