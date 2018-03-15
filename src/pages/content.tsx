import * as React from "react"
import { Helmet } from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import { MarkdownContent } from '../content/markdown'

type IndexPageProps = {
  readonly data: {
    readonly allMarkdownRemark: {
      readonly edges: ReadonlyArray<{
        readonly node: MarkdownContent
      }>
    }
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            draft
            path
            title
          }
        }
      }
    }
  }
`

const IndexPage = ({ data }: IndexPageProps) => (
  <div>
    <Helmet
      title='Gatsby Starter TypeScript'
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <h1>Markdown Content</h1>
    <ul>{
      data.allMarkdownRemark.edges
        .filter((edge) => !edge.node.frontmatter.draft)
        .map(edge => (
          <li>
            <GatsbyLink key={edge.node.id} to={edge.node.frontmatter.path}>
              {edge.node.frontmatter.title} ({edge.node.frontmatter.date})
            </GatsbyLink>
          </li>
        ))
    }</ul>
  </div>
)

export default IndexPage