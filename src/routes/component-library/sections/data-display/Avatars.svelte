<section class="ds-section">
	<h2 class="ds-title">Avatars</h2>
	<p class="ds-desc">User identity components — single avatars, groups, status indicators, and shape variants. Dark monochrome with glassmorphism edges.</p>

	<!-- ═══ SIZES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Sizes</h3>
		<p class="ds-card__sub">Five sizes — xs (24px) through xl (64px) — for every layout density</p>
		<div class="ds-demo" style="gap: 20px; align-items: flex-end;">
			{#each [
				{ size: 'xs', px: 24, font: 9,  label: 'JD' },
				{ size: 'sm', px: 32, font: 11, label: 'JD' },
				{ size: 'md', px: 40, font: 14, label: 'JD' },
				{ size: 'lg', px: 48, font: 16, label: 'JD' },
				{ size: 'xl', px: 64, font: 20, label: 'JD' },
			] as item}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
					<div style="
						width: {item.px}px; height: {item.px}px;
						border-radius: 50%;
						background: linear-gradient(135deg, #2a2a2a, #111);
						display: flex; align-items: center; justify-content: center;
						color: #e5e5e5; font-size: {item.font}px; font-weight: 700;
						border: 1.5px solid var(--dbd);
						flex-shrink: 0;
					">{item.label}</div>
					<div style="text-align: center;">
						<div style="font-size: 12px; font-weight: 600; color: var(--dt);">{item.size}</div>
						<div style="font-size: 11px; color: var(--dt3);">{item.px}px</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ IMAGE AVATARS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Image Avatars</h3>
		<p class="ds-card__sub">Real photo avatars with graceful fallback initials on load failure</p>
		<div class="ds-demo" style="gap: 16px; align-items: flex-end;">
			{#each [
				{ seed: 1,  name: 'Alice Morgan',  initials: 'AM', size: 32 },
				{ seed: 2,  name: 'Blake Torres',  initials: 'BT', size: 40 },
				{ seed: 3,  name: 'Casey Nguyen',  initials: 'CN', size: 48 },
				{ seed: 4,  name: 'Dana Okafor',   initials: 'DO', size: 56 },
				{ seed: 5,  name: 'Elliot Zhang',  initials: 'EZ', size: 64 },
			] as item}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
					<div style="
						position: relative;
						width: {item.size}px; height: {item.size}px;
						border-radius: 50%;
						overflow: hidden;
						border: 2px solid var(--dbd);
						background: linear-gradient(135deg, #2a2a2a, #111);
						flex-shrink: 0;
					">
						<img
							src="https://i.pravatar.cc/{item.size * 2}?u={item.seed}"
							alt={item.name}
							style="width: 100%; height: 100%; object-fit: cover; display: block;"
						/>
					</div>
					<div style="font-size: 11px; color: var(--dt3); text-align: center; max-width: 64px; line-height: 1.3;">{item.name}</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ INITIALS FALLBACK ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Initials Fallback</h3>
		<p class="ds-card__sub">Deterministic color accent per user when no image is available</p>
		<div class="ds-demo" style="gap: 12px; flex-wrap: wrap;">
			{#each [
				{ initials: 'AM', accent: '#3b82f6' },
				{ initials: 'BT', accent: '#8b5cf6' },
				{ initials: 'CN', accent: '#10b981' },
				{ initials: 'DO', accent: '#f59e0b' },
				{ initials: 'EZ', accent: '#ef4444' },
				{ initials: 'FP', accent: '#ec4899' },
				{ initials: 'GR', accent: '#06b6d4' },
				{ initials: 'HL', accent: '#84cc16' },
			] as item}
				<div style="
					width: 40px; height: 40px;
					border-radius: 50%;
					background: linear-gradient(135deg, {item.accent}22, {item.accent}11);
					border: 1.5px solid {item.accent}44;
					display: flex; align-items: center; justify-content: center;
					color: {item.accent}; font-size: 13px; font-weight: 700;
					flex-shrink: 0;
				">{item.initials}</div>
			{/each}
		</div>
	</div>

	<!-- ═══ STATUS INDICATORS ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Status Indicators</h3>
		<p class="ds-card__sub">Presence and availability states — online, away, busy, offline</p>
		<div class="ds-demo" style="gap: 28px;">
			{#each [
				{ initials: 'ON', label: 'Online',  dot: '#22c55e', ring: '#16a34a' },
				{ initials: 'AW', label: 'Away',    dot: '#f59e0b', ring: '#d97706' },
				{ initials: 'BZ', label: 'Busy',    dot: '#ef4444', ring: '#dc2626' },
				{ initials: 'OF', label: 'Offline', dot: '#6b7280', ring: '#4b5563' },
			] as item}
				<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
					<div style="position: relative; display: inline-flex; flex-shrink: 0;">
						<div style="
							width: 40px; height: 40px;
							border-radius: 50%;
							background: linear-gradient(135deg, #2a2a2a, #111);
							display: flex; align-items: center; justify-content: center;
							color: #e5e5e5; font-size: 13px; font-weight: 700;
							border: 1.5px solid var(--dbd);
						">{item.initials}</div>
						<span style="
							position: absolute; bottom: 1px; right: 1px;
							width: 10px; height: 10px;
							border-radius: 50%;
							background: {item.dot};
							border: 2px solid var(--dbg);
							box-shadow: 0 0 0 1px {item.ring}60;
						"></span>
					</div>
					<div style="font-size: 12px; color: var(--dt2); font-weight: 500;">{item.label}</div>
				</div>
			{/each}
		</div>

		<h4 class="ds-card__h4">With Image + Status</h4>
		<div class="ds-demo" style="gap: 20px;">
			{#each [
				{ seed: 10, dot: '#22c55e', label: 'Active now' },
				{ seed: 20, dot: '#f59e0b', label: 'Away 5m'   },
				{ seed: 30, dot: '#ef4444', label: 'In a call'  },
			] as item}
				<div style="display: flex; align-items: center; gap: 10px;">
					<div style="position: relative; flex-shrink: 0;">
						<div style="
							width: 36px; height: 36px;
							border-radius: 50%; overflow: hidden;
							border: 2px solid var(--dbd);
						">
							<img
								src="https://i.pravatar.cc/72?u={item.seed}"
								alt="User avatar"
								style="width: 100%; height: 100%; object-fit: cover; display: block;"
							/>
						</div>
						<span style="
							position: absolute; bottom: 0; right: 0;
							width: 9px; height: 9px;
							border-radius: 50%;
							background: {item.dot};
							border: 2px solid var(--dbg);
						"></span>
					</div>
					<span style="font-size: 13px; color: var(--dt2); font-weight: 500;">{item.label}</span>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ SHAPES ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Shapes</h3>
		<p class="ds-card__sub">Circle (default for people) and rounded square (for teams, bots, or apps)</p>
		<div class="ds-demo" style="gap: 32px;">
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="
					width: 48px; height: 48px;
					border-radius: 50%;
					background: linear-gradient(135deg, #2a2a2a, #111);
					display: flex; align-items: center; justify-content: center;
					color: #e5e5e5; font-size: 15px; font-weight: 700;
					border: 1.5px solid var(--dbd);
				">JD</div>
				<div style="font-size: 12px; color: var(--dt2); font-weight: 500;">Circle</div>
				<div style="font-size: 11px; color: var(--dt3);">border-radius: 50%</div>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="
					width: 48px; height: 48px;
					border-radius: 12px;
					background: linear-gradient(135deg, #2a2a2a, #111);
					display: flex; align-items: center; justify-content: center;
					color: #e5e5e5; font-size: 15px; font-weight: 700;
					border: 1.5px solid var(--dbd);
				">JD</div>
				<div style="font-size: 12px; color: var(--dt2); font-weight: 500;">Rounded Square</div>
				<div style="font-size: 11px; color: var(--dt3);">border-radius: 12px</div>
			</div>
			<div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
				<div style="
					width: 48px; height: 48px;
					border-radius: 8px;
					background: linear-gradient(135deg, #2a2a2a, #111);
					display: flex; align-items: center; justify-content: center;
					color: #e5e5e5; font-size: 15px; font-weight: 700;
					border: 1.5px solid var(--dbd);
				">JD</div>
				<div style="font-size: 12px; color: var(--dt2); font-weight: 500;">Square</div>
				<div style="font-size: 11px; color: var(--dt3);">border-radius: 8px</div>
			</div>
		</div>
	</div>

	<!-- ═══ AVATAR GROUP ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">Avatar Group</h3>
		<p class="ds-card__sub">Stacked overlapping avatars for teams, collaborators, and viewer lists</p>

		<h4 class="ds-card__h4">Initials Stack</h4>
		<div class="ds-demo" style="gap: 40px; align-items: center;">
			<!-- 4-person group -->
			<div style="display: flex; align-items: center; gap: 0;">
				{#each [
					{ initials: 'AM', accent: '#3b82f6', z: 4 },
					{ initials: 'BT', accent: '#8b5cf6', z: 3 },
					{ initials: 'CN', accent: '#10b981', z: 2 },
					{ initials: 'DO', accent: '#f59e0b', z: 1 },
				] as item, i}
					<div style="
						width: 36px; height: 36px;
						border-radius: 50%;
						background: linear-gradient(135deg, {item.accent}33, {item.accent}11);
						border: 2px solid var(--dbg);
						display: flex; align-items: center; justify-content: center;
						color: {item.accent}; font-size: 12px; font-weight: 700;
						margin-left: {i === 0 ? 0 : -10}px;
						z-index: {item.z};
						position: relative;
						flex-shrink: 0;
					">{item.initials}</div>
				{/each}
				<div style="margin-left: 10px; font-size: 13px; color: var(--dt2); font-weight: 500;">4 members</div>
			</div>

			<!-- 5-person group with overflow -->
			<div style="display: flex; align-items: center; gap: 0;">
				{#each [
					{ initials: 'EZ', accent: '#ef4444', z: 5 },
					{ initials: 'FP', accent: '#ec4899', z: 4 },
					{ initials: 'GR', accent: '#06b6d4', z: 3 },
				] as item, i}
					<div style="
						width: 36px; height: 36px;
						border-radius: 50%;
						background: linear-gradient(135deg, {item.accent}33, {item.accent}11);
						border: 2px solid var(--dbg);
						display: flex; align-items: center; justify-content: center;
						color: {item.accent}; font-size: 12px; font-weight: 700;
						margin-left: {i === 0 ? 0 : -10}px;
						z-index: {item.z};
						position: relative;
						flex-shrink: 0;
					">{item.initials}</div>
				{/each}
				<!-- overflow counter -->
				<div style="
					width: 36px; height: 36px;
					border-radius: 50%;
					background: rgba(0,0,0,0.06);
					border: 2px solid var(--dbg);
					display: flex; align-items: center; justify-content: center;
					color: var(--dt2); font-size: 11px; font-weight: 700;
					margin-left: -10px;
					z-index: 1;
					position: relative;
					flex-shrink: 0;
				">+9</div>
				<div style="margin-left: 10px; font-size: 13px; color: var(--dt2); font-weight: 500;">12 members</div>
			</div>
		</div>

		<h4 class="ds-card__h4">Image Stack</h4>
		<div class="ds-demo" style="gap: 40px; align-items: center;">
			<div style="display: flex; align-items: center; gap: 0;">
				{#each [11, 22, 33, 44, 55] as seed, i}
					<div style="
						width: 32px; height: 32px;
						border-radius: 50%; overflow: hidden;
						border: 2px solid var(--dbg);
						margin-left: {i === 0 ? 0 : -8}px;
						z-index: {5 - i};
						position: relative;
						flex-shrink: 0;
					">
						<img
							src="https://i.pravatar.cc/64?u={seed}"
							alt="Team member"
							style="width: 100%; height: 100%; object-fit: cover; display: block;"
						/>
					</div>
				{/each}
				<div style="margin-left: 10px; font-size: 13px; color: var(--dt2); font-weight: 500;">5 online</div>
			</div>
		</div>

		<h4 class="ds-card__h4">Sizes</h4>
		<div style="display: flex; flex-direction: column; gap: 16px;">
			{#each [
				{ size: 24, offset: -6,  label: 'xs' },
				{ size: 32, offset: -8,  label: 'sm' },
				{ size: 40, offset: -10, label: 'md' },
			] as row}
				<div style="display: flex; align-items: center; gap: 12px;">
					<span style="font-size: 11px; font-weight: 600; color: var(--dt3); width: 24px;">{row.label}</span>
					<div style="display: flex; align-items: center;">
						{#each [
							{ initials: 'AM', accent: '#3b82f6' },
							{ initials: 'BT', accent: '#8b5cf6' },
							{ initials: 'CN', accent: '#10b981' },
						] as item, i}
							<div style="
								width: {row.size}px; height: {row.size}px;
								border-radius: 50%;
								background: linear-gradient(135deg, {item.accent}33, {item.accent}11);
								border: 2px solid var(--dbg);
								display: flex; align-items: center; justify-content: center;
								color: {item.accent}; font-size: {Math.round(row.size * 0.33)}px; font-weight: 700;
								margin-left: {i === 0 ? 0 : row.offset}px;
								z-index: {3 - i};
								position: relative;
								flex-shrink: 0;
							">{item.initials}</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- ═══ IN CONTEXT ═══ -->
	<div class="ds-card">
		<h3 class="ds-card__title">In Context</h3>
		<p class="ds-card__sub">Avatars composed with names, roles, and metadata in real UI patterns</p>
		<div style="display: flex; flex-direction: column; gap: 1px; max-width: 340px; border: 1px solid rgba(0,0,0,0.06); border-radius: 12px; overflow: hidden;">
			{#each [
				{ seed: 10, name: 'Alice Morgan',  role: 'Engineering Lead', dot: '#22c55e', initials: 'AM', accent: '#3b82f6' },
				{ seed: 20, name: 'Blake Torres',  role: 'Product Manager',  dot: '#f59e0b', initials: 'BT', accent: '#8b5cf6' },
				{ seed: 30, name: 'Casey Nguyen',  role: 'Designer',         dot: '#6b7280', initials: 'CN', accent: '#10b981' },
			] as item}
				<div style="
					display: flex; align-items: center; gap: 12px;
					padding: 12px 16px;
					background: var(--dbg);
					backdrop-filter: blur(8px);
					border-bottom: 1px solid rgba(0,0,0,0.04);
				">
					<div style="position: relative; flex-shrink: 0;">
						<div style="
							width: 36px; height: 36px;
							border-radius: 50%; overflow: hidden;
							border: 1.5px solid var(--dbd);
						">
							<img
								src="https://i.pravatar.cc/72?u={item.seed}"
								alt={item.name}
								style="width: 100%; height: 100%; object-fit: cover; display: block;"
							/>
						</div>
						<span style="
							position: absolute; bottom: 0; right: 0;
							width: 9px; height: 9px;
							border-radius: 50%;
							background: {item.dot};
							border: 2px solid var(--dbg);
						"></span>
					</div>
					<div style="flex: 1; min-width: 0;">
						<div style="font-size: 13px; font-weight: 600; color: var(--dt); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{item.name}</div>
						<div style="font-size: 12px; color: var(--dt3);">{item.role}</div>
					</div>
					<button style="
						padding: 4px 12px;
						border-radius: 9999px;
						border: 1px solid rgba(0,0,0,0.1);
						background: transparent;
						font-size: 12px; font-weight: 500; color: var(--dt2);
						cursor: pointer;
					">View</button>
				</div>
			{/each}
		</div>
	</div>
</section>
