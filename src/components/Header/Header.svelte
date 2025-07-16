<script>
	import H2 from './H2.svelte';
	import H3 from './H3.svelte';
	export let title = '';
	export let subtitle = '';
</script>

<div class="flex flex-col gap-2 px-12 pt-8">
	<H2>{title}</H2>
	<H3>{subtitle}</H3>
	<hr class="border-secondary/10" />
</div>
