import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

const container = css`
  background: navy;
  margin-bottom: 1.45rem;
`

const wrapper = css`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const title = css`
  font-family: sans-serif;
  margin: 0;
`

const TitleLink = styled(Link)`
  color: white;
  text-decoration: none;
`

export const Header = () => (
  <div className={container}>
    <div className={wrapper}>
      <h1 className={title}>
        <TitleLink to="/">Gatsby Starter</TitleLink>
      </h1>
    </div>
  </div>
)
