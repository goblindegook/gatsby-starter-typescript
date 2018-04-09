import * as React from 'react'
import Helmet from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'

type TagTemplateProps = {
  readonly pathContext: {
    readonly tag?: string
    readonly slug?: string
    readonly group: ReadonlyArray<MarkdownRemarkEdge>
    readonly prefix: string
    readonly page: number
    readonly pageTotal: number
    readonly itemTotal: number
  }
  readonly data: {
    readonly allMarkdownRemark: AllMarkdownRemark
    readonly site: Site
  }
}

const TagTemplate = (props: TagTemplateProps) => {
  const { group, page, prefix, pageTotal, tag } = props.pathContext
  const { site } = props.data

  return (
    <div>
      <Helmet title={`Content Tagged "${tag}" - ${site.siteMetadata.title}`} />
      <h2>{`Content tagged with "${tag}"`}</h2>
      <ContentList edges={group} />
      <Pager page={page} prefix={prefix} total={pageTotal} />
      <hr />
      <GatsbyLink to="/tags">All tags</GatsbyLink>
    </div>
  )
}

export default TagTemplate

// FIXME: allMarkdownRemark() {} is being ignored
export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
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
