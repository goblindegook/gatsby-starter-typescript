import React from 'react'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'
import { Layout } from '../components/Layout'

interface IndexPageProps {
  readonly data: {
    readonly allMdx: AllMarkdown
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
