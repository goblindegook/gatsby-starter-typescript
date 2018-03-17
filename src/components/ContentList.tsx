import * as React from 'react'
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'
import { MarkdownRemarkEdges } from '../content/markdown'

type ContentListProps = {
  readonly edges: MarkdownRemarkEdges
}

const List = styled.ul`
  font-family: sans-serif;
  line-height: 1.8;
  list-style: none;
  padding: 0;
`

const Item = styled.li`
`

export const ContentList = ({ edges }: ContentListProps) => (
  <List>
    {edges.map(({ node }) => {
      const { path, title } = node.frontmatter
      return (
        <Item key={path}>
          <GatsbyLink to={path}>{title}</GatsbyLink>
          {' '}
          ({node.frontmatter.date})
        </Item>
      )
    })}
  </List>
)

export default ContentList
