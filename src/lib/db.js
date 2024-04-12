import knex from 'knex'
import { join, dirname } from 'node:path'
import { mkdir } from 'node:fs/promises'

const dbPath = process.env.DB_PATH || join(process.cwd(), 'data/data.db')
console.log({ dbPath })

/**
 * @type {import("knex").Knex.Config}
 */
const dbConfig = {
  client: 'better-sqlite3',
  connection: {
    filename: dbPath,
  },
  migrations: {
    directory: join(process.cwd(), 'migrations'),
  },
  useNullAsDefault: true,
}

function createConnection() {
  let connection
  return config => {
    return connection ?? (connection = knex(config))
  }
}

/**
 * @type {import("knex").Knex}
 */
export const db = createConnection()(dbConfig)
await autoMigrate()

async function autoMigrate() {
  await mkdir(dirname(dbPath), { recursive: true })
  await migrate('recents', [
    {
      name: 'name',
      type: 'text',
      nullable: false,
    },
    {
      name: 'last_access_time',
      type: 'datetime',
      nullable: false,
      defaultsTo: () => db.fn.now(),
    },
  ])
}

async function migrate(tableName, attributes) {
  const hasTable = await db.schema.hasTable(tableName)
  if (hasTable) return

  await db.schema.createTable(tableName, function (table) {
    table.increments('id').primary().notNullable()
    table.boolean('is_active').notNullable().defaultTo('true')

    attributes.forEach(columnAttr => {
      const base = table[columnAttr.type](columnAttr.name)
      if (columnAttr.nullable) {
        base.nullable()
      }
      if (columnAttr.defaultsTo) {
        base.defaultsTo(columnAttr.defaultsTo())
      }
    })

    table.timestamps(true, true)
  })
}
