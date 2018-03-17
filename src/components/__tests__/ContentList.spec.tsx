import * as React from 'react'
import { configure, shallow } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import { ContentList } from '../ContentList';
import { MarkdownRemarkEdge } from '../../content/markdown'

configure({ adapter: new Adapter() })

function createEdge (path: string, title: string): MarkdownRemarkEdge {
  return {
    node: {
      id: '',
      excerpt: '',
      html: '',
      frontmatter: {
        date: '',
        draft: false,
        path,
        tags: [''],
        title
      }
    }
  }
}

describe('<ContentList />', () => {
  it('renders a list of content links', () => {
    const edges: ReadonlyArray<MarkdownRemarkEdge> = [
      createEdge('/path/1', 'Content 1'),
      createEdge('/path/2', 'Content 2'),
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