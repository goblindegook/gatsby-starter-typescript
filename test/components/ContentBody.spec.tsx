import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { ContentBody } from '../../src/components/ContentBody'

describe('<ContentBody />', () => {
  beforeEach(cleanup)

  it('renders a list of content links', () => {
    const { container } = render(<ContentBody html="OK" />)
    expect(container.querySelector('div')!.innerHTML).toBe('OK')
  })

  it('renders a custom className', () => {
    const className = 'test'
    const { container } = render(<ContentBody className={className} html="OK" />)
    expect(container.querySelector('div')!.classList).toContain(className)
  })
})
