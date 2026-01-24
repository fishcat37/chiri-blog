// Date format types
export type DateFormat = 'YYYY-MM-DD' | 'MM-DD-YYYY' | 'DD-MM-YYYY' | 'MONTH DAY YYYY' | 'DAY MONTH YYYY'

// Site info configuration type
export interface SiteInfo {
  website: string
  title: string
  author: string
  description: string
  language: string
}

// General settings configuration type
export interface GeneralSettings {
  contentWidth: string
  centeredLayout: boolean
  themeToggle: boolean
  postListDottedDivider: boolean
  footer: boolean
  fadeAnimation: boolean
}

// Date settings configuration type
export interface DateSettings {
  dateFormat: DateFormat
  dateSeparator: string
  dateOnRight: boolean
}

// Post settings configuration type
export interface PostSettings {
  readingTime: boolean
  toc: boolean
  imageViewer: boolean
  copyCode: boolean
  linkCard: boolean
}

// Giscus configuration type
export interface GiscusConfig {
  repo: string
  repoId: string
  category: string
  categoryId: string
  mapping: 'pathname' | 'url' | 'title' | 'og:title'
  lang: string
}

// Comment settings configuration type
export interface CommentSettings {
  enabled: boolean
  giscus: GiscusConfig
}

// Theme configuration type
export interface ThemeConfig {
  site: SiteInfo
  general: GeneralSettings
  date: DateSettings
  post: PostSettings
  comment: CommentSettings
}
