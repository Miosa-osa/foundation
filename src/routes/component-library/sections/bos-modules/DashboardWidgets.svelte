<section class="ds-section">
  <h2 class="ds-section__title">Dashboard Widgets</h2>
  <p class="ds-section__desc">
    Widget patterns for BusinessOS dashboards: metric cards, quick actions,
    project trackers, charts, focus lists, activity feeds, and calendar views.
  </p>

  <!-- 1. Metric Cards -->
  <div class="ds-card">
    <h3 class="ds-card__title">Metric Cards</h3>
    <p class="ds-card__desc">KPI stat cards with trend indicators, sparklines, icons, and progress rings.</p>
    <div class="dw-metrics-grid">
      <!-- Default -->
      <div class="dw-metric-card">
        <span class="dw-metric-label">Revenue</span>
        <span class="dw-metric-value">$48,290</span>
        <span class="dw-metric-trend dw-metric-trend--up">
          <span class="dw-trend-arrow">&#9650;</span> 12.5%
        </span>
      </div>
      <!-- With sparkline -->
      <div class="dw-metric-card">
        <span class="dw-metric-label">Orders</span>
        <span class="dw-metric-value">1,284</span>
        <span class="dw-metric-trend dw-metric-trend--up">
          <span class="dw-trend-arrow">&#9650;</span> 8.3%
        </span>
        <div class="dw-sparkline">
          <div class="dw-sparkline-bar" style="height:40%"></div>
          <div class="dw-sparkline-bar" style="height:55%"></div>
          <div class="dw-sparkline-bar" style="height:35%"></div>
          <div class="dw-sparkline-bar" style="height:70%"></div>
          <div class="dw-sparkline-bar" style="height:60%"></div>
          <div class="dw-sparkline-bar" style="height:80%"></div>
          <div class="dw-sparkline-bar" style="height:90%"></div>
        </div>
      </div>
      <!-- With icon -->
      <div class="dw-metric-card">
        <div class="dw-metric-icon">&#9733;</div>
        <span class="dw-metric-label">Satisfaction</span>
        <span class="dw-metric-value">4.8</span>
        <span class="dw-metric-trend dw-metric-trend--up">
          <span class="dw-trend-arrow">&#9650;</span> 2.1%
        </span>
      </div>
      <!-- With progress ring -->
      <div class="dw-metric-card">
        <span class="dw-metric-label">Goal Progress</span>
        <div class="dw-progress-ring">
          <svg viewBox="0 0 36 36" class="dw-ring-svg">
            <path class="dw-ring-bg"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="dw-ring-fill"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              stroke-dasharray="72, 100" />
          </svg>
          <span class="dw-ring-text">72%</span>
        </div>
        <span class="dw-metric-trend dw-metric-trend--down">
          <span class="dw-trend-arrow">&#9660;</span> 3.4%
        </span>
      </div>
    </div>
  </div>

  <!-- 2. Quick Actions -->
  <div class="ds-card">
    <h3 class="ds-card__title">Quick Actions</h3>
    <p class="ds-card__desc">Action button grid with hover lift effect.</p>
    <div class="dw-actions-grid">
      <button class="btn-rounded btn-rounded-ghost dw-action-card">
        <span class="dw-action-icon">&#10010;</span>
        <span class="dw-action-label">New Task</span>
      </button>
      <button class="btn-rounded btn-rounded-ghost dw-action-card">
        <span class="dw-action-icon">&#9776;</span>
        <span class="dw-action-label">New Project</span>
      </button>
      <button class="btn-rounded btn-rounded-ghost dw-action-card">
        <span class="dw-action-icon">&#9734;</span>
        <span class="dw-action-label">New Client</span>
      </button>
      <button class="btn-rounded btn-rounded-ghost dw-action-card">
        <span class="dw-action-icon">&#9998;</span>
        <span class="dw-action-label">Quick Note</span>
      </button>
      <button class="btn-rounded btn-rounded-ghost dw-action-card">
        <span class="dw-action-icon">&#9993;</span>
        <span class="dw-action-label">Send Email</span>
      </button>
      <button class="btn-rounded btn-rounded-ghost dw-action-card">
        <span class="dw-action-icon">&#128202;</span>
        <span class="dw-action-label">View Reports</span>
      </button>
    </div>
  </div>

  <!-- 3. Active Projects Widget -->
  <div class="ds-card">
    <h3 class="ds-card__title">Active Projects</h3>
    <p class="ds-card__desc">Mini project list with progress bars, status dots, and team avatar stacks.</p>
    <div class="dw-projects-list">
      <div class="dw-project-row">
        <span class="dw-status-dot dw-status-dot--green"></span>
        <div class="dw-project-info">
          <span class="dw-project-name">Website Redesign</span>
          <div class="dw-project-bar-wrap">
            <div class="dw-project-bar" style="width:78%"></div>
          </div>
        </div>
        <span class="dw-project-pct">78%</span>
        <div class="dw-avatar-stack">
          <span class="dw-avatar" style="background:var(--dt)">A</span>
          <span class="dw-avatar" style="background:var(--dt2)">B</span>
          <span class="dw-avatar" style="background:var(--dt3)">C</span>
        </div>
      </div>
      <div class="dw-project-row">
        <span class="dw-status-dot dw-status-dot--yellow"></span>
        <div class="dw-project-info">
          <span class="dw-project-name">Mobile App v2</span>
          <div class="dw-project-bar-wrap">
            <div class="dw-project-bar" style="width:45%"></div>
          </div>
        </div>
        <span class="dw-project-pct">45%</span>
        <div class="dw-avatar-stack">
          <span class="dw-avatar" style="background:var(--dt4)">D</span>
          <span class="dw-avatar" style="background:var(--dt)">E</span>
        </div>
      </div>
      <div class="dw-project-row">
        <span class="dw-status-dot dw-status-dot--red"></span>
        <div class="dw-project-info">
          <span class="dw-project-name">API Migration</span>
          <div class="dw-project-bar-wrap">
            <div class="dw-project-bar dw-project-bar--danger" style="width:22%"></div>
          </div>
        </div>
        <span class="dw-project-pct">22%</span>
        <div class="dw-avatar-stack">
          <span class="dw-avatar" style="background:var(--dt2)">F</span>
          <span class="dw-avatar" style="background:var(--dt3)">G</span>
          <span class="dw-avatar" style="background:var(--dt4)">H</span>
          <span class="dw-avatar" style="background:var(--dt)">I</span>
        </div>
      </div>
      <div class="dw-project-row">
        <span class="dw-status-dot dw-status-dot--green"></span>
        <div class="dw-project-info">
          <span class="dw-project-name">Analytics Dashboard</span>
          <div class="dw-project-bar-wrap">
            <div class="dw-project-bar" style="width:91%"></div>
          </div>
        </div>
        <span class="dw-project-pct">91%</span>
        <div class="dw-avatar-stack">
          <span class="dw-avatar" style="background:var(--dt2)">J</span>
          <span class="dw-avatar" style="background:var(--dt)">K</span>
        </div>
      </div>
    </div>
  </div>

  <!-- 4. Productivity Chart -->
  <div class="ds-card">
    <h3 class="ds-card__title">Productivity Chart</h3>
    <p class="ds-card__desc">CSS-only bar chart with axis labels, hover tooltips, and legend.</p>
    <div class="dw-chart-wrap">
      <div class="dw-chart-y-axis">
        <span>8h</span><span>6h</span><span>4h</span><span>2h</span><span>0</span>
      </div>
      <div class="dw-chart-bars">
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:62.5%">
            <span class="dw-bar-tooltip">5h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:25%">
            <span class="dw-bar-tooltip">2h Meetings</span>
          </div>
          <span class="dw-bar-label">Mon</span>
        </div>
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:75%">
            <span class="dw-bar-tooltip">6h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:12.5%">
            <span class="dw-bar-tooltip">1h Meetings</span>
          </div>
          <span class="dw-bar-label">Tue</span>
        </div>
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:50%">
            <span class="dw-bar-tooltip">4h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:37.5%">
            <span class="dw-bar-tooltip">3h Meetings</span>
          </div>
          <span class="dw-bar-label">Wed</span>
        </div>
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:87.5%">
            <span class="dw-bar-tooltip">7h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:12.5%">
            <span class="dw-bar-tooltip">1h Meetings</span>
          </div>
          <span class="dw-bar-label">Thu</span>
        </div>
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:62.5%">
            <span class="dw-bar-tooltip">5h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:25%">
            <span class="dw-bar-tooltip">2h Meetings</span>
          </div>
          <span class="dw-bar-label">Fri</span>
        </div>
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:25%">
            <span class="dw-bar-tooltip">2h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:0%">
            <span class="dw-bar-tooltip">0h Meetings</span>
          </div>
          <span class="dw-bar-label">Sat</span>
        </div>
        <div class="dw-bar-col">
          <div class="dw-bar dw-bar--tasks" style="height:12.5%">
            <span class="dw-bar-tooltip">1h Tasks</span>
          </div>
          <div class="dw-bar dw-bar--meetings" style="height:0%">
            <span class="dw-bar-tooltip">0h Meetings</span>
          </div>
          <span class="dw-bar-label">Sun</span>
        </div>
      </div>
    </div>
    <div class="dw-chart-legend">
      <span class="dw-legend-item"><span class="dw-legend-dot dw-legend-dot--tasks"></span> Tasks</span>
      <span class="dw-legend-item"><span class="dw-legend-dot dw-legend-dot--meetings"></span> Meetings</span>
    </div>
  </div>

  <!-- 5. Today's Focus -->
  <div class="ds-card">
    <h3 class="ds-card__title">Today's Focus</h3>
    <p class="ds-card__desc">Priority task widget with checkboxes, due times, and a completion ring.</p>
    <div class="dw-focus-wrap">
      <div class="dw-focus-tasks">
        <label class="dw-focus-task">
          <span class="dw-focus-num">1</span>
          <input type="checkbox" class="dw-focus-checkbox" />
          <span class="dw-focus-check-mark"></span>
          <span class="dw-focus-text">Finalize Q1 report slides</span>
          <span class="dw-focus-time">9:00 AM</span>
        </label>
        <label class="dw-focus-task">
          <span class="dw-focus-num">2</span>
          <input type="checkbox" class="dw-focus-checkbox" checked />
          <span class="dw-focus-check-mark"></span>
          <span class="dw-focus-text dw-focus-text--done">Review PR #342</span>
          <span class="dw-focus-time">11:30 AM</span>
        </label>
        <label class="dw-focus-task">
          <span class="dw-focus-num">3</span>
          <input type="checkbox" class="dw-focus-checkbox" />
          <span class="dw-focus-check-mark"></span>
          <span class="dw-focus-text">Deploy staging build</span>
          <span class="dw-focus-time">3:00 PM</span>
        </label>
      </div>
      <div class="dw-focus-ring-wrap">
        <svg viewBox="0 0 36 36" class="dw-ring-svg dw-ring-svg--focus">
          <path class="dw-ring-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          <path class="dw-ring-fill dw-ring-fill--focus"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            stroke-dasharray="33, 100" />
        </svg>
        <span class="dw-ring-text">1/3</span>
      </div>
    </div>
  </div>

  <!-- 6. Activity Feed -->
  <div class="ds-card">
    <h3 class="ds-card__title">Activity Feed</h3>
    <p class="ds-card__desc">Recent activity timeline with avatars, action types, and timestamps.</p>
    <div class="dw-feed-list">
      <div class="dw-feed-item">
        <span class="dw-feed-avatar" style="background:var(--dt)">A</span>
        <div class="dw-feed-content">
          <span class="dw-feed-text"><strong>Alice</strong> <span class="dw-feed-action dw-feed-action--created">created</span> project <em>Website Redesign</em></span>
          <span class="dw-feed-time">2 min ago</span>
        </div>
      </div>
      <div class="dw-feed-item">
        <span class="dw-feed-avatar" style="background:var(--dt2)">B</span>
        <div class="dw-feed-content">
          <span class="dw-feed-text"><strong>Bob</strong> <span class="dw-feed-action dw-feed-action--updated">updated</span> task <em>Homepage Layout</em></span>
          <span class="dw-feed-time">18 min ago</span>
        </div>
      </div>
      <div class="dw-feed-item">
        <span class="dw-feed-avatar" style="background:var(--dt3)">C</span>
        <div class="dw-feed-content">
          <span class="dw-feed-text"><strong>Carol</strong> <span class="dw-feed-action dw-feed-action--commented">commented</span> on <em>API v2 spec</em></span>
          <span class="dw-feed-time">1 hour ago</span>
        </div>
      </div>
      <div class="dw-feed-item">
        <span class="dw-feed-avatar" style="background:var(--dt4)">D</span>
        <div class="dw-feed-content">
          <span class="dw-feed-text"><strong>Dan</strong> <span class="dw-feed-action dw-feed-action--completed">completed</span> task <em>Database Migration</em></span>
          <span class="dw-feed-time">3 hours ago</span>
        </div>
      </div>
      <div class="dw-feed-item">
        <span class="dw-feed-avatar" style="background:var(--dt)">E</span>
        <div class="dw-feed-content">
          <span class="dw-feed-text"><strong>Eve</strong> <span class="dw-feed-action dw-feed-action--created">created</span> client <em>Acme Corp</em></span>
          <span class="dw-feed-time">5 hours ago</span>
        </div>
      </div>
    </div>
    <a href="#!" class="dw-feed-viewall">View all activity &rarr;</a>
  </div>

</section>

<style>
  /* ===== Metric Cards ===== */
  .dw-metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
    margin-top: 0.75rem;
  }

  .dw-metric-card {
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 10px;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    position: relative;
  }

  .dw-metric-label {
    font-size: 0.78rem;
    color: var(--dt3);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-weight: 600;
  }

  .dw-metric-value {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--dt);
    line-height: 1.1;
  }

  .dw-metric-trend {
    font-size: 0.8rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .dw-metric-trend--up {
    color: #22c55e;
  }

  .dw-metric-trend--down {
    color: #ef4444;
  }

  .dw-trend-arrow {
    font-size: 0.65rem;
  }

  .dw-metric-icon {
    font-size: 1.5rem;
    color: var(--dt2);
    margin-bottom: 0.25rem;
  }

  /* Sparkline */
  .dw-sparkline {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 32px;
    margin-top: 0.5rem;
  }

  .dw-sparkline-bar {
    flex: 1;
    background: var(--dt2);
    border-radius: 2px 2px 0 0;
    min-width: 4px;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .dw-sparkline-bar:hover {
    opacity: 1;
  }

  /* Progress Ring */
  .dw-progress-ring {
    position: relative;
    width: 64px;
    height: 64px;
    margin: 0.25rem 0;
  }

  .dw-ring-svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .dw-ring-bg {
    fill: none;
    stroke: var(--dbd);
    stroke-width: 3;
  }

  .dw-ring-fill {
    fill: none;
    stroke: var(--dt2);
    stroke-width: 3;
    stroke-linecap: round;
  }

  .dw-ring-text {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
    color: var(--dt);
  }

  /* ===== Quick Actions ===== */
  .dw-actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .dw-action-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.25rem 0.75rem;
    background: var(--dbg2);
    border-radius: 10px;
    color: var(--dt);
  }

  .dw-action-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  .dw-action-icon {
    font-size: 1.5rem;
    color: var(--dt2);
  }

  .dw-action-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--dt);
  }

  /* ===== Active Projects ===== */
  .dw-projects-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.75rem;
  }

  .dw-project-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 8px;
  }

  .dw-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dw-status-dot--green {
    background: #22c55e;
  }

  .dw-status-dot--yellow {
    background: #eab308;
  }

  .dw-status-dot--red {
    background: #ef4444;
  }

  .dw-project-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }

  .dw-project-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--dt);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dw-project-bar-wrap {
    width: 100%;
    height: 6px;
    background: var(--dbd);
    border-radius: 3px;
    overflow: hidden;
  }

  .dw-project-bar {
    height: 100%;
    background: var(--dt2);
    border-radius: 3px;
    transition: width 0.4s ease;
  }

  .dw-project-bar--danger {
    background: #ef4444;
  }

  .dw-project-pct {
    font-size: 0.78rem;
    font-weight: 700;
    color: var(--dt3);
    min-width: 36px;
    text-align: right;
  }

  .dw-avatar-stack {
    display: flex;
    flex-direction: row-reverse;
    margin-left: 0.25rem;
  }

  .dw-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--dbg);
    border: 2px solid var(--dbg2);
    margin-left: -8px;
  }

  .dw-avatar:last-child {
    margin-left: 0;
  }

  /* ===== Productivity Chart ===== */
  .dw-chart-wrap {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
    height: 180px;
  }

  .dw-chart-y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--dt4);
    padding-bottom: 22px;
    min-width: 24px;
    text-align: right;
  }

  .dw-chart-bars {
    flex: 1;
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    border-bottom: 1px solid var(--dbd);
    padding-bottom: 22px;
    position: relative;
  }

  .dw-bar-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    position: relative;
    height: 100%;
    justify-content: flex-end;
  }

  .dw-bar {
    width: 70%;
    border-radius: 4px 4px 0 0;
    position: relative;
    transition: opacity 0.2s;
    min-height: 2px;
  }

  .dw-bar--tasks {
    background: var(--dt2);
  }

  .dw-bar--meetings {
    background: var(--dt3);
    opacity: 0.6;
  }

  .dw-bar-tooltip {
    display: none;
    position: absolute;
    bottom: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--dt);
    color: var(--dbg);
    font-size: 0.68rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 4px;
    white-space: nowrap;
    z-index: 10;
    pointer-events: none;
  }

  .dw-bar:hover .dw-bar-tooltip {
    display: block;
  }

  .dw-bar:hover {
    opacity: 0.85;
  }

  .dw-bar-label {
    position: absolute;
    bottom: -20px;
    font-size: 0.7rem;
    color: var(--dt4);
    font-weight: 500;
  }

  .dw-chart-legend {
    display: flex;
    gap: 1.25rem;
    margin-top: 0.75rem;
    justify-content: center;
  }

  .dw-legend-item {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.78rem;
    color: var(--dt3);
    font-weight: 500;
  }

  .dw-legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
  }

  .dw-legend-dot--tasks {
    background: var(--dt2);
  }

  .dw-legend-dot--meetings {
    background: var(--dt3);
    opacity: 0.6;
  }

  /* ===== Today's Focus ===== */
  .dw-focus-wrap {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-top: 0.75rem;
  }

  .dw-focus-tasks {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .dw-focus-task {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.75rem;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 8px;
    cursor: pointer;
    transition: border-color 0.2s;
  }

  .dw-focus-task:hover {
    border-color: var(--dt2);
  }

  .dw-focus-num {
    font-size: 0.72rem;
    font-weight: 700;
    color: var(--dt2);
    background: var(--dbg3);
    width: 22px;
    height: 22px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .dw-focus-checkbox {
    display: none;
  }

  .dw-focus-check-mark {
    width: 18px;
    height: 18px;
    border: 2px solid var(--dbd2);
    border-radius: 4px;
    flex-shrink: 0;
    position: relative;
    transition: background 0.2s, border-color 0.2s;
  }

  .dw-focus-checkbox:checked + .dw-focus-check-mark {
    background: var(--dt2);
    border-color: var(--dt2);
  }

  .dw-focus-checkbox:checked + .dw-focus-check-mark::after {
    content: '';
    position: absolute;
    left: 5px;
    top: 1px;
    width: 4px;
    height: 9px;
    border: solid var(--dbg);
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .dw-focus-text {
    flex: 1;
    font-size: 0.84rem;
    color: var(--dt);
    font-weight: 500;
  }

  .dw-focus-text--done {
    text-decoration: line-through;
    opacity: 0.5;
  }

  .dw-focus-time {
    font-size: 0.72rem;
    color: var(--dt4);
    font-weight: 500;
    white-space: nowrap;
  }

  .dw-focus-ring-wrap {
    position: relative;
    width: 72px;
    height: 72px;
    flex-shrink: 0;
  }

  .dw-ring-svg--focus {
    width: 100%;
    height: 100%;
  }

  .dw-ring-fill--focus {
    stroke: #22c55e;
  }

  /* ===== Activity Feed ===== */
  .dw-feed-list {
    display: flex;
    flex-direction: column;
    margin-top: 0.75rem;
  }

  .dw-feed-item {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.75rem 0;
    position: relative;
  }

  .dw-feed-item + .dw-feed-item {
    border-top: 1px solid var(--dbd);
  }

  .dw-feed-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--dbg);
    flex-shrink: 0;
  }

  .dw-feed-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  .dw-feed-text {
    font-size: 0.84rem;
    color: var(--dt);
    line-height: 1.4;
  }

  .dw-feed-action {
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 0.76rem;
  }

  .dw-feed-action--created {
    color: #22c55e;
    background: rgba(34, 197, 94, 0.1);
  }

  .dw-feed-action--updated {
    color: #3b82f6;
    background: rgba(59, 130, 246, 0.1);
  }

  .dw-feed-action--commented {
    color: #eab308;
    background: rgba(234, 179, 8, 0.1);
  }

  .dw-feed-action--completed {
    color: #a855f7;
    background: rgba(168, 85, 247, 0.1);
  }

  .dw-feed-time {
    font-size: 0.72rem;
    color: var(--dt4);
  }

  .dw-feed-viewall {
    display: block;
    text-align: center;
    margin-top: 0.5rem;
    font-size: 0.82rem;
    color: var(--dt2);
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .dw-feed-viewall:hover {
    background: var(--dbg2);
  }

</style>
