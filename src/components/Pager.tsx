import * as React from 'react'
import GatsbyLink from 'gatsby-link'

type PagerProps = {
  readonly prefix: string
  readonly page: number
  readonly total: number
}

function isFirst (page: number): boolean {
  return page <= 1
}

function isLast (page: number, total: number): boolean {
  return page >= total
}

function previousUrl (prefix: string, page: number): string {
  return isFirst(page - 1) ? `/${prefix}` : `/${prefix}/${page - 1}`
}

function nextUrl (prefix: string, page: number): string {
  return `/${prefix}/${page + 1}`
}

export const Pager = ({ prefix, page, total }: PagerProps) => (
  <div>
    {!isFirst(page) && <GatsbyLink to={previousUrl(prefix, page)}>Previous</GatsbyLink>}
    {' '}
    {!isLast(page, total) && <GatsbyLink to={nextUrl(prefix, page)}>Next</GatsbyLink>}
  </div>
)