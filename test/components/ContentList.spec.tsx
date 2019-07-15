import React from 'react'
import { merge } from 'ramda'
import { render } from '@testing-library/react'
import { ContentList } from '../../src/components/ContentList'

function createEdge(override: DeepPartial<Edge<Markdown>>): Edge<Markdown> {
  return merge(
    {
      node: {
        id: '',
        excerpt: '',
        code: {
          body: ''
        },
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
  ) as Edge<Markdown>
}

describe('<ContentList />', () => {
  it('renders a list of content links', () => {
    const edges: Edges<Markdown> = [
      createEdge({
        node: {
          frontmatter: { path: '/path/1', title: 'Content 1' }
        }
      }),
      createEdge({
        node: {
          frontmatter: { path: '/path/2', title: 'Content 2' }
        }
      })
    ]
    const { getByText } = render(<ContentList edges={edges} />)
    expect(['Content 1', 'Content 2'].map(text => getByText(text).getAttribute('href'))).toEqual([
      '/path/1',
      '/path/2'
    ])
  })
})
