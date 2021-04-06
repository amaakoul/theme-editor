import React from 'react'
import { shallow } from 'enzyme'
import FieldWrapper from './fieldWrapper'
import { ListItem, ListItemText } from '@material-ui/core'
import { render, screen } from '@testing-library/react'

const props = {
  styles: {},
  value: [{ id: 'some data', inputValue: '', error: false, value: {} }],
}

describe('Title', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<FieldWrapper {...props} />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(ListItem)).toHaveLength(1)
    expect(wrapper.find(ListItemText)).toHaveLength(1)
  })
  it('renders the right elements', () => {
    render(<FieldWrapper {...props} />)
    expect(screen.getByRole('button', { name: 'some data - some data :' })).toBeInTheDocument()
  })
})
