import { randomInt } from './helpers.js'
import { Matrix } from './matrix.js'
import { opts } from './options.js'
import type { FlyingEntities } from './types.js'

export class Entity {
  private matrix: Matrix
  private flyingEntities: FlyingEntities[] = []
  private interval: ReturnType<typeof setInterval> | null

  constructor(matrix: Matrix) {
    this.matrix = matrix
  }

  private randomImage(): HTMLImageElement {
    const { files, size } = opts.entity
    const image = new Image(size)
    const file = files[randomInt(0, files.length - 1)]
    image.src = file
    image.style.userSelect = 'none'
    image.style.position = 'absolute'

    return image
  }

  start(): void {
    if (!this.interval) {
      this.interval = setInterval(() => {
        this.render()
      }, opts.entity.speed)
    }
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
      this.clear()
    }
  }

  clear(): void {
    this.flyingEntities.forEach((entity) => entity.img.remove())
    this.flyingEntities = []
  }

  private createEntity(): void {
    const { count, size, rotate } = opts.entity
    while (this.flyingEntities.length !== count) {
      const img = this.randomImage()
      document.body.appendChild(img)

      this.flyingEntities.push({
        dx: 0,
        x: Math.random() * (this.matrix.canvas.width - size),
        y:
          Math.random() > 0.8
            ? -size
            : Math.random() * this.matrix.canvas.height,
        am: Math.random() * 20,
        stepX: 0.02 + Math.random() / 10,
        stepY: 0.7 + Math.random(),
        rotate: randomInt(rotate[0], rotate[1]),
        img
      })
    }
  }

  private render(): void {
    const { files, enabled, size, opacity, rotate } = opts.entity
    if (!this.matrix.ctx || !enabled) return
    if (!files.length) return

    this.createEntity()

    const entity = this.flyingEntities
    for (let i = 0; i < entity.length; ++i) {
      if (Number(entity[i].img.style.width) !== size) {
        entity[i].img.style.width = size / window.devicePixelRatio + 'px'
      }

      const opac = opacity.toString()
      if (entity[i].img.style.opacity !== opac) {
        entity[i].img.style.opacity = opac
      }

      entity[i].y += entity[i].stepY

      if (entity[i].y > this.matrix.canvas.height + size) {
        entity[i].rotate = randomInt(rotate[0], rotate[1])
        entity[i].x =
          Math.random() * (this.matrix.canvas.width - entity[i].am - size)
        entity[i].y = -size
        entity[i].stepX = 0.02 + Math.random() / 10
        entity[i].stepY = 0.7 + Math.random()
      }

      entity[i].dx += entity[i].stepX
      entity[i].img.style.top = entity[i].y + 'px'
      entity[i].img.style.left =
        entity[i].x + entity[i].am * Math.sin(entity[i].dx) + 'px'

      if (!(!rotate[0] && !rotate[1])) {
        entity[i].img.style.transform =
          'rotate(' + (entity[i].rotate + 30 * Math.sin(entity[i].dx)) + 'deg)'
      }
    }
  }
}
