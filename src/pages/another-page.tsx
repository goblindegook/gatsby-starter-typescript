import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/Layout'

const SecondPage = () => (
  <Layout>
    <h2>Hi from the second page</h2>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
