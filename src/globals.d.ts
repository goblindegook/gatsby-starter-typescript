declare module 'gray-percentage' {
  type Hue = number | 'cool' | 'slate' | 'warm'
  function gray(lightness: number, hue?: Hue, darkBackground?: boolean): string
  export default gray
}

declare module 'typography-breakpoint-constants' {
  export const LARGER_DISPLAY_WIDTH = '1600px'
  export const LARGE_DISPLAY_WIDTH = '1280px'
  export const DEFAULT_WIDTH = '980px'
  export const TABLET_WIDTH = '768px'
  export const MOBILE_WIDTH = '480px'

  export const LARGER_DISPLAY_MEDIA_QUERY = '@media only screen and (max-width:1600px)'
  export const LARGE_DISPLAY_MEDIA_QUERY = '@media only screen and (max-width:1280px)'
  export const DEFAULT_MEDIA_QUERY = '@media only screen and (max-width:980px)'
  export const TABLET_MEDIA_QUERY = '@media only screen and (max-width:768px)'
  export const MOBILE_MEDIA_QUERY = '@media only screen and (max-width:480px)'

  export const MIN_LARGER_DISPLAY_MEDIA_QUERY = '@media (min-width:1600px)'
  export const MIN_LARGE_DISPLAY_MEDIA_QUERY = '@media (min-width:1280px)'
  export const MIN_DEFAULT_MEDIA_QUERY = '@media (min-width:980px)'
  export const MIN_TABLET_MEDIA_QUERY = '@media (min-width:768px)'
  export const MIN_MOBILE_MEDIA_QUERY = '@media (min-width:480px)'
}

declare type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

declare type Site = {
  readonly siteMetadata: {
    readonly title: string
    readonly author: string
  }
}

declare type Edge<T> = { readonly node: T }

declare type Edges<T> = ReadonlyArray<Edge<T>>

declare type Markdown = {
  readonly id: string
  readonly excerpt?: string
  readonly html?: string
  readonly frontmatter: {
    readonly date?: string
    readonly draft?: boolean
    readonly path: string
    readonly tags?: ReadonlyArray<string>
    readonly title?: string
  }
  readonly parent?: {
    readonly absolutePath?: string
    readonly accessTime?: string
    readonly base?: string
    readonly birthTime?: string
    readonly changeTime?: string
    readonly extension?: string
    readonly modifiedTime?: string
    readonly name?: string
    readonly relativeDirectory?: string
    readonly relativePath?: string
    readonly size?: number
    readonly sourceInstanceName?: string
  }
}

declare type AllMarkdown = {
  readonly totalCount: number
  readonly edges: Edges<Markdown>
}

declare namespace __gatsby_lunr {
  namespace Index {
    interface Attributes {
      readonly invertedIndex: object
      readonly documentVectors: { readonly [docRef: string]: Vector }
      readonly tokenSet: TokenSet
      readonly fields: ReadonlyArray<string>
      readonly pipeline: Pipeline
    }

    interface Result {
      readonly ref: string

      readonly score: number

      readonly matchData: MatchData
    }

    type QueryBuilder = (this: Query, query: Query) => void
    type QueryString = string
  }

  class Index {
    constructor(attrs: Index.Attributes)
    readonly search: (queryString: Index.QueryString) => ReadonlyArray<Index.Result>
    readonly query: (fn: Index.QueryBuilder) => ReadonlyArray<Index.Result>
    readonly toJSON: () => object
    static readonly load: (serializedIndex: object) => Index
  }

  class MatchData {
    readonly metadata: object
    constructor(term: string, field: string, metadata: object)
    readonly combine: (otherMatchData: MatchData) => void
  }

  type PipelineFunction = (
    token: Token,
    i: number,
    tokens: ReadonlyArray<Token>
  ) => null | Token | ReadonlyArray<Token>

  class Pipeline {
    constructor()
    static registerFunction(fn: PipelineFunction, label: string): void
    static load(serialised: object): Pipeline
    // tslint:disable readonly-array
    add(...functions: PipelineFunction[]): void
    // tslint:enable readonly-array
    after(existingFn: PipelineFunction, newFn: PipelineFunction): void
    before(existingFn: PipelineFunction, newFn: PipelineFunction): void
    remove(fn: PipelineFunction): void
    run(tokens: ReadonlyArray<Token>): ReadonlyArray<Token>
    runString(str: string): ReadonlyArray<string>
    reset(): void
    toJSON(): ReadonlyArray<PipelineFunction>
  }

  namespace Query {
    enum wildcard {
      NONE = 0,
      LEADING = 1 << 0,
      TRAILING = 1 << 1
    }

    interface Clause {
      readonly term: string
      readonly fields: ReadonlyArray<string>
      readonly boost: number
      readonly editDistance: number
      readonly usePipeline: boolean
      readonly wildcard: number
    }
  }

  class Query {
    readonly clauses: ReadonlyArray<Query.Clause>
    readonly allFields: ReadonlyArray<string>
    constructor(allFields: ReadonlyArray<string>)
    readonly clause: (clause: Query.Clause) => Query
    readonly term: (term: string, options: object) => Query
  }

  class QueryParseError extends Error {
    readonly name: 'QueryParseError'
    readonly message: string
    readonly start: number
    readonly end: number

    constructor(message: string, start: string, end: string)
  }

  function stemmer(token: Token): Token

  function generateStopWordFilter(stopWords: ReadonlyArray<string>): PipelineFunction

  function stopWordFilter(token: Token): Token

  namespace Token {
    type UpdateFunction = (str: string, metadata: object) => void
  }

  class Token {
    constructor(str: string, metadata: object)
    readonly toString: () => string
    readonly update: (fn: Token.UpdateFunction) => Token
    readonly clone: (fn?: Token.UpdateFunction) => Token
  }

  class TokenSet {
    constructor()
    readonly fromArray: (arr: ReadonlyArray<string>) => TokenSet
    readonly fromFuzzyString: (str: string, editDistance: number) => Vector
    readonly fromString: (str: string) => TokenSet
    readonly toArray: () => ReadonlyArray<string>
    readonly toString: () => string
    readonly intersect: (b: TokenSet) => TokenSet
  }

  namespace tokenizer {
    const separator: RegExp
  }

  function tokenizer(obj?: null | string | object | ReadonlyArray<object>): ReadonlyArray<Token>

  function trimmer(token: Token): Token

  namespace utils {
    function warn(message: string): void

    function asString(obj: any): string
  }

  class Vector {
    constructor(elements: ReadonlyArray<number>)
    readonly positionForIndex: (index: number) => number
    readonly insert: (insertIdx: number, val: number) => void
    readonly upsert: (
      insertIdx: number,
      val: number,
      fn: (existingVal: number, val: number) => number
    ) => void
    readonly magnitude: () => number
    readonly dot: (otherVector: Vector) => number
    readonly similarity: (otherVector: Vector) => number
    readonly toArray: () => ReadonlyArray<number>
    readonly toJSON: () => ReadonlyArray<number>
  }

  const version: string
}

interface SearchIndex extends __gatsby_lunr.Index {}

interface SearchStore {
  readonly [key: string]: any
}

interface SearchResult extends __gatsby_lunr.Index.Result {
  readonly title: string
  readonly path: string
}

declare namespace __gatsby {
  interface Window {
    readonly __LUNR__: {
      readonly [language: string]: {
        readonly index: SearchIndex
        readonly store: SearchStore
      }
    }
  }
}

interface Window extends __gatsby.Window {}

declare var window: Window
