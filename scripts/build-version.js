/* eslint-disable no-console */
import path from 'path';
import fs from 'fs';

const build_config = {
	// 版本文件输出路径（SvelteKit静态资源目录）
	version_out_file_path: path.join(process.cwd(), 'static/version.json'),
	// ENV
	env: process.env.NODE_ENV || 'production',
	// 版本号前缀
	version_prefix: 'v',
	// 版本号分隔符
	version_separator: '-',
	// 基础版本号（如果不存在版本文件，使用该版本号）
	base_version: '0.0.0'
};

// 读取上一次版本号
function readLastVersion() {
	// 如果不存在版本文件，返回空字符串
	if (!fs.existsSync(build_config.version_out_file_path)) {
		return '';
	}
	return JSON.parse(fs.readFileSync(build_config.version_out_file_path, 'utf8')).newVersion;
}

// 递增语义版本号（Semantic Versioning）
function incrementSemver(versionStr) {
	// 去掉前缀（如 v0.0.0 → 0.0.0）
	const semver = versionStr.replace(build_config.version_prefix, '');
	const [major, minor, patch] = semver.split('.').map(Number);
	// 默认递增补丁版本（patch），也可按需改minor/major
	return `${build_config.version_prefix}${major}.${minor}.${patch + 1}`;
}

// 生成版本号
function buildVersion() {
	const lastVersion = readLastVersion();
	// 如果不存在版本文件，使用基础版本号，格式 v0.0.0-1694531200000
	if (!lastVersion) {
		return {
			newVersion: `${build_config.version_prefix}${build_config.base_version}${build_config.version_separator}${Date.now().toString()}`,
			updatedAt: new Date().toISOString()
		}
	}
	console.log(`✅	上一次版本号：${lastVersion}`);
	// 如果读取到上一次版本号，更新版本号
	const oldVersionBase = lastVersion.split(build_config.version_separator)[0];
	const newVersionBase = incrementSemver(oldVersionBase);
	const newVersion = `${newVersionBase}${build_config.version_separator}${Date.now().toString()}`;
	// 打印版本号
	console.log(`✅	生成新版本号：${newVersion}`);
	// 返回版本号
	return {
		lastVersion,
		newVersion,
		updatedAt: new Date().toISOString()
	};
}

// 生成版本号
const versionInfo = buildVersion();
// 写入版本文件
fs.writeFileSync(build_config.version_out_file_path, JSON.stringify(versionInfo), 'utf8');
