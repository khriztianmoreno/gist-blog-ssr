/**
 * @author: Cristian Moreno <khriztianmoreno@gmail.com>
 */

import Vuex from 'vuex'
import axios from 'axios'

const API = 'https://api.github.com'

const createStore = () => {
  return new Vuex.Store({
    state: {
      gists: []
    },
    mutations: {
      SET_GISTS_LIST (state, gists) {
        state.gists = gists
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
