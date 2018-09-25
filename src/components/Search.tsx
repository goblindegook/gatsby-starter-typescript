import React, { ChangeEvent } from 'react'
import { Link } from 'gatsby'
import { css, cx } from 'emotion'

function getSearchResults(query: string, language: string): ReadonlyArray<SearchResult> {
  const { index, store } = window.__LUNR__ && window.__LUNR__[language]
  return query ? index.search(query).map(({ ref }) => store[ref]) : []
}

const searchStyle = css`
  width: 12rem;
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
  padding: 0.25rem 0.5rem;

  &:last-child {
    border-bottom: 0;
  }
`

interface SearchProps {
  readonly className?: string
  readonly language: string
}

interface SearchState {
  readonly query: string
  readonly results: ReadonlyArray<SearchResult>
}

export class Search extends React.Component<SearchProps, SearchState> {
  public readonly state: SearchState = {
    query: '',
    results: []
  }

  readonly search = (event: ChangeEvent<{ readonly value: string }>) => {
    const query = event.target.value
    const results = getSearchResults(query, this.props.language)
    this.setState(s => {
      return {
        results,
        query
      }
    })
  }

  render() {
    return (
      <div className={cx(searchStyle, this.props.className)}>
        <input className={inputStyle} type="text" value={this.state.query} onChange={this.search} />
        <ul className={resultListStyle}>
          {this.state.results.map(({ path, title }) => (
            <li key={path} className={resultItemStyle}>
              <Link to={path}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
