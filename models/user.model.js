// import { uuid } from 'drizzle-orm/gel-core'
// import { timeStamp } from 'console'
import {pgTable,uuid,timestamp,text,varchar} from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users',{
id: uuid().primaryKey().defaultRandom(),
firstname:varchar('first_name',{length:255}).notNull(),
lastname:varchar('last_name',{length:255}),
email:varchar('email',{length:255}).notNull().unique(),
password: text().notNull(),
salt: text().notNull(),
createdAt: timestamp('created_at').notNull(),
updatedAt: timestamp('updated_At').$onUpdate(()=>new Date())
})