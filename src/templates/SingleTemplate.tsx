import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { SinglePageQuery } from 'generated/types/gatsby'
import { Layout } from '../components/Layout'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const MDXRenderer = require('gatsby-plugin-mdx/mdx-renderer')

interface ContentTemplateProps {
  readonly data: SinglePageQuery
}

const ContentTemplate = ({ data }: ContentTemplateProps) => {
  const {
    mdx: { frontmatter, body },
  } = data

  return (
    <Layout>
      <Helmet title={`${frontmatter.title}`} />
      <h2>{frontmatter.title}</h2>
      <h3>{frontmatter.date}</h3>
      <MDXRenderer>{body}</MDXRenderer>
    </Layout>
  )
}

export default ContentTemplate

export const query = graphql`
  query SinglePage($path: String!) {
    mdx(frontmatter: { draft: { ne: true }, path: { eq: $path } }) {
      body
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        path
        title
      }
    }
  }
`
