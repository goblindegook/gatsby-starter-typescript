import * as React from 'react'
import { Helmet } from 'react-helmet'
import { css } from 'react-emotion'
import { Header } from '../components/Header'
import 'normalize.css'
import 'prismjs/themes/prism-okaidia.css'

type TemplateWrapperProps = {
  readonly children: any
}

const wrapper = css`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

const TemplateWrapper = ({ children }: TemplateWrapperProps) => (
  <div>
    <Helmet
      title="gatsby-starter-typescript"
      meta={[
        {
          name: 'description',
          content: 'Demo site for a Gatsby Starter in TypeScript'
        },
        {
          name: 'keywords',
          content: 'gatsby, gatsbyjs, sample, demo, typescript'
        }
      ]}
    />
    <Header />
    <div className={wrapper}>{children()}</div>
  </div>
)

export default TemplateWrapper
