<script lang="ts">
	import { Button, Modal } from '$lib/ui';
	let modalOpen = $state(false);
	let modalSize = $state<'sm' | 'default' | 'lg' | 'xl' | 'full'>('default');
	function openModal(size: 'sm' | 'default' | 'lg' | 'xl' | 'full') {
		modalSize = size;
		modalOpen = true;
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Dialogs</h2>
	<p class="ds-desc">Modal overlays built on Bits UI Dialog.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Sizes</h3>
		<div class="ds-demo">
			{#each [{ s: 'sm' as const }, { s: 'default' as const }, { s: 'lg' as const }, { s: 'xl' as const }] as { s }}
				<Button variant="secondary" onclick={() => openModal(s)}>{s}</Button>
			{/each}
		</div>
		<Modal bind:open={modalOpen} size={modalSize} title="Dialog Title" description="This is a {modalSize} dialog.">
			<p style="font-size: 14px; margin: 0;">Dialog body content goes here. Current size: <strong>{modalSize}</strong></p>
			<div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 20px;">
				<button class="btn-pill btn-pill-ghost btn-pill-sm" onclick={() => modalOpen = false}>Cancel</button>
				<button class="btn-pill btn-pill-primary btn-pill-sm" onclick={() => modalOpen = false}>Confirm</button>
			</div>
		</Modal>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Props</h3>
		<table class="ds-table">
			<thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead>
			<tbody>
				<tr><td><code>open</code></td><td>boolean</td><td>false</td></tr>
				<tr><td><code>size</code></td><td>'sm' | 'default' | 'lg' | 'xl' | 'full'</td><td>'default'</td></tr>
				<tr><td><code>title</code></td><td>string</td><td>-</td></tr>
				<tr><td><code>description</code></td><td>string</td><td>-</td></tr>
				<tr><td><code>showClose</code></td><td>boolean</td><td>true</td></tr>
			</tbody>
		</table>
	</div>
</section>
