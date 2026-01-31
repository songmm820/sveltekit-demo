<script lang="ts">
	import { LocalEnvTools, executeCommand, type LocalEnvTool } from '$lib/business/env-tools';
	import { onMount } from 'svelte';

	type EnvObj = LocalEnvTool & { version?: string };

	let envs: EnvObj[] = $state(LocalEnvTools);

	async function detectSingleEnv(env: EnvObj) {
		const cmdResult = await executeCommand(env.cmd);
		if (cmdResult) {
			env.version = cmdResult || 'N/A';
		}
	}

	async function detectAllEnvs() {
		await Promise.all(envs.map((env) => detectSingleEnv(env)));
	}

	async function getBinPath(env: EnvObj) {
		const cmd = `where ${env.binName}`;
		const cmdResult = await executeCommand(cmd);
		if (cmdResult) {
			return cmdResult.trim();
		}
		return 'N/A';
	}

	onMount(async () => {
		await detectAllEnvs();
	});
</script>

<main class="flex size-full flex-col items-center justify-center">
	<!-- 整体居中 -->
	<div class="flex flex-wrap size-full p-4 gap-8">
		{#each envs as env (env.name)}
			<div
				class="flex size-36 flex-col items-center justify-center rounded-md border-2 border-primary text-lg font-bold"
				aria-hidden="true"
				onclick={() => getBinPath(env)}
			>
				<div>
					{env.name}
				</div>
				<div>
					{env.version}
				</div>
			</div>
		{/each}
	</div>
</main>
