import React from 'react'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

interface ContentListProps {
  readonly edges: Edges<Markdown>
}

const list = css`
  line-height: 1.8;
  list-style: none;
  padding: 0;
  margin: 1rem 0 2rem;
`

const item = css``

export const ContentList = ({ edges }: ContentListProps) => (
  <ul css={list}>
    {edges.map(({ node }) => {
      const { path, title } = node.frontmatter
      return (
        <li css={item} key={path}>
          <Link to={path}>{title}</Link> ({node.frontmatter.date})
        </li>
      )
    })}
  </ul>
)
