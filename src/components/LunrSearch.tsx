import React from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'
import { Search, SearchFooterProps } from './Search'

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
      font-size: 0.75rem;
      padding: 0.5rem;
      border: 0;
    }
  `,
  link: css`
    display: block;
    padding: 0.25rem 0.5rem;
  `
}

const onChange = (query: string): ReadonlyArray<SearchResult> => {
  const { index, store } = window.__LUNR__ && window.__LUNR__.en
  return query ? index.search(query).map(({ ref }) => store[ref]) : []
}

const SearchLink = ({ path, title }: SearchResult) => (
  <Link className={styles.link} to={path}>
    {title}
  </Link>
)

const SearchFooter = ({ limit, results }: SearchFooterProps<SearchResult>) => (
  <span>
    Showing {limit ? `${Math.min(limit, results.length)} of` : null} {results.length}{' '}
    {results.length === 1 ? 'result' : 'results'}.
  </span>
)

type LunrSearchProps = {
  readonly limit?: number
}

export const LunrSearch = ({ limit }: LunrSearchProps) => (
  <Search
    className={styles.wrapper}
    inputClassName={styles.input}
    listClassName={styles.list}
    itemClassName={styles.item}
    limit={limit}
    onChange={onChange}
    renderLink={SearchLink}
    renderFooter={SearchFooter}
  />
)
