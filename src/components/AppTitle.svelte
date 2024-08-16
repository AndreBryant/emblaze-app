<script>
	import { Flame } from 'lucide-svelte';
</script>

<div>
	<h1 class="text-2xl flex flex-row items-center gap-2">
		<Flame class="text-acc-1-light" /><slot />
	</h1>
</div>
