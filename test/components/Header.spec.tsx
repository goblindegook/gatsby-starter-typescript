import React from 'react'
import { render } from '@testing-library/react'
import { Header } from '../../src/components/Header'

describe('<Header />', () => {
  it('renders the title', () => {
    const title = 'Test Title'
    const { getByText } = render(<Header title={title} />)
    expect(getByText(title).tagName).toBeTruthy()
  })
})
