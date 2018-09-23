import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import { css } from 'react-emotion'
import { Header } from './Header'
import 'normalize.css'
import 'prismjs/themes/prism-okaidia.css'

const wrapper = css`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 1.0875rem 1.45rem;
`

type LayoutProps = {
  readonly children?: ReadonlyArray<React.ReactNode>
}

export const Layout = ({ children }: LayoutProps) => (
  <StaticQuery
    query={graphql`
      {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Helmet
          titleTemplate={`%s - ${data.site.siteMetadata.title}`}
          defaultTitle={data.site.siteMetadata.title}
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
        <div className={wrapper}>{children}</div>
      </>
    )}
  />
)
