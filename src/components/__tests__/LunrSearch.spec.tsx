import 'jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library'
import lunr from 'lunr'
import { LunrSearch } from '../LunrSearch'

function setupLunr(store: SearchStore): void {
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

function cleanupLunr(): void {
  // tslint:disable no-object-mutation no-delete
  delete (global as any).__LUNR__
  // tslint:enable no-object-mutation no-delete
}

describe('LunrSearch', () => {
  beforeEach(cleanup)
  beforeEach(cleanupLunr)

  it('allows searching the Lunr index and displays results', () => {
    setupLunr({
      '1': { path: '/1', title: 'Number One' },
      '2': { path: '/2', title: 'Number Two' }
    })

    const { getByText, queryByText, container } = render(<LunrSearch />)
    fireEvent.change(container.querySelector('[type="search"]') as HTMLElement, {
      target: { value: 'two' }
    })

    expect(queryByText('Number One')).not.toBeInTheDocument()
    expect(getByText('Number Two')).toHaveAttribute('href', '/2')
  })
})
