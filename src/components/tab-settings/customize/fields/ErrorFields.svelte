<script>
	import { hasError } from '$lib/stores/customize-stores.js';
	export let field;
</script>

{#if $hasError[field].value}
	<div>
		{#each $hasError[field].errors as error}
			<p class="text-red-600">{error}</p>
		{/each}
	</div>
{/if}
