import React from 'react'

type ContentBodyProps = {
  readonly className?: string
  readonly html?: string
}

export const ContentBody = ({ className, html = '' }: ContentBodyProps) => (
  <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
)
