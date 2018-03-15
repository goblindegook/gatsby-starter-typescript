import * as React from "react"
import GatsbyLink from 'gatsby-link'
import { MarkdownContent } from '../content/markdown'

type ContentLinkProps = {
  readonly content: MarkdownContent
}

export const ContentLink = ({ content }: ContentLinkProps) => (
  <div>
    <GatsbyLink to={content.frontmatter.path}>
      {content.frontmatter.title} ({content.frontmatter.date})
    </GatsbyLink>
  </div>
);
