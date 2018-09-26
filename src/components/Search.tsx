import React, { ChangeEvent } from 'react'

interface SearchProps<T> {
  readonly className?: string
  readonly inputClassName?: string
  readonly listClassName?: string
  readonly itemClassName?: string
  readonly onChange: (query: string) => ReadonlyArray<T>
  readonly render: (result: T) => JSX.Element
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
    return (
      <div className={this.props.className}>
        <input
          type="search"
          className={this.props.inputClassName}
          value={this.state.query}
          onChange={this.search}
        />
        <ul className={this.props.listClassName}>
          {this.state.results.map((result, index) => (
            <li key={index} className={this.props.itemClassName}>
              {this.props.render(result)}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
