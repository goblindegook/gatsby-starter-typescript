import * as React from 'react'
import Helmet from 'react-helmet'
import GatsbyLink from 'gatsby-link'
import kebabCase = require('lodash/kebabCase')

type TagsPageProps = {
  readonly data: {
    readonly allMarkdownRemark: AllMarkdownRemark & {
      readonly group: ReadonlyArray<{
        readonly fieldValue: string
        readonly totalCount: number
      }>
    }
    readonly site: Site
  }
}

const TagsPage = (props: TagsPageProps) => {
  const { allMarkdownRemark, site } = props.data

  return (
    <div>
      <Helmet title={`Tags - ${site.siteMetadata.title}`} />
      <div>
        <h1>Tags</h1>
        <ul>
          {allMarkdownRemark.group.map(tag => (
            <li key={tag.fieldValue}>
              <GatsbyLink to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue}
              </GatsbyLink>{' '}
              ({tag.totalCount})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TagsPage

export const pageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
