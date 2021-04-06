import React from 'react'
import AlertMessage from './alertMessage'
import { shallow } from 'enzyme'
import Snackbar from '@material-ui/core/Snackbar'
import { render, screen } from '@testing-library/react'

describe('Title', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<AlertMessage />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(Snackbar)).toHaveLength(1)
  })
  it('renders right element', () => {
    render(<AlertMessage />)
    expect(screen.getByRole('button', { name: 'Open simple snackbar' })).toBeInTheDocument()
  })
})
