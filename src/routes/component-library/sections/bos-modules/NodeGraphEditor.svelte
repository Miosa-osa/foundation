<script lang="ts">
  let expandedNodes = $state<Record<string, boolean>>({
    'http-request': true,
    'if-condition': false,
    'send-email': true,
  });

  function toggleNode(id: string) {
    expandedNodes[id] = !expandedNodes[id];
  }

  let zoomLevel = $state(100);

  function zoomIn() {
    if (zoomLevel < 200) zoomLevel = Math.min(200, zoomLevel + 25);
  }

  function zoomOut() {
    if (zoomLevel > 25) zoomLevel = Math.max(25, zoomLevel - 25);
  }

  function fitView() {
    zoomLevel = 100;
  }
</script>

<section class="ds-section">
  <h2>Node Graph / Flow Editor</h2>
  <p class="ds-section__desc">
    Visual flow editor patterns: node cards with ports, typed node categories, canvas with SVG
    connections, connection line styles, a draggable node palette, and a minimap overview.
  </p>

  <!-- 1. Node Cards -->
  <div class="ds-card">
    <h3 class="ds-card__title">Node Cards</h3>
    <div class="ng-node-cards-row">

      <!-- HTTP Request node — selected state -->
      <div class="ng-node ng-node--trigger ng-node--selected">
        <div class="ng-node__header">
          <span class="ng-node__type-dot ng-node__type-dot--trigger"></span>
          <span class="ng-node__title">HTTP Request</span>
          <button
            class="btn-compact btn-compact-ghost btn-compact-icon"
            onclick={() => toggleNode('http-request')}
            aria-label="Toggle node"
          >
            {expandedNodes['http-request'] ? '▾' : '▸'}
          </button>
          <span class="ng-node__status ng-node__status--active"></span>
        </div>
        <!-- Input ports on left edge -->
        <div class="ng-node__port-rail ng-node__port-rail--left">
          <div class="ng-port-slot">
            <span class="ng-port-circle ng-port-circle--in" title="trigger"></span>
            <span class="ng-port-slot__label">trigger</span>
          </div>
        </div>
        <!-- Output ports on right edge -->
        <div class="ng-node__port-rail ng-node__port-rail--right">
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">response</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--string" title="response"></span>
          </div>
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">status</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--number" title="status"></span>
          </div>
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">error</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--error" title="error"></span>
          </div>
        </div>
        {#if expandedNodes['http-request']}
          <div class="ng-node__body">
            <div class="ng-node__field">
              <span class="ng-node__field-label">Method</span>
              <span class="ng-node__field-value ng-node__field-value--method">POST</span>
            </div>
            <div class="ng-node__field">
              <span class="ng-node__field-label">URL</span>
              <span class="ng-node__field-value">api.example.com/v1</span>
            </div>
            <div class="ng-node__field">
              <span class="ng-node__field-label">Auth</span>
              <span class="ng-node__field-value">Bearer token</span>
            </div>
          </div>
        {/if}
        <div class="ng-node__resize-handle"></div>
      </div>

      <!-- IF Condition node -->
      <div class="ng-node ng-node--condition">
        <div class="ng-node__header">
          <span class="ng-node__type-dot ng-node__type-dot--condition"></span>
          <span class="ng-node__title">IF Condition</span>
          <button
            class="btn-compact btn-compact-ghost btn-compact-icon"
            onclick={() => toggleNode('if-condition')}
            aria-label="Toggle node"
          >
            {expandedNodes['if-condition'] ? '▾' : '▸'}
          </button>
          <span class="ng-node__status ng-node__status--active"></span>
        </div>
        <div class="ng-node__port-rail ng-node__port-rail--left">
          <div class="ng-port-slot">
            <span class="ng-port-circle ng-port-circle--in ng-port-circle--string" title="value"></span>
            <span class="ng-port-slot__label">value</span>
          </div>
        </div>
        <div class="ng-node__port-rail ng-node__port-rail--right">
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">true</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-true" title="true"></span>
          </div>
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">false</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-false" title="false"></span>
          </div>
        </div>
        {#if expandedNodes['if-condition']}
          <div class="ng-node__body">
            <div class="ng-node__field">
              <span class="ng-node__field-label">Expression</span>
              <span class="ng-node__field-value">status === 200</span>
            </div>
          </div>
        {/if}
        <div class="ng-node__resize-handle"></div>
      </div>

      <!-- Send Email node -->
      <div class="ng-node ng-node--action">
        <div class="ng-node__header">
          <span class="ng-node__type-dot ng-node__type-dot--action"></span>
          <span class="ng-node__title">Send Email</span>
          <button
            class="btn-compact btn-compact-ghost btn-compact-icon"
            onclick={() => toggleNode('send-email')}
            aria-label="Toggle node"
          >
            {expandedNodes['send-email'] ? '▾' : '▸'}
          </button>
          <span class="ng-node__status ng-node__status--processing"></span>
        </div>
        <div class="ng-node__port-rail ng-node__port-rail--left">
          <div class="ng-port-slot">
            <span class="ng-port-circle ng-port-circle--in ng-port-circle--bool-true" title="trigger"></span>
            <span class="ng-port-slot__label">trigger</span>
          </div>
          <div class="ng-port-slot">
            <span class="ng-port-circle ng-port-circle--in ng-port-circle--string" title="body"></span>
            <span class="ng-port-slot__label">body</span>
          </div>
        </div>
        <div class="ng-node__port-rail ng-node__port-rail--right">
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">done</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-true" title="done"></span>
          </div>
        </div>
        {#if expandedNodes['send-email']}
          <div class="ng-node__body">
            <div class="ng-node__field">
              <span class="ng-node__field-label">To</span>
              <span class="ng-node__field-value">&#123;&#123;user.email&#125;&#125;</span>
            </div>
            <div class="ng-node__field">
              <span class="ng-node__field-label">Subject</span>
              <span class="ng-node__field-value">Order Confirmed</span>
            </div>
            <div class="ng-node__field">
              <span class="ng-node__field-label">Template</span>
              <span class="ng-node__field-value">order-confirm-v2</span>
            </div>
          </div>
        {/if}
        <div class="ng-node__resize-handle"></div>
      </div>

      <!-- Transform node — error state -->
      <div class="ng-node ng-node--transform ng-node--error">
        <div class="ng-node__header">
          <span class="ng-node__type-dot ng-node__type-dot--transform"></span>
          <span class="ng-node__title">JSON Parse</span>
          <button class="btn-compact btn-compact-ghost btn-compact-icon" aria-label="Toggle node">▾</button>
          <span class="ng-node__status ng-node__status--error"></span>
        </div>
        <div class="ng-node__port-rail ng-node__port-rail--left">
          <div class="ng-port-slot">
            <span class="ng-port-circle ng-port-circle--in ng-port-circle--string" title="raw"></span>
            <span class="ng-port-slot__label">raw</span>
          </div>
        </div>
        <div class="ng-node__port-rail ng-node__port-rail--right">
          <div class="ng-port-slot ng-port-slot--right">
            <span class="ng-port-slot__label">object</span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--object" title="object"></span>
          </div>
        </div>
        <div class="ng-node__body">
          <div class="ng-node__error-banner">
            <span class="ng-node__error-icon">&#9888;</span>
            SyntaxError: Unexpected token at line 3
          </div>
        </div>
        <div class="ng-node__resize-handle"></div>
      </div>

    </div>
  </div>

  <!-- 2. Node Types -->
  <div class="ds-card">
    <h3 class="ds-card__title">Node Types</h3>
    <div class="ng-types-grid">

      <div class="ng-type-card ng-type-card--trigger">
        <div class="ng-type-card__header">
          <span class="ng-type-card__icon">&#9654;</span>
          <span class="ng-type-card__label">Trigger</span>
        </div>
        <p class="ng-type-card__desc">Starts a workflow. Fires on webhook, schedule, or event.</p>
        <div class="ng-type-card__examples">
          <span class="ng-type-chip">Webhook</span>
          <span class="ng-type-chip">Cron</span>
          <span class="ng-type-chip">Manual</span>
        </div>
        <div class="ng-type-card__port-demo">
          <span class="ng-type-card__port-hint">Outputs only</span>
          <span class="ng-port-circle ng-port-circle--out ng-port-circle--string"></span>
        </div>
      </div>

      <div class="ng-type-card ng-type-card--action">
        <div class="ng-type-card__header">
          <span class="ng-type-card__icon">&#9889;</span>
          <span class="ng-type-card__label">Action</span>
        </div>
        <p class="ng-type-card__desc">Performs side effects: HTTP calls, DB writes, notifications.</p>
        <div class="ng-type-card__examples">
          <span class="ng-type-chip">HTTP Request</span>
          <span class="ng-type-chip">Send Email</span>
          <span class="ng-type-chip">Write DB</span>
        </div>
        <div class="ng-type-card__port-demo">
          <span class="ng-port-circle ng-port-circle--in"></span>
          <span class="ng-type-card__port-hint">In &amp; Out</span>
          <span class="ng-port-circle ng-port-circle--out ng-port-circle--string"></span>
        </div>
      </div>

      <div class="ng-type-card ng-type-card--condition">
        <div class="ng-type-card__header">
          <span class="ng-type-card__icon">&#9670;</span>
          <span class="ng-type-card__label">Condition</span>
        </div>
        <p class="ng-type-card__desc">Branches flow based on a boolean expression or switch.</p>
        <div class="ng-type-card__examples">
          <span class="ng-type-chip">IF / Else</span>
          <span class="ng-type-chip">Switch</span>
          <span class="ng-type-chip">Filter</span>
        </div>
        <div class="ng-type-card__port-demo">
          <span class="ng-port-circle ng-port-circle--in ng-port-circle--string"></span>
          <span class="ng-type-card__port-hint">1 in, 2 out</span>
          <div class="ng-type-card__dual-ports">
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-true"></span>
            <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-false"></span>
          </div>
        </div>
      </div>

      <div class="ng-type-card ng-type-card--transform">
        <div class="ng-type-card__header">
          <span class="ng-type-card__icon">&#8644;</span>
          <span class="ng-type-card__label">Transform</span>
        </div>
        <p class="ng-type-card__desc">Reshapes or enriches data without side effects.</p>
        <div class="ng-type-card__examples">
          <span class="ng-type-chip">JSON Parse</span>
          <span class="ng-type-chip">Map Fields</span>
          <span class="ng-type-chip">Merge</span>
        </div>
        <div class="ng-type-card__port-demo">
          <span class="ng-port-circle ng-port-circle--in ng-port-circle--string"></span>
          <span class="ng-type-card__port-hint">Pass-through</span>
          <span class="ng-port-circle ng-port-circle--out ng-port-circle--object"></span>
        </div>
      </div>

      <div class="ng-type-card ng-type-card--output">
        <div class="ng-type-card__header">
          <span class="ng-type-card__icon">&#9632;</span>
          <span class="ng-type-card__label">Output</span>
        </div>
        <p class="ng-type-card__desc">Terminates a branch and sends a final response or payload.</p>
        <div class="ng-type-card__examples">
          <span class="ng-type-chip">Respond</span>
          <span class="ng-type-chip">Return</span>
          <span class="ng-type-chip">Emit</span>
        </div>
        <div class="ng-type-card__port-demo">
          <span class="ng-port-circle ng-port-circle--in ng-port-circle--object"></span>
          <span class="ng-type-card__port-hint">Inputs only</span>
        </div>
      </div>

    </div>
  </div>

  <!-- 3. Graph Canvas -->
  <div class="ds-card">
    <h3 class="ds-card__title">Graph Canvas</h3>
    <div class="ng-canvas">
      <!-- Dot grid background -->
      <div class="ng-canvas__grid" aria-hidden="true"></div>

      <!-- SVG connection lines layer -->
      <svg class="ng-canvas__svg" aria-hidden="true">
        <!-- Webhook → HTTP Request -->
        <path
          class="ng-svg-edge ng-svg-edge--trigger"
          d="M 158,72 C 195,72 215,88 252,88"
        />
        <!-- HTTP Request → IF Condition (success path) -->
        <path
          class="ng-svg-edge ng-svg-edge--string"
          d="M 408,80 C 445,80 465,96 502,96"
        />
        <!-- HTTP Request → IF Condition (error path) -->
        <path
          class="ng-svg-edge ng-svg-edge--error"
          d="M 408,96 C 445,96 465,148 502,148"
        />
        <!-- IF Condition true → Send Email -->
        <path
          class="ng-svg-edge ng-svg-edge--bool-true"
          d="M 648,88 C 685,88 705,72 742,72"
        />
        <!-- IF Condition false → Log Error -->
        <path
          class="ng-svg-edge ng-svg-edge--bool-false ng-svg-edge--animated"
          d="M 648,108 C 685,108 705,188 742,188"
        />
        <!-- Send Email → Done -->
        <path
          class="ng-svg-edge ng-svg-edge--bool-true"
          d="M 888,72 C 920,72 940,80 960,80"
        />
      </svg>

      <!-- Positioned nodes -->
      <div class="ng-canvas-node" style="left: 28px; top: 48px;">
        <div class="ng-node ng-node--trigger ng-node--sm">
          <div class="ng-node__header">
            <span class="ng-node__type-dot ng-node__type-dot--trigger"></span>
            <span class="ng-node__title">Webhook</span>
            <span class="ng-node__status ng-node__status--active"></span>
          </div>
          <div class="ng-node__ports-inline">
            <div class="ng-node__ports-inline-right">
              <div class="ng-port-inline ng-port-inline--right">
                <span class="ng-port-inline__label">payload</span>
                <span class="ng-port-circle ng-port-circle--out ng-port-circle--string"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ng-canvas-node" style="left: 252px; top: 40px;">
        <div class="ng-node ng-node--action ng-node--sm ng-node--selected">
          <div class="ng-node__header">
            <span class="ng-node__type-dot ng-node__type-dot--action"></span>
            <span class="ng-node__title">HTTP Request</span>
            <span class="ng-node__status ng-node__status--active"></span>
          </div>
          <div class="ng-node__ports-inline">
            <div class="ng-node__ports-inline-left">
              <div class="ng-port-inline ng-port-inline--left">
                <span class="ng-port-circle ng-port-circle--in ng-port-circle--string"></span>
                <span class="ng-port-inline__label">trigger</span>
              </div>
            </div>
            <div class="ng-node__ports-inline-right">
              <div class="ng-port-inline ng-port-inline--right">
                <span class="ng-port-inline__label">response</span>
                <span class="ng-port-circle ng-port-circle--out ng-port-circle--string"></span>
              </div>
              <div class="ng-port-inline ng-port-inline--right">
                <span class="ng-port-inline__label">error</span>
                <span class="ng-port-circle ng-port-circle--out ng-port-circle--error"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ng-canvas-node" style="left: 502px; top: 56px;">
        <div class="ng-node ng-node--condition ng-node--sm">
          <div class="ng-node__header">
            <span class="ng-node__type-dot ng-node__type-dot--condition"></span>
            <span class="ng-node__title">IF Condition</span>
            <span class="ng-node__status ng-node__status--active"></span>
          </div>
          <div class="ng-node__ports-inline">
            <div class="ng-node__ports-inline-left">
              <div class="ng-port-inline ng-port-inline--left">
                <span class="ng-port-circle ng-port-circle--in ng-port-circle--string"></span>
                <span class="ng-port-inline__label">value</span>
              </div>
            </div>
            <div class="ng-node__ports-inline-right">
              <div class="ng-port-inline ng-port-inline--right">
                <span class="ng-port-inline__label">true</span>
                <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-true"></span>
              </div>
              <div class="ng-port-inline ng-port-inline--right">
                <span class="ng-port-inline__label">false</span>
                <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-false"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ng-canvas-node" style="left: 742px; top: 40px;">
        <div class="ng-node ng-node--action ng-node--sm">
          <div class="ng-node__header">
            <span class="ng-node__type-dot ng-node__type-dot--action"></span>
            <span class="ng-node__title">Send Email</span>
            <span class="ng-node__status ng-node__status--active"></span>
          </div>
          <div class="ng-node__ports-inline">
            <div class="ng-node__ports-inline-left">
              <div class="ng-port-inline ng-port-inline--left">
                <span class="ng-port-circle ng-port-circle--in ng-port-circle--bool-true"></span>
                <span class="ng-port-inline__label">trigger</span>
              </div>
            </div>
            <div class="ng-node__ports-inline-right">
              <div class="ng-port-inline ng-port-inline--right">
                <span class="ng-port-inline__label">done</span>
                <span class="ng-port-circle ng-port-circle--out ng-port-circle--bool-true"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="ng-canvas-node" style="left: 742px; top: 160px;">
        <div class="ng-node ng-node--output ng-node--sm">
          <div class="ng-node__header">
            <span class="ng-node__type-dot ng-node__type-dot--output"></span>
            <span class="ng-node__title">Log Error</span>
            <span class="ng-node__status ng-node__status--idle"></span>
          </div>
          <div class="ng-node__ports-inline">
            <div class="ng-node__ports-inline-left">
              <div class="ng-port-inline ng-port-inline--left">
                <span class="ng-port-circle ng-port-circle--in ng-port-circle--bool-false"></span>
                <span class="ng-port-inline__label">data</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Zoom controls -->
      <div class="ng-zoom-controls">
        <button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={zoomOut} aria-label="Zoom out">&#8722;</button>
        <span class="ng-zoom-level">{zoomLevel}%</span>
        <button class="btn-compact btn-compact-ghost btn-compact-icon" onclick={zoomIn} aria-label="Zoom in">+</button>
        <div class="ng-zoom-divider"></div>
        <button class="btn-compact btn-compact-ghost btn-compact-icon" style="font-size:1rem;" onclick={fitView} aria-label="Fit view">&#8982;</button>
      </div>

      <!-- Canvas label -->
      <div class="ng-canvas__label">Scroll to pan &bull; Ctrl+scroll to zoom &bull; Drag nodes to move</div>
    </div>
  </div>

  <!-- 4. Connection Lines -->
  <div class="ds-card">
    <h3 class="ds-card__title">Connection Lines</h3>
    <div class="ng-conn-demo">

      <!-- SVG bezier connections -->
      <div class="ng-conn-row ng-conn-row--svg">
        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Bezier (default)</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port ng-conn-port--string"/>
            <path d="M 17,30 C 70,30 130,30 183,30" class="ng-svg-edge ng-svg-edge--string"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port ng-conn-port--string"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--string">string</span>
        </div>

        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Curved branch</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 80" aria-hidden="true">
            <circle cx="12" cy="20" r="5" class="ng-conn-port ng-conn-port--bool-true"/>
            <path d="M 17,20 C 60,20 140,20 183,20" class="ng-svg-edge ng-svg-edge--bool-true"/>
            <circle cx="188" cy="20" r="5" class="ng-conn-port ng-conn-port--bool-true"/>
            <circle cx="12" cy="20" r="5" class="ng-conn-port ng-conn-port--bool-false" style="cy: 60px"/>
            <path d="M 17,20 C 60,20 140,60 183,60" class="ng-svg-edge ng-svg-edge--bool-false"/>
            <circle cx="188" cy="60" r="5" class="ng-conn-port ng-conn-port--bool-false"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--condition">condition</span>
        </div>

        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Step / orthogonal</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port ng-conn-port--object"/>
            <polyline points="17,30 100,30 100,30 183,30" class="ng-svg-edge ng-svg-edge--object ng-svg-edge--step"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port ng-conn-port--object"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--transform">object</span>
        </div>

        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Straight</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port ng-conn-port--number"/>
            <line x1="17" y1="30" x2="183" y2="30" class="ng-svg-edge ng-svg-edge--number"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port ng-conn-port--number"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--number">number</span>
        </div>
      </div>

      <!-- Animated and state variants -->
      <div class="ng-conn-row ng-conn-row--svg">
        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Animated flow</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port ng-conn-port--string"/>
            <path d="M 17,30 C 70,30 130,30 183,30" class="ng-svg-edge ng-svg-edge--string ng-svg-edge--animated"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port ng-conn-port--string"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--string">active data</span>
        </div>

        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Inactive / disabled</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port" style="fill: var(--dbd2)"/>
            <path d="M 17,30 C 70,30 130,30 183,30" class="ng-svg-edge ng-svg-edge--inactive"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port" style="fill: var(--dbd2)"/>
          </svg>
          <span class="ng-conn-item__type" style="color: var(--dt4)">inactive</span>
        </div>

        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Error path</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port ng-conn-port--error"/>
            <path d="M 17,30 C 70,30 130,30 183,30" class="ng-svg-edge ng-svg-edge--error"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port ng-conn-port--error"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--error">error</span>
        </div>

        <div class="ng-conn-item">
          <span class="ng-conn-item__label">Trigger / control</span>
          <svg class="ng-conn-svg" viewBox="0 0 200 60" aria-hidden="true">
            <circle cx="12" cy="30" r="5" class="ng-conn-port ng-conn-port--trigger"/>
            <path d="M 17,30 C 70,30 130,30 183,30" class="ng-svg-edge ng-svg-edge--trigger ng-svg-edge--animated"/>
            <circle cx="188" cy="30" r="5" class="ng-conn-port ng-conn-port--trigger"/>
          </svg>
          <span class="ng-conn-item__type ng-conn-item__type--trigger">trigger</span>
        </div>
      </div>

      <!-- Data type legend -->
      <div class="ng-conn-legend">
        <span class="ng-conn-legend__title">Data Types</span>
        <div class="ng-conn-legend__items">
          <span class="ng-conn-legend__item"><span class="ng-conn-legend__dot" style="background: #3b82f6;"></span>string</span>
          <span class="ng-conn-legend__item"><span class="ng-conn-legend__dot" style="background: #f59e0b;"></span>number</span>
          <span class="ng-conn-legend__item"><span class="ng-conn-legend__dot" style="background: #8b5cf6;"></span>object</span>
          <span class="ng-conn-legend__item"><span class="ng-conn-legend__dot" style="background: #22c55e;"></span>bool true</span>
          <span class="ng-conn-legend__item"><span class="ng-conn-legend__dot" style="background: #ef4444;"></span>bool false / error</span>
          <span class="ng-conn-legend__item"><span class="ng-conn-legend__dot" style="background: #10b981;"></span>trigger</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 5. Node Palette -->
  <div class="ds-card">
    <h3 class="ds-card__title">Node Palette</h3>
    <div class="ng-palette-layout">
      <div class="ng-palette">
        <!-- Search -->
        <div class="ng-palette__search-wrap">
          <span class="ng-palette__search-icon" aria-hidden="true">&#128269;</span>
          <input class="ng-palette__search" placeholder="Search nodes..." aria-label="Search nodes" readonly />
        </div>

        <!-- Triggers category -->
        <div class="ng-palette__category">
          <button class="ng-palette__cat-header" aria-expanded="true">
            <span class="ng-palette__cat-dot ng-palette__cat-dot--trigger"></span>
            <span class="ng-palette__cat-name">Triggers</span>
            <span class="ng-palette__cat-count">3</span>
            <span class="ng-palette__cat-chevron">&#8963;</span>
          </button>
          <div class="ng-palette__cat-items">
            <div class="ng-palette__item ng-palette__item--trigger" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--trigger">&#9654;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Webhook</span>
                <span class="ng-palette__item-desc">Receive HTTP POST at a unique URL</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--trigger" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--trigger">&#128344;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Cron Schedule</span>
                <span class="ng-palette__item-desc">Run on a recurring time interval</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--trigger" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--trigger">&#9654;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Manual Trigger</span>
                <span class="ng-palette__item-desc">Start workflow on demand</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
          </div>
        </div>

        <!-- Actions category -->
        <div class="ng-palette__category">
          <button class="ng-palette__cat-header" aria-expanded="true">
            <span class="ng-palette__cat-dot ng-palette__cat-dot--action"></span>
            <span class="ng-palette__cat-name">Actions</span>
            <span class="ng-palette__cat-count">4</span>
            <span class="ng-palette__cat-chevron">&#8963;</span>
          </button>
          <div class="ng-palette__cat-items">
            <div class="ng-palette__item ng-palette__item--action" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--action">&#127760;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">HTTP Request</span>
                <span class="ng-palette__item-desc">GET, POST, PUT, DELETE to any URL</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--action" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--action">&#128140;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Send Email</span>
                <span class="ng-palette__item-desc">Send via SMTP or transactional API</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--action ng-palette__item--active" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--action">&#128196;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Write to DB</span>
                <span class="ng-palette__item-desc">Insert or update a database record</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--action" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--action">&#128276;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Push Notification</span>
                <span class="ng-palette__item-desc">Send to mobile or browser</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
          </div>
        </div>

        <!-- Logic category -->
        <div class="ng-palette__category">
          <button class="ng-palette__cat-header" aria-expanded="true">
            <span class="ng-palette__cat-dot ng-palette__cat-dot--condition"></span>
            <span class="ng-palette__cat-name">Logic</span>
            <span class="ng-palette__cat-count">3</span>
            <span class="ng-palette__cat-chevron">&#8963;</span>
          </button>
          <div class="ng-palette__cat-items">
            <div class="ng-palette__item ng-palette__item--condition" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--condition">&#9670;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">IF Condition</span>
                <span class="ng-palette__item-desc">Branch on a boolean expression</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--condition" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--condition">&#8651;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Loop / Each</span>
                <span class="ng-palette__item-desc">Iterate over an array of items</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
            <div class="ng-palette__item ng-palette__item--condition" draggable="true">
              <span class="ng-palette__item-icon ng-palette__item-icon--condition">&#8644;</span>
              <div class="ng-palette__item-body">
                <span class="ng-palette__item-name">Switch</span>
                <span class="ng-palette__item-desc">Route to one of many branches</span>
              </div>
              <span class="ng-palette__drag-hint">&#8942;&#8942;</span>
            </div>
          </div>
        </div>

        <!-- Integrations category -->
        <div class="ng-palette__category">
          <button class="ng-palette__cat-header ng-palette__cat-header--collapsed" aria-expanded="false">
            <span class="ng-palette__cat-dot ng-palette__cat-dot--transform"></span>
            <span class="ng-palette__cat-name">Integrations</span>
            <span class="ng-palette__cat-count">12</span>
            <span class="ng-palette__cat-chevron ng-palette__cat-chevron--collapsed">&#8963;</span>
          </button>
        </div>
      </div>

      <!-- Palette hint panel -->
      <div class="ng-palette-hint">
        <div class="ng-palette-hint__icon" aria-hidden="true">&#8670;</div>
        <p class="ng-palette-hint__text">Drag any node from the palette onto the canvas to add it to your flow.</p>
        <div class="ng-palette-hint__shortcuts">
          <div class="ng-palette-hint__shortcut">
            <kbd class="ng-kbd">Space</kbd>
            <span>Pan canvas</span>
          </div>
          <div class="ng-palette-hint__shortcut">
            <kbd class="ng-kbd">Del</kbd>
            <span>Delete selected</span>
          </div>
          <div class="ng-palette-hint__shortcut">
            <kbd class="ng-kbd">Ctrl</kbd><kbd class="ng-kbd">Z</kbd>
            <span>Undo</span>
          </div>
          <div class="ng-palette-hint__shortcut">
            <kbd class="ng-kbd">Ctrl</kbd><kbd class="ng-kbd">D</kbd>
            <span>Duplicate</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Mini Map -->
  <div class="ds-card">
    <h3 class="ds-card__title">Mini Map</h3>
    <div class="ng-minimap-demo">

      <!-- Standalone large minimap -->
      <div class="ng-minimap-panel">
        <div class="ng-minimap-panel__title">Graph Overview</div>
        <div class="ng-minimap-panel__map" role="img" aria-label="Minimap showing graph overview">
          <!-- Node thumbnails -->
          <div class="ng-mm-node ng-mm-node--trigger" style="left: 6px; top: 14px; width: 18px; height: 12px;"></div>
          <div class="ng-mm-node ng-mm-node--action"  style="left: 34px; top: 10px; width: 22px; height: 16px;"></div>
          <div class="ng-mm-node ng-mm-node--condition" style="left: 70px; top: 12px; width: 20px; height: 18px;"></div>
          <div class="ng-mm-node ng-mm-node--action"  style="left: 104px; top: 8px; width: 20px; height: 12px;"></div>
          <div class="ng-mm-node ng-mm-node--output"  style="left: 104px; top: 32px; width: 18px; height: 10px;"></div>
          <div class="ng-mm-node ng-mm-node--transform" style="left: 36px; top: 52px; width: 20px; height: 12px;"></div>
          <div class="ng-mm-node ng-mm-node--transform" style="left: 70px; top: 56px; width: 20px; height: 12px;"></div>
          <div class="ng-mm-node ng-mm-node--output"  style="left: 104px; top: 54px; width: 18px; height: 10px;"></div>
          <!-- Mini edges -->
          <svg class="ng-mm-svg" aria-hidden="true">
            <line x1="24" y1="20" x2="34" y2="18" class="ng-mm-edge"/>
            <line x1="56" y1="18" x2="70" y2="21" class="ng-mm-edge"/>
            <line x1="90" y1="18" x2="104" y2="14" class="ng-mm-edge ng-mm-edge--true"/>
            <line x1="90" y1="26" x2="104" y2="37" class="ng-mm-edge ng-mm-edge--false"/>
            <line x1="56" y1="22" x2="70" y2="60" class="ng-mm-edge ng-mm-edge--transform"/>
            <line x1="90" y1="62" x2="104" y2="59" class="ng-mm-edge"/>
          </svg>
          <!-- Viewport rectangle (what user currently sees) -->
          <div class="ng-mm-viewport"></div>
        </div>
        <div class="ng-minimap-panel__hint">Click to navigate &bull; Drag viewport to pan</div>
      </div>

      <!-- Minimap states and sizes -->
      <div class="ng-minimap-variants">
        <div class="ng-minimap-variants__label">Sizes &amp; States</div>

        <div class="ng-minimap-variants__row">
          <!-- Small (embedded in canvas corner) -->
          <div class="ng-minimap-variant">
            <span class="ng-minimap-variant__name">Corner embed</span>
            <div class="ng-mm-sm">
              <div class="ng-mm-node ng-mm-node--trigger" style="left: 3px; top: 5px; width: 9px; height: 5px;"></div>
              <div class="ng-mm-node ng-mm-node--action"  style="left: 17px; top: 4px; width: 10px; height: 7px;"></div>
              <div class="ng-mm-node ng-mm-node--condition" style="left: 33px; top: 5px; width: 9px; height: 8px;"></div>
              <div class="ng-mm-node ng-mm-node--output"  style="left: 47px; top: 4px; width: 8px; height: 5px;"></div>
              <div class="ng-mm-viewport ng-mm-viewport--sm"></div>
            </div>
          </div>

          <!-- Zoomed out (many nodes) -->
          <div class="ng-minimap-variant">
            <span class="ng-minimap-variant__name">Zoomed out</span>
            <div class="ng-mm-sm ng-mm-sm--dense">
              {#each Array(14) as _, i}
                <div
                  class="ng-mm-node ng-mm-node--dot"
                  style="left: {(i % 5) * 20 + 4}px; top: {Math.floor(i / 5) * 18 + 4}px;"
                ></div>
              {/each}
              <div class="ng-mm-viewport ng-mm-viewport--sm ng-mm-viewport--small"></div>
            </div>
          </div>

          <!-- Hidden / collapsed -->
          <div class="ng-minimap-variant">
            <span class="ng-minimap-variant__name">Collapsed</span>
            <button class="btn-compact btn-compact-ghost" aria-label="Show minimap">
              <span>&#8599;</span> Map
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>

</section>

<style>
  /* =============================================================
     Node Graph Editor — Component Library Demo
     All classes prefixed ng-
     ============================================================= */

  /* ---- Shared node base ---- */
  .ng-node {
    background: var(--dbg2);
    border: 1.5px solid var(--dbd);
    border-radius: 8px;
    width: 200px;
    font-size: 0.8rem;
    position: relative;
    transition: border-color 0.18s, box-shadow 0.18s;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  }

  .ng-node:hover {
    border-color: var(--dbd2);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.24);
  }

  .ng-node--selected {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2), 0 4px 16px rgba(0, 0, 0, 0.24);
  }

  .ng-node--error {
    border-color: rgba(239, 68, 68, 0.5);
  }

  /* Compact size used on canvas */
  .ng-node--sm {
    width: 148px;
    font-size: 0.73rem;
  }

  /* Node header */
  .ng-node__header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border-bottom: 1px solid var(--dbd);
    border-radius: 7px 7px 0 0;
    background: var(--dbg3);
  }

  /* Header accent color per type */
  .ng-node--trigger  .ng-node__header { background: rgba(16, 185, 129, 0.08); border-bottom-color: rgba(16, 185, 129, 0.2); }
  .ng-node--action   .ng-node__header { background: rgba(59, 130, 246, 0.08); border-bottom-color: rgba(59, 130, 246, 0.2); }
  .ng-node--condition .ng-node__header { background: rgba(245, 158, 11, 0.08); border-bottom-color: rgba(245, 158, 11, 0.2); }
  .ng-node--transform .ng-node__header { background: rgba(139, 92, 246, 0.08); border-bottom-color: rgba(139, 92, 246, 0.2); }
  .ng-node--output   .ng-node__header { background: rgba(239, 68, 68, 0.08); border-bottom-color: rgba(239, 68, 68, 0.2); }
  .ng-node--error    .ng-node__header { background: rgba(239, 68, 68, 0.06); }

  /* Type indicator dot in header */
  .ng-node__type-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .ng-node__type-dot--trigger  { background: #10b981; }
  .ng-node__type-dot--action   { background: #3b82f6; }
  .ng-node__type-dot--condition { background: #f59e0b; }
  .ng-node__type-dot--transform { background: #8b5cf6; }
  .ng-node__type-dot--output   { background: #ef4444; }

  .ng-node__title {
    flex: 1;
    font-weight: 600;
    color: var(--dt);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.82rem;
  }

  /* Status indicator */
  .ng-node__status {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ng-node__status--active     { background: #22c55e; box-shadow: 0 0 4px rgba(34, 197, 94, 0.7); }
  .ng-node__status--processing { background: #f59e0b; box-shadow: 0 0 4px rgba(245, 158, 11, 0.7); animation: ng-blink 1.4s ease-in-out infinite; }
  .ng-node__status--idle       { background: var(--dbd2); }
  .ng-node__status--error      { background: #ef4444; box-shadow: 0 0 4px rgba(239, 68, 68, 0.7); }

  @keyframes ng-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.35; }
  }

  /* ---- Port rails (side edges of the node card) ---- */
  .ng-node__port-rail {
    position: absolute;
    top: 36px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 6px 0;
  }

  .ng-node__port-rail--left  { left: -1px; transform: translateX(-50%); align-items: flex-start; }
  .ng-node__port-rail--right { right: -1px; transform: translateX(50%); align-items: flex-end; }

  .ng-port-slot {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .ng-port-slot--right {
    flex-direction: row-reverse;
  }

  .ng-port-slot__label {
    font-size: 0.65rem;
    color: var(--dt3);
    white-space: nowrap;
    user-select: none;
  }

  /* Port circles (the connector dots) */
  .ng-port-circle {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    border: 2px solid var(--dbd2);
    background: var(--dbg);
    cursor: crosshair;
    transition: border-color 0.15s, transform 0.15s;
    flex-shrink: 0;
  }

  .ng-port-circle:hover {
    transform: scale(1.35);
  }

  /* Typed port colors */
  .ng-port-circle--string     { border-color: #3b82f6; background: rgba(59, 130, 246, 0.25); }
  .ng-port-circle--number     { border-color: #f59e0b; background: rgba(245, 158, 11, 0.25); }
  .ng-port-circle--object     { border-color: #8b5cf6; background: rgba(139, 92, 246, 0.25); }
  .ng-port-circle--bool-true  { border-color: #22c55e; background: rgba(34, 197, 94, 0.25); }
  .ng-port-circle--bool-false { border-color: #ef4444; background: rgba(239, 68, 68, 0.25); }
  .ng-port-circle--error      { border-color: #ef4444; background: rgba(239, 68, 68, 0.2); }
  /* .ng-port-circle--in and --out inherit type color by default */

  /* ---- Node body ---- */
  .ng-node__body {
    padding: 7px 10px 9px;
    margin-top: 2px;
  }

  .ng-node__field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px 0;
    gap: 8px;
  }

  .ng-node__field-label {
    font-size: 0.68rem;
    color: var(--dt3);
    flex-shrink: 0;
  }

  .ng-node__field-value {
    font-size: 0.68rem;
    color: var(--dt2);
    font-family: monospace;
    background: var(--dbg);
    border: 1px solid var(--dbd);
    padding: 1px 5px;
    border-radius: 3px;
    max-width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ng-node__field-value--method {
    color: #3b82f6;
    font-weight: 700;
  }

  .ng-node__error-banner {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    color: #ef4444;
    background: rgba(239, 68, 68, 0.08);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 4px;
    padding: 4px 7px;
  }

  .ng-node__error-icon {
    font-size: 0.8rem;
  }

  /* Resize handle */
  .ng-node__resize-handle {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 13px;
    height: 13px;
    cursor: nwse-resize;
    background: linear-gradient(
      135deg,
      transparent 50%,
      var(--dbd2) 50%,
      var(--dbd2) 62%,
      transparent 62%,
      transparent 76%,
      var(--dbd2) 76%,
      var(--dbd2) 88%,
      transparent 88%
    );
    border-radius: 0 0 7px 0;
    opacity: 0.5;
  }

  /* ---- 1. Node Cards row ---- */
  .ng-node-cards-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 12px 4px 20px;
    align-items: flex-start;
  }

  /* ---- 2. Node Types grid ---- */
  .ng-types-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 12px;
    padding: 8px 0;
  }

  .ng-type-card {
    background: var(--dbg2);
    border: 1.5px solid var(--dbd);
    border-radius: 10px;
    overflow: hidden;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .ng-type-card:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .ng-type-card__header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px 8px;
    font-weight: 700;
    font-size: 0.85rem;
  }

  .ng-type-card__icon {
    font-size: 1rem;
  }

  .ng-type-card__label {
    color: var(--dt);
  }

  .ng-type-card--trigger  { border-top: 3px solid #10b981; }
  .ng-type-card--action   { border-top: 3px solid #3b82f6; }
  .ng-type-card--condition { border-top: 3px solid #f59e0b; }
  .ng-type-card--transform { border-top: 3px solid #8b5cf6; }
  .ng-type-card--output   { border-top: 3px solid #ef4444; }

  .ng-type-card--trigger  .ng-type-card__icon { color: #10b981; }
  .ng-type-card--action   .ng-type-card__icon { color: #3b82f6; }
  .ng-type-card--condition .ng-type-card__icon { color: #f59e0b; }
  .ng-type-card--transform .ng-type-card__icon { color: #8b5cf6; }
  .ng-type-card--output   .ng-type-card__icon { color: #ef4444; }

  .ng-type-card__desc {
    font-size: 0.73rem;
    color: var(--dt3);
    padding: 0 12px 8px;
    margin: 0;
    line-height: 1.45;
  }

  .ng-type-card__examples {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    padding: 0 12px 10px;
  }

  .ng-type-chip {
    font-size: 0.64rem;
    padding: 2px 7px;
    border-radius: 10px;
    background: var(--dbg3);
    border: 1px solid var(--dbd);
    color: var(--dt2);
  }

  .ng-type-card__port-demo {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-top: 1px solid var(--dbd);
    background: var(--dbg);
  }

  .ng-type-card__port-hint {
    font-size: 0.64rem;
    color: var(--dt4);
    flex: 1;
  }

  .ng-type-card__dual-ports {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  /* ---- 3. Graph Canvas ---- */
  .ng-canvas {
    position: relative;
    height: 280px;
    border: 1px solid var(--dbd);
    border-radius: 10px;
    overflow: hidden;
    background: var(--dbg);
    cursor: grab;
  }

  .ng-canvas__grid {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, var(--dbd) 1px, transparent 1px);
    background-size: 22px 22px;
    pointer-events: none;
  }

  /* SVG layer for edges */
  .ng-canvas__svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
  }

  /* SVG edge styles */
  .ng-svg-edge {
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
  }

  .ng-svg-edge--trigger  { stroke: #10b981; }
  .ng-svg-edge--string   { stroke: #3b82f6; }
  .ng-svg-edge--number   { stroke: #f59e0b; }
  .ng-svg-edge--object   { stroke: #8b5cf6; }
  .ng-svg-edge--bool-true  { stroke: #22c55e; }
  .ng-svg-edge--bool-false { stroke: #ef4444; }
  .ng-svg-edge--error    { stroke: #ef4444; stroke-dasharray: 4 3; }
  .ng-svg-edge--inactive { stroke: var(--dbd2); opacity: 0.4; }

  .ng-svg-edge--step {
    stroke: #8b5cf6;
    stroke-linejoin: round;
  }

  .ng-svg-edge--animated {
    stroke-dasharray: 7 4;
    animation: ng-dash 0.9s linear infinite;
  }

  @keyframes ng-dash {
    to { stroke-dashoffset: -22; }
  }

  .ng-canvas-node {
    position: absolute;
  }

  /* Inline ports for the compact canvas nodes */
  .ng-node__ports-inline {
    display: flex;
    justify-content: space-between;
    padding: 4px 0 5px;
    min-height: 28px;
  }

  .ng-node__ports-inline-left,
  .ng-node__ports-inline-right {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .ng-port-inline {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 4px;
  }

  .ng-port-inline--right {
    flex-direction: row-reverse;
  }

  .ng-port-inline__label {
    font-size: 0.6rem;
    color: var(--dt4);
    white-space: nowrap;
  }

  /* Zoom controls */
  .ng-zoom-controls {
    position: absolute;
    bottom: 10px;
    left: 12px;
    display: flex;
    align-items: center;
    gap: 3px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 7px;
    padding: 3px 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  }

  .ng-zoom-level {
    font-size: 0.7rem;
    color: var(--dt2);
    padding: 0 4px;
    min-width: 40px;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .ng-zoom-divider {
    width: 1px;
    height: 16px;
    background: var(--dbd);
    margin: 0 2px;
  }

  .ng-canvas__label {
    position: absolute;
    bottom: 12px;
    right: 12px;
    font-size: 0.65rem;
    color: var(--dt4);
    user-select: none;
    pointer-events: none;
  }

  /* ---- 4. Connection Lines ---- */
  .ng-conn-demo {
    padding: 8px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .ng-conn-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    align-items: flex-end;
  }

  .ng-conn-row--svg {
    align-items: flex-start;
  }

  .ng-conn-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    min-width: 160px;
  }

  .ng-conn-item__label {
    font-size: 0.72rem;
    color: var(--dt3);
    font-weight: 500;
  }

  .ng-conn-svg {
    width: 200px;
    height: 60px;
    overflow: visible;
  }

  .ng-conn-port {
    fill: var(--dbd2);
  }
  .ng-conn-port--string     { fill: #3b82f6; }
  .ng-conn-port--number     { fill: #f59e0b; }
  .ng-conn-port--object     { fill: #8b5cf6; }
  .ng-conn-port--bool-true  { fill: #22c55e; }
  .ng-conn-port--bool-false { fill: #ef4444; }
  .ng-conn-port--error      { fill: #ef4444; }
  .ng-conn-port--trigger    { fill: #10b981; }

  .ng-conn-item__type {
    font-size: 0.65rem;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 10px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
  }

  .ng-conn-item__type--string     { color: #3b82f6; border-color: rgba(59, 130, 246, 0.3); background: rgba(59, 130, 246, 0.07); }
  .ng-conn-item__type--number     { color: #f59e0b; border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.07); }
  .ng-conn-item__type--transform  { color: #8b5cf6; border-color: rgba(139, 92, 246, 0.3); background: rgba(139, 92, 246, 0.07); }
  .ng-conn-item__type--condition  { color: #f59e0b; border-color: rgba(245, 158, 11, 0.3); background: rgba(245, 158, 11, 0.07); }
  .ng-conn-item__type--error      { color: #ef4444; border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.07); }
  .ng-conn-item__type--trigger    { color: #10b981; border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.07); }

  /* Legend */
  .ng-conn-legend {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    padding: 10px 12px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 7px;
  }

  .ng-conn-legend__title {
    font-size: 0.7rem;
    color: var(--dt3);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .ng-conn-legend__items {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .ng-conn-legend__item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    color: var(--dt2);
  }

  .ng-conn-legend__dot {
    width: 9px;
    height: 9px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* ---- 5. Node Palette ---- */
  .ng-palette-layout {
    display: flex;
    gap: 16px;
    align-items: flex-start;
  }

  .ng-palette {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 10px;
    width: 280px;
    flex-shrink: 0;
    overflow: hidden;
  }

  .ng-palette__search-wrap {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--dbd);
  }

  .ng-palette__search-icon {
    color: var(--dt3);
    font-size: 0.8rem;
    flex-shrink: 0;
  }

  .ng-palette__search {
    flex: 1;
    background: var(--dbg);
    border: 1px solid var(--dbd);
    border-radius: 5px;
    padding: 5px 8px;
    color: var(--dt);
    font-size: 0.78rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .ng-palette__search:focus {
    border-color: #3b82f6;
  }

  .ng-palette__search::placeholder {
    color: var(--dt4);
  }

  .ng-palette__category {
    border-bottom: 1px solid var(--dbd);
  }

  .ng-palette__category:last-child {
    border-bottom: none;
  }

  .ng-palette__cat-header {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s;
  }

  .ng-palette__cat-header:hover {
    background: var(--dbg3);
  }

  .ng-palette__cat-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ng-palette__cat-dot--trigger  { background: #10b981; }
  .ng-palette__cat-dot--action   { background: #3b82f6; }
  .ng-palette__cat-dot--condition { background: #f59e0b; }
  .ng-palette__cat-dot--transform { background: #8b5cf6; }

  .ng-palette__cat-name {
    flex: 1;
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--dt2);
  }

  .ng-palette__cat-count {
    font-size: 0.65rem;
    color: var(--dt4);
    background: var(--dbg3);
    border: 1px solid var(--dbd);
    border-radius: 8px;
    padding: 1px 6px;
  }

  .ng-palette__cat-chevron {
    font-size: 0.6rem;
    color: var(--dt3);
    transition: transform 0.2s;
    transform: rotate(180deg);
  }

  .ng-palette__cat-chevron--collapsed {
    transform: rotate(0deg);
  }

  .ng-palette__cat-items {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 4px 8px 8px;
  }

  .ng-palette__item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 7px 8px;
    background: var(--dbg);
    border: 1px solid var(--dbd);
    border-radius: 7px;
    cursor: grab;
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
    user-select: none;
  }

  .ng-palette__item:hover {
    background: var(--dbg3);
    border-color: var(--dbd2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }

  .ng-palette__item:active {
    cursor: grabbing;
  }

  /* Highlighted active item */
  .ng-palette__item--active {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
  }

  .ng-palette__item-icon {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    flex-shrink: 0;
  }

  .ng-palette__item-icon--trigger  { background: rgba(16, 185, 129, 0.12); color: #10b981; }
  .ng-palette__item-icon--action   { background: rgba(59, 130, 246, 0.12); color: #3b82f6; }
  .ng-palette__item-icon--condition { background: rgba(245, 158, 11, 0.12); color: #f59e0b; }

  .ng-palette__item-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 2px;
    overflow: hidden;
  }

  .ng-palette__item-name {
    font-size: 0.77rem;
    font-weight: 500;
    color: var(--dt);
  }

  .ng-palette__item-desc {
    font-size: 0.65rem;
    color: var(--dt3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ng-palette__drag-hint {
    font-size: 0.7rem;
    color: var(--dt4);
    letter-spacing: -2px;
    flex-shrink: 0;
  }

  /* Palette hint / shortcuts sidebar */
  .ng-palette-hint {
    flex: 1;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 10px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    align-self: stretch;
  }

  .ng-palette-hint__icon {
    font-size: 1.5rem;
    color: var(--dt3);
  }

  .ng-palette-hint__text {
    font-size: 0.78rem;
    color: var(--dt2);
    line-height: 1.5;
    margin: 0;
  }

  .ng-palette-hint__shortcuts {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: auto;
  }

  .ng-palette-hint__shortcut {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.73rem;
    color: var(--dt3);
  }

  .ng-kbd {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    padding: 2px 5px;
    background: var(--dbg);
    border: 1px solid var(--dbd2);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.65rem;
    color: var(--dt2);
    box-shadow: 0 1px 0 var(--dbd2);
  }

  /* ---- 6. Mini Map ---- */
  .ng-minimap-demo {
    display: flex;
    gap: 24px;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 8px 0;
  }

  .ng-minimap-panel {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 10px;
    padding: 12px;
    width: 200px;
    flex-shrink: 0;
  }

  .ng-minimap-panel__title {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--dt2);
    margin-bottom: 10px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ng-minimap-panel__map {
    position: relative;
    width: 176px;
    height: 80px;
    background: var(--dbg);
    border: 1px solid var(--dbd);
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.15s;
  }

  .ng-minimap-panel__map:hover {
    border-color: var(--dbd2);
  }

  .ng-minimap-panel__hint {
    margin-top: 7px;
    font-size: 0.63rem;
    color: var(--dt4);
    text-align: center;
  }

  /* Mini map node thumbnails */
  .ng-mm-node {
    position: absolute;
    border-radius: 2px;
    opacity: 0.7;
  }

  .ng-mm-node--trigger  { background: rgba(16, 185, 129, 0.5); border: 1px solid #10b981; }
  .ng-mm-node--action   { background: rgba(59, 130, 246, 0.5); border: 1px solid #3b82f6; }
  .ng-mm-node--condition { background: rgba(245, 158, 11, 0.5); border: 1px solid #f59e0b; }
  .ng-mm-node--transform { background: rgba(139, 92, 246, 0.5); border: 1px solid #8b5cf6; }
  .ng-mm-node--output   { background: rgba(239, 68, 68, 0.5); border: 1px solid #ef4444; }
  .ng-mm-node--dot {
    width: 10px !important;
    height: 6px !important;
    background: var(--dt3);
    border: none;
    border-radius: 1px;
    opacity: 0.45;
  }

  /* SVG edges on the minimap */
  .ng-mm-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
    pointer-events: none;
  }

  .ng-mm-edge {
    stroke: var(--dbd2);
    stroke-width: 0.8;
    fill: none;
    opacity: 0.6;
  }

  .ng-mm-edge--true      { stroke: #22c55e; }
  .ng-mm-edge--false     { stroke: #ef4444; }
  .ng-mm-edge--transform { stroke: #8b5cf6; }

  /* Viewport rectangle */
  .ng-mm-viewport {
    position: absolute;
    inset: 4px 6px 4px 4px;
    border: 1.5px solid rgba(59, 130, 246, 0.6);
    border-radius: 3px;
    background: rgba(59, 130, 246, 0.06);
    cursor: move;
    pointer-events: auto;
  }

  .ng-mm-viewport--sm {
    inset: 3px 4px 3px 3px;
  }

  .ng-mm-viewport--small {
    inset: auto;
    left: 4px;
    top: 4px;
    width: 35px;
    height: 22px;
  }

  /* Variants panel */
  .ng-minimap-variants {
    flex: 1;
    min-width: 260px;
  }

  .ng-minimap-variants__label {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--dt3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 12px;
  }

  .ng-minimap-variants__row {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    align-items: flex-start;
  }

  .ng-minimap-variant {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .ng-minimap-variant__name {
    font-size: 0.7rem;
    color: var(--dt3);
  }

  /* Small size minimap */
  .ng-mm-sm {
    position: relative;
    width: 80px;
    height: 48px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 5px;
    overflow: hidden;
    cursor: pointer;
  }

  .ng-mm-sm--dense {
    width: 120px;
    height: 56px;
  }

</style>
