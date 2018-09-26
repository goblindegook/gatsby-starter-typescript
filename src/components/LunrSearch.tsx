import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'
import { Search } from './Search'

const accent = '#ff5700'

const styles = {
  wrapper: css`
    display: inline-block;
  `,
  input: css`
    padding: 0.25rem 0.5rem;
    width: 12rem;
  `,
  list: css`
    background-color: #fff;
    border: 1px solid ${accent};
    display: block;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    width: 12rem;
    z-index: 2;
  `,
  item: css`
    border-bottom: 1px dotted ${accent};
    margin: 0;

    &:last-child {
      border-bottom: 0;
    }
  `,
  link: css`
    display: block;
    padding: 0.25rem 0.5rem;
  `
}

function onSearch(query: string): ReadonlyArray<SearchResult> {
  const { index, store } = window.__LUNR__ && window.__LUNR__.en
  return query ? index.search(query).map(({ ref }) => store[ref]) : []
}

const SearchLink = ({ path, title }: SearchResult) => (
  <Link className={styles.link} to={path}>
    {title}
  </Link>
)

export const LunrSearch = () => (
  <Search
    className={styles.wrapper}
    inputClassName={styles.input}
    listClassName={styles.list}
    itemClassName={styles.item}
    onSearch={onSearch}
    render={SearchLink}
  />
)
