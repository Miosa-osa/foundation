<script lang="ts">
	import { Input } from '$lib/ui';
</script>

<section class="ds-section">
	<h2 class="ds-title">Inputs</h2>
	<p class="ds-desc">Form inputs with monochrome focus rings, status states, sizes, and icon slots.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Default & Sizes</h3>
		<div class="ds-demo-col" style="max-width: 380px;">
			<div>
				<label class="ds-input-label">Email</label>
				<Input placeholder="you@example.com" />
			</div>
			<div>
				<label class="ds-input-label">Large Input</label>
				<Input placeholder="Project name..." size="large" />
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">With Icons</h3>
		<p class="ds-card__sub">Prefix and suffix icon slots via <code>prefix</code> / <code>suffix</code> snippets</p>
		<div class="ds-demo-col" style="max-width: 380px;">
			<Input placeholder="Search anything...">
				{#snippet prefix()}
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
				{/snippet}
			</Input>
			<Input placeholder="your-slug" size="large">
				{#snippet prefix()}
					<span style="font-size: 13px; color: var(--dt3); font-weight: 500;">app.miosa.io/</span>
				{/snippet}
			</Input>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Status States</h3>
		<p class="ds-card__sub">Monochrome base with semantic status borders</p>
		<div class="ds-demo-col" style="max-width: 380px;">
			<div>
				<label class="ds-input-label">Default</label>
				<Input placeholder="Neutral input" status="default" />
			</div>
			<div>
				<label class="ds-input-label ds-input-label--error">Email</label>
				<Input placeholder="Invalid email address" status="error" />
				<span class="ds-input-hint ds-input-hint--error">Please enter a valid email</span>
			</div>
			<div>
				<label class="ds-input-label ds-input-label--success">Username</label>
				<Input placeholder="Available" status="success" />
				<span class="ds-input-hint ds-input-hint--success">Username is available</span>
			</div>
			<div>
				<label class="ds-input-label">Password</label>
				<Input placeholder="Weak password" status="warning" type="password" />
				<span class="ds-input-hint ds-input-hint--warning">Use 8+ characters with mixed case</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Input Group</h3>
		<p class="ds-card__sub">Combined input with pill button action</p>
		<div style="max-width: 420px;">
			<label class="ds-input-label">Invite by Email</label>
			<div style="display: flex; gap: 8px; align-items: stretch;">
				<div style="flex: 1;">
					<Input placeholder="colleague@company.com" />
				</div>
				<button class="btn-pill btn-pill-primary btn-pill-sm" style="flex-shrink: 0;">Send Invite</button>
			</div>
		</div>

		<div style="max-width: 420px; margin-top: 16px;">
			<label class="ds-input-label">Search with Action</label>
			<div style="display: flex; gap: 8px; align-items: stretch;">
				<div style="flex: 1;">
					<Input placeholder="Search projects...">
						{#snippet prefix()}
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
						{/snippet}
					</Input>
				</div>
				<button class="btn-rounded btn-rounded-secondary" style="flex-shrink: 0;">
					<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>
					Filters
				</button>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Textarea</h3>
		<p class="ds-card__sub">Multi-line input with monochrome focus ring</p>
		<div style="max-width: 420px;">
			<label class="ds-input-label">Description</label>
			<textarea class="ds-textarea" placeholder="Write a short project description..." rows="3"></textarea>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Disabled</h3>
		<div style="max-width: 380px;">
			<Input placeholder="Cannot edit this field" disabled />
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Props Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Prop</th><th>Type</th><th>Default</th></tr></thead>
			<tbody>
				<tr><td><code>status</code></td><td>'default' | 'error' | 'success' | 'warning'</td><td>'default'</td></tr>
				<tr><td><code>size</code></td><td>'default' | 'large'</td><td>'default'</td></tr>
				<tr><td><code>prefix</code></td><td>Snippet</td><td>-</td></tr>
				<tr><td><code>suffix</code></td><td>Snippet</td><td>-</td></tr>
				<tr><td><code>disabled</code></td><td>boolean</td><td>false</td></tr>
			</tbody>
		</table>
	</div>
</section>
