/**
 * Apply the returned object to a style that's going to have round corners. 
 * @param roundness : {"border-radius": `${roundness}rem`}
 * @returns `StyleObject`
 */
export function getRoundStyle(roundness: number) {
  return {
    "border-radius": `${roundness}rem`,
    "overflow": `hidden`
  }
}