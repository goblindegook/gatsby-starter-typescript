import * as React from 'react'
import Helmet from 'react-helmet'
import { ContentBody } from '../components/ContentBody'

type ContentTemplateProps = {
  readonly data: {
    readonly markdownRemark: MarkdownRemark
    readonly site: Site
  }
}

const ContentTemplate = ({ data }: ContentTemplateProps) => {
  const { markdownRemark, site } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <Helmet title={`${frontmatter.title} - ${site.siteMetadata.title}`} />
      <h2>{frontmatter.title}</h2>
      <h3>{frontmatter.date}</h3>
      <ContentBody html={html} />
    </div>
  )
}

export default ContentTemplate

export const pageQuery = graphql`
  query ContentByPath($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
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
