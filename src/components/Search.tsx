import React, { ChangeEvent, ReactNode } from 'react'
import { css } from 'emotion'

const styles = {
  hidden: css`
    position: absolute;
    left: -10000px;
    top: auto;
    width: 1px;
    height: 1px;
    overflow: hidden;
  `
}

export type SearchFooterProps<T> = {
  readonly limit?: number
  readonly results: ReadonlyArray<T>
}

interface SearchProps<T> {
  readonly className?: string
  readonly inputClassName?: string
  readonly listClassName?: string
  readonly itemClassName?: string
  readonly limit?: number
  readonly onChange: (query: string) => ReadonlyArray<T>
  readonly renderLink: (result: T) => ReactNode
  readonly renderFooter?: (props: SearchFooterProps<T>) => ReactNode
}

interface SearchState<T> {
  readonly query: string
  readonly results: ReadonlyArray<T>
}

export class Search<T> extends React.Component<SearchProps<T>, SearchState<T>> {
  public readonly state: SearchState<T> = {
    query: '',
    results: []
  }

  readonly search = (event: ChangeEvent<{ readonly value: string }>) => {
    const query = event.target.value
    const results = this.props.onChange(query)
    this.setState(s => {
      return {
        results,
        query
      }
    })
  }

  render() {
    const {
      className,
      inputClassName,
      listClassName,
      itemClassName,
      limit,
      renderLink,
      renderFooter
    } = this.props

    return (
      <div className={className}>
        <label>
          <span className={styles.hidden}>Search</span>
          <input
            type="search"
            className={inputClassName}
            value={this.state.query}
            onChange={this.search}
          />
        </label>
        {this.state.query ? (
          <ul className={listClassName}>
            {this.state.results.slice(0, limit).map((result, index) => (
              <li key={index} className={itemClassName}>
                {renderLink(result)}
              </li>
            ))}
            <li className={itemClassName}>
              {renderFooter ? renderFooter({ limit, results: this.state.results }) : null}
            </li>
          </ul>
        ) : null}
      </div>
    )
  }
}
