// Search algorithm for string with regex
export function search (string: string, pattern: string): number {
  let count = 0
  for (let i = 0; i < string.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] !== string[i + j]) break
      if (j === pattern.length - 1) count++
    }
  }
  return count
}
