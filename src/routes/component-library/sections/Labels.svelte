<script lang="ts">
	let charValue = $state('');
	const charLimit = 120;

	let floatingValues = $state({ email: '', name: '', company: '' });

	function charCount(val: string) {
		return val.length;
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Labels</h2>
	<p class="ds-desc">
		Form field label patterns — positioning, states, required indicators, help text, character
		counts, and floating labels. Every variant stays readable on dark backgrounds.
	</p>

	<!-- ═══ BASIC LABEL ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Label</h3>
		<p class="ds-card__sub">Label above input — the default form pattern</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 20px; max-width: 360px;">
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-name" style="font-size: 13px; font-weight: 500; color: #ccc; letter-spacing: 0.01em;">
					Full Name
				</label>
				<input
					id="lbl-name"
					type="text"
					placeholder="Jane Smith"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-email" style="font-size: 13px; font-weight: 500; color: #ccc; letter-spacing: 0.01em;">
					Email Address
				</label>
				<input
					id="lbl-email"
					type="email"
					placeholder="jane@example.com"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
			</div>
		</div>
	</div>

	<!-- ═══ REQUIRED LABEL ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Required Label</h3>
		<p class="ds-card__sub">Red asterisk indicates mandatory fields</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 20px; max-width: 360px;">
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-req-name" style="font-size: 13px; font-weight: 500; color: #ccc; letter-spacing: 0.01em; display: flex; align-items: center; gap: 4px;">
					Project Name
					<span style="color: #ef4444; font-size: 13px; line-height: 1;" aria-hidden="true">*</span>
				</label>
				<input
					id="lbl-req-name"
					type="text"
					placeholder="My Awesome Project"
					required
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-req-email" style="font-size: 13px; font-weight: 500; color: #ccc; letter-spacing: 0.01em; display: flex; align-items: center; gap: 4px;">
					Work Email
					<span style="color: #ef4444; font-size: 13px; line-height: 1;" aria-hidden="true">*</span>
				</label>
				<input
					id="lbl-req-email"
					type="email"
					placeholder="you@company.com"
					required
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
			</div>
			<p style="margin: 0; font-size: 12px; color: #555;">
				<span style="color: #ef4444;">*</span> Required field
			</p>
		</div>
	</div>

	<!-- ═══ LABEL WITH HELP TEXT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Label with Help Text</h3>
		<p class="ds-card__sub">Descriptive hint below the input to guide users</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 20px; max-width: 360px;">
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-slug" style="font-size: 13px; font-weight: 500; color: #ccc;">
					Project Slug
				</label>
				<input
					id="lbl-slug"
					type="text"
					placeholder="my-project"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box; font-family: 'SF Mono', 'Fira Code', monospace;"
				/>
				<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.5;">
					Lowercase letters, numbers, and hyphens only. Used in your project URL.
				</p>
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-token" style="font-size: 13px; font-weight: 500; color: #ccc;">
					API Token
				</label>
				<input
					id="lbl-token"
					type="password"
					placeholder="sk-••••••••••••••••"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
				<p style="margin: 0; font-size: 12px; color: #666; line-height: 1.5; display: flex; align-items: flex-start; gap: 5px;">
					<svg style="width: 13px; height: 13px; flex-shrink: 0; margin-top: 1px; color: #555;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
					Keep this token secret. Generate a new one in your account settings.
				</p>
			</div>
		</div>
	</div>

	<!-- ═══ OPTIONAL LABEL ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Optional Label</h3>
		<p class="ds-card__sub">Muted "(optional)" text signals non-required fields</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 20px; max-width: 360px;">
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-bio" style="font-size: 13px; font-weight: 500; color: #ccc; display: flex; align-items: center; gap: 6px;">
					Bio
					<span style="font-size: 11px; font-weight: 400; color: #555;">(optional)</span>
				</label>
				<textarea
					id="lbl-bio"
					placeholder="Tell us a bit about yourself..."
					rows="3"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box; resize: vertical; font-family: inherit;"
				></textarea>
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-website" style="font-size: 13px; font-weight: 500; color: #ccc; display: flex; align-items: center; gap: 6px;">
					Website
					<span style="font-size: 11px; font-weight: 400; color: #555;">(optional)</span>
				</label>
				<input
					id="lbl-website"
					type="url"
					placeholder="https://yoursite.com"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
			</div>
		</div>
	</div>

	<!-- ═══ CHARACTER COUNT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Label with Character Count</h3>
		<p class="ds-card__sub">Live counter updates as the user types</p>
		<div style="max-width: 360px;">
			<div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
				<label for="lbl-char" style="font-size: 13px; font-weight: 500; color: #ccc;">
					Project Description
				</label>
				<span style="font-size: 12px; color: {charCount(charValue) > charLimit * 0.9 ? (charCount(charValue) >= charLimit ? '#ef4444' : '#f59e0b') : '#555'};">
					{charCount(charValue)}/{charLimit}
				</span>
			</div>
			<textarea
				id="lbl-char"
				bind:value={charValue}
				maxlength={charLimit}
				placeholder="Describe your project in a sentence or two..."
				rows="3"
				style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid {charCount(charValue) >= charLimit ? 'rgba(239,68,68,0.4)' : 'rgba(255,255,255,0.1)'}; border-radius: 7px; outline: none; box-sizing: border-box; resize: none; font-family: inherit; transition: border-color 0.15s;"
			></textarea>
			{#if charCount(charValue) >= charLimit}
				<p style="margin: 4px 0 0; font-size: 12px; color: #ef4444;">Character limit reached.</p>
			{/if}
		</div>
	</div>

	<!-- ═══ FLOATING LABEL ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Floating Label</h3>
		<p class="ds-card__sub">Label animates up on focus or when the field has a value</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 20px; max-width: 360px;">
			{#each [
				{ id: 'fl-email', key: 'email' as const, type: 'email', label: 'Email Address', placeholder: 'jane@example.com' },
				{ id: 'fl-name', key: 'name' as const, type: 'text', label: 'Full Name', placeholder: 'Jane Smith' },
				{ id: 'fl-company', key: 'company' as const, type: 'text', label: 'Company', placeholder: 'Acme Corp' },
			] as field}
				<div style="position: relative; width: 100%;">
					<input
						id={field.id}
						type={field.type}
						bind:value={floatingValues[field.key]}
						placeholder=" "
						style="width: 100%; padding: 18px 12px 6px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; box-sizing: border-box; transition: border-color 0.15s;"
						onfocus={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.25)'}
						onblur={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'}
					/>
					<label
						for={field.id}
						style="position: absolute; left: 12px; top: {floatingValues[field.key] ? '5px' : '50%'}; transform: translateY({floatingValues[field.key] ? '0' : '-50%'}); font-size: {floatingValues[field.key] ? '10px' : '14px'}; font-weight: {floatingValues[field.key] ? '500' : '400'}; color: {floatingValues[field.key] ? '#777' : '#555'}; pointer-events: none; transition: top 0.15s, transform 0.15s, font-size 0.15s, color 0.15s; letter-spacing: {floatingValues[field.key] ? '0.04em' : '0'}; text-transform: {floatingValues[field.key] ? 'uppercase' : 'none'};"
					>
						{field.label}
					</label>
				</div>
			{/each}
		</div>
		<p style="margin: 16px 0 0; font-size: 12px; color: #555;">Type into any field to see the floating label animation.</p>
	</div>

	<!-- ═══ LABEL POSITIONS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Label Positions</h3>
		<p class="ds-card__sub">Top (default), left inline, right inline</p>
		<div style="display: flex; flex-direction: column; gap: 20px; max-width: 420px;">
			<!-- Top (default) -->
			<div>
				<h4 class="ds-card__h4">Top</h4>
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<label for="pos-top" style="font-size: 13px; font-weight: 500; color: #ccc;">Username</label>
					<input id="pos-top" type="text" placeholder="@miosa" style="padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none;" />
				</div>
			</div>
			<!-- Left inline -->
			<div>
				<h4 class="ds-card__h4">Left (inline)</h4>
				<div style="display: flex; align-items: center; gap: 12px;">
					<label for="pos-left" style="font-size: 13px; font-weight: 500; color: #ccc; white-space: nowrap; min-width: 80px; text-align: right;">Username</label>
					<input id="pos-left" type="text" placeholder="@miosa" style="flex: 1; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none;" />
				</div>
			</div>
			<!-- Right inline (toggle/checkbox use case) -->
			<div>
				<h4 class="ds-card__h4">Right (checkbox / toggle use case)</h4>
				<div style="display: flex; align-items: center; gap: 10px;">
					<input id="pos-right" type="checkbox" style="width: 16px; height: 16px; accent-color: #fff; cursor: pointer;" />
					<label for="pos-right" style="font-size: 13px; font-weight: 500; color: #ccc; cursor: pointer;">Enable notifications</label>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ DISABLED & ERROR STATES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Disabled & Error States</h3>
		<p class="ds-card__sub">Visual treatment for non-interactive and invalid fields</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 20px; max-width: 360px;">
			<!-- Disabled -->
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%; opacity: 0.45;">
				<label for="lbl-disabled" style="font-size: 13px; font-weight: 500; color: #888; cursor: not-allowed;">
					Account ID
				</label>
				<input
					id="lbl-disabled"
					type="text"
					value="acc_9f3k2m1x"
					disabled
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #888; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 7px; outline: none; cursor: not-allowed; box-sizing: border-box; font-family: 'SF Mono', monospace;"
				/>
				<p style="margin: 0; font-size: 12px; color: #555;">This field is read-only.</p>
			</div>

			<!-- Error -->
			<div style="display: flex; flex-direction: column; gap: 6px; width: 100%;">
				<label for="lbl-error" style="font-size: 13px; font-weight: 500; color: #f87171; display: flex; align-items: center; gap: 5px;">
					<svg style="width: 13px; height: 13px; flex-shrink: 0;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
					Email Address
				</label>
				<input
					id="lbl-error"
					type="email"
					value="not-an-email"
					style="width: 100%; padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.4); border-radius: 7px; outline: none; box-sizing: border-box;"
				/>
				<p style="margin: 0; font-size: 12px; color: #f87171;">Please enter a valid email address.</p>
			</div>
		</div>
	</div>

	<!-- ═══ REAL FORM EXAMPLE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Real Form Example</h3>
		<p class="ds-card__sub">All label patterns composed together in a realistic form</p>
		<form style="display: flex; flex-direction: column; gap: 18px; max-width: 380px;" onsubmit={e => e.preventDefault()}>
			<div style="display: flex; flex-direction: column; gap: 6px;">
				<label for="form-fullname" style="font-size: 13px; font-weight: 500; color: #ccc; display: flex; align-items: center; gap: 4px;">
					Full Name <span style="color: #ef4444;" aria-hidden="true">*</span>
				</label>
				<input id="form-fullname" type="text" placeholder="Jane Smith" required style="padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none;" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px;">
				<label for="form-work-email" style="font-size: 13px; font-weight: 500; color: #ccc; display: flex; align-items: center; gap: 4px;">
					Work Email <span style="color: #ef4444;" aria-hidden="true">*</span>
				</label>
				<input id="form-work-email" type="email" placeholder="jane@company.com" required style="padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none;" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px;">
				<label for="form-role" style="font-size: 13px; font-weight: 500; color: #ccc; display: flex; align-items: center; gap: 6px;">
					Role <span style="font-size: 11px; font-weight: 400; color: #555;">(optional)</span>
				</label>
				<input id="form-role" type="text" placeholder="Senior Engineer" style="padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none;" />
			</div>
			<div style="display: flex; flex-direction: column; gap: 6px;">
				<div style="display: flex; justify-content: space-between; align-items: baseline;">
					<label for="form-message" style="font-size: 13px; font-weight: 500; color: #ccc; display: flex; align-items: center; gap: 4px;">
						Message <span style="color: #ef4444;" aria-hidden="true">*</span>
					</label>
					<span style="font-size: 12px; color: #555;">0/500</span>
				</div>
				<textarea id="form-message" placeholder="How can we help you?" rows="4" required style="padding: 8px 12px; font-size: 14px; color: #ddd; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 7px; outline: none; resize: vertical; font-family: inherit;"></textarea>
				<p style="margin: 0; font-size: 12px; color: #555;">We typically respond within 1 business day.</p>
			</div>
			<div style="display: flex; align-items: center; gap: 10px;">
				<input id="form-terms" type="checkbox" style="width: 15px; height: 15px; accent-color: #fff; cursor: pointer;" />
				<label for="form-terms" style="font-size: 13px; color: #888; cursor: pointer;">
					I agree to the <a href="/terms" style="color: #ccc; text-decoration: underline; text-underline-offset: 2px;">Terms of Service</a>
				</label>
			</div>
			<div style="display: flex; gap: 8px;">
				<button type="button" class="btn-pill btn-pill-secondary btn-pill-sm">Cancel</button>
				<button type="submit" class="btn-pill btn-pill-primary btn-pill-sm">Send Message</button>
			</div>
		</form>
	</div>
</section>
