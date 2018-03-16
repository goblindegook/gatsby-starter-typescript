import * as React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Header } from '../components/Header'
import './index.css'
import 'prismjs/themes/prism-okaidia.css'

type TemplateWrapperProps = {
  readonly children: any
}

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

const TemplateWrapper = ({ children }: TemplateWrapperProps) => (
  <div>
    <Helmet
      title='gatsby-starter-typescript'
      meta={[
        { name: 'description', content: 'Demo site for a Gatsby Starter in TypeScript' },
        { name: 'keywords', content: 'gatsby, gatsbyjs, sample, demo, typescript' }
      ]}
    />
    <Header />
    <Wrapper>
      {children()}
    </Wrapper>
  </div>
)

export default TemplateWrapper
