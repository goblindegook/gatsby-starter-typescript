import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { Search } from '../Search'

describe('Search', () => {
  beforeEach(cleanup)

  it('calls onSearch with query value', () => {
    const onSearchMock = jest.fn(() => [])
    const renderMock = jest.fn(() => <span />)
    const value = 'query'

    const { container } = render(<Search onChange={onSearchMock} render={renderMock} />)

    const input = container.querySelector('[type="search"]') as HTMLInputElement
    fireEvent.change(input, { target: { value } })

    expect(onSearchMock).toHaveBeenCalledWith(value)
  })

  it('renders the search results provided by the onSearch function', () => {
    const results: ReadonlyArray<any> = ['foo', 'bar']
    const onSearchMock = jest.fn(() => results)
    const renderMock = (result: any) => <span>{result}</span>

    const { getByText, container } = render(<Search onChange={onSearchMock} render={renderMock} />)

    const input = container.querySelector('[type="search"]') as HTMLInputElement
    fireEvent.change(input, { target: { value: 'query' } })

    expect(getByText('foo')).toBeTruthy()
    expect(getByText('bar')).toBeTruthy()
  })
})
