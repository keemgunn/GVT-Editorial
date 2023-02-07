export { };
  
declare global {

  interface NavBarLinkRecord {
    title: string
    icon: string
    uri: string
    nestedRecords: Array<NavBarLinkRecord> | null
  }

  type NavBarLinkRecords = Array<NavBarLinkRecord>

}