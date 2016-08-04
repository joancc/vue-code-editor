import Vue from 'vue'
import Vuex from 'vuex'

import editor from './modules/editor'

// Make vue aware of Vuex
Vue.use(Vuex)

const state = {

}

const mutations = {
  // TODO: set up our mutations
}

// Combine the initial state and the mutations to create a Vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
  state,
  mutations,
  modules: {
    editor
  }
})
