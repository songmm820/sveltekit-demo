// 定义需要检测的开发工具列表
import { exec } from 'child_process';

/**
 * 执行 cmd 命令
 *
 * @param cmd 命令
 * @returns 命令执行结果
 */
export function executeCommand(cmd) {
	return new Promise((resolve, reject) => {
		exec(cmd, { windowsHide: true }, (error, stdout, stderr) => {
			const output = stdout.trim() || stderr.trim();
			if (error || !output) {
				reject(error);
			} else {
				resolve(output);
			}
		});
	});
}
