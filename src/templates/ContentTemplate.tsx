import * as React from 'react'

type TemplateProps = {
  readonly data: {
    readonly markdownRemark: {
      readonly frontmatter: {
        readonly title: string
        readonly date: string
        readonly path: string
      }
      readonly html: string
    }
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`

const ContentTemplate = ({ data }: TemplateProps) => {
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