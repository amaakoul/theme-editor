//Action Types
export const CREATE_NEW_THEME = 'CREATE_NEW_THEME'

// Action Creator
export const createNewTheme = theme => ({
  type: CREATE_NEW_THEME,
  payload: theme,
})
