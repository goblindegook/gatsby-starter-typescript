import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { kebabCase } from 'lodash'
import { TagListPageQuery } from 'generated/types/gatsby'
import { Layout } from '../components/Layout'

interface TagsPageProps {
  readonly data: TagListPageQuery
}

const TagsPage = ({ data }: TagsPageProps) => {
  return (
    <Layout>
      <Helmet title="Tags" />
      <div>
        <h2>Tags</h2>
        <ul>
          {data.allMdx.group.map(({ tag, totalCount }) => (
            <li key={tag}>
              <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link> ({totalCount})
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsPage

export const query = graphql`
  query TagListPage {
    allMdx(filter: { frontmatter: { draft: { ne: true } } }) {
      group(field: frontmatter___tags) {
        tag: fieldValue
        totalCount
      }
    }
  }
`
