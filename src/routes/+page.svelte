<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	onMount(() => goto('/component-library'));
</script>

<div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: -apple-system, BlinkMacSystemFont, sans-serif;">
	<div style="text-align: center;">
		<h1 style="font-size: 28px; font-weight: 700; letter-spacing: -0.02em; margin-bottom: 8px;">MIOSA Foundation</h1>
		<p style="color: #888; font-size: 15px;">Redirecting to component library...</p>
	</div>
</div>
