import * as React from "react"
import { Helmet } from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import { AllMarkdownRemark } from '../content/markdown'

type IndexPageProps = {
  readonly data: {
    readonly allMarkdownRemark: AllMarkdownRemark
  }
}

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
        .filter(({ node }) => !node.frontmatter.draft)
        .map(({ node }) => (
          <li>
            <GatsbyLink key={node.id} to={node.frontmatter.path}>
              {node.frontmatter.title}
            </GatsbyLink> ({node.frontmatter.date})
          </li>
        ))
    }</ul>
    <GatsbyLink to="/tags">All tags</GatsbyLink>
  </div>
)

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
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