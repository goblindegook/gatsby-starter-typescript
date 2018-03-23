import * as React from 'react'
import Helmet from 'react-helmet'
import { MarkdownRemark } from '../content/markdown'
import { Site } from '../content/site'

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
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
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
