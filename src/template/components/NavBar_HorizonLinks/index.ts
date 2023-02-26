/**
 * 
 * @param showMajorIcons 
 * @param showSubIcons 
 * @param topBannerInjection : Inject a custom component to the top of the nav bar. Create a Custom Vue Component in `@/customComponents`, and put the component's name to this parameter.
 * @returns 
 */
export default function NavBar_HorizonLinks(showMajorIcons = true, showSubIcons = true, topBannerInjection?: string) {
  return {
    
    name: 'NavBar_HorizonLinks',
      // MUST BE SAME WITH FOLDER NAME
    showIcons: {
      majorLinks: showMajorIcons,
      subLinks: showSubIcons,
    },
    topBannerInjection: topBannerInjection,

  } satisfies ComponentListing
}
