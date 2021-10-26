/**
 * canvas-matrix2d
 */
const matrix = new Matrix(document.body, {
  // symbols: () => Math.random() > 0.5 ? '1' : '0',
  // symbols: () => 'ඞ',
  font: {
    family: 'Matrix',
    file: 'matrix.regular.ttf',
    size: 12
  },
  splash: {
    size: 40,
    enable: true,
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
    files: [
      'images/DANKHACKERMANS.gif',
      'images/HACKERJAMS.gif',
      'images/HACKERMANS.gif',
      'images/PEPEGAHACKER.gif',
      'images/pepeLaughing.gif'
    ],
    opacity: 0.5,
    rotate: [-10, 10],
    // min max width
    size: [32, 32],
    speed: 30
  }
})

console.log(matrix)
matrix.start()

/**
 * stats.js
 */
let count_fireworks = document.querySelector('.matrix-counters'),
  update,
  stats

stats = new Stats
stats.setMode(0)
stats.domElement.style.position = 'fixed'
stats.domElement.style.left = '5px'
stats.domElement.style.top = '5px'
stats.domElement.id = 'stats'
document.body.appendChild(stats.domElement)

update = () => {
  stats.begin()
  stats.end()
  requestAnimationFrame(update)
}

requestAnimationFrame(update)