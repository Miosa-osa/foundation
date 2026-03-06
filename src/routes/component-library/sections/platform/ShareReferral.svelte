<script lang="ts">
	// ── Demo 1: Activity Details Card ────────────────────────────
	let shareLink = $state('https://miosa.app/ref/invite');
	let shareLinkCopied = $state(false);

	function copyShareLink() {
		shareLinkCopied = true;
		setTimeout(() => (shareLinkCopied = false), 2000);
	}

	// ── Demo 2: Social Share Buttons ─────────────────────────────
	// (static demo, no state needed)

	// ── Demo 3: Referral Code Card ───────────────────────────────
	let refCode = $state('MIOSA-XK9Z');
	let refCopied = $state(false);
	let refLink = $state('https://miosa.app/r/MIOSA-XK9Z');
	let refLinkCopied = $state(false);

	function copyRefCode() {
		refCopied = true;
		setTimeout(() => (refCopied = false), 2000);
	}
	function copyRefLink() {
		refLinkCopied = true;
		setTimeout(() => (refLinkCopied = false), 2000);
	}

	const referralStats = [
		{ label: 'Invites Sent', value: '12' },
		{ label: 'Accepted', value: '8' },
		{ label: 'Credits Earned', value: '2,000' },
		{ label: 'Pending', value: '500' },
	];

	// ── Demo 4: Invite Modal ─────────────────────────────────────
	let inviteEmail = $state('');
	let inviteMessage = $state(
		"Hey! I've been using MIOSA and thought you'd love it. Sign up with my link to get 250 free credits instantly."
	);
	let inviteLoading = $state(false);
	let inviteSent = $state(false);

	function sendInvite() {
		if (!inviteEmail.trim()) return;
		inviteLoading = true;
		setTimeout(() => {
			inviteLoading = false;
			inviteSent = true;
			inviteEmail = '';
			setTimeout(() => (inviteSent = false), 3000);
		}, 1200);
	}

	// ── Demo 5: Submit your link ─────────────────────────────────
	let submitLinkUrl = $state('');
	let submitLoading = $state(false);
	let submitDone = $state(false);

	function handleSubmit() {
		if (!submitLinkUrl.trim()) return;
		submitLoading = true;
		setTimeout(() => {
			submitLoading = false;
			submitDone = true;
			submitLinkUrl = '';
			setTimeout(() => (submitDone = false), 2500);
		}, 1000);
	}
</script>

<section class="ds-section">
	<h2 class="ds-title">Share &amp; Referral</h2>
	<p class="ds-desc">
		Social sharing, referral programs, invite flows, and earn-by-sharing patterns.
	</p>

	<!-- ── 1. Activity Details Card ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Activity Details Card</h3>
		<p class="ds-card__sub">"Share &amp; Earn" card with gradient icon, bullet how-it-works, and social share buttons</p>
		<div class="sh-activity-card" role="region" aria-label="Share and Earn activity card">
			<!-- Gradient icon -->
			<div class="sh-activity-card__icon-wrap" aria-hidden="true">
				<div class="sh-activity-card__icon">
					<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
						<line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
					</svg>
				</div>
			</div>

			<!-- Heading -->
			<h3 class="sh-activity-card__heading">Share &amp; Earn</h3>
			<p class="sh-activity-card__sub">Get FREE CREDITS by sharing MIOSA!</p>

			<!-- Earn info pill -->
			<div class="sh-activity-card__earn-pill" role="note" aria-label="Earn 250 credits immediately">
				<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
				<span>Earn <strong>250 credits</strong></span>
				<span class="sh-activity-card__earn-dot" aria-hidden="true"></span>
				<span>Immediately</span>
			</div>

			<!-- How it works -->
			<div class="sh-activity-card__how">
				<p class="sh-activity-card__how-label">How it works:</p>
				<ol class="sh-activity-card__how-list" role="list">
					<li class="sh-activity-card__how-item">
						<span class="sh-activity-card__how-num" aria-hidden="true">1</span>
						Share your unique referral link with a friend
					</li>
					<li class="sh-activity-card__how-item">
						<span class="sh-activity-card__how-num" aria-hidden="true">2</span>
						They sign up and verify their account
					</li>
					<li class="sh-activity-card__how-item">
						<span class="sh-activity-card__how-num" aria-hidden="true">3</span>
						You both receive 250 free credits instantly
					</li>
				</ol>
			</div>

			<!-- Share to section -->
			<div class="sh-activity-card__share">
				<p class="sh-activity-card__share-label">Share to:</p>
				<div class="sh-activity-card__share-btns" role="group" aria-label="Social sharing options">
					<a
						href="https://twitter.com/intent/tweet?text=Join%20MIOSA%20and%20get%20250%20free%20credits!%20https://miosa.app/ref/invite"
						target="_blank"
						rel="noopener noreferrer"
						class="sh-social-pill sh-social-pill--x"
						aria-label="Share on X (Twitter)"
					>
						<!-- X / Twitter icon -->
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.262 5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
						</svg>
						X (Twitter)
					</a>
					<a
						href="https://www.linkedin.com/sharing/share-offsite/?url=https://miosa.app/ref/invite"
						target="_blank"
						rel="noopener noreferrer"
						class="sh-social-pill sh-social-pill--linkedin"
						aria-label="Share on LinkedIn"
					>
						<!-- LinkedIn icon -->
						<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
						</svg>
						LinkedIn
					</a>
				</div>
			</div>

			<!-- Submit your link -->
			<div class="sh-activity-card__submit-row">
				<label for="sh-submit-link" class="sh-activity-card__submit-label">Submit your link</label>
				<div class="sh-activity-card__submit-input-row">
					<input
						id="sh-submit-link"
						type="url"
						class="sh-input"
						placeholder="Paste your post URL…"
						bind:value={submitLinkUrl}
						onkeydown={(e) => e.key === 'Enter' && handleSubmit()}
						aria-label="Post URL to submit for credits"
					/>
					<button
						class="sh-btn-primary"
						onclick={handleSubmit}
						disabled={submitLoading || !submitLinkUrl.trim()}
						aria-label="Submit link for credits"
					>
						{#if submitLoading}
							<span class="sh-spinner" aria-hidden="true"></span>
						{:else if submitDone}
							Submitted!
						{:else}
							Submit
						{/if}
					</button>
				</div>
				{#if submitDone}
					<p class="sh-activity-card__submit-success" role="status">
						Link submitted — credits pending review.
					</p>
				{/if}
			</div>
		</div>
	</div>

	<!-- ── 2. Social Share Buttons ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Social Share Buttons</h3>
		<p class="ds-card__sub">Standalone pill-shaped share buttons for X/Twitter, LinkedIn, Reddit, Discord, and copy-link</p>
		<div class="sh-share-row" role="group" aria-label="Social share buttons">
			<!-- X / Twitter -->
			<a
				href="https://twitter.com/intent/tweet?text=Check%20this%20out!"
				target="_blank"
				rel="noopener noreferrer"
				class="sh-social-btn sh-social-btn--x"
				aria-label="Share on X"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.262 5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
				</svg>
				Share on X
			</a>

			<!-- LinkedIn -->
			<a
				href="https://www.linkedin.com/sharing/share-offsite/?url=https://example.com"
				target="_blank"
				rel="noopener noreferrer"
				class="sh-social-btn sh-social-btn--linkedin"
				aria-label="Share on LinkedIn"
			>
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
				</svg>
				LinkedIn
			</a>

			<!-- Reddit -->
			<a
				href="https://www.reddit.com/submit?url=https://example.com"
				target="_blank"
				rel="noopener noreferrer"
				class="sh-social-btn sh-social-btn--reddit"
				aria-label="Share on Reddit"
			>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
				</svg>
				Reddit
			</a>

			<!-- Discord -->
			<button
				type="button"
				class="sh-social-btn sh-social-btn--discord"
				aria-label="Share on Discord"
			>
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
				</svg>
				Discord
			</button>

			<!-- Copy Link -->
			<button
				class="sh-social-btn sh-social-btn--copy"
				onclick={copyShareLink}
				aria-label={shareLinkCopied ? 'Link copied' : 'Copy link'}
			>
				{#if shareLinkCopied}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
					Copied!
				{:else}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
					Copy Link
				{/if}
			</button>
		</div>

		<!-- Icon-only compact row -->
		<div class="sh-share-row sh-share-row--compact" role="group" aria-label="Compact icon-only share buttons" style="margin-top: 12px;">
			<button class="sh-icon-btn sh-icon-btn--x" aria-label="Share on X">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.262 5.634zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
			</button>
			<button class="sh-icon-btn sh-icon-btn--linkedin" aria-label="Share on LinkedIn">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
			</button>
			<button class="sh-icon-btn sh-icon-btn--reddit" aria-label="Share on Reddit">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
			</button>
			<button class="sh-icon-btn sh-icon-btn--discord" aria-label="Share on Discord">
				<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
			</button>
			<button class="sh-icon-btn" onclick={copyShareLink} aria-label={shareLinkCopied ? 'Copied' : 'Copy link'}>
				{#if shareLinkCopied}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
				{:else}
					<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
				{/if}
			</button>
		</div>
	</div>

	<!-- ── 3. Referral Code Card ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Referral Code Card</h3>
		<p class="ds-card__sub">Referral link with copy button, plus stats grid showing invites sent, accepted, and credits earned</p>
		<div class="sh-ref-card" role="region" aria-label="Referral code and stats">
			<!-- Header -->
			<div class="sh-ref-card__header">
				<div class="sh-ref-card__header-icon" aria-hidden="true">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
				</div>
				<div>
					<h4 class="sh-ref-card__title">Your Referral Code</h4>
					<p class="sh-ref-card__sub">Share with friends to earn credits together</p>
				</div>
			</div>

			<!-- Code row -->
			<div class="sh-ref-card__code-section">
				<p class="sh-ref-card__field-label">Referral Code</p>
				<div class="sh-ref-card__code-row">
					<span class="sh-ref-card__code" aria-label="Referral code: {refCode}">{refCode}</span>
					<button
						class="sh-copy-btn"
						onclick={copyRefCode}
						aria-label={refCopied ? 'Code copied' : 'Copy referral code'}
					>
						{#if refCopied}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
							Copied
						{:else}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
							Copy
						{/if}
					</button>
				</div>
			</div>

			<!-- Link row -->
			<div class="sh-ref-card__link-section">
				<p class="sh-ref-card__field-label">Referral Link</p>
				<div class="sh-ref-card__link-row">
					<span class="sh-ref-card__link" aria-label="Referral link">{refLink}</span>
					<button
						class="sh-copy-btn"
						onclick={copyRefLink}
						aria-label={refLinkCopied ? 'Link copied' : 'Copy referral link'}
					>
						{#if refLinkCopied}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
							Copied
						{:else}
							<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
							Copy
						{/if}
					</button>
				</div>
			</div>

			<!-- Stats grid -->
			<div class="sh-ref-card__stats" role="list" aria-label="Referral statistics">
				{#each referralStats as stat}
					<div class="sh-ref-card__stat" role="listitem">
						<span class="sh-ref-card__stat-value">{stat.value}</span>
						<span class="sh-ref-card__stat-label">{stat.label}</span>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- ── 4. Invite Modal ── -->
	<div class="ds-card">
		<h3 class="ds-card__title">Invite Modal</h3>
		<p class="ds-card__sub">Email invite form with editable message preview and send confirmation state</p>
		<div class="sh-invite-modal" role="dialog" aria-modal="false" aria-label="Invite a friend">
			<!-- Modal header -->
			<div class="sh-invite-modal__header">
				<div class="sh-invite-modal__header-icon" aria-hidden="true">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
				</div>
				<div>
					<h4 class="sh-invite-modal__title">Invite a Friend</h4>
					<p class="sh-invite-modal__sub">They get 250 credits, you get 250 credits</p>
				</div>
			</div>

			<!-- Email input -->
			<div class="sh-invite-modal__field">
				<label class="sh-label" for="sh-invite-email">Email address</label>
				<input
					id="sh-invite-email"
					type="email"
					class="sh-input"
					placeholder="friend@example.com"
					bind:value={inviteEmail}
					aria-label="Friend's email address"
				/>
			</div>

			<!-- Message preview -->
			<div class="sh-invite-modal__field">
				<label class="sh-label" for="sh-invite-msg">Message preview</label>
				<textarea
					id="sh-invite-msg"
					class="sh-textarea"
					rows="3"
					bind:value={inviteMessage}
					aria-label="Invite message"
				></textarea>
			</div>

			<!-- Footer -->
			<div class="sh-invite-modal__footer">
				<div class="sh-invite-modal__earn-note" role="note">
					<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
					Both earn 250 credits on signup
				</div>
				<button
					class="sh-btn-primary"
					onclick={sendInvite}
					disabled={inviteLoading || !inviteEmail.trim() || inviteSent}
					aria-label={inviteSent ? 'Invite sent' : 'Send invite'}
				>
					{#if inviteLoading}
						<span class="sh-spinner" aria-hidden="true"></span>
						Sending…
					{:else if inviteSent}
						<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
						Sent!
					{:else}
						Send Invite
					{/if}
				</button>
			</div>
			{#if inviteSent}
				<p class="sh-invite-modal__success" role="status">Invite sent! Your friend will receive an email shortly.</p>
			{/if}
		</div>
	</div>
</section>

<style>
	/* ─── Activity Details Card ─────────────────────────────────── */
	.sh-activity-card {
		max-width: 400px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		padding: 28px 24px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0;
	}

	.sh-activity-card__icon-wrap {
		margin-bottom: 16px;
	}
	.sh-activity-card__icon {
		width: 60px;
		height: 60px;
		border-radius: 18px;
		background: linear-gradient(135deg, #1a1a1a 0%, #404040 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 0.9);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
	}
	:global(.dark) .sh-activity-card__icon {
		background: linear-gradient(135deg, #333 0%, #666 100%);
	}

	.sh-activity-card__heading {
		margin: 0 0 4px;
		font-size: 20px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: -0.02em;
		text-align: center;
	}
	.sh-activity-card__sub {
		margin: 0 0 16px;
		font-size: 13px;
		color: var(--dt3);
		text-align: center;
	}

	.sh-activity-card__earn-pill {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 14px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 12px;
		color: var(--dt2);
		margin-bottom: 20px;
	}
	.sh-activity-card__earn-dot {
		width: 3px;
		height: 3px;
		border-radius: 9999px;
		background: var(--dt4);
		display: inline-block;
	}

	.sh-activity-card__how {
		width: 100%;
		margin-bottom: 20px;
	}
	.sh-activity-card__how-label {
		margin: 0 0 10px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
	}
	.sh-activity-card__how-list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.sh-activity-card__how-item {
		display: flex;
		align-items: flex-start;
		gap: 10px;
		font-size: 13px;
		color: var(--dt2);
		line-height: 1.4;
	}
	.sh-activity-card__how-num {
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border-radius: 9999px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		font-size: 11px;
		font-weight: 700;
		color: var(--dt2);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 1px;
	}

	.sh-activity-card__share {
		width: 100%;
		margin-bottom: 20px;
	}
	.sh-activity-card__share-label {
		margin: 0 0 10px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
	}
	.sh-activity-card__share-btns {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.sh-activity-card__submit-row {
		width: 100%;
	}
	.sh-activity-card__submit-label {
		display: block;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
		margin-bottom: 8px;
	}
	.sh-activity-card__submit-input-row {
		display: flex;
		gap: 8px;
	}
	.sh-activity-card__submit-success {
		margin: 8px 0 0;
		font-size: 12px;
		color: var(--dt3);
	}

	/* ─── Social Pill (used in Activity Card share-to section) ──── */
	.sh-social-pill {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 0 16px;
		height: 36px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		white-space: nowrap;
	}
	.sh-social-pill:hover {
		border-color: var(--dt);
		background: var(--dt);
		color: #fff;
	}
	:global(.dark) .sh-social-pill:hover {
		background: #e5e5e5;
		color: #111;
		border-color: #e5e5e5;
	}
	.sh-social-pill--x:hover { background: #000; border-color: #000; color: #fff; }
	.sh-social-pill--linkedin:hover { background: #0a66c2; border-color: #0a66c2; color: #fff; }

	/* ─── Social Share Buttons (Demo 2) ─────────────────────────── */
	.sh-share-row {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.sh-social-btn {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 0 16px;
		height: 34px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 600;
		text-decoration: none;
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		white-space: nowrap;
	}
	.sh-social-btn:hover {
		border-color: var(--dbd2);
		background: var(--dbg3);
		color: var(--dt);
	}
	.sh-social-btn--x:hover        { background: #000;     border-color: #000;     color: #fff; }
	.sh-social-btn--linkedin:hover { background: #0a66c2;  border-color: #0a66c2;  color: #fff; }
	.sh-social-btn--reddit:hover   { background: #ff4500;  border-color: #ff4500;  color: #fff; }
	.sh-social-btn--discord:hover  { background: #5865f2;  border-color: #5865f2;  color: #fff; }
	.sh-social-btn--copy:hover     { border-color: var(--dt); color: var(--dt); }

	/* Icon-only compact buttons */
	.sh-icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt2);
		cursor: pointer;
		transition: background 0.15s, border-color 0.15s, color 0.15s;
		flex-shrink: 0;
	}
	.sh-icon-btn:hover        { border-color: var(--dbd2); background: var(--dbg3); color: var(--dt); }
	.sh-icon-btn--x:hover        { background: #000;    border-color: #000;    color: #fff; }
	.sh-icon-btn--linkedin:hover { background: #0a66c2; border-color: #0a66c2; color: #fff; }
	.sh-icon-btn--reddit:hover   { background: #ff4500; border-color: #ff4500; color: #fff; }
	.sh-icon-btn--discord:hover  { background: #5865f2; border-color: #5865f2; color: #fff; }

	/* ─── Referral Code Card ─────────────────────────────────────── */
	.sh-ref-card {
		max-width: 460px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		overflow: hidden;
	}

	.sh-ref-card__header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 20px 20px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.sh-ref-card__header-icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.sh-ref-card__title {
		margin: 0 0 2px;
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.sh-ref-card__sub {
		margin: 0;
		font-size: 12px;
		color: var(--dt3);
	}

	.sh-ref-card__code-section,
	.sh-ref-card__link-section {
		padding: 16px 20px;
		border-bottom: 1px solid var(--dbd);
	}
	.sh-ref-card__field-label {
		margin: 0 0 8px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		color: var(--dt3);
	}
	.sh-ref-card__code-row,
	.sh-ref-card__link-row {
		display: flex;
		align-items: center;
		gap: 10px;
	}
	.sh-ref-card__code {
		flex: 1;
		font-size: 18px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: 0.06em;
		font-variant-numeric: tabular-nums;
		font-family: 'SF Mono', 'Fira Code', monospace;
	}
	.sh-ref-card__link {
		flex: 1;
		font-size: 12px;
		color: var(--dt2);
		font-family: 'SF Mono', 'Fira Code', monospace;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		min-width: 0;
	}

	.sh-ref-card__stats {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 0;
	}
	.sh-ref-card__stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 16px 8px;
		border-right: 1px solid var(--dbd);
		text-align: center;
	}
	.sh-ref-card__stat:last-child {
		border-right: none;
	}
	.sh-ref-card__stat-value {
		font-size: 18px;
		font-weight: 800;
		color: var(--dt);
		letter-spacing: -0.02em;
		line-height: 1;
		margin-bottom: 4px;
		font-variant-numeric: tabular-nums;
	}
	.sh-ref-card__stat-label {
		font-size: 10px;
		color: var(--dt3);
		font-weight: 500;
		text-align: center;
		line-height: 1.3;
	}

	/* ─── Invite Modal ───────────────────────────────────────────── */
	.sh-invite-modal {
		max-width: 400px;
		border-radius: 20px;
		border: 1px solid var(--dbd);
		background: var(--dbg);
		padding: 0;
		overflow: hidden;
	}

	.sh-invite-modal__header {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 20px 20px 16px;
		border-bottom: 1px solid var(--dbd);
	}
	.sh-invite-modal__header-icon {
		width: 36px;
		height: 36px;
		border-radius: 10px;
		background: var(--dbg2);
		border: 1px solid var(--dbd);
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--dt2);
		flex-shrink: 0;
	}
	.sh-invite-modal__title {
		margin: 0 0 2px;
		font-size: 14px;
		font-weight: 700;
		color: var(--dt);
		letter-spacing: -0.01em;
	}
	.sh-invite-modal__sub {
		margin: 0;
		font-size: 12px;
		color: var(--dt3);
	}

	.sh-invite-modal__field {
		padding: 16px 20px 0;
	}

	.sh-invite-modal__footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 16px 20px 20px;
		flex-wrap: wrap;
	}
	.sh-invite-modal__earn-note {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 12px;
		color: var(--dt3);
	}
	.sh-invite-modal__success {
		margin: 0;
		padding: 0 20px 16px;
		font-size: 12px;
		color: var(--dt3);
	}

	/* ─── Shared Form Elements ───────────────────────────────────── */
	.sh-label {
		display: block;
		font-size: 12px;
		font-weight: 600;
		color: var(--dt2);
		margin-bottom: 6px;
	}
	.sh-input {
		width: 100%;
		height: 36px;
		padding: 0 12px;
		border-radius: 10px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 13px;
		outline: none;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}
	.sh-input:focus {
		border-color: var(--dt);
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
	}
	:global(.dark) .sh-input:focus {
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08);
	}
	.sh-input::placeholder {
		color: var(--dt4);
	}
	.sh-textarea {
		width: 100%;
		padding: 10px 12px;
		border-radius: 10px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt);
		font-size: 12px;
		line-height: 1.5;
		resize: vertical;
		outline: none;
		font-family: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;
		box-sizing: border-box;
	}
	.sh-textarea:focus {
		border-color: var(--dt);
		box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
	}
	:global(.dark) .sh-textarea:focus {
		box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.08);
	}

	/* ─── Shared Buttons ─────────────────────────────────────────── */
	.sh-btn-primary {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 36px;
		padding: 0 18px;
		border-radius: 9999px;
		border: none;
		background: var(--dt);
		color: #fff;
		font-size: 13px;
		font-weight: 700;
		cursor: pointer;
		transition: opacity 0.15s;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.sh-btn-primary:hover:not(:disabled) {
		opacity: 0.85;
	}
	.sh-btn-primary:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}
	:global(.dark) .sh-btn-primary {
		background: #e5e5e5;
		color: #111;
	}

	.sh-copy-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		height: 30px;
		padding: 0 12px;
		border-radius: 9999px;
		border: 1px solid var(--dbd2);
		background: var(--dbg2);
		color: var(--dt2);
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: background 0.15s, color 0.15s, border-color 0.15s;
		white-space: nowrap;
		flex-shrink: 0;
	}
	.sh-copy-btn:hover {
		background: var(--dbg3);
		color: var(--dt);
		border-color: var(--dbd2);
	}

	/* ─── Spinner ────────────────────────────────────────────────── */
	.sh-spinner {
		display: inline-block;
		width: 12px;
		height: 12px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: #fff;
		border-radius: 9999px;
		animation: sh-spin 0.6s linear infinite;
	}
	:global(.dark) .sh-spinner {
		border-color: rgba(0, 0, 0, 0.2);
		border-top-color: #111;
	}
	@keyframes sh-spin {
		to { transform: rotate(360deg); }
	}
</style>
