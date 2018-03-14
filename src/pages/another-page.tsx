import * as React from 'react'
import GatsbyLink from 'gatsby-link'

const SecondPage = () => (
  <div>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <GatsbyLink to="/">Go back to the homepage</GatsbyLink>
  </div>
)

export default SecondPage
