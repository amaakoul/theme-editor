import React from 'react'
import Title from './title'
import { shallow } from 'enzyme'

// import { mount, shallow } from 'enzyme'
import { render, screen } from '@testing-library/react'
// const MyComponent = _MyComponent.WrappedComponent

/** @test {Title Component} */
describe('Title', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Title />)
    expect(wrapper).toMatchSnapshot()
    expect(wrapper.find('h1')).toHaveLength(1)
  })
  it('renders right data', () => {
    render(<Title />)
    expect(screen.getByRole('heading', { name: 'Welcome to the app!' })).toBeInTheDocument()
  })
})
