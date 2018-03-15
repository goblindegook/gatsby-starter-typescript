import * as React from 'react'
import { AllMarkdownRemark } from '../content/markdown'
import GatsbyLink from "gatsby-link"

type TagTemplateProps = {
  readonly pathContext: {
    readonly tag?: string
  }
  readonly data: {
    readonly allMarkdownRemark: AllMarkdownRemark
  }
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: {
          draft: { ne: true }
          tags: { in: [$tag] }
        }
      }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            path
          }
        }
      }
    }
  }
`

const TagTemplate = ({ data, pathContext }: TagTemplateProps) => {
  const { tag } = pathContext
  const { totalCount, edges } = data.allMarkdownRemark

  return (
    <div>
      <h1>{`${totalCount} ${totalCount === 1 ? 'item' : 'items'} tagged with "${tag}"`}</h1>
      <ul>
        {edges.map(({ node }) => {
          const { path, title } = node.frontmatter;
          return (
            <li key={path}>
              <GatsbyLink to={path}>{title}</GatsbyLink>
            </li>
          );
        })}
      </ul>
      <GatsbyLink to="/tags">All tags</GatsbyLink>
    </div>
  )
}

export default TagTemplate