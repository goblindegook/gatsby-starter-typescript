import React from 'react'
import { css, cx } from 'react-emotion'

type ContentBodyProps = {
  readonly className?: string
  readonly html: string
}

const content = css`
  a {
    color: red;
  }
`

export const ContentBody = ({ className, html }: ContentBodyProps) => (
  <div className={cx(content, className)} dangerouslySetInnerHTML={{ __html: html }} />
)
