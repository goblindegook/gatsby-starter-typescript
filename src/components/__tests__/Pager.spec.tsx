import * as React from 'react'
import { shallow } from 'enzyme'
import { Pager } from '../Pager'

describe('<Pager />', () => {
  it('renders a pager for the first page', () => {
    const component = shallow(<Pager page={1} prefix='prefix' total={3} />)

    expect(component.find('GatsbyLink').map(e => e.props())).toMatchObject([
      {
        children: 'Next',
        to: '/prefix/2'
      }
    ])
  })

  it('renders a pager for the second page', () => {
    const component = shallow(<Pager page={2} prefix='prefix' total={3} />)

    expect(component.find('GatsbyLink').map(e => e.props())).toMatchObject([
      {
        children: 'Previous',
        to: '/prefix'
      },
      {
        children: 'Next',
        to: '/prefix/3'
      }
    ])
  })

  it('renders a pager for the last page', () => {
    const component = shallow(<Pager page={3} prefix='prefix' total={3} />)

    expect(component.find('GatsbyLink').map(e => e.props())).toMatchObject([
      {
        children: 'Previous',
        to: '/prefix/2'
      }
    ])
  })
})