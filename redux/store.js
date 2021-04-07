import { createStore } from 'redux'
import rootReducer from './reducers/rootReducer'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { CREATE_NEW_THEME } from './actions/themeActions'

const reducer = (state = { tick: 'init' }, action) => {
  switch (action.type) {
    case 'DATA_ORIGIN':
      return { ...state, origin: action.payload }
    case 'USER_DATA':
      return { ...state, user: action.payload }
    case CREATE_NEW_THEME:
      return { ...state, theme: action.payload }
    case HYDRATE:
      return { ...state, ...action.payload }
    case 'TICK':
      return { ...state, tick: action.payload }
    default:
      return { ...state }
  }
}

// create a makeStore function
const makeStore = context => createStore(reducer)

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, { debug: true })

// const store = createStore(rootReducer)
export default createStore(rootReducer) // store
