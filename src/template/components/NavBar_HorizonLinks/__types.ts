export { };
  
declare global {

  type HowToShowSublinks = 'always-show' | 'always-hide' | 'show-on-wide' | null;

  interface NavRecord {
    title: string
    icon: string
    uri: string
    sublinks: HowToShowSublinks
    nestedRecords: Array<NavRecord> | null
  }

  type NavRecords = Array<NavRecord>

}