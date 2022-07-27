export interface IMatrixOptions {
  font: FontOptions
  symbols: () => string
  splash: SplashOptions
  entity: EntityOptions
  autoresize: boolean
  lineCount: number
}

export type MatrixOptions = RecursivePartial<IMatrixOptions>

export interface FontOptions {
  family: string
  file: string
  size: number
  colors: string[]
}

export interface SplashOptions {
  interval: number
  enabled: boolean
  colors: string[]
  texts: string[]
  size: number
}

export interface EntityOptions {
  files: string[]
  enabled: boolean
  size: number
  rotate: [number, number]
  opacity: number
  speed: number
  count: number
}

export interface FlyingEntities {
  dx: number
  x: number
  y: number
  am: number
  stepX: number
  stepY: number
  img: HTMLImageElement
  rotate: number
}

export type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends object
    ? RecursivePartial<T[P]>
    : T[P]
}
