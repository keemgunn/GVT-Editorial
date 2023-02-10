export { }
declare global {

  /** Defines overall UI's roundness */
  type UIRoundness = 0 | 1 | 2;

  interface ComponentListing {
    name: string;
    [key: string]: any;
  }

}