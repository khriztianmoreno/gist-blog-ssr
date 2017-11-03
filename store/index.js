/**
 * @author: Cristian Moreno <khriztianmoreno@gmail.com>
 */

import Vuex from 'vuex'
import axios from 'axios'

const API = 'https://api.github.com'

const createStore = () => {
  return new Vuex.Store({
    state: {
      gists: [],
      gist: null,
      comments: [],
      locales: ['en', 'es'],
      locale: 'en',
      username: null
    },
    getters: {
      GET_USERNAME: state => state.username
    },
    mutations: {
      SET_GISTS_LIST (state, gists) {
        state.gists = gists
      },
      SET_GIST (state, gist) {
        state.gist = gist
      },
      SET_COMMENTS (state, comments) {
        state.comments = comments
      },
      SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      },
      SET_USERNAME (state, username) {
        state.username = username
      },
      SUCCESS (state, success) {
        state.success = true
        state.successMessage = success
      },
      ERROR (state, error) {
        state.error = true
        state.errorMessage = error
      }
    },
    actions: {
      async nuxtServerInit ({ commit }) {
        try {
          const { data } = await axios.get(`${API}/users/khriztianmoreno/gists`)
          commit('SET_GISTS_LIST', data)
        } catch (error) {
          commit('ERROR', error)
        }
      },
      async LOAD_GIST_LIST ({ commit }, username) {
        if (username) {
          commit('SET_USERNAME', username)
        }
        try {
          const { data } = await axios.get(`${API}/users/${this.state.username}/gists`)
          commit('SET_GISTS_LIST', data)
        } catch (error) {
          commit('ERROR', error)
        }
      },
      async LOAD_GIST ({ commit }, id) {
        try {
          const { data } = await axios.get(`${API}/gists/${id}`)
          commit('SET_GIST', data)

          commit('SET_USERNAME', data.owner.login)

          const response = await axios.get(data.comments_url)
          commit('SET_COMMENTS', response.data)
        } catch (error) {
          commit('ERROR', error)
        }
      },
      async CREAT_GIST ({ commit }, gist) {
        try {
          const { data } = await axios.post('/api/gist', gist)
          commit('SUCCESS', data)
        } catch (error) {
          commit('ERROR', error)
        }
      }
    }
  })
}

export default createStore
