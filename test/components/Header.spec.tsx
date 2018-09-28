import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { Header } from '../../src/components/Header'

describe('<Header />', () => {
  beforeEach(cleanup)

  it('renders the title', () => {
    const title = 'Test Title'
    const { getByText } = render(<Header title={title} />)
    expect(getByText(title).tagName).toBeTruthy()
  })
})
