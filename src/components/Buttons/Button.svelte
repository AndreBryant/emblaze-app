<script>
	export let type;
	export let variant;
	export let value;
	export let wFull = false;
	export let onclick;
	export let icon = null;
	let style;

	switch (variant) {
		case 'primary':
			style =
				'my-2 px-2 py-1 text-sm text-secondary bg-acc-2 font-semibold rounded-lg' +
				(wFull ? ' w-full' : '') +
				' hover:bg-acc-2-dark hover:cursor-pointer' +
				' transition duration-150' +
				' overflow-hidden text-ellipsis whitespace-nowrap';

			break;
		case 'destructive':
			style =
				'my-2 px-2 py-1 text-sm text-secondary bg-red-700 font-semibold rounded-lg' +
				(wFull ? ' w-full' : '') +
				' hover:bg-red-800 hover:cursor-pointer' +
				' transition duration-150' +
				' overflow-hidden text-ellipsis whitespace-nowrap';

			break;
		case 'outline':
			style =
				'my-2 px-2 py-1 text-sm text-primary bg-secondary font-semibold rounded-lg border border-primary' +
				(wFull ? ' w-full' : '') +
				' hover:bg-secondary-dark hover:cursor-pointer' +
				' transition duration-150' +
				' overflow-hidden text-ellipsis whitespace-nowrap';

			break;
		case 'ghost':
			style =
				'my-2 px-2 py-1 text-sm text-secondary font-semibold rounded-lg' +
				(wFull ? ' w-full' : '') +
				' hover:bg-secondary-acc hover:cursor-pointer' +
				' transition duration-150' +
				' overflow-hidden text-ellipsis whitespace-nowrap';

			break;
		case 'link':
			style =
				'underline underline-offset-2 my-2 text-sm text-secondary-dark font-semibold' +
				(wFull ? ' w-full' : '') +
				' hover:text-secondary hover:cursor-pointer' +
				' transition duration-150' +
				' overflow-hidden text-ellipsis whitespace-nowrap';
			break;
	}
</script>

<button {type} class={style + 'flex flex-row gap-2'} on:click={onclick}>
	<span class="icon">
		<svelte:component this={icon} size={22} />
	</span>
	{value ? value : ''}
	<slot />
</button>
