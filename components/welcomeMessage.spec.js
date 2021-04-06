import React from 'react'
import { shallow } from 'enzyme'
import WelcomeMessage from '../components/welcomeMessage'

import { render, screen } from '@testing-library/react'
const props = {
  styles: {},
  user: 'someName',
}
const wrapper = shallow(<WelcomeMessage {...props} />)

describe('Title', () => {
  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot()
    render(<WelcomeMessage {...props} />)
    expect(wrapper.find('span')).toHaveLength(3)
  })
  it('renders the right elements', () => {
    render(<WelcomeMessage {...props} />)
    expect(screen.getByRole('title')).toBeInTheDocument()
  })
})
