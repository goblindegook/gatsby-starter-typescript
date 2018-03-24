import * as React from 'react'
import { shallow } from 'enzyme'
import { merge } from 'ramda'
import { ContentList } from '../ContentList'

function createEdge (override: DeepPartial<MarkdownRemarkEdge>): MarkdownRemarkEdge {
  return merge({
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
  }, override)
}

describe('<ContentList />', () => {
  it('renders a list of content links', () => {
    const edges: ReadonlyArray<MarkdownRemarkEdge> = [
      createEdge({ node: { frontmatter: { path: '/path/1', title: 'Content 1' } } }),
      createEdge({ node: { frontmatter: { path: '/path/2', title: 'Content 2' } } }),
    ]

    const component = shallow(<ContentList edges={edges} />)

    expect(component.find('GatsbyLink').map(e => e.props())).toMatchObject([
      {
        children: 'Content 1',
        to: '/path/1'
      },
      {
        children: 'Content 2',
        to: '/path/2'
      }
    ])
  })
})