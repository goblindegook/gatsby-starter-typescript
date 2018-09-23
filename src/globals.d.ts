declare type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

declare type Site = {
  readonly siteMetadata: {
    readonly title: string
    readonly author: string
  }
}

declare type MarkdownRemark = {
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

declare type MarkdownRemarkEdge = { readonly node: MarkdownRemark }

declare type MarkdownRemarkEdges = ReadonlyArray<MarkdownRemarkEdge>

declare type AllMarkdownRemark = {
  readonly totalCount: number
  readonly edges: MarkdownRemarkEdges
}
