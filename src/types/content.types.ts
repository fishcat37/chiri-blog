import type { CollectionEntry } from 'astro:content'

// Reading time interface
export interface ReadingTime {
  text: string
  minutes: number
  time: number
  words: number
}

// TOC item interface
export interface TOCItem {
  level: number
  text: string
  id: string
  index: number
}

// Category info interface
export interface CategoryInfo {
  name: string
  slug: string
  count: number
}

// PostList component props interface
export interface PostListProps {
  posts: CollectionEntry<'posts'>[]
  showCategory?: boolean
}
