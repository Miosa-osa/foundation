<script lang="ts">
	import { Select, Input } from '$lib/ui';

	const countryOptions = [
		{ value: 'us', label: 'United States' },
		{ value: 'ca', label: 'Canada' },
		{ value: 'gb', label: 'United Kingdom' },
		{ value: 'de', label: 'Germany' },
		{ value: 'fr', label: 'France' },
		{ value: 'jp', label: 'Japan' },
		{ value: 'au', label: 'Australia' },
	];

	const roleOptions = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
		{ value: 'guest', label: 'Guest', disabled: true },
	];

	const priorityOptions = [
		{ value: 'critical', label: 'Critical' },
		{ value: 'high', label: 'High' },
		{ value: 'medium', label: 'Medium' },
		{ value: 'low', label: 'Low' },
	];

	const statusOptions = [
		{ value: 'active', label: 'Active' },
		{ value: 'paused', label: 'Paused' },
		{ value: 'archived', label: 'Archived' },
	];

	let basicValue = $state('');
	let preSelectedValue = $state('us');
	let sizeDefaultValue = $state('');
	let sizeLargeValue = $state('');
	let errorValue = $state('');
	let successValue = $state('gb');
	let disabledValue = $state('');
	let formName = $state('');
	let formRole = $state('');
	let formPriority = $state('medium');
	let formSubmitted = $state(false);

	function handleFormSubmit() {
		formSubmitted = true;
		setTimeout(() => { formSubmitted = false; }, 2000);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Select</h2>
	<p class="ds-desc">Dropdown select with keyboard navigation, status states, and accessible markup. Built on Bits UI Select primitive.</p>

	<!-- Basic Select -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Select</h3>
		<p class="ds-card__sub">Default, with placeholder, and pre-selected value</p>
		<div class="ds-demo-col" style="max-width: 320px;">
			<div>
				<label class="ds-input-label">Country (empty)</label>
				<Select
					options={countryOptions}
					placeholder="Choose a country..."
					bind:value={basicValue}
				/>
				{#if basicValue}
					<span class="ds-input-hint">Selected: {basicValue}</span>
				{/if}
			</div>
			<div>
				<label class="ds-input-label">Country (pre-selected)</label>
				<Select
					options={countryOptions}
					bind:value={preSelectedValue}
				/>
			</div>
		</div>
	</div>

	<!-- Sizes & Status -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sizes & Status</h3>
		<p class="ds-card__sub">Default (32px) and large (40px) sizes, with error and success states</p>
		<div class="ds-demo-col" style="max-width: 320px;">
			<div>
				<label class="ds-input-label">Default size</label>
				<Select options={statusOptions} bind:value={sizeDefaultValue} placeholder="Select status..." />
			</div>
			<div>
				<label class="ds-input-label">Large size</label>
				<Select options={statusOptions} size="large" bind:value={sizeLargeValue} placeholder="Select status..." />
			</div>
			<div>
				<label class="ds-input-label ds-input-label--error">Priority (error)</label>
				<Select options={priorityOptions} status="error" bind:value={errorValue} placeholder="Select priority..." />
				<span class="ds-input-hint ds-input-hint--error">Please select a priority level</span>
			</div>
			<div>
				<label class="ds-input-label ds-input-label--success">Country (success)</label>
				<Select options={countryOptions} status="success" bind:value={successValue} />
				<span class="ds-input-hint ds-input-hint--success">Location verified</span>
			</div>
		</div>
	</div>

	<!-- Disabled Options -->
	<div class="ds-card">
		<h3 class="ds-card__title">With Disabled Options</h3>
		<p class="ds-card__sub">Individual options can be disabled via <code>disabled: true</code> on the option object</p>
		<div style="max-width: 320px;">
			<label class="ds-input-label">Role</label>
			<Select
				options={roleOptions}
				bind:value={disabledValue}
				placeholder="Assign a role..."
			/>
			<span class="ds-input-hint">"Guest" is disabled and cannot be selected</span>
		</div>
	</div>

	<!-- Form Pattern -->
	<div class="ds-card">
		<h3 class="ds-card__title">Form Pattern</h3>
		<p class="ds-card__sub">Realistic form combining Select with Input and Button</p>
		<form
			style="max-width: 380px; display: flex; flex-direction: column; gap: 14px;"
			onsubmit={(e) => { e.preventDefault(); handleFormSubmit(); }}
		>
			<div>
				<label class="ds-input-label">Full Name</label>
				<Input placeholder="Jane Smith" bind:value={formName} />
			</div>
			<div>
				<label class="ds-input-label">Role</label>
				<Select options={roleOptions} bind:value={formRole} placeholder="Assign a role..." />
			</div>
			<div>
				<label class="ds-input-label">Priority</label>
				<Select options={priorityOptions} bind:value={formPriority} />
			</div>
			<div style="display: flex; gap: 8px; justify-content: flex-end; margin-top: 4px;">
				<button type="button" class="btn-pill btn-pill-ghost btn-pill-sm">Cancel</button>
				<button type="submit" class="btn-pill btn-pill-primary btn-pill-sm">
					{#if formSubmitted}
						Saved!
					{:else}
						Save Member
					{/if}
				</button>
			</div>
		</form>
	</div>

	<!-- Disabled state -->
	<div class="ds-card">
		<h3 class="ds-card__title">Disabled</h3>
		<div style="max-width: 320px;">
			<Select options={countryOptions} value="us" disabled />
		</div>
	</div>

	<!-- Props Reference -->
	<div class="ds-card">
		<h3 class="ds-card__title">Props Reference</h3>
		<table class="ds-table">
			<thead>
				<tr>
					<th>Prop</th>
					<th>Type</th>
					<th>Default</th>
					<th>Description</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td><code>value</code></td>
					<td>string (bindable)</td>
					<td>''</td>
					<td>Currently selected value</td>
				</tr>
				<tr>
					<td><code>options</code></td>
					<td>Array&lt;&#123;value, label, disabled?&#125;&gt;</td>
					<td>required</td>
					<td>List of selectable options</td>
				</tr>
				<tr>
					<td><code>placeholder</code></td>
					<td>string</td>
					<td>'Select an option...'</td>
					<td>Shown when no value is selected</td>
				</tr>
				<tr>
					<td><code>size</code></td>
					<td>'default' | 'large'</td>
					<td>'default'</td>
					<td>Trigger height (32px / 40px)</td>
				</tr>
				<tr>
					<td><code>status</code></td>
					<td>'default' | 'error' | 'success'</td>
					<td>'default'</td>
					<td>Border color state</td>
				</tr>
				<tr>
					<td><code>disabled</code></td>
					<td>boolean</td>
					<td>false</td>
					<td>Disables the entire select</td>
				</tr>
				<tr>
					<td><code>onValueChange</code></td>
					<td>(value: string) =&gt; void</td>
					<td>-</td>
					<td>Callback when selection changes</td>
				</tr>
			</tbody>
		</table>
	</div>
</section>
