import React, { useState } from 'react'
import { useOutside } from '@pacote/react-use-outside'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import lunr from 'lunr'

declare global {
  interface Window {
    __LUNR__: {
      readonly [language: string]: {
        readonly index: lunr.Index
        readonly store: {
          readonly [key: string]: any
        }
      }
    }
  }
}

interface SearchResult extends lunr.Index.Result {
  readonly title: string
  readonly path: string
}

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
  `,
  link: css`
    display: block;
    padding: 0.25rem 0.5rem;
  `,
  footer: css`
    font-size: 0.75rem;
    margin: 0;
    padding: 0.5rem;
    border: 0;
  `,
  hidden: css`
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `,
}

const search = (query: string): readonly SearchResult[] => {
  const { index, store } = window.__LUNR__ && window.__LUNR__.en
  return query ? index.search(query).map(({ ref }) => store[ref]) : []
}

interface LunrSearchProps {
  readonly limit?: number
}

export const LunrSearch = ({ limit }: LunrSearchProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<readonly SearchResult[]>([])
  const [isActive, setActive] = useState(false)

  const ref = useOutside<HTMLDivElement>('click', () => {
    setActive(false)
  })

  return (
    <div ref={ref} css={styles.wrapper}>
      <label>
        <span css={styles.hidden}>Search</span>
        <input
          type="search"
          css={styles.input}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setResults(search(event.target.value))
            setActive(true)
          }}
        />
      </label>
      {isActive ? (
        <ul css={styles.list}>
          {results.slice(0, limit).map((result, index) => (
            <li key={index} css={styles.item}>
              <Link css={styles.link} to={result.path}>
                {result.title}
              </Link>
            </li>
          ))}
          <li css={styles.footer}>
            Showing {limit ? `${Math.min(limit, results.length)} of` : null} {results.length}{' '}
            {results.length === 1 ? 'result' : 'results'}.
          </li>
        </ul>
      ) : null}
    </div>
  )
}
