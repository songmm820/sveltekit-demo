import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { executeCommand } from './execute-cmd.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 关闭安全策略
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		minWidth: 1200,
		minHeight: 800,
		transparent: false,
		titleBarStyle: 'default',
		webPreferences: {
			nodeIntegration: true, // 为页面集成 Node.js 环境
			contextIsolation: true, // 上下文隔离
			preload: path.join(__dirname, 'preload.js')
		}
	});
	win.webContents.openDevTools();

	win.loadURL('http://localhost:4143');
}

ipcMain.handle('execute-command', async (event, cmd) => {
	return await executeCommand(cmd);
});

app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});
