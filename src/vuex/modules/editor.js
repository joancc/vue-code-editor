// vuex/modules/editor.js
import {
  UPDATE_CODE
} from '../mutation-types'

// initial state
const state = {
  code: {}
}

// mutations
const mutations = {
  [UPDATE_CODE] (state, key, code) {
    let newCode = state.code;
    newCode[key] = code;
    state.code = newCode;
  }
}

export default {
  state,
  mutations
}
