import { drizzle } from 'drizzle-orm/mysql2';
import { env } from '$env/dynamic/private';
import type { Logger } from 'drizzle-orm/logger';
import { log } from 'node:console';
import mysql from 'mysql2/promise';
import fs from 'fs';

const TIDB_URL = env.TIDB_DATABASE_URL;
const caPath = fs.readFileSync('./src/lib/server/db/isrgrootx1.pem').toString();

// 检查证书文件是否存在
if (!caPath) {
	throw new Error(`SSL 证书文件不存在：${caPath}，请检查路径是否正确`);
}

// 创建数据库连接池
const poolConnection = mysql.createPool({
	host: env.TIDB_HOST!,
	user: env.TIDB_NAME!,
	database: env.TIDB_DATABASE!,
	password: env.TIDB_PASSWORD!,
	port: Number(env.TIDB_PORT)!,
	ssl: {
		ca: caPath!,
		rejectUnauthorized: true
	}
});

if (!TIDB_URL) throw new Error('DATABASE_URL is not set');

class MyLogger implements Logger {
	logQuery(query: string, params: unknown[]): void {
		log({ query, params });
	}
}

/**
 * 创建数据库实例
 */
export const db = drizzle({
	logger: new MyLogger(),
	client: poolConnection,
	casing: 'snake_case'
});
