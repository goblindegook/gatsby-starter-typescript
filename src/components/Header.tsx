import React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'
import { Search } from './Search'

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

const searchStyle = css`
  display: inline-block;
`

const inputStyle = css`
  padding: 0.25rem 0.5rem;
  width: 12rem;
`

const resultListStyle = css`
  background-color: #fff;
  border: 1px solid #ff5700;
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  width: 12rem;
  z-index: 2;
`

const resultItemStyle = css`
  border-bottom: 1px dotted #ff5700;
  margin: 0;

  &:last-child {
    border-bottom: 0;
  }
`

const resultLinkStyle = css`
  display: block;
  padding: 0.25rem 0.5rem;
`

const TitleLink = styled(Link)`
  color: #fff;

  &:active,
  &:hover {
    color: #fff;
  }
`

function onSearch(query: string): ReadonlyArray<SearchResult> {
  const { index, store } = window.__LUNR__ && window.__LUNR__.en
  return query ? index.search(query).map(({ ref }) => store[ref]) : []
}

const SearchLink = ({ path, title }: SearchResult) => (
  <Link className={resultLinkStyle} to={path}>
    {title}
  </Link>
)

export const Header = () => (
  <div className={container}>
    <div className={wrapper}>
      <h1 className={title}>
        <TitleLink to="/">Gatsby Starter</TitleLink>
      </h1>
      <Search
        className={searchStyle}
        inputClassName={inputStyle}
        listClassName={resultListStyle}
        itemClassName={resultItemStyle}
        onSearch={onSearch}
        render={SearchLink}
      />
    </div>
  </div>
)
