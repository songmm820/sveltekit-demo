import { timestamp, varchar } from 'drizzle-orm/mysql-core';
import { customAlphabet } from 'nanoid';

/**
 * 自定义ID生成器
 */
const createId = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	12
);

// 时间戳列
export const atColumn = {
	// 创建时间
	createdAt: timestamp().defaultNow().notNull(),
	// 修改时间
	updatedAt: timestamp().$onUpdate(() => new Date()),
	// 删除时间
	deletedAt: timestamp()
};

// Id 列
export const idColumn = varchar({ length: 256 })
	.primaryKey()
	.$defaultFn(() => createId());
