<section class="ds-section">
	<h2 class="ds-title">Layouts</h2>
	<p class="ds-desc">
		Common page and panel layout patterns as interactive mockups. Each demonstrates structure
		through placeholder blocks — use these as visual references when composing views.
	</p>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  SIDEBAR + MAIN                                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Sidebar + Main Content</h3>
		<p class="ds-card__sub">
			Fixed-width navigation sidebar alongside a flexible main area. Common for dashboards
			and admin panels.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup" style="height: 260px;">
				<!-- Sidebar -->
				<div class="ly-sidebar">
					<div class="ly-logo-block"></div>
					<div style="display: flex; flex-direction: column; gap: 4px; padding: 8px;">
						{#each [70, 90, 60, 80, 55] as w, i}
							<div
								class="ly-nav-item"
								class:ly-nav-item--active={i === 1}
								style="width: {w}%;"
							></div>
						{/each}
					</div>
					<div style="margin-top: auto; padding: 8px;">
						<div class="ly-block" style="height: 6px; width: 75%; opacity: 0.4;"></div>
					</div>
				</div>
				<!-- Main -->
				<div class="ly-main">
					<div style="display: flex; flex-direction: column; gap: 10px;">
						<div class="ly-block ly-block--heading" style="width: 45%;"></div>
						<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px;">
							{#each [0, 1, 2] as _}
								<div class="ly-stat-card">
									<div class="ly-block" style="width: 50%; height: 5px; margin-bottom: 8px;"></div>
									<div class="ly-block ly-block--heading" style="width: 65%; height: 14px;"></div>
								</div>
							{/each}
						</div>
						<div class="ly-content-area">
							{#each [90, 75, 85, 60] as w}
								<div class="ly-block" style="width: {w}%; height: 5px;"></div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
		<p class="ly-annotation">
			Sidebar: fixed ~180–240px &nbsp;·&nbsp; Main: <code>flex: 1</code>, scrollable
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  HEADER + CONTENT + FOOTER                                  -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Header + Content + Footer</h3>
		<p class="ds-card__sub">
			Classic three-zone vertical stack. Header stays at top, footer at bottom, content
			fills the middle.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup ly-mockup--col" style="height: 260px;">
				<!-- Header -->
				<div class="ly-header">
					<div style="display: flex; align-items: center; gap: 8px;">
						<div class="ly-block" style="width: 28px; height: 8px; border-radius: 9999px; opacity: 0.7;"></div>
						<div class="ly-block" style="width: 50px; height: 5px;"></div>
					</div>
					<div style="display: flex; gap: 6px; margin-left: auto;">
						{#each [40, 32] as w}
							<div class="ly-block" style="width: {w}px; height: 22px; border-radius: 5px;"></div>
						{/each}
					</div>
				</div>
				<!-- Content -->
				<div class="ly-content">
					<div style="display: flex; flex-direction: column; gap: 8px;">
						<div class="ly-block ly-block--heading" style="width: 40%;"></div>
						{#each [85, 70, 80, 55, 75] as w}
							<div class="ly-block" style="width: {w}%; height: 5px;"></div>
						{/each}
					</div>
				</div>
				<!-- Footer -->
				<div class="ly-footer">
					<div class="ly-block" style="width: 100px; height: 5px; opacity: 0.4;"></div>
					<div class="ly-block" style="width: 60px; height: 5px; opacity: 0.4;"></div>
				</div>
			</div>
		</div>
		<p class="ly-annotation">
			Header: fixed height (48–64px) &nbsp;·&nbsp; Content: <code>flex: 1; overflow-y: auto</code> &nbsp;·&nbsp; Footer: fixed
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  TWO-COLUMN 60/40                                           -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Two-Column Layout (60 / 40)</h3>
		<p class="ds-card__sub">
			Primary content on the left, contextual panel or aside on the right. Useful for
			detail views and split editors.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup" style="height: 220px; gap: 0;">
				<!-- Primary -->
				<div style="flex: 3; padding: 14px; display: flex; flex-direction: column; gap: 8px; border-right: 1px solid rgba(255,255,255,0.06);">
					<div class="ly-block ly-block--heading" style="width: 55%;"></div>
					{#each [90, 75, 85, 65, 80] as w}
						<div class="ly-block" style="width: {w}%; height: 5px;"></div>
					{/each}
					<div class="ly-content-area" style="margin-top: 4px; flex: 1; padding: 8px;">
						{#each [60, 80, 50] as w}
							<div class="ly-block" style="width: {w}%; height: 5px;"></div>
						{/each}
					</div>
				</div>
				<!-- Aside -->
				<div style="flex: 2; padding: 14px; display: flex; flex-direction: column; gap: 8px; background: rgba(255,255,255,0.015);">
					<div class="ly-block" style="width: 50%; height: 6px; opacity: 0.6;"></div>
					<div class="ly-stat-card">
						<div class="ly-block" style="width: 40%; height: 5px; margin-bottom: 6px;"></div>
						<div class="ly-block ly-block--heading" style="width: 60%; height: 12px;"></div>
					</div>
					<div class="ly-stat-card">
						<div class="ly-block" style="width: 55%; height: 5px; margin-bottom: 6px;"></div>
						<div class="ly-block ly-block--heading" style="width: 45%; height: 12px;"></div>
					</div>
					<div class="ly-stat-card">
						<div class="ly-block" style="width: 35%; height: 5px; margin-bottom: 6px;"></div>
						<div class="ly-block ly-block--heading" style="width: 70%; height: 12px;"></div>
					</div>
				</div>
			</div>
		</div>
		<p class="ly-annotation">
			Left: <code>flex: 3</code> (60%) &nbsp;·&nbsp; Right: <code>flex: 2</code> (40%)
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  THREE-COLUMN                                               -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Three-Column Layout</h3>
		<p class="ds-card__sub">
			Equal-width or weighted columns for comparison views, kanban boards, or
			multi-panel editors.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup" style="height: 200px; gap: 0;">
				{#each ['List', 'Detail', 'Preview'] as label, i}
					<div style="flex: 1; padding: 12px; display: flex; flex-direction: column; gap: 6px; {i < 2 ? 'border-right: 1px solid rgba(255,255,255,0.06);' : ''}">
						<div class="ly-block" style="width: 50%; height: 6px; opacity: 0.5; margin-bottom: 4px;"></div>
						{#each i === 0 ? [85, 65, 80, 70, 75] : i === 1 ? [90, 70, 55] : [95, 80, 60, 70] as w}
							<div class="ly-block" style="width: {w}%; height: 5px;"></div>
						{/each}
						{#if i === 1}
							<div class="ly-content-area" style="margin-top: 6px; padding: 8px; flex: 1;">
								{#each [70, 55, 80] as w}
									<div class="ly-block" style="width: {w}%; height: 4px;"></div>
								{/each}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<p class="ly-annotation">
			Each column: <code>flex: 1</code> &nbsp;·&nbsp; Adjust weights with <code>flex: 2</code> for a primary focus column
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  DASHBOARD GRID                                             -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Dashboard Grid Layout</h3>
		<p class="ds-card__sub">
			CSS Grid with mixed card sizes — stats, charts, and tables composing a data-dense
			dashboard.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup ly-mockup--col" style="height: 280px;">
				<!-- Mini header -->
				<div class="ly-header" style="flex-shrink: 0;">
					<div class="ly-block" style="width: 80px; height: 7px; opacity: 0.6;"></div>
					<div class="ly-block" style="width: 50px; height: 22px; border-radius: 5px; margin-left: auto;"></div>
				</div>
				<!-- Grid body -->
				<div style="flex: 1; padding: 10px; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: auto 1fr; gap: 8px; overflow: hidden;">
					<!-- 4 stat cards -->
					{#each [0, 1, 2, 3] as _}
						<div class="ly-stat-card">
							<div class="ly-block" style="width: 55%; height: 4px; margin-bottom: 6px;"></div>
							<div class="ly-block ly-block--heading" style="width: 50%; height: 13px;"></div>
						</div>
					{/each}
					<!-- Wide chart area -->
					<div class="ly-content-area" style="grid-column: 1 / 3; padding: 10px; display: flex; align-items: flex-end; gap: 5px;">
						{#each [40, 65, 50, 80, 55, 70, 45, 90] as h}
							<div style="flex: 1; height: {h}%; border-radius: 3px 3px 0 0; background: rgba(255,255,255,0.12);"></div>
						{/each}
					</div>
					<!-- Narrow list area -->
					<div class="ly-content-area" style="grid-column: 3 / 5; padding: 10px; display: flex; flex-direction: column; gap: 6px;">
						{#each [80, 65, 90, 55] as w}
							<div style="display: flex; align-items: center; gap: 6px;">
								<div class="ly-block" style="width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0;"></div>
								<div class="ly-block" style="width: {w}%; height: 4px;"></div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
		<p class="ly-annotation">
			<code>grid-template-columns: repeat(4, 1fr)</code> &nbsp;·&nbsp; Span items with <code>grid-column: 1 / 3</code>
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  CENTERED CONTENT                                           -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Centered Content Layout</h3>
		<p class="ds-card__sub">
			Narrow max-width container centered in the viewport. Ideal for forms, articles,
			onboarding flows, and settings pages.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup ly-mockup--col" style="height: 220px; background: rgba(255,255,255,0.015);">
				<!-- Outer shell to simulate viewport -->
				<div style="flex: 1; display: flex; align-items: flex-start; justify-content: center; padding: 14px 20px; overflow: hidden;">
					<!-- Narrow centered column -->
					<div style="width: 55%; display: flex; flex-direction: column; gap: 8px;">
						<div class="ly-block ly-block--heading" style="width: 60%; margin: 0 auto 4px;"></div>
						<div class="ly-block" style="width: 80%; height: 5px; margin: 0 auto;"></div>
						<div class="ly-block" style="width: 70%; height: 5px; margin: 0 auto;"></div>
						<div class="ly-content-area" style="padding: 12px; margin-top: 4px;">
							{#each [90, 75, 85] as w}
								<div class="ly-block" style="width: {w}%; height: 5px;"></div>
							{/each}
						</div>
						<div style="display: flex; justify-content: center; gap: 8px; margin-top: 4px;">
							<div class="ly-block" style="width: 60px; height: 22px; border-radius: 5px;"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<p class="ly-annotation">
			<code>max-width: 640px; margin-inline: auto;</code> &nbsp;·&nbsp; Adjust width per content type (forms: 480px, articles: 720px)
		</p>
	</div>

	<!-- ═══════════════════════════════════════════════════════════ -->
	<!--  STACK LAYOUT                                               -->
	<!-- ═══════════════════════════════════════════════════════════ -->

	<div class="ds-card">
		<h3 class="ds-card__title">Stack Layout (Vertical Sections)</h3>
		<p class="ds-card__sub">
			Sequential full-width sections stacked vertically with dividers. Used for landing
			pages, settings screens, and multi-step flows.
		</p>
		<div class="ds-demo">
			<div class="ly-mockup ly-mockup--col" style="height: 280px; gap: 0;">
				{#each [
					{ h: '36px', label: 'hero', blocks: [55, 40, 70] },
					{ h: '72px', label: 'features', blocks: [80, 65, 75, 55] },
					{ h: '56px', label: 'cta', blocks: [45, 60] },
					{ h: '32px', label: 'footer', blocks: [90, 50] },
				] as section, i}
					<div
						style="
							height: {section.h};
							flex-shrink: 0;
							padding: 10px 14px;
							display: flex;
							flex-direction: column;
							justify-content: center;
							gap: 5px;
							{i > 0 ? 'border-top: 1px solid rgba(255,255,255,0.06);' : ''}
							{i === 2 ? 'background: rgba(255,255,255,0.03);' : ''}
							{i === 3 ? 'background: rgba(255,255,255,0.015);' : ''}
						"
					>
						<span
							style="
								font-size: 9px;
								font-weight: 700;
								text-transform: uppercase;
								letter-spacing: 0.08em;
								color: rgba(255,255,255,0.25);
								margin-bottom: 2px;
							"
						>{section.label}</span>
						{#if i === 0}
							<div class="ly-block ly-block--heading" style="width: {section.blocks[0]}%;"></div>
						{/if}
						<div style="display: flex; gap: 8px; align-items: center;">
							{#each section.blocks as w, j}
								{#if i === 2 && j === section.blocks.length - 1}
									<div class="ly-block" style="width: {w}px; height: 20px; border-radius: 5px;"></div>
								{:else}
									<div class="ly-block" style="width: {w}%; height: 5px;"></div>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
		<p class="ly-annotation">
			Each section is a full-width block &nbsp;·&nbsp; <code>display: flex; flex-direction: column;</code> on the page wrapper
		</p>
	</div>
</section>

<style>
	/* ── Mockup shell ─────────────────────────────────────────── */
	.ly-mockup {
		display: flex;
		flex-direction: row;
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 10px;
		overflow: hidden;
		width: 100%;
		max-width: 600px;
		background: rgba(255, 255, 255, 0.02);
	}

	.ly-mockup--col {
		flex-direction: column;
	}

	/* ── Sidebar ──────────────────────────────────────────────── */
	.ly-sidebar {
		width: 90px;
		flex-shrink: 0;
		border-right: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.015);
		display: flex;
		flex-direction: column;
		padding-top: 8px;
	}

	.ly-logo-block {
		width: 28px;
		height: 8px;
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.3);
		margin: 0 8px 12px;
	}

	/* ── Main content zone ────────────────────────────────────── */
	.ly-main {
		flex: 1;
		padding: 14px;
		overflow: hidden;
	}

	/* ── Header ───────────────────────────────────────────────── */
	.ly-header {
		height: 36px;
		flex-shrink: 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.02);
		display: flex;
		align-items: center;
		padding: 0 12px;
		gap: 8px;
	}

	/* ── Content area ─────────────────────────────────────────── */
	.ly-content {
		flex: 1;
		padding: 14px;
		overflow: hidden;
	}

	/* ── Footer ───────────────────────────────────────────────── */
	.ly-footer {
		height: 32px;
		flex-shrink: 0;
		border-top: 1px solid rgba(255, 255, 255, 0.06);
		background: rgba(255, 255, 255, 0.015);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 12px;
	}

	/* ── Placeholder blocks ───────────────────────────────────── */
	.ly-block {
		height: 6px;
		border-radius: 3px;
		background: rgba(255, 255, 255, 0.1);
		flex-shrink: 0;
	}

	.ly-block--heading {
		height: 10px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 4px;
	}

	/* ── Nav item in sidebar ──────────────────────────────────── */
	.ly-nav-item {
		height: 20px;
		border-radius: 5px;
		background: rgba(255, 255, 255, 0.06);
	}

	.ly-nav-item--active {
		background: rgba(255, 255, 255, 0.16);
	}

	/* ── Stat card placeholder ────────────────────────────────── */
	.ly-stat-card {
		border: 1px solid rgba(255, 255, 255, 0.07);
		border-radius: 7px;
		padding: 10px;
		background: rgba(255, 255, 255, 0.03);
	}

	/* ── Inner content area ───────────────────────────────────── */
	.ly-content-area {
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 7px;
		background: rgba(255, 255, 255, 0.02);
		display: flex;
		flex-direction: column;
		gap: 6px;
		padding: 10px;
	}

	/* ── Annotation text ──────────────────────────────────────── */
	.ly-annotation {
		font-size: 12px;
		color: rgba(255, 255, 255, 0.35);
		margin: 10px 0 0;
		line-height: 1.5;
	}

	.ly-annotation code {
		font-size: 11px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 4px;
		padding: 1px 5px;
		color: rgba(255, 255, 255, 0.6);
	}
</style>
