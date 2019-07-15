import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { IndexPage } from '../../src/pages/index'

describe('IndexPage', () => {
  it('renders correctly', () => {
    const { getByText } = render(<IndexPage />)

    expect(getByText('Go to another page')).toHaveAttribute('href', '/another-page/')
    expect(getByText('See content generated from Markdown files')).toHaveAttribute('href', '/all/')
  })
})
