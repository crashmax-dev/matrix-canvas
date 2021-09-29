const matrix = new Matrix(document.body, {
  symbol: () => Math.random() > 0.5 ? '1' : '0',
  font: {
    family: 'Matrix',
    file: 'matrix.regular.ttf',
    size: 11
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
    rotate: [0, 0],
    width: [24, 32],
    speed: 45
  },
  fpsMonitor: true
})

console.log(matrix)

matrix.start()