import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

interface PagerProps {
  readonly prefix: string
  readonly page: number
  readonly total: number
}

function pageUrl(prefix: string, page: number): string {
  return page <= 1 ? `/${prefix}` : `/${prefix}/${page}`
}

const NavLink = styled(Link)`
  background-color: #ff5700;
  border-radius: 3px;
  color: #fff;
  font-family: sans-serif;
  margin: 0 1rem 0 0;
  padding: 0.25rem 0.5rem;
  text-decoration: none;

  &:active,
  &:hover {
    color: #fff;
  }
`

export const Pager = ({ prefix, page, total }: PagerProps) => (
  <div>
    {page > 1 && <NavLink to={pageUrl(prefix, page - 1)}>Previous</NavLink>}
    {page < total && <NavLink to={pageUrl(prefix, page + 1)}>Next</NavLink>}
  </div>
)
