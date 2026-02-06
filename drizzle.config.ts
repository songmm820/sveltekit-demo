import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import path from 'path';

const caPath = path.resolve(__dirname, './src/lib/server/db/isrgrootx1.pem');
// 检查证书文件是否存在
if (!fs.existsSync(caPath)) {
	throw new Error(`SSL 证书文件不存在：${caPath}，请检查路径是否正确`);
}

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema',
	dialect: 'mysql',
	dbCredentials: {
		host: process.env.TIDB_HOST!,
		user: process.env.TIDB_NAME!,
		port: Number(process.env.TIDB_POST)!,
		password: process.env.TIDB_PASSWORD!,
		database: process.env.TIDB_DATABASE!,
		ssl: {
			cert: caPath,
			rejectUnauthorized: false
		}
	},
	verbose: true,
	strict: true
});
