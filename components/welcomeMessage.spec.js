import React from 'react'
import { shallow } from 'enzyme'
import WelcomeMessage from '../components/welcomeMessage'
import TextField from '@material-ui/core/TextField'

import { render, screen } from '@testing-library/react'
const props = {
  categories: [{ id: 'id01', value: [] }],
  styles: {},
}
const wrapper = shallow(<WelcomeMessage {...props} />)

describe('Title', () => {
  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(TextField)).toHaveLength(1)
  })
  it('renders the right elements', () => {
    render(<WelcomeMessage {...props} />)
    expect(screen.getByRole('title')).toBeInTheDocument()
  })
})
