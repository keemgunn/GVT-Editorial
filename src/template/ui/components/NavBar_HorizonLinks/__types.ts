export { };
  
declare global {

  interface NavRecord {
    title: string
    icon: string
    uri: string
    nestedRecords: Array<NavRecord> | null
  }

  type NavRecords = Array<NavRecord>

}