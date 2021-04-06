// import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import Adapter from 'enzyme-adapter-react-16'
import { configure } from 'enzyme'

configure({ adapter: new Adapter() })
// ADD DEFAULT STORE MOCK GLOBALLY

jest.mock('react-redux', () => ({
  // TEMP - mock react redux since enzyme is not yet compatible with React 17
  // to-do update enzyme-adapter-react-17
  useSelector: (store = {}) => store, // mock store
  useDispatch: () => {},
}))
