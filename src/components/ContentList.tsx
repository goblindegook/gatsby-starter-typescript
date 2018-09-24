import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'

type ContentListProps = {
  readonly edges: MarkdownRemarkEdges
}

const list = css`
  line-height: 1.8;
  list-style: none;
  padding: 0;
  margin: 1rem 0 2rem;
`

const item = css``

export const ContentList = ({ edges }: ContentListProps) => (
  <ul className={list}>
    {edges.map(({ node }) => {
      const { path, title } = node.frontmatter
      return (
        <li className={item} key={path}>
          <Link to={path}>{title}</Link> ({node.frontmatter.date})
        </li>
      )
    })}
  </ul>
)
