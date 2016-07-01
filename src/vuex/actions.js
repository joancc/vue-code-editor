import * as types from './mutation-types'

// Object destructuring of store into dispatch and state
export const updateCode = ({ dispatch, state }, key, code) => {
  console.log(code)
  dispatch(types.UPDATE_CODE, key, code)
}

