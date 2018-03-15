import * as React from 'react'
import { MarkdownRemark } from '../content/markdown'

type ContentTemplateProps = {
  readonly data: {
    readonly markdownRemark: MarkdownRemark
  }
}

export const pageQuery = graphql`
  query ContentByPath($path: String!) {
    markdownRemark(
      frontmatter: {
        draft: { ne: true }
        path: { eq: $path }
      }
    ) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

const ContentTemplate = ({ data }: ContentTemplateProps) => {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <div>
      <h1>{frontmatter.title}</h1>
      <h2>{frontmatter.date}</h2>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

export default ContentTemplate