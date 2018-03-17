export type MarkdownRemark = {
  readonly id: string
  readonly excerpt: string
  readonly html: string
  readonly frontmatter: {
    readonly date: string
    readonly draft: boolean
    readonly path: string
    readonly tags: ReadonlyArray<string>
    readonly title: string
  }
}

export type MarkdownRemarkEdge = { readonly node: MarkdownRemark }

export type MarkdownRemarkEdges = ReadonlyArray<MarkdownRemarkEdge>

export type AllMarkdownRemark = {
  readonly totalCount: number
  readonly edges: MarkdownRemarkEdges
}
