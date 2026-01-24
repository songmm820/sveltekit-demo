<!-- 
 @component
 - 完结撒花
-->
<script lang="ts">
	const characters: string[] = ['🥳', '🎉', '✨'];
	type confetti = {
		// 字符
		character: string;
		// 水平位置
		x: number;
		// 垂直位置
		y: number;
		// 缩放比例
		r: number;
	};

	let confetti: confetti[] = $state(
		new Array(100)
			.fill(0)
			.map((_, i) => {
				return {
					character: characters[i % characters.length],
					x: Math.random() * 100,
					y: Math.random() * -100 - 20,
					r: 0.1 + Math.random() * 1
				};
			})
			.sort((a, b) => a.r - b.r)
	);

	$effect(() => {
		let frame = requestAnimationFrame(function loop() {
			frame = requestAnimationFrame(loop);
			for (const confetto of confetti) {
				confetto.y += 0.3 * confetto.r;
				if (confetto.y > 120) confetto.y = -20;
			}
		});

		return () => cancelAnimationFrame(frame);
	});
</script>

{#each confetti as c, index (index)}
	<span class="confetto" style:left="{c.x}%" style:top="{c.y}%" style:scale={c.r}>
		{c.character}
	</span>
{/each}

<style lang="css">
	@reference '#app.css';
	.confetto {
		@apply absolute text-5xl select-none;
	}
</style>
