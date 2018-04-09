import * as React from 'react'
import { render } from 'react-testing-library'
import { ContentBody } from '../ContentBody'

describe('<ContentBody />', () => {
  it('renders a list of content links', () => {
    const html = '<h1 id="test">OK</h1>'

    const { container } = render(<ContentBody html={html} />)

    expect(container.querySelector('#test')!.innerHTML).toBe('OK')
  })
})
