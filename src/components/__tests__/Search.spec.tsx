import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import { Search } from '../Search'

describe('Search', () => {
  beforeEach(cleanup)

  it('renders the search results provided by the onSearch function', () => {
    const results: ReadonlyArray<any> = ['foo', 'bar']
    const value = 'query'
    const onSearchMock = jest.fn(() => results)
    const renderMock = (result: any) => <span>{result}</span>

    const { getByText, getByLabelText } = render(
      <Search onChange={onSearchMock} render={renderMock} />
    )

    fireEvent.change(getByLabelText('Search'), { target: { value } })

    expect(onSearchMock).toHaveBeenCalledWith(value)
    expect(getByText('foo')).toBeTruthy()
    expect(getByText('bar')).toBeTruthy()
  })
})
