import React from 'react'
import FieldsGroup from './fieldsGroup'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'

import { shallow } from 'enzyme'

// TEMP - mock react redux since enzyme is not yet compatible with React 17
jest.mock('react-redux', () => ({
  // to-do update enzyme-adapter-react-17
  useSelector: (store = {}) => store, // mock store
  useDispatch: () => {},
}))

import { render, screen } from '@testing-library/react'
const props = {
  categories: [{ id: 'id01', value: [] }],
  styles: {},
}

const wrapper = shallow(<FieldsGroup {...props} />)

describe('Title', () => {
  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Accordion)).toHaveLength(1)
  })
  it('renders the right elements structure', () => {
    expect(wrapper.find(Accordion)).toHaveLength(1)
    expect(wrapper.find(AccordionSummary)).toHaveLength(1)
    expect(wrapper.find(AccordionDetails)).toHaveLength(1)
  })
  it('renders the right elements', () => {
    render(<FieldsGroup {...props} />)
    expect(screen.getByRole('formGroup')).toBeInTheDocument()
  })
})
