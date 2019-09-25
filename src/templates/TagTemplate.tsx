import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { TagPageQuery, TagPageQueryVariables } from 'generated/types/gatsby'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'
import { Layout } from '../components/Layout'
import { ArchivePageContext } from '../context'

interface TagTemplateProps {
  readonly data: TagPageQuery

  readonly pageContext: ArchivePageContext & TagPageQueryVariables
}

const TagTemplate = (props: TagTemplateProps) => {
  const { edges } = props.data.allMdx
  const { page, prefix, pageTotal, tag } = props.pageContext

  return (
    <Layout>
      <Helmet title={`Content Tagged "${tag}"`} />
      <h2>{`Content tagged with "${tag}"`}</h2>
      <ContentList edges={edges} />
      <Pager page={page} prefix={prefix} total={pageTotal} />
      <hr />
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export default TagTemplate

export const query = graphql`
  query TagPage($tag: String!, $skip: Int!, $limit: Int!) {
    allMdx(
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
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
