import { defineConfig } from 'drizzle-kit';
import fs from 'fs';

const caPath = fs.readFileSync('./src/lib/server/db/isrgrootx1.pem').toString();
// 检查证书文件是否存在
if (!caPath) {
	throw new Error(`SSL 证书文件不存在：${caPath}，请检查路径是否正确`);
}

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema',
	dialect: 'mysql',
	casing: 'snake_case',
	dbCredentials: {
		host: process.env.TIDB_HOST!,
		user: process.env.TIDB_NAME!,
		port: Number(process.env.TIDB_PORT)!,
		password: process.env.TIDB_PASSWORD!,
		database: process.env.TIDB_DATABASE!,
		ssl: {
			cert: caPath,
			rejectUnauthorized: true
		}
	},
	verbose: true,
	strict: true
});
