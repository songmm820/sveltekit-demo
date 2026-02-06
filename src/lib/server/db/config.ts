/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/tidb-serverless';
import { env } from '$env/dynamic/private';
import type * as schema from './schema/user';

const TIDB_URL = env.TIDB_DATABASE_URL;

if (!TIDB_URL) throw new Error('DATABASE_URL is not set');

let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

/**
 * 创建数据库实例
 */
export function createDb() {
	db = drizzle({ connection: { url: TIDB_URL }, casing: 'snake_case' });
}

export { db };
