import React from 'react'
import { graphql, Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'
import { Layout } from '../components/Layout'

type IndexPageProps = {
  readonly data: {
    readonly allMarkdownRemark: AllMarkdown
    readonly site: Site
  }
  readonly pageContext: {
    readonly group: Edges<Markdown>
    readonly prefix: string
    readonly page: number
    readonly pageTotal: number
    readonly itemTotal: number
  }
}

const IndexTemplate = (props: IndexPageProps) => (
  <Layout>
    <Helmet
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' }
      ]}
    />
    <h2>All Markdown Content</h2>
    <ContentList edges={props.pageContext.group} />
    <Pager
      page={props.pageContext.page}
      prefix={props.pageContext.prefix}
      total={props.pageContext.pageTotal}
    />
    <hr />
    <Link to="/tags">All tags</Link>
  </Layout>
)

export default IndexTemplate

// FIXME: allMarkdownRemark() {} is being ignored
export const pageQuery = graphql`
  {
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
