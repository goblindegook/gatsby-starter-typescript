import React from 'react'
import { css } from '@emotion/core'
import { IndexPageQuery, TagPageQuery } from 'generated/types/gatsby'
import { Link } from 'gatsby'

interface ContentListProps {
  readonly edges: IndexPageQuery['allMdx']['edges'] | TagPageQuery['allMdx']['edges']
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
