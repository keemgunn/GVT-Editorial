
/** num:3  =>  [ 0, 1, 2 ] */
export function arrayFromNum(from: number) {
  return Array.from({length: from}, (_, i) => i)
}
