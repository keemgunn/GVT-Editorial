
export default function NavBar_HorizonLinks(showMajorIcons = true, showSubIcons = true, topBannerInjection?: string) {
  return {
    
    name: 'NavBar_HorizonLinks',
    showIcons: {
      majorLinks: showMajorIcons,
      subLinks: showSubIcons,
    },
    topBannerInjection: topBannerInjection,

  } satisfies ComponentListing
}
