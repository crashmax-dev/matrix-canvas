import { Matrix } from './matrix'
import { randomInt } from './utils'

export interface EntityOptions {
  files: string[]
  size?: number
  rotate?: [number, number]
  opacity?: number
  speed?: number
  count?: number
}

interface FlyingEntities {
  dx: number
  x: number
  y: number
  am: number
  stepX: number
  stepY: number
  img: HTMLImageElement
  rotate: number
}

export class Entity {
  private matrix: Matrix
  public options: Required<EntityOptions> = {
    files: [],
    size: 32,
    rotate: [-30, 30],
    opacity: 0.5,
    speed: 30,
    count: 30
  }
  private flyingEntities: FlyingEntities[] = []
  private images: HTMLImageElement[] = []
  private interval: ReturnType<typeof setInterval> | null

  constructor(matrix: Matrix, options: EntityOptions | undefined) {
    this.matrix = matrix
    this.options = { ...this.options, ...options }
    this.loadImages()
  }

  private async loadImages(): Promise<void> {
    for (const file of this.options.files) {
      this.images.push(
        await new Promise((resolve, reject) => {
          const image = new Image(this.options.size)
          image.src = file
          image.onload = () => resolve(image)
          image.onerror = reject
        })
      )
    }
  }

  private randomImage(): string {
    return this.images[randomInt(0, this.images.length - 1)].src
  }

  start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.render()
      }, this.options.speed)
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  clear(): void {
    this.flyingEntities.forEach(entity => entity.img.remove())
    this.flyingEntities = []
  }

  private createEntity(): void {
    while (this.flyingEntities.length !== this.options.count) {
      const img = new Image()
      img.src = this.randomImage()
      img.style.userSelect = 'none'
      img.style.position = 'absolute'
      document.body.appendChild(img)

      this.flyingEntities.push({
        dx: 0,
        x: Math.random() * (this.matrix.canvas.width - this.options.size),
        y: Math.random() > 0.8 ? -this.options.size : Math.random() * this.matrix.canvas.height,
        am: Math.random() * 20,
        stepX: 0.02 + Math.random() / 10,
        stepY: 0.7 + Math.random(),
        rotate: randomInt(this.options.rotate[0], this.options.rotate[1]),
        img
      })
    }
  }

  private render(): void {
    if (!this.matrix.ctx || !this.matrix.isRunning) return
    if (this.images.length !== this.options.files.length) return

    this.createEntity()

    const entity = this.flyingEntities
    for (let i = 0; i < entity.length; ++i) {
      if (Number(entity[i].img.style.width) !== this.options.size) {
        entity[i].img.style.width = this.options.size / window.devicePixelRatio + 'px'
      }

      const opacity = this.options.opacity.toString()
      if (entity[i].img.style.opacity !== opacity) {
        entity[i].img.style.opacity = opacity
      }

      entity[i].y += entity[i].stepY

      if (entity[i].y > this.matrix.canvas.height + this.options.size) {
        entity[i].rotate = randomInt(this.options.rotate[0], this.options.rotate[1])
        entity[i].x = Math.random() * (this.matrix.canvas.width - entity[i].am - this.options.size)
        entity[i].y = -this.options.size
        entity[i].stepX = 0.02 + Math.random() / 10
        entity[i].stepY = 0.7 + Math.random()
      }

      entity[i].dx += entity[i].stepX
      entity[i].img.style.top = entity[i].y + 'px'
      entity[i].img.style.left = (entity[i].x + entity[i].am * Math.sin(entity[i].dx)) + 'px'

      if (!(!this.options.rotate[0] && !this.options.rotate[1])) {
        entity[i].img.style.transform = 'rotate(' + (entity[i].rotate + 30 * Math.sin(entity[i].dx)) + 'deg)'
      }
    }
  }
}