import * as React from 'react'
import GatsbyLink from 'gatsby-link'

export const IndexPage = () => (
  <div>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <p><GatsbyLink to="/another-page/">Go to another page</GatsbyLink></p>
    <p><GatsbyLink to="/markdown/">Go to a page generated from Markdown content</GatsbyLink></p>
  </div>
)

export default IndexPage
