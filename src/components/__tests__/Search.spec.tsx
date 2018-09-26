import React from 'react'
import { render, cleanup } from 'react-testing-library'
import { change } from '../../../__helpers__/dom'
import { Search } from '../Search'

describe('Search', () => {
  beforeEach(cleanup)

  it('renders the search results provided by the onSearch function', () => {
    const results: ReadonlyArray<any> = ['foo', 'bar']
    const value = 'query'
    const onSearchMock = jest.fn(() => results)
    const renderMock = (result: any) => <span>{result}</span>

    const { getByText, getByLabelText } = render(
      <Search onChange={onSearchMock} renderLink={renderMock} />
    )

    change(getByLabelText('Search'), value)

    expect(onSearchMock).toHaveBeenCalledWith(value)
    expect(getByText('foo')).toBeTruthy()
    expect(getByText('bar')).toBeTruthy()
  })

  it('renders a footer', () => {
    const onSearchMock = jest.fn(() => [])
    const renderMock = jest.fn(() => <span />)

    const { getByText, getByLabelText } = render(
      <Search
        onChange={onSearchMock}
        renderLink={renderMock}
        renderFooter={() => <div>This is the footer.</div>}
      />
    )

    change(getByLabelText('Search'), 'query')

    expect(getByText('This is the footer.')).toBeTruthy()
  })
})
