<script lang="ts">
	type SandboxStatus = 'running' | 'idle' | 'stopped';

	interface Sandbox {
		id: string;
		name: string;
		runtime: string;
		status: SandboxStatus;
		cpu: number;
		mem: number;
		uptime: string;
		credits: number;
	}

	let sandboxes = $state<Sandbox[]>([
		{ id: 'sb-1', name: 'Data Analysis — Q1',     runtime: 'Python 3.11', status: 'running', cpu: 42, mem: 68, uptime: '14m',  credits: 0.84 },
		{ id: 'sb-2', name: 'Code Review Agent',       runtime: 'Node 20',     status: 'idle',    cpu: 3,  mem: 22, uptime: '1h 2m', credits: 2.10 },
		{ id: 'sb-3', name: 'Browser Automation',      runtime: 'Chromium',    status: 'running', cpu: 71, mem: 84, uptime: '6m',   credits: 0.31 },
		{ id: 'sb-4', name: 'PDF Extraction Batch',    runtime: 'Python 3.11', status: 'stopped', cpu: 0,  mem: 0,  uptime: '—',    credits: 4.55 },
	]);

	const computeStats = [
		{ label: 'Active Sandboxes', value: '2' },
		{ label: 'CPU Avg',          value: '57%' },
		{ label: 'Memory Avg',       value: '76%' },
		{ label: 'Credits Used',     value: '$7.80' },
	];

	function statusColor(s: SandboxStatus) {
		if (s === 'running') return '#22c55e';
		if (s === 'idle')    return '#f59e0b';
		return '#6b7280';
	}

	function cpuColor(pct: number) {
		if (pct > 80) return '#ef4444';
		if (pct > 50) return '#f59e0b';
		return '#22c55e';
	}

	function stopSandbox(id: string) {
		sandboxes = sandboxes.map(s => s.id === id ? { ...s, status: 'stopped', cpu: 0, mem: 0, uptime: '—' } : s);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Compute &amp; Sandboxes</h2>
	<p class="ds-desc">Real-time compute resource monitoring, sandbox lifecycle management, and usage tracking for AI-driven code execution environments.</p>

	<!-- ── Stats ─────────────────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compute Overview</h3>
		<p class="ds-card__sub">Live snapshot of active compute resources and spend.</p>
		<div class="cu-stats">
			{#each computeStats as stat}
				<div class="cu-stat">
					<span class="cu-stat__val">{stat.value}</span>
					<span class="cu-stat__lbl">{stat.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ── Sandbox Table ─────────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sandbox Instances</h3>
		<p class="ds-card__sub">Manage running, idle, and stopped execution environments.</p>
		<div class="cu-table-wrap">
			<table class="cu-table">
				<thead>
					<tr>
						<th>Name</th>
						<th>Runtime</th>
						<th>Status</th>
						<th>CPU</th>
						<th>Mem</th>
						<th>Uptime</th>
						<th>Credits</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{#each sandboxes as sb (sb.id)}
						<tr class="cu-row" class:cu-row--stopped={sb.status === 'stopped'}>
							<td class="cu-name">{sb.name}</td>
							<td class="cu-runtime">{sb.runtime}</td>
							<td>
								<span class="cu-badge" style="--cu-dot: {statusColor(sb.status)}">
									<span class="cu-badge__dot"></span>
									{sb.status}
								</span>
							</td>
							<td>
								{#if sb.status !== 'stopped'}
									<div class="cu-bar-wrap">
										<div class="cu-bar" style="width:{sb.cpu}%; background:{cpuColor(sb.cpu)}"></div>
									</div>
									<span class="cu-pct">{sb.cpu}%</span>
								{:else}
									<span class="cu-pct cu-pct--dim">—</span>
								{/if}
							</td>
							<td>
								{#if sb.status !== 'stopped'}
									<div class="cu-bar-wrap">
										<div class="cu-bar" style="width:{sb.mem}%; background:{cpuColor(sb.mem)}"></div>
									</div>
									<span class="cu-pct">{sb.mem}%</span>
								{:else}
									<span class="cu-pct cu-pct--dim">—</span>
								{/if}
							</td>
							<td class="cu-uptime">{sb.uptime}</td>
							<td class="cu-credits">${sb.credits.toFixed(2)}</td>
							<td>
								{#if sb.status !== 'stopped'}
									<button class="cu-stop-btn" onclick={() => stopSandbox(sb.id)} aria-label="Stop sandbox">Stop</button>
								{:else}
									<span class="cu-stopped-lbl">Stopped</span>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<!-- ── Reference ─────────────────────────────────────────────────────── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Compute Patterns Reference</h3>
		<table class="ds-table">
			<thead><tr><th>Pattern</th><th>Purpose</th></tr></thead>
			<tbody>
				<tr><td style="font-weight:600;">Stats Strip</td><td>High-level KPIs: active count, avg CPU/mem, spend</td></tr>
				<tr><td style="font-weight:600;">Sandbox Table</td><td>Per-instance status, resource bars, lifecycle actions</td></tr>
				<tr><td style="font-weight:600;">Status Badge</td><td>Color-coded dot for running / idle / stopped states</td></tr>
				<tr><td style="font-weight:600;">Resource Bar</td><td>Inline mini progress bar with threshold color (green/amber/red)</td></tr>
			</tbody>
		</table>
	</div>
</section>

<style>
	.cu-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 4px; }
	@media (max-width: 600px) { .cu-stats { grid-template-columns: repeat(2, 1fr); } }
	.cu-stat { background: var(--dbg2); border: 1px solid var(--dbd); border-radius: 10px; padding: 14px 16px; display: flex; flex-direction: column; gap: 4px; }
	.cu-stat__val { font-size: 22px; font-weight: 700; color: var(--dt); letter-spacing: -0.02em; }
	.cu-stat__lbl { font-size: 11px; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.06em; }

	.cu-table-wrap { overflow-x: auto; border: 1px solid var(--dbd); border-radius: 10px; }
	.cu-table { width: 100%; border-collapse: collapse; font-size: 13px; }
	.cu-table thead tr { background: var(--dbg2); }
	.cu-table th { padding: 9px 12px; text-align: left; font-size: 11px; font-weight: 600; color: var(--dt3); text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--dbd); white-space: nowrap; }
	.cu-row td { padding: 10px 12px; border-bottom: 1px solid var(--dbd); vertical-align: middle; }
	.cu-row:last-child td { border-bottom: none; }
	.cu-row--stopped { opacity: 0.55; }
	.cu-name { font-weight: 500; color: var(--dt); white-space: nowrap; max-width: 180px; overflow: hidden; text-overflow: ellipsis; }
	.cu-runtime { font-family: 'SF Mono','Fira Code',monospace; font-size: 11.5px; color: var(--dt3); white-space: nowrap; }
	.cu-uptime { font-size: 12px; color: var(--dt3); white-space: nowrap; }
	.cu-credits { font-size: 12.5px; font-weight: 600; color: var(--dt2); white-space: nowrap; }

	.cu-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 500; color: var(--dt2); text-transform: capitalize; white-space: nowrap; }
	.cu-badge__dot { width: 7px; height: 7px; border-radius: 50%; background: var(--cu-dot, #888); flex-shrink: 0; }

	.cu-bar-wrap { display: inline-block; width: 52px; height: 5px; background: var(--dbg3); border-radius: 3px; overflow: hidden; vertical-align: middle; margin-right: 6px; }
	.cu-bar { height: 100%; border-radius: 3px; transition: width 0.3s; }
	.cu-pct { font-size: 11.5px; color: var(--dt3); }
	.cu-pct--dim { color: var(--dt4); }

	.cu-stop-btn { padding: 4px 10px; border: 1.5px solid rgba(239,68,68,0.35); border-radius: 6px; background: transparent; color: rgba(239,68,68,0.8); font-size: 11.5px; font-weight: 500; font-family: inherit; cursor: pointer; transition: all 0.12s; white-space: nowrap; }
	.cu-stop-btn:hover { background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.6); }
	.cu-stopped-lbl { font-size: 11.5px; color: var(--dt4); }
</style>
