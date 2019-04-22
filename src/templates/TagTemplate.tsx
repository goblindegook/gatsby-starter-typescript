import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { ContentList } from '../components/ContentList'
import { Pager } from '../components/Pager'
import { Layout } from '../components/Layout'

interface TagTemplateProps {
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
    readonly allMdx: AllMarkdown
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
