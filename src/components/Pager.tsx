import * as React from 'react'
import styled from 'styled-components'
import GatsbyLink from 'gatsby-link'

type PagerProps = {
  readonly prefix: string
  readonly page: number
  readonly total: number
}

function pageUrl (prefix: string, page: number): string {
  return page <= 1 ? `/${prefix}` : `/${prefix}/${page}`
}

const Link = styled(GatsbyLink)`
  background-color: navy;
  border-radius: 3px;
  color: #fff;
  font-family: sans-serif;
  margin: 0 1rem 0 0;
  padding: .25rem .5rem;
`

export const Pager = ({ prefix, page, total }: PagerProps) => (
  <div>
    {page > 1 && <GatsbyLink to={pageUrl(prefix, page - 1)}>Previous</GatsbyLink>}
    {page < total && <GatsbyLink to={pageUrl(prefix, page + 1)}>Next</GatsbyLink>}
  </div>
)