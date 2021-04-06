import { CREATE_NEW_THEME } from '../actions/themeActions'

const themeReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_NEW_THEME:
      return { ...state, ...action.payload }
    default:
      return { ...state }
  }
}

export default themeReducer
