

export function getAllMarkdownArticles() {
  return import.meta.glob(
    '../../src/contents/articles/**/*.md',
    { eager: true, import: 'default', as: 'raw' }
  )
}

export function importFeaturedArticleModulesAsync(filename: string) {
  return () => import(`../../src/contents/articles/featured/${filename}.md`)
}
export function importTrendingArticleModulesAsync(filename: string) {
  return () => import(`../../src/contents/articles/trending/${filename}.md`)
}
export function importNormalArticleModulesAsync(filename: string) {
  return () => import(`../../src/contents/articles/normal/${filename}.md`)
}