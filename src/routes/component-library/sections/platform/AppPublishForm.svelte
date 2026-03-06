<section class="ds-section">
	<h2 class="ds-title">App Publish Form</h2>
	<p class="ds-subtitle">Application metadata forms, category selectors, publish workflows, and version management.</p>

	<div class="ds-card">
		<h3 class="ds-card__title">Application Information</h3>
		<div class="ap-form">
			<div class="ap-form__field">
				<label class="ap-form__label">App Icon</label>
				<div class="ap-icon-upload">
					<div class="ap-icon-upload__preview">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="4"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
					</div>
					<div class="ap-icon-upload__info">
						<span class="ap-icon-upload__text">Upload app icon</span>
						<label class="ap-icon-upload__check">
							<input type="checkbox" checked /> Auto-use app icon
						</label>
					</div>
				</div>
			</div>
			<div class="ap-form__field">
				<label class="ap-form__label">App Name</label>
				<input type="text" class="ap-input" value="AI Video Studio" />
			</div>
			<div class="ap-form__field">
				<label class="ap-form__label">Author</label>
				<input type="text" class="ap-input" value="Beko" />
			</div>
			<div class="ap-form__field">
				<label class="ap-form__label">Short Description</label>
				<input type="text" class="ap-input" placeholder="Enter a short description" />
			</div>
			<div class="ap-form__field">
				<label class="ap-form__label">Detailed Description <span class="ap-form__optional">(optional)</span></label>
				<textarea class="ap-textarea" placeholder="Describe what the app does" rows="3"></textarea>
			</div>
			<div class="ap-form__field">
				<label class="ap-form__label">Categories</label>
				<div class="ap-categories">
					<button class="ap-cat ap-cat--active">Explore</button>
					<button class="ap-cat ap-cat--active">Creation</button>
					<button class="ap-cat">Work</button>
					<button class="ap-cat">Game</button>
					<button class="ap-cat">Development</button>
				</div>
			</div>
			<div class="ap-form__actions">
				<button class="ap-btn ap-btn--ghost">Cancel</button>
				<button class="ap-btn ap-btn--outline">Save Draft</button>
				<button class="ap-btn ap-btn--primary">Publish</button>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Category Tag Selector</h3>
		<p style="font-size: 13px; color: var(--dt3); margin-bottom: 16px;">Click tags to toggle selection. Selected categories appear highlighted.</p>
		<div class="ap-tag-grid">
			<button class="ap-tag ap-tag--selected">Explore</button>
			<button class="ap-tag ap-tag--selected">Creation</button>
			<button class="ap-tag">Work</button>
			<button class="ap-tag">Game</button>
			<button class="ap-tag">Development</button>
			<button class="ap-tag">Cloud</button>
			<button class="ap-tag ap-tag--selected">AI / ML</button>
			<button class="ap-tag">Security</button>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Publish Status Flow</h3>
		<div class="ap-status-bar">
			<div class="ap-status-step ap-status-step--done">
				<div class="ap-status-step__dot">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
				</div>
				<span class="ap-status-step__label">Draft</span>
			</div>
			<div class="ap-status-step__line ap-status-step__line--done"></div>
			<div class="ap-status-step ap-status-step--active">
				<div class="ap-status-step__dot ap-status-step__dot--active">
					<div class="ap-status-step__pulse"></div>
				</div>
				<span class="ap-status-step__label">In Review</span>
			</div>
			<div class="ap-status-step__line"></div>
			<div class="ap-status-step">
				<div class="ap-status-step__dot ap-status-step__dot--pending"></div>
				<span class="ap-status-step__label">Published</span>
			</div>
		</div>
		<div style="margin-top: 24px;">
			<div class="ap-status-bar">
				<div class="ap-status-step ap-status-step--done">
					<div class="ap-status-step__dot"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
					<span class="ap-status-step__label">Draft</span>
				</div>
				<div class="ap-status-step__line ap-status-step__line--done"></div>
				<div class="ap-status-step ap-status-step--done">
					<div class="ap-status-step__dot"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
					<span class="ap-status-step__label">In Review</span>
				</div>
				<div class="ap-status-step__line ap-status-step__line--done"></div>
				<div class="ap-status-step ap-status-step--done">
					<div class="ap-status-step__dot"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></div>
					<span class="ap-status-step__label">Published</span>
				</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Version Badges</h3>
		<div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
			<span class="ap-version">v1.0.0</span>
			<span class="ap-version ap-version--current">v1.1.1 <span class="ap-version__tag">Current</span></span>
			<span class="ap-version ap-version--update">v1.2.0 <span class="ap-version__tag ap-version__tag--new">Update</span></span>
			<span class="ap-version ap-version--beta">Beta V1.1.1</span>
			<span class="ap-version ap-version--deprecated">v0.9.0 <span class="ap-version__tag ap-version__tag--dep">Deprecated</span></span>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">App Settings Card</h3>
		<div class="ap-settings">
			<div class="ap-settings__header">
				<div class="ap-settings__app">
					<div class="ap-settings__icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="m8 21 4-4 4 4"/></svg>
					</div>
					<div>
						<div class="ap-settings__name">AI Video Studio</div>
						<div class="ap-settings__meta">By Beko &middot; v1.1.1</div>
					</div>
				</div>
				<div class="ap-settings__actions-row">
					<button class="ap-btn ap-btn--icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/></svg></button>
					<button class="ap-btn ap-btn--primary">Publish</button>
				</div>
			</div>
			<div class="ap-settings__tabs">
				<button class="ap-settings__tab">Profile</button>
				<button class="ap-settings__tab ap-settings__tab--active">General</button>
				<button class="ap-settings__tab">Usage</button>
			</div>
			<div class="ap-settings__body">
				<div class="ap-settings__row"><span class="ap-settings__row-label">Language</span><span class="ap-settings__row-value">Auto</span></div>
				<div class="ap-settings__row"><span class="ap-settings__row-label">Version</span><span class="ap-settings__row-value">1.1.1</span></div>
				<div class="ap-settings__row">
					<span class="ap-settings__row-label">Issue Feedback</span>
					<div style="display:flex;gap:6px;"><button class="ap-btn ap-btn--sm ap-btn--primary">Record</button><button class="ap-btn ap-btn--sm ap-btn--outline">Submit</button></div>
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.ap-form { display: flex; flex-direction: column; gap: 20px; }
	.ap-form__field { display: flex; flex-direction: column; gap: 6px; }
	.ap-form__label { font-size: 13px; font-weight: 600; color: var(--dt, #111); }
	.ap-form__optional { font-weight: 400; color: var(--dt3, #999); }
	.ap-icon-upload { display: flex; align-items: center; gap: 12px; }
	.ap-icon-upload__preview { width: 56px; height: 56px; border-radius: 14px; background: var(--dbg2, #f5f5f5); border: 1px dashed var(--dbd, #e0e0e0); display: flex; align-items: center; justify-content: center; color: var(--dt3, #999); cursor: pointer; transition: border-color 0.2s; }
	.ap-icon-upload__preview:hover { border-color: #3b82f6; }
	.ap-icon-upload__info { display: flex; flex-direction: column; gap: 4px; }
	.ap-icon-upload__text { font-size: 13px; color: var(--dt, #111); }
	.ap-icon-upload__check { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--dt3, #999); cursor: pointer; }
	.ap-icon-upload__check input { accent-color: #3b82f6; }
	.ap-input { padding: 10px 14px; border-radius: 10px; border: 1px solid var(--dbd, #e0e0e0); background: var(--dbg, #fff); color: var(--dt, #111); font-size: 14px; outline: none; transition: border-color 0.2s; }
	.ap-input:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
	.ap-textarea { padding: 10px 14px; border-radius: 10px; border: 1px solid var(--dbd, #e0e0e0); background: var(--dbg, #fff); color: var(--dt, #111); font-size: 14px; outline: none; resize: vertical; font-family: inherit; transition: border-color 0.2s; }
	.ap-textarea:focus { border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
	.ap-categories { display: flex; flex-wrap: wrap; gap: 8px; }
	.ap-cat { padding: 6px 14px; border-radius: 20px; border: 1px solid var(--dbd, #e0e0e0); background: var(--dbg, #fff); color: var(--dt3, #666); font-size: 13px; cursor: pointer; transition: all 0.2s; }
	.ap-cat:hover { border-color: #3b82f6; color: #3b82f6; }
	.ap-cat--active { background: #3b82f6; color: #fff; border-color: #3b82f6; }
	.ap-cat--active:hover { background: #2563eb; color: #fff; }
	.ap-form__actions { display: flex; justify-content: flex-end; gap: 8px; padding-top: 12px; border-top: 1px solid var(--dbd, #e0e0e0); }
	.ap-btn { padding: 8px 18px; border-radius: 10px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: all 0.2s; }
	.ap-btn--ghost { background: transparent; color: var(--dt3, #666); }
	.ap-btn--ghost:hover { background: var(--dbg2, #f5f5f5); color: var(--dt, #111); }
	.ap-btn--outline { background: transparent; border: 1px solid var(--dbd, #e0e0e0); color: var(--dt, #111); }
	.ap-btn--outline:hover { border-color: #3b82f6; color: #3b82f6; }
	.ap-btn--primary { background: #3b82f6; color: #fff; }
	.ap-btn--primary:hover { background: #2563eb; }
	.ap-btn--sm { padding: 5px 12px; font-size: 12px; }
	.ap-btn--icon { width: 36px; height: 36px; padding: 0; display: flex; align-items: center; justify-content: center; border-radius: 10px; background: var(--dbg2, #f5f5f5); color: var(--dt3, #666); border: 1px solid var(--dbd, #e0e0e0); }
	.ap-btn--icon:hover { color: var(--dt, #111); border-color: var(--dt3, #999); }
	.ap-tag-grid { display: flex; flex-wrap: wrap; gap: 8px; }
	.ap-tag { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 24px; border: 1px solid var(--dbd, #e0e0e0); background: var(--dbg, #fff); color: var(--dt3, #666); font-size: 13px; cursor: pointer; transition: all 0.2s; }
	.ap-tag:hover { border-color: #3b82f6; color: #3b82f6; }
	.ap-tag--selected { background: #3b82f6; color: #fff; border-color: #3b82f6; }
	.ap-tag--selected:hover { background: #2563eb; color: #fff; }
	.ap-status-bar { display: flex; align-items: center; padding: 8px 0; }
	.ap-status-step { display: flex; flex-direction: column; align-items: center; gap: 8px; }
	.ap-status-step__dot { width: 28px; height: 28px; border-radius: 50%; background: #3b82f6; display: flex; align-items: center; justify-content: center; }
	.ap-status-step__dot--active { background: #3b82f6; box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
	.ap-status-step__dot--pending { background: var(--dbg2, #e5e7eb); border: 2px solid var(--dbd, #d1d5db); }
	.ap-status-step__pulse { width: 10px; height: 10px; border-radius: 50%; background: #fff; animation: ap-pulse 1.5s ease-in-out infinite; }
	@keyframes ap-pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.3); opacity: 0.7; } }
	.ap-status-step__label { font-size: 12px; color: var(--dt3, #666); font-weight: 500; white-space: nowrap; }
	.ap-status-step--done .ap-status-step__label, .ap-status-step--active .ap-status-step__label { color: var(--dt, #111); }
	.ap-status-step__line { flex: 1; height: 2px; min-width: 60px; background: var(--dbd, #e0e0e0); margin: 0 8px; margin-bottom: 26px; }
	.ap-status-step__line--done { background: #3b82f6; }
	.ap-version { display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; border-radius: 8px; border: 1px solid var(--dbd, #e0e0e0); background: var(--dbg2, #f5f5f5); font-size: 13px; font-weight: 500; color: var(--dt, #111); font-family: 'SF Mono', monospace; }
	.ap-version--current { border-color: #3b82f6; background: rgba(59, 130, 246, 0.08); }
	.ap-version--update { border-color: #f59e0b; background: rgba(245, 158, 11, 0.08); }
	.ap-version--beta { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.08); }
	.ap-version--deprecated { border-color: #ef4444; background: rgba(239, 68, 68, 0.08); opacity: 0.7; text-decoration: line-through; }
	.ap-version__tag { font-size: 10px; padding: 2px 6px; border-radius: 6px; background: #3b82f6; color: #fff; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; text-decoration: none; }
	.ap-version__tag--new { background: #f59e0b; }
	.ap-version__tag--dep { background: #ef4444; }
	.ap-settings { border: 1px solid var(--dbd, #e0e0e0); border-radius: 14px; overflow: hidden; background: var(--dbg, #fff); }
	.ap-settings__header { display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid var(--dbd, #e0e0e0); }
	.ap-settings__app { display: flex; align-items: center; gap: 12px; }
	.ap-settings__icon { width: 40px; height: 40px; border-radius: 10px; background: linear-gradient(135deg, #6366f1, #3b82f6); display: flex; align-items: center; justify-content: center; color: #fff; }
	.ap-settings__name { font-size: 14px; font-weight: 600; color: var(--dt, #111); }
	.ap-settings__meta { font-size: 12px; color: var(--dt3, #999); }
	.ap-settings__actions-row { display: flex; align-items: center; gap: 8px; }
	.ap-settings__tabs { display: flex; border-bottom: 1px solid var(--dbd, #e0e0e0); padding: 0 20px; }
	.ap-settings__tab { padding: 10px 16px; font-size: 13px; color: var(--dt3, #666); border: none; background: transparent; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
	.ap-settings__tab:hover { color: var(--dt, #111); }
	.ap-settings__tab--active { color: #3b82f6; border-bottom-color: #3b82f6; font-weight: 500; }
	.ap-settings__body { padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; }
	.ap-settings__row { display: flex; align-items: center; justify-content: space-between; padding: 8px 0; }
	.ap-settings__row-label { font-size: 13px; font-weight: 500; color: var(--dt, #111); }
	.ap-settings__row-value { font-size: 13px; color: var(--dt3, #666); }
</style>
