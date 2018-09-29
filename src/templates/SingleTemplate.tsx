import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { ContentBody } from '../components/ContentBody'
import { Layout } from '../components/Layout'

type ContentTemplateProps = {
  readonly data: {
    readonly markdownRemark: Markdown
    readonly site: Site
  }
}

const ContentTemplate = ({ data }: ContentTemplateProps) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Helmet title={`${frontmatter.title}`} />
      <h2>{frontmatter.title}</h2>
      <h3>{frontmatter.date}</h3>
      <ContentBody html={html} />
    </Layout>
  )
}

export default ContentTemplate

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { draft: { ne: true }, path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
