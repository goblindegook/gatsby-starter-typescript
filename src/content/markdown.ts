export type MarkdownContent = {
  readonly id: string
  readonly excerpt: string
  readonly html: string
  readonly frontmatter: {
    readonly path: string
    readonly title: string
    readonly date: string
    readonly draft: string
  }
}