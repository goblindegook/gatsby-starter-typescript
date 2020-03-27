import React from 'react'
import { render } from '@testing-library/react'
import { Pager } from '../../src/components/Pager'

describe('<Pager />', () => {
  it('renders a pager for the first page', () => {
    const { getByText } = render(<Pager page={1} prefix="prefix" total={3} />)
    expect(getByText('Next').getAttribute('href')).toBe('/prefix/2')
  })

  it('renders a pager for the second page', () => {
    const { getByText } = render(<Pager page={2} prefix="prefix" total={3} />)
    expect(['Previous', 'Next'].map((text) => getByText(text).getAttribute('href'))).toEqual([
      '/prefix',
      '/prefix/3',
    ])
  })

  it('renders a pager for the last page', () => {
    const { getByText } = render(<Pager page={3} prefix="prefix" total={3} />)
    expect(getByText('Previous').getAttribute('href')).toBe('/prefix/2')
  })
})
