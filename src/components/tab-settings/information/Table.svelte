<script>
	export let data;
</script>

<table class="table-fixed w-full">
	<thead>
		<th class="text-lg font-normal">{data.head}</th>
	</thead>
	<tbody>
		{#each data.properties as p}
			<tr class="hover:opacity-95 opacity-70">
				{#each Object.entries(p) as [k, v]}
					<td><pre>&gt; {k}</pre></td>
					<td><pre>{v.toString().length > 0 ? v : 'none'}</pre></td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
