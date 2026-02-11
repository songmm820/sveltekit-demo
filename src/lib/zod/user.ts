import type { UserSchema } from '$lib/server/db/schema';
import z from 'zod';

// 表模型: sys_users
export type SysUserSchema = typeof UserSchema.$inferSelect;

// Zod 验证器: 注册用户
export const SysUserRegisterValidator = z.strictObject({
	nickName: z.string().min(2, '昵称至少需要2个字符').max(256, '昵称不能超过256个字符'),
	email: z.email('请输入有效的邮箱地址'),
	password: z.string('请输入密码').min(8, '密码至少8位字符')
});
// SysUserRegisterInput 类型
export type SysUserRegisterInput = z.infer<typeof SysUserRegisterValidator>;

// Zod 验证器: 登录用户
export const SysUserLoginValidator = z.strictObject({
	email: z.email('请输入有效的邮箱地址'),
	password: z.string('请输入密码').min(8, '密码至少8位字符')
});
export type SysUserLoginInput = z.infer<typeof SysUserLoginValidator>;

// Zod 验证器: 修改用户信息
export const SysUserUpdateValidator = z.strictObject({
	nickName: z.string().min(2, '昵称至少需要2个字符').max(256, '昵称不能超过256个字符').optional(),
	email: z.email('请输入有效的邮箱地址').optional(),
	remark: z.string().max(256, '个人介绍不能超过256个字符').optional(),
});
export type SysUserUpdateInput = z.infer<typeof SysUserUpdateValidator>;
