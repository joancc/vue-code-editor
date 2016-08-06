import * as types from './mutation-types'

// Object destructuring of store into dispatch and state
export const updateCode = ({ dispatch, state }, filename, code) => {
  console.log(code)
  dispatch(types.UPDATE_CODE, filename, code)
}

export const resize = ({ dispatch, state }, key, value) => {
  console.log(`Resize ${key} to ${value}`)
  dispatch(types.RESIZE, key, value)
}

export const setSelectedFile = ({ dispatch, state }, filename) => {
  console.log(`Set selected file ${filename}`)
  dispatch(types.SELECT_FILE, filename)
}


