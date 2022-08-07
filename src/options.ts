import deepMerge from 'ts-deepmerge'
import { randomColors } from './helpers.js'
import type {
  EntityOptions,
  FontOptions,
  MatrixOptions,
  SplashOptions
} from './types.js'

class Options implements MatrixOptions {
  public autoresize: boolean
  public lineCount?: number
  public symbols?: () => string
  public font: FontOptions
  public splash: SplashOptions
  public entity: EntityOptions
  public colors: string[]

  constructor() {
    this.autoresize = true
    this.lineCount = Math.round(window.innerWidth / 10)

    this.colors = [
      '#225400',
      '#66FF00',
      '#155400',
      '#395410',
      '#7FFF00',
      '#005400',
      '#2A5400',
      '#3FFF00',
      '#00FF00',
      '#ADFF2F'
    ]

    this.font = {
      family: 'Matrix',
      file: 'matrix.regular.ttf',
      size: 12,
      colors: randomColors()
    }

    this.splash = {
      size: 40,
      interval: 200,
      enabled: false,
      texts: [],
      colors: randomColors()
    }

    this.entity = {
      enabled: false,
      files: [],
      size: 32,
      rotate: [-30, 30],
      opacity: 0.5,
      speed: 30,
      count: 15
    }
  }

  updateOptions<T extends MatrixOptions>(options: T): void {
    Object.assign(this, deepMerge(this, options))
  }
}

const opts = new Options()
export { opts }
