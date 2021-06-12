import { Matrix } from './matrix'
import { randomInt } from './utils/randomInt'

interface FlyingsOptions {
  sprites: string[]
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

class Flying {
  private matrix: Matrix
  private options: Required<FlyingsOptions> = {
    sprites: [],
    width: [24, 32],
    rotate: [-30, 30],
    opacity: 0.5,
    speed: 33,
    count: 30
  }
  private entity: FlyingEntities[] = []
  private interval: NodeJS.Timeout | null

  constructor(matrix: Matrix, options: FlyingsOptions | undefined) {
    this.matrix = matrix
    this.options = { ...this.options, ...options }
  }

  private randomSprite(): string {
    return this.options.sprites[randomInt(0, this.options.sprites.length - 1)]
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
    this.entity.forEach(v => v.img.remove())
    this.entity = []
  }

  private initSprites(): void {
    while (this.entity.length !== this.options.count) {
      const img = new Image()
      img.src = this.randomSprite()
      img.style.userSelect = 'none'
      img.style.position = 'absolute'
      img.style.width = randomInt(this.options.width[0], this.options.width[0]) + 'px'
      img.style.opacity = this.options.opacity.toString()
      document.body.appendChild(img)

      this.entity.push({
        dx: 0,
        x: Math.random() * (this.matrix.canvas.width - 50),
        y: Math.random() * this.matrix.canvas.height,
        am: Math.random() * 20,
        stepX: 0.02 + Math.random() / 10,
        stepY: 0.7 + Math.random(),
        rotate: randomInt(this.options.rotate[0], this.options.rotate[1]),
        img: img
      })
    }
  }

  private render(): void {
    if (!this.matrix.ctx || !this.matrix.running) return

    this.initSprites()

    for (let i = 0; i < this.entity.length; ++i) {
      this.entity[i].y += this.entity[i].stepY

      if (this.entity[i].y > this.matrix.canvas.height - 50) {
        this.entity[i].x = Math.random() * (this.matrix.canvas.width - this.entity[i].am - 50)
        this.entity[i].y = 0
        this.entity[i].stepX = 0.02 + Math.random() / 10
        this.entity[i].stepY = 0.7 + Math.random()
      }

      this.entity[i].dx += this.entity[i].stepX
      this.entity[i].img.style.top = this.entity[i].y + 'px'
      this.entity[i].img.style.left = (this.entity[i].x + this.entity[i].am * Math.sin(this.entity[i].dx)) + 'px'

      if (!(!this.options.rotate[0] && !this.options.rotate[1])) {
        this.entity[i].img.style.transform = 'rotate(' + (this.entity[i].rotate + 30 * Math.sin(this.entity[i].dx)) + 'deg)'
      }
    }
  }
}

export { Flying, FlyingsOptions }