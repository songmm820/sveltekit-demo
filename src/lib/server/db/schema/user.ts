import { mysqlTable as table, varchar } from 'drizzle-orm/mysql-core';
import { z } from 'zod';
import { atColumn, idColumn } from './columns';

// Table: sys_users
export const userSchema = table('sys_users', {
	id: idColumn,
	nickName: varchar({ length: 256 }).notNull(),
	email: varchar({ length: 256 }).notNull().unique('idx_users_email'),
	hashedPassword: varchar({ length: 256 }).notNull(),
	...atColumn
});

// 表模型: sys_users
export type SysUserSchema = typeof userSchema.$inferSelect;

// Zod 验证器: 注册用户
export const SysUserRegisterValidator = z.strictObject({
	nickName: z.string().min(2, '昵称至少需要2个字符').max(256, '昵称不能超过256个字符'),
	email: z.email('请输入有效的邮箱地址'),
	password: z.string('请输入密码').min(8, '密码至少8位字符')
});

// SysUserRegisterInput 类型
export type SysUserRegisterInput = z.infer<typeof SysUserRegisterValidator>;
