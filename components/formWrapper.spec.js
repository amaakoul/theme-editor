import React from 'react'
import FormWrapper from './formWrapper'
import { shallow } from 'enzyme'
import FieldsGroup from './fieldsGroup'
import Paper from '@material-ui/core/paper'

import { render, screen } from '@testing-library/react'
const props = {
  styles: {},
}
const wrapper = shallow(<FormWrapper {...props} />)

describe('Title', () => {
  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(FieldsGroup)).toHaveLength(1)
    expect(wrapper.find(Paper)).toHaveLength(1)
  })
  it('renders the right elements', () => {
    render(<FormWrapper {...props} />)
    expect(screen.getByRole('heading', { name: 'Theme Editor' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })
})
