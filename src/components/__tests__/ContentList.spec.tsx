import React from 'react'
import { merge } from 'ramda'
import { render, cleanup } from 'react-testing-library'
import { ContentList } from '../ContentList'

function createEdge(override: DeepPartial<MarkdownRemarkEdge>): MarkdownRemarkEdge {
  return merge(
    {
      node: {
        id: '',
        excerpt: '',
        html: '',
        frontmatter: {
          date: '',
          draft: false,
          path: '',
          tags: [],
          title: ''
        }
      }
    },
    override
  )
}

describe('<ContentList />', () => {
  beforeEach(cleanup)

  it('renders a list of content links', () => {
    const edges: ReadonlyArray<MarkdownRemarkEdge> = [
      createEdge({
        node: { frontmatter: { path: '/path/1', title: 'Content 1' } }
      }),
      createEdge({
        node: { frontmatter: { path: '/path/2', title: 'Content 2' } }
      })
    ]
    const { getByText } = render(<ContentList edges={edges} />)
    expect(['Content 1', 'Content 2'].map(text => getByText(text).getAttribute('href'))).toEqual([
      '/path/1',
      '/path/2'
    ])
  })
})
