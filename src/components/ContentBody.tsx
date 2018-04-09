import * as React from 'react'
import { css } from 'react-emotion'

type ContentBodyProps = {
  readonly html: string
}

const markdown = css`
  a {
    color: red;
  }
`

export const ContentBody = ({ html }: ContentBodyProps) => (
  <div className={markdown} dangerouslySetInnerHTML={{ __html: html }} />
)
