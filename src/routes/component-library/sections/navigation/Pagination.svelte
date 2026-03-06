<script lang="ts">
	// ── Basic pagination ───────────────────────────────────────────
	let basicPage = $state(1);
	const basicTotal = 8;

	// ── Ellipsis pagination ────────────────────────────────────────
	let ellipsisPage = $state(5);
	const ellipsisTotal = 20;

	// ── Compact pagination ─────────────────────────────────────────
	let compactPage = $state(5);
	const compactTotal = 20;

	// ── Page size selector ─────────────────────────────────────────
	let sizedPage = $state(1);
	let pageSize = $state(10);
	const totalItems = 247;
	$effect(() => {
		sizedPage = 1;
	});

	// ── Mini pagination ────────────────────────────────────────────
	let miniPage = $state(3);
	const miniTotal = 12;

	// ── Go to page input ───────────────────────────────────────────
	let gotoPage = $state(1);
	let gotoInput = $state('');
	const gotoTotal = 50;

	function submitGoto() {
		const n = parseInt(gotoInput, 10);
		if (!isNaN(n) && n >= 1 && n <= gotoTotal) {
			gotoPage = n;
		}
		gotoInput = '';
	}

	// ── Table pagination ───────────────────────────────────────────
	let tablePage = $state(1);
	const tablePageSize = 10;
	const tableTotal = 247;

	// ── Derived helpers ────────────────────────────────────────────
	function pages(current: number, total: number): (number | '...')[] {
		if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
		const result: (number | '...')[] = [];
		if (current <= 4) {
			result.push(1, 2, 3, 4, 5, '...', total);
		} else if (current >= total - 3) {
			result.push(1, '...', total - 4, total - 3, total - 2, total - 1, total);
		} else {
			result.push(1, '...', current - 1, current, current + 1, '...', total);
		}
		return result;
	}

	function tableStart(page: number) {
		return (page - 1) * tablePageSize + 1;
	}
	function tableEnd(page: number) {
		return Math.min(page * tablePageSize, tableTotal);
	}
	function totalPages(total: number, size: number) {
		return Math.ceil(total / size);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Pagination</h2>
	<p class="ds-desc">
		Page navigation patterns for lists, tables, and data grids. Covers basic, ellipsis,
		compact, page-size selector, mini, go-to-page, and table result styles.
	</p>

	<!-- ═══ BASIC ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Basic Pagination</h3>
		<p class="ds-card__sub">Previous / numbered pages / Next — up to 8 pages before ellipsis kicks in</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 16px;">
			<nav aria-label="Basic pagination" style="display: inline-flex; align-items: center; gap: 4px;">
				<button
					onclick={() => basicPage = Math.max(1, basicPage - 1)}
					disabled={basicPage === 1}
					aria-label="Previous page"
					style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; font-size: 13px; font-weight: 500; border: 1px solid var(--dbd); border-radius: 7px; cursor: {basicPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {basicPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {basicPage === 1 ? 0.4 : 1}; transition: background 0.12s, color 0.12s;"
					onmouseenter={e => { if (basicPage !== 1) (e.currentTarget as HTMLElement).style.background = 'var(--dbg2)'; }}
					onmouseleave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
					Previous
				</button>

				{#each Array.from({ length: basicTotal }, (_, i) => i + 1) as p}
					<button
						onclick={() => basicPage = p}
						aria-label="Page {p}"
						aria-current={basicPage === p ? 'page' : undefined}
						style="display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; padding: 0 4px; font-size: 13px; font-weight: {basicPage === p ? '600' : '400'}; border: 1px solid {basicPage === p ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 7px; cursor: pointer; background: {basicPage === p ? 'var(--dt)' : 'transparent'}; color: {basicPage === p ? 'var(--dbg)' : 'var(--dt3)'}; transition: background 0.12s, color 0.12s, border-color 0.12s;"
						onmouseenter={e => { if (basicPage !== p) (e.currentTarget as HTMLElement).style.background = 'var(--dbg2)'; }}
						onmouseleave={e => { if (basicPage !== p) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
					>
						{p}
					</button>
				{/each}

				<button
					onclick={() => basicPage = Math.min(basicTotal, basicPage + 1)}
					disabled={basicPage === basicTotal}
					aria-label="Next page"
					style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; font-size: 13px; font-weight: 500; border: 1px solid var(--dbd); border-radius: 7px; cursor: {basicPage === basicTotal ? 'not-allowed' : 'pointer'}; background: transparent; color: {basicPage === basicTotal ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {basicPage === basicTotal ? 0.4 : 1}; transition: background 0.12s, color 0.12s;"
					onmouseenter={e => { if (basicPage !== basicTotal) (e.currentTarget as HTMLElement).style.background = 'var(--dbg2)'; }}
					onmouseleave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
				>
					Next
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</nav>
			<p style="margin: 0; font-size: 12px; color: var(--dt3);">Page {basicPage} of {basicTotal}</p>
		</div>
	</div>

	<!-- ═══ WITH ELLIPSIS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">With Ellipsis</h3>
		<p class="ds-card__sub">Smart windowing collapses distant page numbers — click any page to see it shift</p>
		<div class="ds-demo" style="flex-direction: column; align-items: flex-start; gap: 16px;">
			<nav aria-label="Ellipsis pagination" style="display: inline-flex; align-items: center; gap: 3px;">
				<button
					onclick={() => ellipsisPage = Math.max(1, ellipsisPage - 1)}
					disabled={ellipsisPage === 1}
					aria-label="Previous page"
					style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; font-size: 13px; font-weight: 500; border: 1px solid var(--dbd); border-radius: 7px; cursor: {ellipsisPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {ellipsisPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {ellipsisPage === 1 ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
					Previous
				</button>

				{#each pages(ellipsisPage, ellipsisTotal) as p}
					{#if p === '...'}
						<span style="display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; font-size: 13px; color: var(--dt4); letter-spacing: 0.05em;" aria-hidden="true">···</span>
					{:else}
						<button
							onclick={() => ellipsisPage = p as number}
							aria-label="Page {p}"
							aria-current={ellipsisPage === p ? 'page' : undefined}
							style="display: inline-flex; align-items: center; justify-content: center; min-width: 34px; height: 34px; padding: 0 4px; font-size: 13px; font-weight: {ellipsisPage === p ? '600' : '400'}; border: 1px solid {ellipsisPage === p ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 7px; cursor: pointer; background: {ellipsisPage === p ? 'var(--dt)' : 'transparent'}; color: {ellipsisPage === p ? 'var(--dbg)' : 'var(--dt3)'}; transition: background 0.12s, color 0.12s;"
						>
							{p}
						</button>
					{/if}
				{/each}

				<button
					onclick={() => ellipsisPage = Math.min(ellipsisTotal, ellipsisPage + 1)}
					disabled={ellipsisPage === ellipsisTotal}
					aria-label="Next page"
					style="display: inline-flex; align-items: center; gap: 4px; padding: 6px 12px; font-size: 13px; font-weight: 500; border: 1px solid var(--dbd); border-radius: 7px; cursor: {ellipsisPage === ellipsisTotal ? 'not-allowed' : 'pointer'}; background: transparent; color: {ellipsisPage === ellipsisTotal ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {ellipsisPage === ellipsisTotal ? 0.4 : 1};"
				>
					Next
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</nav>
			<p style="margin: 0; font-size: 12px; color: var(--dt3);">Page {ellipsisPage} of {ellipsisTotal}</p>
		</div>
	</div>

	<!-- ═══ COMPACT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compact</h3>
		<p class="ds-card__sub">Previous / Page X of Y / Next — minimal footprint for tight layouts</p>
		<div class="ds-demo">
			<nav aria-label="Compact pagination" style="display: inline-flex; align-items: center; gap: 6px;">
				<button
					onclick={() => compactPage = Math.max(1, compactPage - 1)}
					disabled={compactPage === 1}
					aria-label="Previous page"
					style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--dbd); border-radius: 7px; cursor: {compactPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {compactPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {compactPage === 1 ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>

				<span style="font-size: 13px; color: var(--dt3); white-space: nowrap; padding: 0 4px;">
					Page <strong style="color: var(--dt);">{compactPage}</strong> of <strong style="color: var(--dt);">{compactTotal}</strong>
				</span>

				<button
					onclick={() => compactPage = Math.min(compactTotal, compactPage + 1)}
					disabled={compactPage === compactTotal}
					aria-label="Next page"
					style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--dbd); border-radius: 7px; cursor: {compactPage === compactTotal ? 'not-allowed' : 'pointer'}; background: transparent; color: {compactPage === compactTotal ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {compactPage === compactTotal ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</nav>
		</div>
	</div>

	<!-- ═══ PAGE SIZE SELECTOR ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">With Page Size Selector</h3>
		<p class="ds-card__sub">Let users choose how many items to display per page</p>
		<div class="ds-demo" style="flex-wrap: wrap; gap: 16px; align-items: center;">
			<div style="display: flex; align-items: center; gap: 8px;">
				<span style="font-size: 13px; color: var(--dt2);">Show</span>
				{#each [10, 25, 50, 100] as size}
					<button
						onclick={() => pageSize = size}
						aria-pressed={pageSize === size}
						style="padding: 5px 10px; font-size: 12px; font-weight: 500; border: 1px solid {pageSize === size ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 6px; cursor: pointer; background: {pageSize === size ? 'var(--dt)' : 'transparent'}; color: {pageSize === size ? 'var(--dbg)' : 'var(--dt3)'}; transition: background 0.12s, color 0.12s;"
					>
						{size}
					</button>
				{/each}
				<span style="font-size: 13px; color: var(--dt2);">per page</span>
			</div>

			<nav aria-label="Page size pagination" style="display: inline-flex; align-items: center; gap: 3px;">
				<button
					onclick={() => sizedPage = Math.max(1, sizedPage - 1)}
					disabled={sizedPage === 1}
					aria-label="Previous page"
					style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--dbd); border-radius: 7px; cursor: {sizedPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {sizedPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {sizedPage === 1 ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>
				{#each pages(sizedPage, totalPages(totalItems, pageSize)) as p}
					{#if p === '...'}
						<span style="display: inline-flex; align-items: center; justify-content: center; min-width: 32px; height: 32px; font-size: 13px; color: var(--dt4);" aria-hidden="true">···</span>
					{:else}
						<button
							onclick={() => sizedPage = p as number}
							aria-label="Page {p}"
							aria-current={sizedPage === p ? 'page' : undefined}
							style="display: inline-flex; align-items: center; justify-content: center; min-width: 32px; height: 32px; font-size: 13px; font-weight: {sizedPage === p ? '600' : '400'}; border: 1px solid {sizedPage === p ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 7px; cursor: pointer; background: {sizedPage === p ? 'var(--dt)' : 'transparent'}; color: {sizedPage === p ? 'var(--dbg)' : 'var(--dt3)'};"
						>
							{p}
						</button>
					{/if}
				{/each}
				<button
					onclick={() => sizedPage = Math.min(totalPages(totalItems, pageSize), sizedPage + 1)}
					disabled={sizedPage === totalPages(totalItems, pageSize)}
					aria-label="Next page"
					style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--dbd); border-radius: 7px; cursor: {sizedPage === totalPages(totalItems, pageSize) ? 'not-allowed' : 'pointer'}; background: transparent; color: {sizedPage === totalPages(totalItems, pageSize) ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {sizedPage === totalPages(totalItems, pageSize) ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</nav>
		</div>
	</div>

	<!-- ═══ MINI ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Mini Pagination</h3>
		<p class="ds-card__sub">Just arrows — for image galleries, carousels, or highly constrained spaces</p>
		<div class="ds-demo" style="gap: 24px; align-items: center;">
			<!-- Minimal arrows only -->
			<nav aria-label="Mini pagination" style="display: inline-flex; align-items: center; gap: 4px;">
				<button
					onclick={() => miniPage = Math.max(1, miniPage - 1)}
					disabled={miniPage === 1}
					aria-label="Previous"
					style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 6px; cursor: {miniPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {miniPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {miniPage === 1 ? 0.35 : 1}; transition: background 0.12s;"
				>
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>

				<span style="font-size: 12px; color: var(--dt2); min-width: 40px; text-align: center;">{miniPage} / {miniTotal}</span>

				<button
					onclick={() => miniPage = Math.min(miniTotal, miniPage + 1)}
					disabled={miniPage === miniTotal}
					aria-label="Next"
					style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 6px; cursor: {miniPage === miniTotal ? 'not-allowed' : 'pointer'}; background: transparent; color: {miniPage === miniTotal ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {miniPage === miniTotal ? 0.35 : 1}; transition: background 0.12s;"
				>
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</nav>

			<!-- Dot indicators -->
			<div style="display: flex; align-items: center; gap: 12px;">
				<button
					onclick={() => miniPage = Math.max(1, miniPage - 1)}
					disabled={miniPage === 1}
					aria-label="Previous"
					style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 50%; cursor: {miniPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {miniPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {miniPage === 1 ? 0.35 : 1};"
				>
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>
				<div style="display: flex; gap: 5px;" role="group" aria-label="Page indicators">
					{#each Array.from({ length: miniTotal }, (_, i) => i + 1) as p}
						<button
							onclick={() => miniPage = p}
							aria-label="Go to page {p}"
							aria-current={miniPage === p ? 'page' : undefined}
							style="width: {miniPage === p ? '16px' : '6px'}; height: 6px; border-radius: 3px; border: none; cursor: pointer; background: {miniPage === p ? 'var(--dt)' : 'var(--dbg2)'}; transition: width 0.2s, background 0.2s; padding: 0;"
						></button>
					{/each}
				</div>
				<button
					onclick={() => miniPage = Math.min(miniTotal, miniPage + 1)}
					disabled={miniPage === miniTotal}
					aria-label="Next"
					style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 50%; cursor: {miniPage === miniTotal ? 'not-allowed' : 'pointer'}; background: transparent; color: {miniPage === miniTotal ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {miniPage === miniTotal ? 0.35 : 1};"
				>
					<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</div>
		</div>
	</div>

	<!-- ═══ GO TO PAGE ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Go to Page</h3>
		<p class="ds-card__sub">Direct page jump input — useful when there are many pages</p>
		<div class="ds-demo" style="flex-wrap: wrap; gap: 16px; align-items: center;">
			<nav aria-label="Go to page pagination" style="display: inline-flex; align-items: center; gap: 3px;">
				<button
					onclick={() => gotoPage = Math.max(1, gotoPage - 1)}
					disabled={gotoPage === 1}
					aria-label="Previous page"
					style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--dbd); border-radius: 7px; cursor: {gotoPage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {gotoPage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {gotoPage === 1 ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
				</button>

				{#each pages(gotoPage, gotoTotal) as p}
					{#if p === '...'}
						<span style="display: inline-flex; align-items: center; justify-content: center; min-width: 32px; height: 32px; font-size: 13px; color: var(--dt4);" aria-hidden="true">···</span>
					{:else}
						<button
							onclick={() => gotoPage = p as number}
							aria-label="Page {p}"
							aria-current={gotoPage === p ? 'page' : undefined}
							style="display: inline-flex; align-items: center; justify-content: center; min-width: 32px; height: 32px; font-size: 13px; font-weight: {gotoPage === p ? '600' : '400'}; border: 1px solid {gotoPage === p ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 7px; cursor: pointer; background: {gotoPage === p ? 'var(--dt)' : 'transparent'}; color: {gotoPage === p ? 'var(--dbg)' : 'var(--dt3)'};"
						>
							{p}
						</button>
					{/if}
				{/each}

				<button
					onclick={() => gotoPage = Math.min(gotoTotal, gotoPage + 1)}
					disabled={gotoPage === gotoTotal}
					aria-label="Next page"
					style="display: inline-flex; align-items: center; justify-content: center; width: 32px; height: 32px; border: 1px solid var(--dbd); border-radius: 7px; cursor: {gotoPage === gotoTotal ? 'not-allowed' : 'pointer'}; background: transparent; color: {gotoPage === gotoTotal ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {gotoPage === gotoTotal ? 0.4 : 1};"
				>
					<svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
				</button>
			</nav>

			<form
				onsubmit={e => { e.preventDefault(); submitGoto(); }}
				style="display: inline-flex; align-items: center; gap: 6px;"
			>
				<label for="goto-input" style="font-size: 13px; color: var(--dt2); white-space: nowrap;">Go to</label>
				<input
					id="goto-input"
					type="number"
					bind:value={gotoInput}
					min="1"
					max={gotoTotal}
					placeholder="—"
					style="width: 56px; padding: 5px 8px; font-size: 13px; text-align: center; color: var(--dt2); background: var(--dbg); border: 1px solid var(--dbd); border-radius: 7px; outline: none;"
				/>
				<button
					type="submit"
					class="btn-pill btn-pill-secondary btn-pill-sm"
					style="white-space: nowrap;"
				>
					Jump
				</button>
				<span style="font-size: 12px; color: var(--dt3);">Current: {gotoPage}</span>
			</form>
		</div>
	</div>

	<!-- ═══ TABLE PAGINATION ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Table Pagination</h3>
		<p class="ds-card__sub">"Showing X–Y of Z results" with page controls — the standard data table footer</p>

		<!-- Simulated table -->
		<div style="border: 1px solid var(--dbd); border-radius: 10px; overflow: hidden; margin-bottom: 0;">
			<div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; background: var(--dbg); border-bottom: 1px solid var(--dbd);">
				{#each ['Name', 'Status', 'Priority', 'Updated'] as col}
					<div style="padding: 10px 14px; font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em;">{col}</div>
				{/each}
			</div>
			{#each Array.from({ length: tablePageSize }, (_, i) => tableStart(tablePage) + i) as row}
				<div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; border-bottom: 1px solid var(--dbd);">
					<div style="padding: 10px 14px; font-size: 13px; color: var(--dt2);">Project #{row}</div>
					<div style="padding: 10px 14px;">
						<span style="font-size: 11px; font-weight: 500; padding: 2px 8px; border-radius: 9999px; background: rgba(34,197,94,0.1); color: #4ade80;">Active</span>
					</div>
					<div style="padding: 10px 14px;">
						<span style="font-size: 11px; color: var(--dt2);">{['Low', 'Medium', 'High'][row % 3]}</span>
					</div>
					<div style="padding: 10px 14px; font-size: 12px; color: var(--dt3);">{row % 3 === 0 ? '2h ago' : row % 2 === 0 ? 'Yesterday' : '3d ago'}</div>
				</div>
			{/each}

			<!-- Table footer -->
			<div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--dbg);">
				<span style="font-size: 12px; color: var(--dt3);">
					Showing <strong style="color: var(--dt3);">{tableStart(tablePage)}–{tableEnd(tablePage)}</strong> of <strong style="color: var(--dt3);">{tableTotal}</strong> results
				</span>

				<nav aria-label="Table pagination" style="display: inline-flex; align-items: center; gap: 3px;">
					<button
						onclick={() => tablePage = 1}
						disabled={tablePage === 1}
						aria-label="First page"
						style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 6px; cursor: {tablePage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {tablePage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {tablePage === 1 ? 0.4 : 1}; font-size: 11px;"
					>
						«
					</button>
					<button
						onclick={() => tablePage = Math.max(1, tablePage - 1)}
						disabled={tablePage === 1}
						aria-label="Previous page"
						style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 6px; cursor: {tablePage === 1 ? 'not-allowed' : 'pointer'}; background: transparent; color: {tablePage === 1 ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {tablePage === 1 ? 0.4 : 1};"
					>
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
					</button>

					{#each pages(tablePage, totalPages(tableTotal, tablePageSize)) as p}
						{#if p === '...'}
							<span style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; font-size: 12px; color: var(--dt4);" aria-hidden="true">···</span>
						{:else}
							<button
								onclick={() => tablePage = p as number}
								aria-label="Page {p}"
								aria-current={tablePage === p ? 'page' : undefined}
								style="display: inline-flex; align-items: center; justify-content: center; min-width: 28px; height: 28px; font-size: 12px; font-weight: {tablePage === p ? '600' : '400'}; border: 1px solid {tablePage === p ? 'var(--dbd2)' : 'var(--dbd)'}; border-radius: 6px; cursor: pointer; background: {tablePage === p ? 'var(--dt)' : 'transparent'}; color: {tablePage === p ? 'var(--dbg)' : 'var(--dt3)'};"
							>
								{p}
							</button>
						{/if}
					{/each}

					<button
						onclick={() => tablePage = Math.min(totalPages(tableTotal, tablePageSize), tablePage + 1)}
						disabled={tablePage === totalPages(tableTotal, tablePageSize)}
						aria-label="Next page"
						style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 6px; cursor: {tablePage === totalPages(tableTotal, tablePageSize) ? 'not-allowed' : 'pointer'}; background: transparent; color: {tablePage === totalPages(tableTotal, tablePageSize) ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {tablePage === totalPages(tableTotal, tablePageSize) ? 0.4 : 1};"
					>
						<svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
					</button>
					<button
						onclick={() => tablePage = totalPages(tableTotal, tablePageSize)}
						disabled={tablePage === totalPages(tableTotal, tablePageSize)}
						aria-label="Last page"
						style="display: inline-flex; align-items: center; justify-content: center; width: 28px; height: 28px; border: 1px solid var(--dbd); border-radius: 6px; cursor: {tablePage === totalPages(tableTotal, tablePageSize) ? 'not-allowed' : 'pointer'}; background: transparent; color: {tablePage === totalPages(tableTotal, tablePageSize) ? 'var(--dt4)' : 'var(--dt3)'}; opacity: {tablePage === totalPages(tableTotal, tablePageSize) ? 0.4 : 1}; font-size: 11px;"
					>
						»
					</button>
				</nav>
			</div>
		</div>
	</div>
</section>
