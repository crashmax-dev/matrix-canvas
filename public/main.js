const query = new URLSearchParams(window.location.search)
const symbols = query.get('symbols')?.split(',') || []
const randomInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

/**
 * canvas-matrix2d
 */
const matrixConfig = {
  // symbols: () => Math.random() > 0.5 ? '1' : '0',
  // symbols: () => 'ඞ',
  symbols: () => symbols[randomInt(0, symbols.length - 1)],
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
    enabled: true,
    files: [
      'images/DANKHACKERMANS.gif',
      'images/HACKERJAMS.gif',
      'images/HACKERMANS.gif',
      'images/PEPEGAHACKER.gif',
      'images/pepeLaughing.gif'
    ],
    opacity: 0.5,
    rotate: [-10, 10],
    size: 32,
    speed: 30,
    count: 15
  }
}

const { splash, entity } = matrixConfig
const matrix = new Matrix(document.body, matrixConfig)
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

/**
 * dat.gui.js
 */
const fpsMonitor = document.querySelector('#stats')

const gui = new dat.GUI({
  closed: true,
  autoPlace: true,
  width: window.outerWidth > 360 ? 320 : 260
})

const folders = {
  entity: gui.addFolder('entity'),
  splash: gui.addFolder('splash')
}

folders.entity.addFolder('rotate')

folders.entity.add(entity, 'size', 16, 64, 1).onChange(size => {
  matrix.setOptions({ entity: { size } })
})

folders.entity.__folders.rotate.add(entity.rotate, '0', -360, 360, 1).name('min deg').onChange(rotate => {
  matrix.setOptions({ entity: { rotate: [rotate, matrix._.entity.options.rotate[1]] } })
})

folders.entity.__folders.rotate.add(entity.rotate, '1', -360, 360, 1).name('max deg').onChange(rotate => {
  matrix.setOptions({ entity: { rotate: [matrix._.entity.options.rotate[0], rotate] } })
})

folders.entity.add(entity, 'opacity', 0.1, 1).onChange(opacity => {
  matrix.setOptions({ entity: { opacity } })
})

folders.entity.add(entity, 'speed', 10, 60, 1).name('tick speed').onChange(speed => {
  matrix.setOptions({ entity: { speed } })
  matrix._.entity.stop()
  matrix._.entity.start()
})

folders.entity.add(entity, 'enabled').onChange(enabled => {
  matrix.setOptions({ entity: { enabled } })
  matrix._.entity.clear()
})

folders.splash.add(splash, 'size', 16, 96, 1).onChange(size => {
  matrix.setOptions({ splash: { size } })
})

folders.splash.add(splash, 'interval', 100, 2000, 1).name('tick speed').onChange(interval => {
  matrix.setOptions({ splash: { interval } })
})

folders.splash.add(splash, 'enabled').onChange(enabled => {
  matrix.setOptions({ splash: { enabled } })
})