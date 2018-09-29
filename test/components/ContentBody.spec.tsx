import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { ContentBody } from '../../src/components/ContentBody'

describe('<ContentBody />', () => {
  beforeEach(cleanup)

  it('renders a list of content links', () => {
    const content = 'Test content.'
    const { getByText } = render(<ContentBody html={content} />)
    expect(getByText(content)).toBeTruthy()
  })

  it('renders a custom className', () => {
    const content = 'Test content.'
    const className = 'test'
    const { getByText } = render(<ContentBody className={className} html={content} />)
    expect(getByText(content)).toHaveClass(className)
  })
})
