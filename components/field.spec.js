import React from 'react'
import Field from './field'
import { shallow } from 'enzyme'
import Snackbar from '@material-ui/core/Snackbar'
import AlertMessage from '../components/alertMessage'

import { render, screen } from '@testing-library/react'

describe('Title', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Field />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find(AlertMessage)).toHaveLength(1)
  })
  it('renders the right elements', () => {
    render(<Field />)
    expect(screen.getByRole('placeholder')).toBeInTheDocument()
  })
})
