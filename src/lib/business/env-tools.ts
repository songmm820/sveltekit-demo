export type LocalEnvTool = {
	name: string;
	cmd: string;
	binName: string;
	versionReg: RegExp;
};

export const LocalEnvTools: LocalEnvTool[] = [
	{
		name: 'Node.js',
		cmd: 'node --version',
		binName: 'node.exe',
		versionReg: /v(\d+\.\d+\.\d+)/
	},
	{
		name: 'Bun',
		cmd: 'bun --version',
		binName: 'bun.exe',
		versionReg: /v(\d+\.\d+\.\d+)/
	},
	{
		name: 'Yarn',
		cmd: 'yarn --version',
		binName: 'yarn.cmd',
		versionReg: /v(\d+\.\d+\.\d+)/
	},
	{
		name: 'PNPM',
		cmd: 'pnpm --version',
		binName: 'pnpm.cmd',
		versionReg: /v(\d+\.\d+\.\d+)/
	}
];

/**
 * 执行 cmd 命令
 *
 * @param cmd 命令
 * @returns 命令执行结果
 */
export async function executeCommand(cmd: string) {
	return await window.electronAPI.executeCommand(cmd);
}
