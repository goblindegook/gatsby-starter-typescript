import React from 'react'
import { Link, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { IndexPageQuery, IndexPageQueryVariables } from 'generated/types/gatsby'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'
import { Layout } from '../components/Layout'
import { ArchivePageContext } from '../context'

interface IndexPageProps {
  readonly data: IndexPageQuery

  readonly pageContext: ArchivePageContext & IndexPageQueryVariables
}

const IndexTemplate = ({ data, pageContext }: IndexPageProps) => (
  <Layout>
    <Helmet
      meta={[
        { name: 'description', content: 'Sample' },
        { name: 'keywords', content: 'sample, something' },
      ]}
    />
    <h2>All Markdown Content</h2>
    <ContentList edges={data.allMdx.edges} />
    <Pager page={pageContext.page} prefix={pageContext.prefix} total={pageContext.pageTotal} />
    <hr />
    <Link to="/tags">All tags</Link>
  </Layout>
)

export default IndexTemplate

export const query = graphql`
  query IndexPage($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            path
            title
          }
        }
      }
    }
  }
`
