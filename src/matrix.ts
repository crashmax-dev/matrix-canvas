import { Entity } from './entity.js'
import { randomInt } from './helpers.js'
import { opts } from './options.js'
import { Splash } from './splash.js'
import type { MatrixOptions } from './types.js'

export class Matrix {
  public ctx: CanvasRenderingContext2D
  public canvas: HTMLCanvasElement
  public font: FontFace
  public entity: Entity
  public splash: Splash

  private running = false
  private lines: number[] = []

  constructor(private readonly container: Element, options: MatrixOptions) {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.container.appendChild(this.canvas)
    opts.updateOptions(options)
    this.updateSize()

    this.entity = new Entity(this)
    this.splash = new Splash(this)
    this.font = new FontFace(opts.font.family, `url(${opts.font.file})`)

    if (opts.autoresize) {
      this.handleResize = this.handleResize.bind(this)
      window.addEventListener('resize', this.handleResize)
    }
  }

  get isRunning(): boolean {
    return this.running
  }

  async start(): Promise<void> {
    if (this.running) return

    try {
      await this.font.load()
      this.running = true
      this.render()
      this.splash.start()
      this.entity.start()
    } catch {
      throw 'Failed loading `font.file`'
    }
  }

  stop(): void {
    this.running = false
    window.removeEventListener('resize', this.handleResize)
    this.clear()
  }

  clear(): void {
    if (!this.ctx) return

    this.lines = []
    this.ctx.save()
    this.ctx.globalCompositeOperation = 'copy'
    this.ctx.lineTo(0, 0)
    this.ctx.stroke()
    this.ctx.restore()

    if (this.isRunning) {
      this.entity.clear()
    } else {
      this.entity.stop()
      this.splash.stop()
    }
  }

  pause(): void {
    this.running = !this.running
    if (this.running) this.render()
  }

  getColor(): string {
    return opts.colors[randomInt(0, opts.colors.length - 1)]
  }

  private handleResize(): void {
    console.log('here')
    this.updateSize()
    this.clear()
  }

  private updateSize(): void {
    this.canvas.width = this.container.clientWidth
    this.canvas.height = this.container.clientHeight
  }

  private initLines(): void {
    while (this.lines.length !== opts.lineCount) {
      this.lines.push(randomInt(0, window.innerHeight))
    }
  }

  private render(): void {
    if (!this.ctx || !this.running) return
    if (this.lines.length !== opts.lineCount) this.initLines()

    window.requestAnimationFrame(() => this.render())

    this.ctx.fillStyle = 'rgba(0, 0, 0, .05)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.fillStyle = this.getColor()
    this.ctx.font = `${opts.font.size}pt ${this.font.family}`

    this.lines.map((y, i) => {
      const symbol =
        opts.symbols?.call(this) ||
        String.fromCharCode(100 + 28 * Math.random())
      const x = i * (opts.font.size * 2)
      this.ctx.fillText(symbol, x, y)

      if (y > 100 + Math.random() * 10000) {
        this.lines[i] = 0
      } else {
        this.lines[i] = y + 10
      }
    })
  }
}
