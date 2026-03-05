<section class="ds-section">
	<h2 class="ds-title">Error States</h2>
	<p class="ds-desc">HTTP errors, connectivity failures, access control, validation, and session handling — dark monochrome with calibrated accent colors.</p>

	<!-- 404 Not Found -->
	<div class="ds-card">
		<h3 class="ds-card__title">404 Not Found</h3>
		<p class="ds-card__sub">The requested resource does not exist or has been moved</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="font-size: 80px; font-weight: 900; letter-spacing: -0.05em; color: rgba(255,255,255,0.05); line-height: 1; margin-bottom: 4px; font-variant-numeric: tabular-nums;">404</div>
				<h4 style="font-size: 18px; font-weight: 600; color: #fff; margin: 0 0 8px; letter-spacing: -0.02em;">Page not found</h4>
				<p style="font-size: 13px; color: #666; margin: 0 0 28px; max-width: 300px; line-height: 1.6;">The page you're looking for doesn't exist or has been moved to a new location.</p>
				<div style="display: flex; gap: 8px;">
					<button class="btn-pill btn-pill-secondary btn-pill-sm">Go Back</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm">Go Home</button>
				</div>
			</div>
		</div>
	</div>

	<!-- 500 Server Error -->
	<div class="ds-card">
		<h3 class="ds-card__title">500 Internal Server Error</h3>
		<p class="ds-card__sub">Unhandled server-side failure — reassure the user and offer a retry path</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="font-size: 80px; font-weight: 900; letter-spacing: -0.05em; color: rgba(239,68,68,0.07); line-height: 1; margin-bottom: 4px; font-variant-numeric: tabular-nums;">500</div>
				<div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
					<div style="width: 6px; height: 6px; border-radius: 50%; background: rgba(239,68,68,0.6); flex-shrink: 0;"></div>
					<h4 style="font-size: 18px; font-weight: 600; color: #fff; margin: 0; letter-spacing: -0.02em;">Internal server error</h4>
				</div>
				<p style="font-size: 13px; color: #666; margin: 0 0 6px; max-width: 300px; line-height: 1.6;">Our team has been notified and is working on a fix.</p>
				<p style="font-size: 12px; color: #444; margin: 0 0 28px;">Incident ID: <span style="font-family: 'SF Mono', 'Fira Code', monospace; color: #555;">ERR-4F2A9C</span></p>
				<div style="display: flex; gap: 8px;">
					<button class="btn-pill btn-pill-secondary btn-pill-sm">Status Page</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm">Retry</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Network Error -->
	<div class="ds-card">
		<h3 class="ds-card__title">Network Error</h3>
		<p class="ds-card__sub">Offline or unreachable endpoint — prompt the user to check connectivity</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.16); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: rgba(245,158,11,0.8);" stroke-linecap="round" stroke-linejoin="round">
						<line x1="1" y1="1" x2="23" y2="23"/>
						<path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
						<path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
						<path d="M10.71 5.05A16 16 0 0 1 22.56 9"/>
						<path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
						<path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
						<line x1="12" y1="20" x2="12.01" y2="20"/>
					</svg>
				</div>
				<h4 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px; letter-spacing: -0.01em;">No connection</h4>
				<p style="font-size: 13px; color: #666; margin: 0 0 28px; max-width: 280px; line-height: 1.6;">Check your internet connection and try again. Your work has been saved locally.</p>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Retry Connection</button>
			</div>
		</div>
	</div>

	<!-- Form Validation Error -->
	<div class="ds-card">
		<h3 class="ds-card__title">Form Validation Error</h3>
		<p class="ds-card__sub">Inline field-level errors with red accents — never lose user input</p>
		<div class="ds-demo">
			<div style="width: 100%; max-width: 380px; display: flex; flex-direction: column; gap: 16px;">
				<!-- Error summary banner -->
				<div style="display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; background: rgba(239,68,68,0.07); border: 1px solid rgba(239,68,68,0.18); border-radius: 10px;">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: rgba(239,68,68,0.8); flex-shrink: 0; margin-top: 1px;" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/>
						<line x1="12" y1="8" x2="12" y2="12"/>
						<line x1="12" y1="16" x2="12.01" y2="16"/>
					</svg>
					<span style="font-size: 13px; color: rgba(239,68,68,0.9); line-height: 1.5;">Please fix 2 errors before continuing.</span>
				</div>

				<!-- Email field — valid -->
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<div style="font-size: 12px; font-weight: 600; color: #999; letter-spacing: 0.02em; text-transform: uppercase;">Email</div>
					<div style="padding: 9px 12px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; font-size: 13px; color: #ccc;">alex@miosa.ai</div>
				</div>

				<!-- Password field — error -->
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<div style="font-size: 12px; font-weight: 600; color: rgba(239,68,68,0.8); letter-spacing: 0.02em; text-transform: uppercase;">Password</div>
					<div style="padding: 9px 12px; background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; font-size: 13px; color: #ccc;">••••</div>
					<span style="font-size: 12px; color: rgba(239,68,68,0.75); display: flex; align-items: center; gap: 4px;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
						Must be at least 8 characters with one number
					</span>
				</div>

				<!-- Confirm password field — error -->
				<div style="display: flex; flex-direction: column; gap: 6px;">
					<div style="font-size: 12px; font-weight: 600; color: rgba(239,68,68,0.8); letter-spacing: 0.02em; text-transform: uppercase;">Confirm Password</div>
					<div style="padding: 9px 12px; background: rgba(239,68,68,0.05); border: 1px solid rgba(239,68,68,0.3); border-radius: 8px; font-size: 13px; color: #ccc;">••••••</div>
					<span style="font-size: 12px; color: rgba(239,68,68,0.75); display: flex; align-items: center; gap: 4px;">
						<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
						Passwords do not match
					</span>
				</div>

				<button class="btn-pill btn-pill-primary btn-pill-sm" style="align-self: flex-start;" disabled>Save Changes</button>
			</div>
		</div>
	</div>

	<!-- Permission Denied -->
	<div class="ds-card">
		<h3 class="ds-card__title">Permission Denied</h3>
		<p class="ds-card__sub">User lacks sufficient privileges — surface a clear access request path</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: #555;" stroke-linecap="round" stroke-linejoin="round">
						<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
						<path d="M7 11V7a5 5 0 0 1 10 0v4"/>
					</svg>
				</div>
				<div style="display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; margin-bottom: 14px;">
					<span style="font-size: 11px; font-weight: 600; color: #555; letter-spacing: 0.04em; text-transform: uppercase;">Admin only</span>
				</div>
				<h4 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px; letter-spacing: -0.01em;">Access denied</h4>
				<p style="font-size: 13px; color: #666; margin: 0 0 28px; max-width: 280px; line-height: 1.6;">You don't have permission to view this resource. Contact your workspace admin.</p>
				<div style="display: flex; gap: 8px;">
					<button class="btn-pill btn-pill-secondary btn-pill-sm">Go Back</button>
					<button class="btn-pill btn-pill-primary btn-pill-sm">Request Access</button>
				</div>
			</div>
		</div>
	</div>

	<!-- Session Expired -->
	<div class="ds-card">
		<h3 class="ds-card__title">Session Expired</h3>
		<p class="ds-card__sub">Auth token has lapsed — redirect to login with context preserved</p>
		<div class="ds-demo">
			<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 48px 24px; text-align: center; width: 100%;">
				<div style="width: 56px; height: 56px; border-radius: 16px; background: rgba(245,158,11,0.06); border: 1px solid rgba(245,158,11,0.14); display: flex; align-items: center; justify-content: center; margin-bottom: 20px;">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="color: rgba(245,158,11,0.7);" stroke-linecap="round" stroke-linejoin="round">
						<circle cx="12" cy="12" r="10"/>
						<polyline points="12 6 12 12 16 14"/>
					</svg>
				</div>
				<h4 style="font-size: 16px; font-weight: 600; color: #fff; margin: 0 0 8px; letter-spacing: -0.01em;">Session expired</h4>
				<p style="font-size: 13px; color: #666; margin: 0 0 6px; max-width: 280px; line-height: 1.6;">Your session timed out for security. Please log in again to continue.</p>
				<p style="font-size: 12px; color: #444; margin: 0 0 28px;">Your work has been saved.</p>
				<button class="btn-pill btn-pill-primary btn-pill-sm">Log In Again</button>
			</div>
		</div>
	</div>
</section>
