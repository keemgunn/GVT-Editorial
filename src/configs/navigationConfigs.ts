/**
#### These records will appear in Header Navigation as Links.
#### The order of links would follow this order.

+ @title: The title that would appears in links
+ @icon: Material Symbol that would appears in links (see https://fonts.google.com/icons)
+ @uri: The endpoint to route

+ @sublinks: 
    - always-show : show nested links always.
    - always-hide : hide always, action (hover or click) to show nested links.
    - show-on-wide : show in wide space, hide in small space.
    - blank if there's no nestedRecords.

+ @nestedRecords: Nested Links. Same as this structure. (Usually follows Categories)

#### Fully customizalbe for any router endpoints, doesn't have to be correspond to the page list.
*/
export default [


  {
    title: "Home"
    ,icon: "home"
    ,uri: "/"
    ,sublinks: "always-hide"
    ,nestedRecords: null
  } satisfies NavRecord,

  {
    title: "About"
    ,icon: "mood"
    ,uri: "/about"
    ,sublinks: "always-hide"
    ,nestedRecords: null
  } satisfies NavRecord,

  {
    title: "Categories"
    ,icon: "format_list_bulleted"
    ,uri: "/categories"
    ,sublinks: "show-on-wide"
    ,nestedRecords: [
      {
        title: "Budgeting"
        ,icon: "abc"
        ,uri: "/categories/budgeting"
        ,sublinks: 'always-hide'
        ,nestedRecords:null
      },
      {
        title: "Investing"
        ,icon: "abc"
        ,uri: "/categories/investing"
        ,sublinks: 'always-hide'
        ,nestedRecords:null
      },
      {
        title: "Retirement"
        ,icon: "abc"
        ,uri: "/categories/retirement"
        ,sublinks: 'always-hide'
        ,nestedRecords:null
      },
      {
        title: "Real Estate"
        ,icon: "abc"
        ,uri: "/categories/real-estate"
        ,sublinks: 'always-hide'
        ,nestedRecords:null
      },
      {
        title: "Taxes"
        ,icon: "abc"
        ,uri: "/categories/taxes"
        ,sublinks: 'always-hide'
        ,nestedRecords:null
      },
      {
        title: "Personal Finance"
        ,icon: "abc"
        ,uri: "/categories/personal-finance"
        ,sublinks: 'always-hide'
        ,nestedRecords:null
      },
    ]
  } satisfies NavRecord,


] satisfies NavRecords