import { int, timestamp } from 'drizzle-orm/mysql-core';

// 时间戳列
export const atColumn = {
	// 创建时间
	createdAt: timestamp().defaultNow().notNull(),
	// 修改时间
	updatedAt: timestamp(),
	// 删除时间
	deletedAt: timestamp()
};

// Id 列
export const idColumn = int('id').primaryKey();
