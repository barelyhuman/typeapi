import { db } from './db.js'

function createRecentHolder() {
  return {
    async get(): Promise<string[]> {
      try {
        const items = await db('recents')
          .where({})
          .orderBy('last_access_time', 'desc')
          .select(['name'])
        return items.map(d => d.name)
      } catch (err) {
        console.error(err)
        throw err
      }
    },
    async add(item: string) {
      const existingItem = await db('recents')
        .where({
          name: item,
        })
        .first()
      if (existingItem) {
        const a = await db('recents')
          .update({
            last_access_time: new Date(),
          })
          .where({
            id: existingItem.id,
          })
      } else {
        await db('recents').insert({
          name: item,
        })
      }
    },
  }
}

export const recents = createRecentHolder()
