import * as React from 'react'
import styled from 'react-emotion'
import GatsbyLink from 'gatsby-link'

type PagerProps = {
  readonly prefix: string
  readonly page: number
  readonly total: number
}

function pageUrl(prefix: string, page: number): string {
  return page <= 1 ? `/${prefix}` : `/${prefix}/${page}`
}

const Link = styled(GatsbyLink)`
  background-color: navy;
  border-radius: 3px;
  color: #fff;
  font-family: sans-serif;
  margin: 0 1rem 0 0;
  padding: 0.25rem 0.5rem;
  text-decoration: none;
`

export const Pager = ({ prefix, page, total }: PagerProps) => (
  <div>
    {page > 1 && <Link to={pageUrl(prefix, page - 1)}>Previous</Link>}
    {page < total && <Link to={pageUrl(prefix, page + 1)}>Next</Link>}
  </div>
)
