import * as React from 'react'
import { Helmet } from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'

type IndexPageProps = {
  readonly data: {
    readonly allMarkdownRemark: AllMarkdownRemark
    readonly site: Site
  }
  readonly pathContext: {
    readonly group: ReadonlyArray<MarkdownRemarkEdge>
    readonly prefix: string
    readonly page: number
    readonly pageTotal: number
    readonly itemTotal: number
  }
}

const IndexTemplate = (props: IndexPageProps) => (
  <div>
    <Helmet
      title={props.data.site.siteMetadata.title}
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <h2>All Markdown Content</h2>
    <ContentList edges={props.pathContext.group} />
    <Pager
      page={props.pathContext.page}
      prefix={props.pathContext.prefix}
      total={props.pathContext.pageTotal}
    />
    <hr />
    <GatsbyLink to="/tags">All tags</GatsbyLink>
  </div>
)

export default IndexTemplate

// FIXME: allMarkdownRemark() {} is being ignored
export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
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
            path
            title
          }
        }
      }
    }
  }
`
