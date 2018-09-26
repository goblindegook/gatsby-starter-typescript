import 'jest-dom/extend-expect'
import React from 'react'
import { render, cleanup } from 'react-testing-library'
import lunr from 'lunr'
import { change } from '../../../__helpers__/dom'
import { LunrSearch } from '../LunrSearch'

function setupLunrIndex(store: SearchStore): void {
  // tslint:disable no-object-mutation
  ;(global as any).__LUNR__ = {
    en: {
      index: lunr(function() {
        this.field('path')
        this.field('title')
        Object.entries(store).map(([id, document]) => this.add({ id, ...document }))
      }),
      store
    }
  }
  // tslint:enable no-object-mutation
}

function cleanupLunrIndex(): void {
  // tslint:disable no-object-mutation no-delete
  delete (global as any).__LUNR__
  // tslint:enable no-object-mutation no-delete
}

describe('LunrSearch', () => {
  beforeEach(cleanup)
  beforeEach(cleanupLunrIndex)

  it('displays search results from the global Lunr index', () => {
    setupLunrIndex({
      '1': { path: '/1', title: 'Number One' },
      '2': { path: '/2', title: 'Number Two' }
    })

    const { getByText, queryByText, getByLabelText } = render(<LunrSearch />)
    change(getByLabelText('Search'), 'two')

    expect(queryByText('Number One')).not.toBeInTheDocument()
    expect(getByText('Number Two')).toHaveAttribute('href', '/2')
    expect(getByText('Showing 1 result.')).toBeTruthy()
  })

  it('limit number of search results displayed', () => {
    setupLunrIndex({
      '1': { path: '/1', title: 'Number One' },
      '2': { path: '/2', title: 'Number Two' },
      '3': { path: '/2', title: 'Number Three' }
    })

    const { getByText, getAllByText, getByLabelText } = render(<LunrSearch limit={2} />)
    change(getByLabelText('Search'), 'number')

    expect(getAllByText(/Number/)).toHaveLength(2)
    expect(getByText('Showing 2 of 3 results.')).toBeTruthy()
  })

  it('shows the number of results if limit is greater', () => {
    setupLunrIndex({
      '1': { path: '/1', title: 'Number One' },
      '2': { path: '/2', title: 'Number Two' },
      '3': { path: '/2', title: 'Number Three' }
    })

    const { getByText, getByLabelText } = render(<LunrSearch limit={9999} />)
    change(getByLabelText('Search'), 'number')

    expect(getByText('Showing 3 of 3 results.')).toBeTruthy()
  })
})
