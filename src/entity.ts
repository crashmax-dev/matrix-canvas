import { Matrix } from './matrix'
import { randomInt } from './utils/randomInt'

interface EntityOptions {
  files: string[]
  width?: [number, number]
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

class Entity {
  private matrix: Matrix
  private options: Required<EntityOptions> = {
    files: [],
    width: [24, 32],
    rotate: [-30, 30],
    opacity: 0.5,
    speed: 33,
    count: 30
  }
  private flyingEntitys: FlyingEntities[] = []
  private interval: ReturnType<typeof setInterval> | null

  constructor(matrix: Matrix, options: EntityOptions | undefined) {
    this.matrix = matrix
    this.options = { ...this.options, ...options }
  }

  private randomSprite(): string {
    return this.options.files[randomInt(0, this.options.files.length - 1)]
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
    this.flyingEntitys.forEach(v => v.img.remove())
    this.flyingEntitys = []
  }

  private entity(): void {
    while (this.flyingEntitys.length !== this.options.count) {
      const img = new Image()
      img.src = this.randomSprite()
      img.style.userSelect = 'none'
      img.style.position = 'absolute'
      img.style.width = randomInt(this.options.width[0], this.options.width[0]) + 'px'
      img.style.opacity = this.options.opacity.toString()
      document.body.appendChild(img)

      this.flyingEntitys.push({
        dx: 0,
        x: Math.random() * (this.matrix.canvas.width - 50),
        y: Math.random() * this.matrix.canvas.height,
        am: Math.random() * 20,
        stepX: 0.02 + Math.random() / 10,
        stepY: 0.7 + Math.random(),
        rotate: randomInt(this.options.rotate[0], this.options.rotate[1]),
        img
      })
    }
  }

  private render(): void {
    if (!this.matrix.ctx || !this.matrix.running) return

    this.entity()

    const entity = this.flyingEntitys
    for (let i = 0; i < entity.length; ++i) {
      entity[i].y += entity[i].stepY

      if (entity[i].y > this.matrix.canvas.height - 50) {
        entity[i].x = Math.random() * (this.matrix.canvas.width - entity[i].am - 50)
        entity[i].y = 0
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

export { Entity, EntityOptions }