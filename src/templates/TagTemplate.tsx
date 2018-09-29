import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'
import { Layout } from '../components/Layout'

type TagTemplateProps = {
  readonly pageContext: {
    readonly tag?: string
    readonly slug?: string
    readonly group: Edges<Markdown>
    readonly prefix: string
    readonly page: number
    readonly pageTotal: number
    readonly itemTotal: number
  }
  readonly data: {
    readonly allMarkdownRemark: AllMarkdown
    readonly site: Site
  }
}

const TagTemplate = (props: TagTemplateProps) => {
  const { group, page, prefix, pageTotal, tag } = props.pageContext

  return (
    <Layout>
      <Helmet title={`Content Tagged "${tag}"`} />
      <h2>{`Content tagged with "${tag}"`}</h2>
      <ContentList edges={group} />
      <Pager page={page} prefix={prefix} total={pageTotal} />
      <hr />
      <Link to="/tags">All tags</Link>
    </Layout>
  )
}

export default TagTemplate

// FIXME: allMarkdownRemark() {} is being ignored
export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true }, tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
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
