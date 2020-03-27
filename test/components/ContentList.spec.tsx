/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react'
import { merge } from 'ramda'
import { render } from '@testing-library/react'
import { Mdx, MdxEdge } from 'generated/types/gatsby'
import { ContentList } from '../../src/components/ContentList'

function createEdge(override: DeepPartial<Mdx>): MdxEdge {
  return {
    node: merge(
      {
        frontmatter: {
          path: '',
          title: '',
        },
      },
      override
    ),
  } as MdxEdge
}

describe('<ContentList />', () => {
  it('renders a list of content links', () => {
    const edges = [
      createEdge({
        frontmatter: { path: '/path/1', title: 'Content 1' },
      }),
      createEdge({
        frontmatter: { path: '/path/2', title: 'Content 2' },
      }),
    ]
    const { getByText } = render(<ContentList edges={edges} />)
    expect(
      ['Content 1', 'Content 2'].map((text) => getByText(text).closest('a')!.getAttribute('href'))
    ).toEqual(['/path/1', '/path/2'])
  })
})
