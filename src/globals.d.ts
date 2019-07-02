declare module 'gray-percentage' {
  type Hue = number | 'cool' | 'slate' | 'warm'
  function gray(lightness: number, hue?: Hue, darkBackground?: boolean): string
  export default gray
}

declare module 'compass-vertical-rhythm' {
  type Options = Partial<{
    baseFontSize: string
    baseLineHeight: number | string
    rhythmUnit: '%' | 'em' | 'ex' | 'ch' | 'px' | 'rem' | 'vw' | 'vh' | 'vmin'
    defaultRhythmBorderWidth: string
    defaultRhythmBorderStyle:
      | 'solid'
      | 'none'
      | 'hidden'
      | 'dashed'
      | 'dotted'
      | 'double'
      | 'groove'
      | 'ridge'
      | 'inset'
      | 'outset'
    roundToNearestHalfLine: boolean
    minLinePadding: string
  }>

  interface VerticalRhythmInstance {
    rhythm: (value?: number | null, fontSize?: string | null, offset?: number | null) => string
    establishBaseline: () => { fontSize: string; lineHeight: string }
    linesForFontSize: (fontSize: string) => number
    adjustFontSizeTo: (
      toSize: string,
      lines?: number | 'auto' | null,
      fromSize?: string | null
    ) => { fontSize: string; lineHeight: string }
  }

  function VerticalRhythm(options?: Options): VerticalRhythmInstance
  export default VerticalRhythm
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

declare type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>
}

declare interface Site {
  readonly siteMetadata: {
    readonly title: string
    readonly description: string
    readonly author: string
  }
}

declare interface Edge<T> {
  readonly node: T
}

declare type Edges<T> = readonly Edge<T>[]

declare interface Markdown {
  readonly id: string
  readonly excerpt?: string
  readonly code: {
    readonly body: string
  }
  readonly frontmatter: {
    readonly date?: string
    readonly draft?: boolean
    readonly path: string
    readonly tags?: readonly string[]
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

declare interface AllMarkdown {
  readonly totalCount: number
  readonly edges: Edges<Markdown>
}

declare namespace GatsbyLunr {
  namespace Index {
    interface Attributes {
      readonly invertedIndex: object
      readonly documentVectors: { readonly [docRef: string]: Vector }
      readonly tokenSet: TokenSet
      readonly fields: readonly string[]
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
    public constructor(attrs: Index.Attributes)
    public readonly search: (queryString: Index.QueryString) => readonly Index.Result[]
    public readonly query: (fn: Index.QueryBuilder) => readonly Index.Result[]
    public readonly toJSON: () => object
    public static readonly load: (serializedIndex: object) => Index
  }

  class MatchData {
    public readonly metadata: object
    public constructor(term: string, field: string, metadata: object)
    public readonly combine: (otherMatchData: MatchData) => void
  }

  type PipelineFunction = (
    token: Token,
    i: number,
    tokens: readonly Token[]
  ) => null | Token | readonly Token[]

  class Pipeline {
    public constructor()
    public static registerFunction(fn: PipelineFunction, label: string): void
    public static load(serialised: object): Pipeline
    public add(...functions: PipelineFunction[]): void
    public after(existingFn: PipelineFunction, newFn: PipelineFunction): void
    public before(existingFn: PipelineFunction, newFn: PipelineFunction): void
    public remove(fn: PipelineFunction): void
    public run(tokens: readonly Token[]): readonly Token[]
    public runString(str: string): readonly string[]
    public reset(): void
    public toJSON(): readonly PipelineFunction[]
  }

  namespace Query {
    enum wildcard {
      NONE = 0,
      LEADING = 1 << 0,
      TRAILING = 1 << 1
    }

    interface Clause {
      readonly term: string
      readonly fields: readonly string[]
      readonly boost: number
      readonly editDistance: number
      readonly usePipeline: boolean
      readonly wildcard: number
    }
  }

  class Query {
    public readonly clauses: readonly Query.Clause[]
    public readonly allFields: readonly string[]
    public constructor(allFields: readonly string[])
    public readonly clause: (clause: Query.Clause) => Query
    public readonly term: (term: string, options: object) => Query
  }

  class QueryParseError extends Error {
    public readonly name: 'QueryParseError'
    public readonly message: string
    public readonly start: number
    public readonly end: number

    public constructor(message: string, start: string, end: string)
  }

  function stemmer(token: Token): Token

  function generateStopWordFilter(stopWords: readonly string[]): PipelineFunction

  function stopWordFilter(token: Token): Token

  namespace Token {
    type UpdateFunction = (str: string, metadata: object) => void
  }

  class Token {
    public constructor(str: string, metadata: object)
    public readonly toString: () => string
    public readonly update: (fn: Token.UpdateFunction) => Token
    public readonly clone: (fn?: Token.UpdateFunction) => Token
  }

  class TokenSet {
    public constructor()
    public readonly fromArray: (arr: readonly string[]) => TokenSet
    public readonly fromFuzzyString: (str: string, editDistance: number) => Vector
    public readonly fromString: (str: string) => TokenSet
    public readonly toArray: () => readonly string[]
    public readonly toString: () => string
    public readonly intersect: (b: TokenSet) => TokenSet
  }

  namespace tokenizer {
    const separator: RegExp
  }

  function tokenizer(obj?: null | string | object | readonly object[]): readonly Token[]

  function trimmer(token: Token): Token

  namespace utils {
    function warn(message: string): void

    function asString(obj: any): string
  }

  class Vector {
    public constructor(elements: readonly number[])
    public readonly positionForIndex: (index: number) => number
    public readonly insert: (insertIdx: number, val: number) => void
    public readonly upsert: (
      insertIdx: number,
      val: number,
      fn: (existingVal: number, val: number) => number
    ) => void
    public readonly magnitude: () => number
    public readonly dot: (otherVector: Vector) => number
    public readonly similarity: (otherVector: Vector) => number
    public readonly toArray: () => readonly number[]
    public readonly toJSON: () => readonly number[]
  }

  const version: string
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SearchIndex extends GatsbyLunr.Index {}

interface SearchStore {
  readonly [key: string]: any
}

interface SearchResult extends GatsbyLunr.Index.Result {
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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Window extends __gatsby.Window {}

declare var window: Window
