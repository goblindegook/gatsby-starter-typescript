import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { kebabCase } from 'lodash'
import { Layout } from '../components/Layout'

type TagsPageProps = {
  readonly data: {
    readonly allMarkdownRemark: AllMarkdown & {
      readonly group: ReadonlyArray<{
        readonly fieldValue: string
        readonly totalCount: number
      }>
    }
    readonly site: Site
  }
}

const TagsPage = (props: TagsPageProps) => {
  const { allMarkdownRemark } = props.data

  return (
    <Layout>
      <Helmet title="Tags" />
      <div>
        <h2>Tags</h2>
        <ul>
          {allMarkdownRemark.group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>{tag.fieldValue}</Link> (
              {tag.totalCount})
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(limit: 2000, filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
