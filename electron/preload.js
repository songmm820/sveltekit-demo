// 预加载脚本
import { contextBridge } from 'electron';
import { version } from 'os';

// 暴露 API 给渲染进程
contextBridge.exposeInMainWorld('electronAPI', {
	// 系统版本
	version: version(),
	// Electron 版本
	electronVersion: process.versions.electron,
	// Node.js 版本
	nodeVersion: process.versions.node,
	// Chrome 版本
	chromeVersion: process.versions.chrome
});
