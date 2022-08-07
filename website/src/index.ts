import { Matrix } from 'matrix-canvas'
import type { MatrixOptions } from 'matrix-canvas'
import './style.css'

const query = new URLSearchParams(window.location.search)
const symbols = query.get('symbols')?.split(',') || []
const randomInt = (min: number, max: number) =>
  Math.floor(min + Math.random() * (max + 1 - min))
const matrixContainer = document.querySelector('#app')!

const matrixConfig: MatrixOptions = {
  // symbols: () => Math.random() > 0.5 ? '1' : '0',
  // symbols: () => 'ඞ',
  symbols: () => symbols[randomInt(0, symbols.length - 1)]!,
  font: {
    family: 'Matrix',
    file: 'matrix.regular.ttf',
    size: 12
  },
  splash: {
    size: 40,
    interval: 150,
    enabled: true,
    texts: [
      'Hello, World!',
      'EZ Clap',
      'Matrix'
    ],
    colors: [
      '#225400',
      '#66FF00',
      '#155400'
    ]
  },
  entity: {
    enabled: false,
    files: [
      'entities/DANKHACKERMANS.gif',
      'entities/HACKERJAMS.gif',
      'entities/HACKERMANS.gif',
      'entities/PEPEGAHACKER.gif',
      'entities/pepeLaughing.gif'
    ],
    opacity: 0.5,
    rotate: [-10, 10],
    size: 32,
    speed: 30,
    count: 15
  }
}

const matrix = new Matrix(matrixContainer, matrixConfig)
await matrix.start()
console.log(matrix)

document.addEventListener('keydown', (event) => {
  if (event.code === 'F11') {
    event.preventDefault()

    if (matrixContainer.requestFullscreen) {
      matrixContainer.requestFullscreen()
    }
  }
})
