import * as React from 'react'
import { MemoryRouter } from 'react-router'
import { render } from 'react-testing-library'
import { Pager } from '../Pager'

describe('<Pager />', () => {
  it('renders a pager for the first page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pager page={1} prefix="prefix" total={3} />
      </MemoryRouter>
    )

    expect(getByText('Next').getAttribute('href')).toBe('/prefix/2')
  })

  it('renders a pager for the second page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pager page={2} prefix="prefix" total={3} />
      </MemoryRouter>
    )

    expect(
      ['Previous', 'Next'].map(text => getByText(text).getAttribute('href'))
    ).toEqual(['/prefix', '/prefix/3'])
  })

  it('renders a pager for the last page', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Pager page={3} prefix="prefix" total={3} />
      </MemoryRouter>
    )

    expect(getByText('Previous').getAttribute('href')).toBe('/prefix/2')
  })
})
