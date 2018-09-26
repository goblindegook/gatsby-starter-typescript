import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'
import { LunrSearch } from './LunrSearch'

const container = css`
  background: #ff5700;
  margin-bottom: 1.45rem;
`

const wrapper = css`
  display: grid;
  grid-template-columns: auto 10rem;
  grid-template-rows: auto;
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const title = css`
  margin: 0;
  display: inline-block;
`

const TitleLink = styled(Link)`
  color: #fff;

  &:active,
  &:hover {
    color: #fff;
  }
`

export const Header = () => (
  <div className={container}>
    <div className={wrapper}>
      <h1 className={title}>
        <TitleLink to="/">Gatsby Starter</TitleLink>
      </h1>
      <LunrSearch />
    </div>
  </div>
)
