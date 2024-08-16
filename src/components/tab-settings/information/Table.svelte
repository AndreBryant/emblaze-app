<script>
	export let data;
</script>

<table class="table-fixed w-96">
	<thead>
		<th class="text-lg font-semibold">{data.head}</th>
	</thead>
	<tbody>
		{#each data.properties as p}
			<tr class="">
				{#each Object.entries(p) as [k, v]}
					<td class="opacity-70"><pre>{k}</pre></td>
					<td class="opacity-70"><pre>{v.toString().length > 0 ? v : 'none'}</pre></td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
