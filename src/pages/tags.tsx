import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { kebabCase } from 'lodash'
import { Layout } from '../components/Layout'

interface TagsPageProps {
  readonly data: {
    readonly allMdx: AllMarkdown & {
      readonly group: readonly {
        readonly fieldValue: string
        readonly totalCount: number
      }[]
    }
    readonly site: Site
  }
}

const TagsPage = (props: TagsPageProps) => {
  const { allMdx } = props.data

  return (
    <Layout>
      <Helmet title="Tags" />
      <div>
        <h2>Tags</h2>
        <ul>
          {allMdx.group.map(tag => (
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
    allMdx(limit: 2000, filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
