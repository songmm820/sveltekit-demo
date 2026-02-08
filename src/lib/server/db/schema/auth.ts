import { mysqlTable as table, varchar } from 'drizzle-orm/mysql-core';
import { atColumn, idColumn } from './columns';

// Table: sys_refresh_tokens
export const RefreshTokenSchema = table('sys_refresh_tokens', {
	id: idColumn,
    userId: varchar({ length: 256 }).notNull(),
    refreshToken: varchar({ length: 256 }).notNull(),
    expiresAt: varchar({ length: 256 }).notNull(),
	...atColumn
});

// Table: sys_token_blacklist
export const TokenBlacklistSchema = table('sys_token_blacklist', {
    id: idColumn,
    userId: varchar({ length: 256 }).notNull(),
    token: varchar({ length: 256 }).notNull(),
    expiresAt: varchar({ length: 256 }).notNull(),
    ...atColumn
});