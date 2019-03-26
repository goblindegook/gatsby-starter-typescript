import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Layout } from '../components/Layout'

const MDXRenderer = require('gatsby-mdx/mdx-renderer')

type ContentTemplateProps = {
  readonly data: {
    readonly mdx: Markdown
    readonly site: Site
  }
}

const ContentTemplate = ({ data }: ContentTemplateProps) => {
  const {
    mdx: { frontmatter, code }
  } = data

  return (
    <Layout>
      <Helmet title={`${frontmatter.title}`} />
      <h2>{frontmatter.title}</h2>
      <h3>{frontmatter.date}</h3>
      <MDXRenderer>{code.body}</MDXRenderer>
    </Layout>
  )
}

export default ContentTemplate

export const pageQuery = graphql`
  query($path: String!) {
    mdx(frontmatter: { draft: { ne: true }, path: { eq: $path } }) {
      code {
        body
      }
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        path
        title
      }
    }
  }
`
