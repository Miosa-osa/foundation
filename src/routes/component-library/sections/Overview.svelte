<section class="ds-section">
	<div class="ds-hero">
		<h1 class="ds-hero__title">MIOSA Foundation</h1>
		<p class="ds-hero__sub">Component Library & Design System</p>
		<p class="ds-hero__desc">The unified design language for building MIOSA-powered applications. Dark monochrome aesthetic, glassmorphism surfaces, and pill-based interactions.</p>
	</div>

	<div class="ds-grid ds-grid--4">
		<div class="ds-metric">
			<span class="ds-metric__value">18</span>
			<span class="ds-metric__label">UI Primitives</span>
		</div>
		<div class="ds-metric">
			<span class="ds-metric__value">100+</span>
			<span class="ds-metric__label">Module Components</span>
		</div>
		<div class="ds-metric">
			<span class="ds-metric__value">33</span>
			<span class="ds-metric__label">AI/Chat Components</span>
		</div>
		<div class="ds-metric">
			<span class="ds-metric__value">120+</span>
			<span class="ds-metric__label">Design Tokens</span>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Design Principles</h3>
		<div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
			<div style="padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px;">
				<div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Dark Monochrome</div>
				<div style="font-size: 12px; color: #888; line-height: 1.5;">Black-to-dark gradients as primary. Clean whites, generous whitespace. Contrast through weight, not color.</div>
			</div>
			<div style="padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px;">
				<div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Glassmorphism</div>
				<div style="font-size: 12px; color: #888; line-height: 1.5;">Frosted glass surfaces with backdrop-blur. Subtle borders and inner glow. Layered depth through transparency.</div>
			</div>
			<div style="padding: 16px; background: rgba(0,0,0,0.02); border-radius: 10px;">
				<div style="font-size: 14px; font-weight: 700; margin-bottom: 4px;">Pill-First</div>
				<div style="font-size: 12px; color: #888; line-height: 1.5;">Full-radius pill shapes as the default interaction pattern. 12 variants, 5 sizes, icon buttons, groups.</div>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Architecture</h3>
		<div class="ds-stack">
			<div class="ds-stack__row">
				<span class="ds-stack__label">UI Primitives</span>
				<code class="ds-code">$lib/ui/</code>
				<span class="ds-stack__detail">Svelte 5 + Bits UI — Button, Input, Modal, Tabs, Menu, Tooltip, etc.</span>
			</div>
			<div class="ds-stack__row">
				<span class="ds-stack__label">Pill System</span>
				<code class="ds-code">app.css</code>
				<span class="ds-stack__detail">.btn-pill-* — 12 variants, glass/gradient/monochrome</span>
			</div>
			<div class="ds-stack__row">
				<span class="ds-stack__label">Design Tokens</span>
				<code class="ds-code">bos-variables.css</code>
				<span class="ds-stack__detail">--bos-v2-* colors, text, borders, shadows</span>
			</div>
			<div class="ds-stack__row">
				<span class="ds-stack__label">Glass & Gradients</span>
				<code class="ds-code">app.css</code>
				<span class="ds-stack__detail">.glass, .glass-card, .gradient-*, glassmorphism vars</span>
			</div>
			<div class="ds-stack__row">
				<span class="ds-stack__label">Chat Components</span>
				<code class="ds-code">$lib/components/chat/</code>
				<span class="ds-stack__detail">25 Svelte components — conversation, memory, thinking</span>
			</div>
			<div class="ds-stack__row">
				<span class="ds-stack__label">AI Elements</span>
				<code class="ds-code">$lib/components/ai-elements/</code>
				<span class="ds-stack__detail">8 Svelte components — CodeBlock, Loader, Suggestion, etc.</span>
			</div>
			<div class="ds-stack__row">
				<span class="ds-stack__label">Modules</span>
				<code class="ds-code">$lib/components/*/</code>
				<span class="ds-stack__detail">35 module dirs — tasks, team, tables, knowledge, agents, etc.</span>
			</div>
		</div>
	</div>

	<div class="ds-card">
		<h3 class="ds-card__title">Import Convention</h3>
		<pre class="ds-pre"><code>// UI Primitives
import &#123; Button, Input, Loading, Modal, Tooltip &#125; from '$lib/ui';
import &#123; Menu, MenuItem, MenuSeparator &#125; from '$lib/ui/menu';
import &#123; Tabs, TabsList, TabsTrigger, TabsContent &#125; from '$lib/ui/tabs';

// Chat Components
import AssistantMessage from '$lib/components/chat/AssistantMessage.svelte';
import UserMessage from '$lib/components/chat/UserMessage.svelte';

// AI Elements
import CodeBlock from '$lib/components/ai-elements/CodeBlock.svelte';
import Loader from '$lib/components/ai-elements/Loader.svelte';

// CSS Classes (no import needed — global)
// .btn-pill .btn-pill-primary .btn-pill-sm
// .glass .glass-card .card .badge .nav-pill</code></pre>
	</div>
</section>
