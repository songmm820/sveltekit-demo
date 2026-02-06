import { mysqlTable as table, varchar } from 'drizzle-orm/mysql-core';
import { atColumn, idColumn } from './columns';

// Table: sys_users
export const users = table('sys_users', {
	id: idColumn,
	nickname: varchar('nickname', { length: 256 }).notNull(),
	email: varchar('email', { length: 256 }).notNull().unique('idx_users_email'),
    ...atColumn
});


// Schema: sys_users
export type SysUserSchema = typeof users.$inferSelect;