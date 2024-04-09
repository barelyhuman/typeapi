import { LRUCache } from 'lru-cache'

function createCache() {
  const cache = new LRUCache({
    max: 20,
    ttl: 10 * 24 * 60 * 60 * 1000,
  })

  return {
    get(key: string) {
      return cache.get(key)
    },
    set<T>(key: string, value: T) {
      cache.set(key, value)
    },
  }
}

function createRecentHolder() {
  const recents = createCache()
  return {
    get(): string[] {
      return (recents.get('recents') as string[]) || []
    },
    add(item: string) {
      const items = this.get()
      const uniqueSet = new Set(items)
      uniqueSet.delete(item)
      recents.set('recents', [item, ...uniqueSet])
    },
  }
}

export const recents = createRecentHolder()
