export function randomInt(min: number, max: number): number {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

export function randomColors(length = 6): string[] {
  return Array.from({ length }, () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
    )
  })
}
