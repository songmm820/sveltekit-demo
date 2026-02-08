import { mysqlTable as table, varchar } from 'drizzle-orm/mysql-core';
import { atColumn, idColumn } from './columns';

// Table: sys_users
export const UserSchema = table('sys_users', {
	id: idColumn,
	nickName: varchar({ length: 256 }).notNull(),
	email: varchar({ length: 256 }).notNull().unique('idx_users_email'),
	hashedPassword: varchar({ length: 256 }).notNull(),
	...atColumn
});
