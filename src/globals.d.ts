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
