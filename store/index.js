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
      locales: ['en', 'es'],
      locale: 'en'
    },
    mutations: {
      SET_GISTS_LIST (state, gists) {
        state.gists = gists
      },
      SET_LANG (state, locale) {
        if (state.locales.indexOf(locale) !== -1) {
          state.locale = locale
        }
      }
    },
    actions: {
      async LOAD_GIST_LIST ({ commit }, username) {
        try {
          const { data } = await axios.get(`${API}/users/${username}/gists`)
          commit('SET_GISTS_LIST', data)
        } catch (error) {
          console.log('ERROR', error)
        }
      }
    }
  })
}

export default createStore
