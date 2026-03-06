<script lang="ts">
  let dmInput = $state('');
</script>

<section class="ds-section">
  <h2 class="ds-section__title">Communication Hub</h2>
  <p class="ds-section__desc">Email, chat, video call, and contact communication patterns.</p>

  <!-- ===================== EMAIL INBOX ===================== -->
  <div class="ds-card">
    <h3 class="ds-card__title">Email Inbox</h3>
    <div class="ch-inbox-layout">
      <aside class="ch-inbox-sidebar">
        <button class="btn-pill btn-pill-primary btn-pill-sm ch-inbox-compose-btn">+ Compose</button>
        <ul class="ch-inbox-folders">
          <li class="ch-inbox-folder ch-inbox-folder--active">
            <span class="ch-inbox-folder__icon">&#128229;</span>
            <span class="ch-inbox-folder__label">Inbox</span>
            <span class="ch-inbox-folder__count">12</span>
          </li>
          <li class="ch-inbox-folder">
            <span class="ch-inbox-folder__icon">&#9993;</span>
            <span class="ch-inbox-folder__label">Sent</span>
          </li>
          <li class="ch-inbox-folder">
            <span class="ch-inbox-folder__icon">&#128221;</span>
            <span class="ch-inbox-folder__label">Drafts</span>
            <span class="ch-inbox-folder__count">3</span>
          </li>
          <li class="ch-inbox-folder">
            <span class="ch-inbox-folder__icon">&#128451;</span>
            <span class="ch-inbox-folder__label">Archive</span>
          </li>
          <li class="ch-inbox-folder">
            <span class="ch-inbox-folder__icon">&#128465;</span>
            <span class="ch-inbox-folder__label">Trash</span>
          </li>
        </ul>
        <div class="ch-inbox-sidebar__tags-title">Labels</div>
        <ul class="ch-inbox-folders">
          <li class="ch-inbox-folder">
            <span class="ch-inbox-label-dot" style="background:#3b82f6"></span>
            <span class="ch-inbox-folder__label">Work</span>
          </li>
          <li class="ch-inbox-folder">
            <span class="ch-inbox-label-dot" style="background:#10b981"></span>
            <span class="ch-inbox-folder__label">Personal</span>
          </li>
          <li class="ch-inbox-folder">
            <span class="ch-inbox-label-dot" style="background:#f59e0b"></span>
            <span class="ch-inbox-folder__label">Important</span>
          </li>
        </ul>
      </aside>

      <div class="ch-inbox-main">
        <div class="ch-inbox-toolbar">
          <label class="ch-inbox-check">
            <input type="checkbox" />
            <span class="ch-inbox-check__box"></span>
          </label>
          <button class="btn-compact btn-compact-ghost">Archive</button>
          <button class="btn-compact btn-compact-danger">Delete</button>
          <button class="btn-compact btn-compact-ghost">Mark Read</button>
          <div class="ch-inbox-toolbar__spacer"></div>
          <select class="ch-inbox-toolbar__filter">
            <option>All Mail</option>
            <option>Unread</option>
            <option>Starred</option>
            <option>With Attachments</option>
          </select>
        </div>

        <ul class="ch-inbox-list">
          <li class="ch-inbox-row ch-inbox-row--unread">
            <label class="ch-inbox-check">
              <input type="checkbox" />
              <span class="ch-inbox-check__box"></span>
            </label>
            <button class="ch-inbox-star ch-inbox-star--active">&#9733;</button>
            <div class="ch-inbox-avatar ch-inbox-avatar--blue">AK</div>
            <div class="ch-inbox-sender">Anna Kim</div>
            <div class="ch-inbox-content">
              <span class="ch-inbox-subject">Q1 Revenue Report</span>
              <span class="ch-inbox-preview"> — Hi team, please find attached the Q1 revenue breakdown with highlights...</span>
            </div>
            <span class="ch-inbox-tag ch-inbox-tag--work">Work</span>
            <div class="ch-inbox-unread-dot"></div>
            <time class="ch-inbox-time">10:42 AM</time>
          </li>
          <li class="ch-inbox-row ch-inbox-row--unread">
            <label class="ch-inbox-check">
              <input type="checkbox" />
              <span class="ch-inbox-check__box"></span>
            </label>
            <button class="ch-inbox-star">&#9734;</button>
            <div class="ch-inbox-avatar ch-inbox-avatar--purple">MJ</div>
            <div class="ch-inbox-sender">Marcus Johnson</div>
            <div class="ch-inbox-content">
              <span class="ch-inbox-subject">Design Review Tomorrow</span>
              <span class="ch-inbox-preview"> — Reminder: we have the design review scheduled for tomorrow at 2 pm...</span>
            </div>
            <span class="ch-inbox-tag ch-inbox-tag--work">Work</span>
            <div class="ch-inbox-unread-dot"></div>
            <time class="ch-inbox-time">9:15 AM</time>
          </li>
          <li class="ch-inbox-row">
            <label class="ch-inbox-check">
              <input type="checkbox" />
              <span class="ch-inbox-check__box"></span>
            </label>
            <button class="ch-inbox-star">&#9734;</button>
            <div class="ch-inbox-avatar ch-inbox-avatar--green">SL</div>
            <div class="ch-inbox-sender">Sarah Lee</div>
            <div class="ch-inbox-content">
              <span class="ch-inbox-subject">Re: API Integration</span>
              <span class="ch-inbox-preview"> — Looks good! I have a few minor suggestions on the error handling approach...</span>
            </div>
            <time class="ch-inbox-time">Yesterday</time>
          </li>
          <li class="ch-inbox-row">
            <label class="ch-inbox-check">
              <input type="checkbox" />
              <span class="ch-inbox-check__box"></span>
            </label>
            <button class="ch-inbox-star ch-inbox-star--active">&#9733;</button>
            <div class="ch-inbox-avatar ch-inbox-avatar--amber">DP</div>
            <div class="ch-inbox-sender">David Park</div>
            <div class="ch-inbox-content">
              <span class="ch-inbox-subject">Sprint Retrospective Notes</span>
              <span class="ch-inbox-preview"> — Attached are the action items from yesterday's retro. Please review...</span>
            </div>
            <span class="ch-inbox-tag ch-inbox-tag--important">Important</span>
            <time class="ch-inbox-time">Mar 4</time>
          </li>
          <li class="ch-inbox-row">
            <label class="ch-inbox-check">
              <input type="checkbox" />
              <span class="ch-inbox-check__box"></span>
            </label>
            <button class="ch-inbox-star">&#9734;</button>
            <div class="ch-inbox-avatar">JR</div>
            <div class="ch-inbox-sender">Jamie Rivera</div>
            <div class="ch-inbox-content">
              <span class="ch-inbox-subject">Onboarding checklist</span>
              <span class="ch-inbox-preview"> — Welcome to the team! Please complete the onboarding checklist by Friday...</span>
            </div>
            <time class="ch-inbox-time">Mar 3</time>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <!-- ===================== EMAIL COMPOSE ===================== -->
  <div class="ds-card">
    <h3 class="ds-card__title">Email Compose</h3>
    <div class="ch-compose">
      <div class="ch-compose-header">
        <span class="ch-compose-header__title">New Message</span>
        <div class="ch-compose-header__actions">
          <button class="btn-compact btn-compact-ghost btn-compact-icon">&#8722;</button>
          <button class="btn-compact btn-compact-ghost btn-compact-icon">&#9723;</button>
          <button class="btn-compact btn-compact-ghost btn-compact-icon">&#10005;</button>
        </div>
      </div>
      <div class="ch-compose-field">
        <label class="ch-compose-label" for="ch-compose-to">To</label>
        <div class="ch-compose-tags">
          <span class="ch-compose-tag">anna.kim@company.com <button class="ch-compose-tag__remove">&times;</button></span>
          <span class="ch-compose-tag">marcus.j@company.com <button class="ch-compose-tag__remove">&times;</button></span>
          <input id="ch-compose-to" class="ch-compose-tags__input" placeholder="Add recipient..." />
        </div>
      </div>
      <div class="ch-compose-field">
        <label class="ch-compose-label" for="ch-compose-cc">Cc</label>
        <div class="ch-compose-tags">
          <span class="ch-compose-tag">team-leads@company.com <button class="ch-compose-tag__remove">&times;</button></span>
          <input id="ch-compose-cc" class="ch-compose-tags__input" placeholder="Add Cc..." />
        </div>
      </div>
      <div class="ch-compose-field">
        <label class="ch-compose-label" for="ch-compose-bcc">Bcc</label>
        <div class="ch-compose-tags">
          <input id="ch-compose-bcc" class="ch-compose-tags__input" placeholder="Add Bcc..." />
        </div>
      </div>
      <div class="ch-compose-field">
        <label class="ch-compose-label" for="ch-compose-subject">Subject</label>
        <input id="ch-compose-subject" class="ch-compose-subject" value="Q1 Revenue Follow-up" />
      </div>

      <div class="ch-compose-toolbar">
        <button class="btn-compact btn-compact-primary btn-compact-icon"><b>B</b></button>
        <button class="btn-compact btn-compact-ghost btn-compact-icon"><i>I</i></button>
        <button class="btn-compact btn-compact-ghost btn-compact-icon"><u>U</u></button>
        <button class="btn-compact btn-compact-ghost btn-compact-icon"><s>S</s></button>
        <span class="ch-compose-toolbar__sep"></span>
        <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128279;</button>
        <button class="btn-compact btn-compact-ghost">&#8226; List</button>
        <button class="btn-compact btn-compact-ghost">1. List</button>
        <span class="ch-compose-toolbar__sep"></span>
        <select class="ch-compose-toolbar__select">
          <option>Normal</option>
          <option>Heading 1</option>
          <option>Heading 2</option>
          <option>Quote</option>
        </select>
        <span class="ch-compose-toolbar__sep"></span>
        <button class="btn-compact btn-compact-ghost">&#128206; Attach</button>
        <button class="btn-compact btn-compact-ghost">&#128248; Image</button>
      </div>

      <textarea class="ch-compose-body" rows="6">Hi Anna and Marcus,

Following up on the Q1 revenue report — I have a few questions about the regional breakdown in Section 3.

Could we schedule a quick 15-minute call this week to discuss?

Best regards</textarea>

      <div class="ch-compose-attachments">
        <div class="ch-compose-attachment">
          <span class="ch-compose-attachment__icon">&#128196;</span>
          <span class="ch-compose-attachment__name">Q1-notes.pdf</span>
          <span class="ch-compose-attachment__size">240 KB</span>
          <button class="ch-compose-attachment__remove">&times;</button>
        </div>
        <div class="ch-compose-attachment">
          <span class="ch-compose-attachment__icon">&#128202;</span>
          <span class="ch-compose-attachment__name">revenue-chart.png</span>
          <span class="ch-compose-attachment__size">1.2 MB</span>
          <button class="ch-compose-attachment__remove">&times;</button>
        </div>
        <button class="ch-compose-attachment ch-compose-attachment--add">+ Add file</button>
      </div>

      <div class="ch-compose-actions">
        <button class="btn-pill btn-pill-primary btn-pill-sm">Send</button>
        <div class="ch-compose-schedule">
          <button class="btn-rounded btn-rounded-outline btn-rounded-sm">&#9660; Schedule</button>
          <div class="ch-compose-schedule__menu">
            <div class="ch-compose-schedule__option">Tomorrow morning (9:00 AM)</div>
            <div class="ch-compose-schedule__option">Tomorrow afternoon (2:00 PM)</div>
            <div class="ch-compose-schedule__option">Monday morning (9:00 AM)</div>
            <div class="ch-compose-schedule__option">Pick date &amp; time...</div>
          </div>
        </div>
        <button class="btn-rounded btn-rounded-ghost btn-rounded-sm">Save Draft</button>
        <button class="btn-pill btn-pill-ghost btn-pill-sm ch-compose-discard">Discard</button>
      </div>
    </div>
  </div>

  <!-- ===================== CHAT CHANNELS ===================== -->
  <div class="ds-card">
    <h3 class="ds-card__title">Chat Channels</h3>
    <div class="ch-chat-layout">
      <aside class="ch-chat-sidebar">
        <div class="ch-chat-workspace">
          <span class="ch-chat-workspace__name">Miosa Corp</span>
          <span class="ch-chat-workspace__chevron">&#8964;</span>
        </div>
        <div class="ch-chat-sidebar__title">Channels</div>
        <ul class="ch-chat-channels">
          <li class="ch-chat-channel ch-chat-channel--active">
            <span class="ch-chat-channel__hash">#</span>
            <span class="ch-chat-channel__name">general</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__hash">#</span>
            <span class="ch-chat-channel__name">engineering</span>
            <span class="ch-chat-channel__badge">5</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__hash">#</span>
            <span class="ch-chat-channel__name">design</span>
            <span class="ch-chat-channel__badge">2</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__hash">#</span>
            <span class="ch-chat-channel__name">product</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__hash">#</span>
            <span class="ch-chat-channel__name">random</span>
            <span class="ch-chat-channel__badge">11</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__hash">#</span>
            <span class="ch-chat-channel__name">announcements</span>
          </li>
        </ul>
        <div class="ch-chat-sidebar__title">Direct Messages</div>
        <ul class="ch-chat-channels">
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__status ch-chat-channel__status--online"></span>
            <span class="ch-chat-channel__name">Anna Kim</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__status ch-chat-channel__status--away"></span>
            <span class="ch-chat-channel__name">Marcus Johnson</span>
            <span class="ch-chat-channel__badge">3</span>
          </li>
          <li class="ch-chat-channel">
            <span class="ch-chat-channel__status"></span>
            <span class="ch-chat-channel__name">Sarah Lee</span>
          </li>
        </ul>
      </aside>

      <div class="ch-chat-main">
        <div class="ch-chat-header">
          <span class="ch-chat-header__hash">#</span>
          <span class="ch-chat-header__name">general</span>
          <span class="ch-chat-header__topic">Company-wide updates and announcements</span>
          <span class="ch-chat-header__members">&#128101; 24 members</span>
          <div class="ch-chat-header__spacer"></div>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Search">&#128269;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Threads">&#128172;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Settings">&#9881;</button>
        </div>

        <div class="ch-chat-messages">
          <div class="ch-chat-date-divider"><span>Today</span></div>

          <div class="ch-chat-msg">
            <div class="ch-chat-msg__avatar ch-chat-msg__avatar--blue">AK</div>
            <div class="ch-chat-msg__body">
              <div class="ch-chat-msg__meta">
                <span class="ch-chat-msg__name">Anna Kim</span>
                <time class="ch-chat-msg__time">10:30 AM</time>
              </div>
              <p class="ch-chat-msg__text">Hey everyone! The new dashboard is deployed to staging. Would love your feedback before we push to production. &#127919;</p>
              <div class="ch-chat-msg__reactions">
                <span class="ch-chat-msg__reaction ch-chat-msg__reaction--active">&#128079; 6</span>
                <span class="ch-chat-msg__reaction">&#128293; 3</span>
                <span class="ch-chat-msg__reaction">&#128064; 2</span>
                <button class="ch-chat-msg__add-reaction">+</button>
              </div>
              <div class="ch-chat-msg__thread">
                <span class="ch-chat-msg__thread-avatars">
                  <span class="ch-chat-msg__thread-av">MJ</span>
                  <span class="ch-chat-msg__thread-av">SL</span>
                  <span class="ch-chat-msg__thread-av">DP</span>
                </span>
                <span class="ch-chat-msg__thread-count">4 replies</span>
                <span class="ch-chat-msg__thread-time">Last reply 11:05 AM</span>
              </div>
            </div>
          </div>

          <div class="ch-chat-msg">
            <div class="ch-chat-msg__avatar ch-chat-msg__avatar--purple">MJ</div>
            <div class="ch-chat-msg__body">
              <div class="ch-chat-msg__meta">
                <span class="ch-chat-msg__name">Marcus Johnson</span>
                <time class="ch-chat-msg__time">10:45 AM</time>
              </div>
              <p class="ch-chat-msg__text">Looks great! One small thing — the chart tooltips are overlapping on mobile. I'll open a ticket.</p>
              <div class="ch-chat-msg__reactions">
                <span class="ch-chat-msg__reaction">&#128076; 2</span>
              </div>
            </div>
          </div>

          <div class="ch-chat-msg">
            <div class="ch-chat-msg__avatar ch-chat-msg__avatar--green">SL</div>
            <div class="ch-chat-msg__body">
              <div class="ch-chat-msg__meta">
                <span class="ch-chat-msg__name">Sarah Lee</span>
                <time class="ch-chat-msg__time">11:02 AM</time>
              </div>
              <p class="ch-chat-msg__text">The loading states are smooth. Nice work on the skeleton screens!</p>
            </div>
          </div>

          <div class="ch-chat-typing">
            <span class="ch-chat-typing__dots">
              <span class="ch-chat-typing__dot"></span>
              <span class="ch-chat-typing__dot"></span>
              <span class="ch-chat-typing__dot"></span>
            </span>
            <span class="ch-chat-typing__label">David is typing...</span>
          </div>
        </div>

        <div class="ch-chat-compose">
          <div class="ch-chat-compose__toolbar">
            <button class="btn-compact btn-compact-ghost btn-compact-icon"><b>B</b></button>
            <button class="btn-compact btn-compact-ghost btn-compact-icon"><i>I</i></button>
            <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128279;</button>
            <button class="btn-compact btn-compact-ghost btn-compact-icon">&#8226;</button>
            <span class="ch-chat-compose__sep"></span>
            <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128248;</button>
            <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128206;</button>
            <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128522;</button>
          </div>
          <div class="ch-chat-input">
            <input class="ch-chat-input__field" placeholder="Message #general" />
            <button class="btn-pill btn-pill-primary btn-pill-icon">&#10148;</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ===================== DIRECT MESSAGES ===================== -->
  <div class="ds-card">
    <h3 class="ds-card__title">Direct Messages</h3>
    <div class="ch-dm-layout">
      <div class="ch-dm-header">
        <div class="ch-dm-header__avatar-wrap">
          <div class="ch-dm-header__avatar">MJ</div>
          <span class="ch-dm-header__status ch-dm-header__status--online"></span>
        </div>
        <div class="ch-dm-header__info">
          <span class="ch-dm-header__name">Marcus Johnson</span>
          <span class="ch-dm-header__presence">Active now</span>
        </div>
        <div class="ch-dm-header__spacer"></div>
        <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Voice call">&#128222;</button>
        <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Video call">&#127909;</button>
        <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Profile">&#128100;</button>
        <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Search">&#128269;</button>
      </div>

      <div class="ch-dm-messages">
        <div class="ch-dm-date-divider"><span>Wednesday, March 4</span></div>

        <div class="ch-dm-msg ch-dm-msg--received">
          <div class="ch-dm-msg__avatar">MJ</div>
          <div class="ch-dm-msg__bubble-wrap">
            <div class="ch-dm-msg__bubble">
              Hey, did you get a chance to review the API docs I sent over?
            </div>
            <time class="ch-dm-msg__time">2:14 PM</time>
          </div>
        </div>

        <div class="ch-dm-msg ch-dm-msg--sent">
          <div class="ch-dm-msg__bubble-wrap">
            <div class="ch-dm-msg__bubble">
              Yes! Just finished reading through them. The endpoint design looks solid overall.
            </div>
            <div class="ch-dm-msg__meta-row">
              <time class="ch-dm-msg__time">2:31 PM</time>
              <span class="ch-dm-msg__read">&#10003;&#10003;</span>
            </div>
          </div>
        </div>

        <div class="ch-dm-msg ch-dm-msg--received">
          <div class="ch-dm-msg__avatar">MJ</div>
          <div class="ch-dm-msg__bubble-wrap">
            <div class="ch-dm-msg__bubble">
              Great! One thing I was unsure about — should we version the webhooks separately from the REST API?
            </div>
            <time class="ch-dm-msg__time">2:33 PM</time>
          </div>
        </div>

        <div class="ch-dm-msg ch-dm-msg--sent">
          <div class="ch-dm-msg__bubble-wrap">
            <div class="ch-dm-msg__bubble">
              I'd say yes. Webhooks have different stability guarantees. Let's discuss in the arch review tomorrow.
            </div>
            <div class="ch-dm-msg__meta-row">
              <time class="ch-dm-msg__time">2:40 PM</time>
              <span class="ch-dm-msg__read">&#10003;&#10003;</span>
            </div>
          </div>
        </div>

        <div class="ch-dm-date-divider"><span>Today</span></div>

        <div class="ch-dm-msg ch-dm-msg--received">
          <div class="ch-dm-msg__avatar">MJ</div>
          <div class="ch-dm-msg__bubble-wrap">
            <div class="ch-dm-msg__bubble">
              Morning! Confirm we're still on for the 10am sync?
            </div>
            <time class="ch-dm-msg__time">8:52 AM</time>
          </div>
        </div>

        <div class="ch-dm-msg ch-dm-msg--sent">
          <div class="ch-dm-msg__bubble-wrap">
            <div class="ch-dm-msg__bubble ch-dm-msg__bubble--with-attachment">
              Absolutely. I've put together a quick slide deck.
              <div class="ch-dm-attachment">
                <span class="ch-dm-attachment__icon">&#128196;</span>
                <div class="ch-dm-attachment__info">
                  <span class="ch-dm-attachment__name">arch-review-slides.pdf</span>
                  <span class="ch-dm-attachment__size">1.8 MB · PDF</span>
                </div>
                <button class="ch-dm-attachment__dl">&#8595;</button>
              </div>
            </div>
            <div class="ch-dm-msg__meta-row">
              <time class="ch-dm-msg__time">9:05 AM</time>
              <span class="ch-dm-msg__read ch-dm-msg__read--seen">&#10003;&#10003;</span>
            </div>
          </div>
        </div>

        <div class="ch-dm-typing">
          <div class="ch-dm-msg__avatar ch-dm-typing__avatar">MJ</div>
          <span class="ch-dm-typing__dots">
            <span class="ch-dm-typing__dot"></span>
            <span class="ch-dm-typing__dot"></span>
            <span class="ch-dm-typing__dot"></span>
          </span>
        </div>
      </div>

      <div class="ch-dm-input-row">
        <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128206;</button>
        <button class="btn-compact btn-compact-ghost btn-compact-icon">&#128522;</button>
        <input
          class="ch-dm-input"
          placeholder="Message Marcus Johnson..."
          bind:value={dmInput}
        />
        <button class="btn-compact btn-compact-ghost btn-compact-icon">&#127908;</button>
        <button class="ch-dm-send" class:ch-dm-send--active={dmInput.length > 0}>&#10148;</button>
      </div>
    </div>
  </div>

  <!-- ===================== VIDEO CALL UI ===================== -->
  <div class="ds-card">
    <h3 class="ds-card__title">Video Call UI</h3>
    <div class="ch-video">
      <div class="ch-video-header">
        <span class="ch-video-header__title">Sprint Planning Call</span>
        <div class="ch-video-header__rec">
          <span class="ch-video-header__rec-dot"></span>
          <span>REC</span>
        </div>
        <span class="ch-video-header__duration">32:14</span>
        <div class="ch-video-header__spacer"></div>
        <span class="ch-video-header__participants">&#128101; 4 participants</span>
        <button class="btn-compact btn-compact-ghost btn-compact-icon ch-video-header__more">&#8942;</button>
      </div>

      <div class="ch-video-grid">
        <div class="ch-video-tile ch-video-tile--speaker">
          <div class="ch-video-tile__placeholder ch-video-tile__placeholder--indigo">
            <span class="ch-video-tile__initials">AK</span>
          </div>
          <div class="ch-video-tile__overlay">
            <div class="ch-video-tile__label">
              <span class="ch-video-tile__label-name">Anna Kim</span>
              <span class="ch-video-tile__label-role">Host</span>
            </div>
            <div class="ch-video-tile__mic-badge">&#127908;</div>
          </div>
          <div class="ch-video-tile__speaker-ring"></div>
        </div>
        <div class="ch-video-tile">
          <div class="ch-video-tile__placeholder ch-video-tile__placeholder--slate">
            <span class="ch-video-tile__initials">MJ</span>
          </div>
          <div class="ch-video-tile__overlay">
            <div class="ch-video-tile__label">
              <span class="ch-video-tile__label-name">Marcus Johnson</span>
            </div>
            <div class="ch-video-tile__mic-badge ch-video-tile__mic-badge--muted">&#128263;</div>
          </div>
        </div>
        <div class="ch-video-tile">
          <div class="ch-video-tile__placeholder ch-video-tile__placeholder--teal">
            <span class="ch-video-tile__initials">SL</span>
          </div>
          <div class="ch-video-tile__overlay">
            <div class="ch-video-tile__label">
              <span class="ch-video-tile__label-name">Sarah Lee</span>
            </div>
            <div class="ch-video-tile__mic-badge">&#127908;</div>
          </div>
        </div>
        <div class="ch-video-tile">
          <div class="ch-video-tile__placeholder ch-video-tile__placeholder--rose">
            <span class="ch-video-tile__initials">DP</span>
          </div>
          <div class="ch-video-tile__overlay">
            <div class="ch-video-tile__label">
              <span class="ch-video-tile__label-name">David Park</span>
            </div>
            <div class="ch-video-tile__mic-badge ch-video-tile__mic-badge--muted">&#128263;</div>
          </div>
        </div>
      </div>

      <div class="ch-video-controls">
        <div class="ch-video-ctrl-group">
          <button class="ch-video-ctrl ch-video-ctrl--active" title="Mute mic">
            <span class="ch-video-ctrl__icon">&#127908;</span>
            <span class="ch-video-ctrl__label">Mute</span>
          </button>
          <button class="ch-video-ctrl" title="Stop camera">
            <span class="ch-video-ctrl__icon">&#127909;</span>
            <span class="ch-video-ctrl__label">Camera</span>
          </button>
          <button class="ch-video-ctrl" title="Share screen">
            <span class="ch-video-ctrl__icon">&#128187;</span>
            <span class="ch-video-ctrl__label">Share</span>
          </button>
          <button class="ch-video-ctrl" title="Chat">
            <span class="ch-video-ctrl__icon">&#128172;</span>
            <span class="ch-video-ctrl__label">Chat</span>
          </button>
          <button class="ch-video-ctrl" title="Participants">
            <span class="ch-video-ctrl__icon">&#128101;</span>
            <span class="ch-video-ctrl__label">People</span>
          </button>
          <button class="ch-video-ctrl" title="Reactions">
            <span class="ch-video-ctrl__icon">&#128522;</span>
            <span class="ch-video-ctrl__label">React</span>
          </button>
          <button class="ch-video-ctrl" title="More options">
            <span class="ch-video-ctrl__icon">&#8942;</span>
            <span class="ch-video-ctrl__label">More</span>
          </button>
        </div>
        <button class="btn-rounded btn-rounded-danger ch-video-ctrl--leave" title="Leave call">
          <span>&#128683;</span> Leave
        </button>
      </div>
    </div>
  </div>

  <!-- ===================== CONTACT ACTIONS ===================== -->
  <div class="ds-card">
    <h3 class="ds-card__title">Contact Actions</h3>
    <div class="ch-contacts-grid">

      <div class="ch-contact-card">
        <div class="ch-contact-card__header">
          <div class="ch-contact-card__avatar-wrap">
            <div class="ch-contact-card__avatar ch-contact-card__avatar--blue">AK</div>
            <span class="ch-contact-card__status ch-contact-card__status--online" title="Online"></span>
          </div>
          <button class="btn-compact btn-compact-ghost btn-compact-icon">&#8942;</button>
        </div>
        <div class="ch-contact-card__body">
          <div class="ch-contact-card__name">Anna Kim</div>
          <div class="ch-contact-card__role">Product Manager</div>
          <div class="ch-contact-card__company">Miosa Corp</div>
          <div class="ch-contact-card__presence ch-contact-card__presence--online">&#9679; Active now</div>
        </div>
        <div class="ch-contact-card__meta">
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#9993;</span>
            <span class="ch-contact-card__meta-val">anna.kim@miosa.com</span>
          </div>
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#128222;</span>
            <span class="ch-contact-card__meta-val">+1 (415) 555-0182</span>
          </div>
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#128205;</span>
            <span class="ch-contact-card__meta-val">San Francisco, CA</span>
          </div>
        </div>
        <div class="ch-contact-card__actions">
          <button class="btn-rounded btn-rounded-primary btn-rounded-sm ch-contact-card__btn--primary" title="Call">&#128222; Call</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Email">&#9993;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Message">&#128172;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Video">&#127909;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Schedule">&#128197;</button>
        </div>
      </div>

      <div class="ch-contact-card">
        <div class="ch-contact-card__header">
          <div class="ch-contact-card__avatar-wrap">
            <div class="ch-contact-card__avatar ch-contact-card__avatar--purple">MJ</div>
            <span class="ch-contact-card__status ch-contact-card__status--away" title="Away"></span>
          </div>
          <button class="btn-compact btn-compact-ghost btn-compact-icon">&#8942;</button>
        </div>
        <div class="ch-contact-card__body">
          <div class="ch-contact-card__name">Marcus Johnson</div>
          <div class="ch-contact-card__role">Lead Engineer</div>
          <div class="ch-contact-card__company">Miosa Corp</div>
          <div class="ch-contact-card__presence ch-contact-card__presence--away">&#9679; Away · In a meeting</div>
        </div>
        <div class="ch-contact-card__meta">
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#9993;</span>
            <span class="ch-contact-card__meta-val">marcus.j@miosa.com</span>
          </div>
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#128222;</span>
            <span class="ch-contact-card__meta-val">+1 (408) 555-0247</span>
          </div>
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#128205;</span>
            <span class="ch-contact-card__meta-val">Austin, TX</span>
          </div>
        </div>
        <div class="ch-contact-card__actions">
          <button class="btn-rounded btn-rounded-primary btn-rounded-sm ch-contact-card__btn--primary" title="Message">&#128172; Message</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Call">&#128222;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Email">&#9993;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Video">&#127909;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Schedule">&#128197;</button>
        </div>
      </div>

      <div class="ch-contact-card">
        <div class="ch-contact-card__header">
          <div class="ch-contact-card__avatar-wrap">
            <div class="ch-contact-card__avatar ch-contact-card__avatar--green">SL</div>
            <span class="ch-contact-card__status" title="Offline"></span>
          </div>
          <button class="btn-compact btn-compact-ghost btn-compact-icon">&#8942;</button>
        </div>
        <div class="ch-contact-card__body">
          <div class="ch-contact-card__name">Sarah Lee</div>
          <div class="ch-contact-card__role">Senior Designer</div>
          <div class="ch-contact-card__company">Miosa Corp</div>
          <div class="ch-contact-card__presence ch-contact-card__presence--offline">&#9679; Offline</div>
        </div>
        <div class="ch-contact-card__meta">
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#9993;</span>
            <span class="ch-contact-card__meta-val">sarah.lee@miosa.com</span>
          </div>
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#128222;</span>
            <span class="ch-contact-card__meta-val">+1 (206) 555-0398</span>
          </div>
          <div class="ch-contact-card__meta-row">
            <span class="ch-contact-card__meta-icon">&#128205;</span>
            <span class="ch-contact-card__meta-val">Seattle, WA</span>
          </div>
        </div>
        <div class="ch-contact-card__actions">
          <button class="btn-rounded btn-rounded-primary btn-rounded-sm ch-contact-card__btn--primary" title="Email">&#9993; Email</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Call">&#128222;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Message">&#128172;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Video">&#127909;</button>
          <button class="btn-rounded btn-rounded-ghost btn-rounded-icon" title="Schedule">&#128197;</button>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
  /* ===== EMAIL INBOX ===== */
  .ch-inbox-layout {
    display: flex;
    border: 1px solid var(--dbd);
    border-radius: 8px;
    overflow: hidden;
    min-height: 360px;
  }

  .ch-inbox-sidebar {
    width: 185px;
    background: var(--dbg2);
    border-right: 1px solid var(--dbd);
    padding: 12px 0;
    flex-shrink: 0;
  }

  .ch-inbox-compose-btn {
    display: block;
    width: calc(100% - 24px);
    margin: 0 12px 12px;
  }

  .ch-inbox-sidebar__tags-title {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--dt4);
    padding: 10px 14px 4px;
  }

  .ch-inbox-label-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .ch-inbox-folders {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ch-inbox-folder {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    font-size: 0.81rem;
    color: var(--dt2);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-inbox-folder:hover {
    background: var(--dbg3);
  }

  .ch-inbox-folder--active {
    background: var(--dbg3);
    color: var(--dt);
    font-weight: 600;
  }

  .ch-inbox-folder__icon {
    font-size: 0.88rem;
    width: 18px;
    text-align: center;
  }

  .ch-inbox-folder__label {
    flex: 1;
  }

  .ch-inbox-folder__count {
    background: var(--dt);
    color: var(--dbg);
    font-size: 0.68rem;
    font-weight: 700;
    padding: 1px 6px;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
  }

  .ch-inbox-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .ch-inbox-toolbar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-bottom: 1px solid var(--dbd);
    background: var(--dbg);
  }

  .ch-inbox-toolbar__spacer {
    flex: 1;
  }

  .ch-inbox-toolbar__filter {
    padding: 4px 8px;
    font-size: 0.76rem;
    border: 1px solid var(--dbd);
    border-radius: 4px;
    background: var(--dbg2);
    color: var(--dt2);
  }

  .ch-inbox-check {
    display: flex;
    align-items: center;
    cursor: pointer;
    flex-shrink: 0;
  }

  .ch-inbox-check input {
    display: none;
  }

  .ch-inbox-check__box {
    width: 14px;
    height: 14px;
    border: 1.5px solid var(--dbd2);
    border-radius: 3px;
    background: var(--dbg);
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
  }

  .ch-inbox-check input:checked + .ch-inbox-check__box {
    background: var(--dt);
    border-color: var(--dt);
  }

  .ch-inbox-list {
    list-style: none;
    margin: 0;
    padding: 0;
    flex: 1;
    overflow-y: auto;
  }

  .ch-inbox-row {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 12px;
    border-bottom: 1px solid var(--dbd);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-inbox-row:last-child {
    border-bottom: none;
  }

  .ch-inbox-row:hover {
    background: var(--dbg2);
  }

  .ch-inbox-row--unread .ch-inbox-sender,
  .ch-inbox-row--unread .ch-inbox-subject {
    font-weight: 700;
    color: var(--dt);
  }

  .ch-inbox-star {
    background: none;
    border: none;
    font-size: 1.05rem;
    color: var(--dt3);
    cursor: pointer;
    padding: 0;
    line-height: 1;
    flex-shrink: 0;
    transition: color 0.15s;
  }

  .ch-inbox-star:hover {
    color: #f1c40f;
  }

  .ch-inbox-star--active {
    color: #f1c40f;
  }

  .ch-inbox-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--dt3);
    color: var(--dbg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.66rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .ch-inbox-avatar--blue   { background: #3b82f6; }
  .ch-inbox-avatar--purple { background: #8b5cf6; }
  .ch-inbox-avatar--green  { background: #10b981; }
  .ch-inbox-avatar--amber  { background: #f59e0b; }

  .ch-inbox-sender {
    width: 110px;
    font-size: 0.8rem;
    color: var(--dt2);
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ch-inbox-content {
    flex: 1;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 0.8rem;
  }

  .ch-inbox-subject {
    color: var(--dt2);
  }

  .ch-inbox-preview {
    color: var(--dt3);
  }

  .ch-inbox-tag {
    font-size: 0.66rem;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 10px;
    flex-shrink: 0;
    white-space: nowrap;
  }

  .ch-inbox-tag--work {
    background: rgba(59,130,246,0.15);
    color: #60a5fa;
  }

  .ch-inbox-tag--important {
    background: rgba(245,158,11,0.15);
    color: #fbbf24;
  }

  .ch-inbox-unread-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3b82f6;
    flex-shrink: 0;
  }

  .ch-inbox-time {
    font-size: 0.7rem;
    color: var(--dt3);
    flex-shrink: 0;
    white-space: nowrap;
  }

  /* ===== EMAIL COMPOSE ===== */
  .ch-compose {
    border: 1px solid var(--dbd);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .ch-compose-header {
    display: flex;
    align-items: center;
    padding: 8px 14px;
    background: var(--dbg3);
    border-bottom: 1px solid var(--dbd);
  }

  .ch-compose-header__title {
    flex: 1;
    font-size: 0.84rem;
    font-weight: 600;
    color: var(--dt);
  }

  .ch-compose-header__actions {
    display: flex;
    gap: 4px;
  }

  .ch-compose-field {
    display: flex;
    align-items: flex-start;
    padding: 8px 14px;
    border-bottom: 1px solid var(--dbd);
    gap: 8px;
  }

  .ch-compose-label {
    font-size: 0.76rem;
    color: var(--dt3);
    padding-top: 5px;
    width: 46px;
    flex-shrink: 0;
    font-weight: 500;
  }

  .ch-compose-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
    flex: 1;
  }

  .ch-compose-tag {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: var(--dbg3);
    border: 1px solid var(--dbd);
    border-radius: 14px;
    padding: 2px 8px 2px 10px;
    font-size: 0.74rem;
    color: var(--dt2);
  }

  .ch-compose-tag__remove {
    background: none;
    border: none;
    color: var(--dt3);
    cursor: pointer;
    font-size: 0.88rem;
    padding: 0 2px;
    line-height: 1;
  }

  .ch-compose-tags__input {
    border: none;
    background: transparent;
    font-size: 0.8rem;
    color: var(--dt);
    outline: none;
    flex: 1;
    min-width: 100px;
    padding: 4px 0;
  }

  .ch-compose-subject {
    flex: 1;
    border: none;
    background: transparent;
    font-size: 0.85rem;
    color: var(--dt);
    font-weight: 600;
    outline: none;
    padding: 4px 0;
  }

  .ch-compose-toolbar {
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 5px 14px;
    border-bottom: 1px solid var(--dbd);
    background: var(--dbg2);
    flex-wrap: wrap;
  }

  .ch-compose-toolbar__sep {
    width: 1px;
    height: 16px;
    background: var(--dbd);
    margin: 0 4px;
  }

  .ch-compose-toolbar__select {
    padding: 3px 6px;
    font-size: 0.74rem;
    border: 1px solid var(--dbd);
    border-radius: 4px;
    background: var(--dbg2);
    color: var(--dt2);
  }

  .ch-compose-body {
    width: 100%;
    border: none;
    padding: 14px;
    font-size: 0.83rem;
    color: var(--dt);
    background: var(--dbg);
    resize: vertical;
    outline: none;
    font-family: inherit;
    line-height: 1.65;
    box-sizing: border-box;
  }

  .ch-compose-attachments {
    display: flex;
    gap: 8px;
    padding: 8px 14px;
    border-top: 1px solid var(--dbd);
    flex-wrap: wrap;
    align-items: center;
  }

  .ch-compose-attachment {
    display: flex;
    align-items: center;
    gap: 6px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 6px;
    padding: 5px 10px;
    font-size: 0.74rem;
  }

  .ch-compose-attachment--add {
    cursor: pointer;
    color: var(--dt3);
    background: transparent;
    border-style: dashed;
    transition: color 0.15s, background 0.15s;
  }

  .ch-compose-attachment--add:hover {
    color: var(--dt);
    background: var(--dbg2);
  }

  .ch-compose-attachment__icon {
    font-size: 0.95rem;
  }

  .ch-compose-attachment__name {
    color: var(--dt);
    font-weight: 500;
  }

  .ch-compose-attachment__size {
    color: var(--dt3);
  }

  .ch-compose-attachment__remove {
    background: none;
    border: none;
    color: var(--dt3);
    cursor: pointer;
    font-size: 0.95rem;
    padding: 0;
    line-height: 1;
    margin-left: 2px;
    transition: color 0.15s;
  }

  .ch-compose-attachment__remove:hover {
    color: #e05252;
  }

  .ch-compose-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-top: 1px solid var(--dbd);
    background: var(--dbg2);
  }

  .ch-compose-schedule {
    position: relative;
  }

  .ch-compose-schedule__menu {
    display: none;
    position: absolute;
    bottom: 100%;
    left: 0;
    background: var(--dbg);
    border: 1px solid var(--dbd);
    border-radius: 6px;
    overflow: hidden;
    min-width: 210px;
    box-shadow: 0 6px 20px rgba(0,0,0,0.18);
    margin-bottom: 4px;
    z-index: 10;
  }

  .ch-compose-schedule:hover .ch-compose-schedule__menu {
    display: block;
  }

  .ch-compose-schedule__option {
    padding: 8px 12px;
    font-size: 0.77rem;
    color: var(--dt2);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-compose-schedule__option:hover {
    background: var(--dbg2);
    color: var(--dt);
  }

  .ch-compose-discard {
    margin-left: auto;
  }

  /* ===== CHAT CHANNELS ===== */
  .ch-chat-layout {
    display: flex;
    border: 1px solid var(--dbd);
    border-radius: 8px;
    overflow: hidden;
    min-height: 420px;
  }

  .ch-chat-sidebar {
    width: 195px;
    background: var(--dbg2);
    border-right: 1px solid var(--dbd);
    padding: 0;
    flex-shrink: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
  }

  .ch-chat-workspace {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid var(--dbd);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-chat-workspace:hover {
    background: var(--dbg3);
  }

  .ch-chat-workspace__name {
    font-size: 0.86rem;
    font-weight: 700;
    color: var(--dt);
  }

  .ch-chat-workspace__chevron {
    color: var(--dt3);
    font-size: 0.7rem;
  }

  .ch-chat-sidebar__title {
    font-size: 0.65rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: var(--dt3);
    padding: 10px 14px 4px;
  }

  .ch-chat-channels {
    list-style: none;
    margin: 0;
    padding: 0 0 6px;
  }

  .ch-chat-channel {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 14px;
    font-size: 0.81rem;
    color: var(--dt2);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-chat-channel:hover {
    background: var(--dbg3);
    color: var(--dt);
  }

  .ch-chat-channel--active {
    background: var(--dbg3);
    color: var(--dt);
    font-weight: 600;
  }

  .ch-chat-channel__hash {
    color: var(--dt3);
    font-weight: 700;
    font-size: 0.88rem;
    width: 14px;
    text-align: center;
    flex-shrink: 0;
  }

  .ch-chat-channel__name {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ch-chat-channel__badge {
    background: #e05252;
    color: #fff;
    font-size: 0.63rem;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 8px;
    min-width: 16px;
    text-align: center;
    flex-shrink: 0;
  }

  .ch-chat-channel__status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--dbd2);
    flex-shrink: 0;
  }

  .ch-chat-channel__status--online {
    background: #22c55e;
  }

  .ch-chat-channel__status--away {
    background: #f59e0b;
  }

  .ch-chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .ch-chat-header {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--dbd);
    background: var(--dbg);
  }

  .ch-chat-header__hash {
    color: var(--dt3);
    font-size: 1.05rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .ch-chat-header__name {
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--dt);
    flex-shrink: 0;
  }

  .ch-chat-header__topic {
    font-size: 0.74rem;
    color: var(--dt3);
    padding-left: 10px;
    border-left: 1px solid var(--dbd);
    margin-left: 4px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 180px;
  }

  .ch-chat-header__members {
    font-size: 0.74rem;
    color: var(--dt3);
    flex-shrink: 0;
    margin-left: 6px;
  }

  .ch-chat-header__spacer {
    flex: 1;
  }

  .ch-chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .ch-chat-date-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--dt3);
    font-size: 0.7rem;
    font-weight: 500;
  }

  .ch-chat-date-divider::before,
  .ch-chat-date-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--dbd);
  }

  .ch-chat-msg {
    display: flex;
    gap: 10px;
  }

  .ch-chat-msg__avatar {
    width: 34px;
    height: 34px;
    border-radius: 6px;
    background: var(--dt3);
    color: var(--dbg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.68rem;
    font-weight: 700;
    flex-shrink: 0;
    align-self: flex-start;
  }

  .ch-chat-msg__avatar--blue   { background: #3b82f6; }
  .ch-chat-msg__avatar--purple { background: #8b5cf6; }
  .ch-chat-msg__avatar--green  { background: #10b981; }

  .ch-chat-msg__body {
    flex: 1;
    min-width: 0;
  }

  .ch-chat-msg__meta {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 3px;
  }

  .ch-chat-msg__name {
    font-weight: 600;
    font-size: 0.83rem;
    color: var(--dt);
  }

  .ch-chat-msg__time {
    font-size: 0.68rem;
    color: var(--dt3);
  }

  .ch-chat-msg__text {
    font-size: 0.83rem;
    color: var(--dt2);
    line-height: 1.5;
    margin: 0;
  }

  .ch-chat-msg__reactions {
    display: flex;
    gap: 4px;
    margin-top: 6px;
    flex-wrap: wrap;
    align-items: center;
  }

  .ch-chat-msg__reaction {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 2px 8px;
    border: 1px solid var(--dbd);
    border-radius: 12px;
    background: var(--dbg2);
    font-size: 0.74rem;
    color: var(--dt2);
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-chat-msg__reaction:hover {
    background: var(--dbg3);
  }

  .ch-chat-msg__reaction--active {
    background: rgba(59,130,246,0.12);
    border-color: rgba(59,130,246,0.35);
    color: #60a5fa;
  }

  .ch-chat-msg__add-reaction {
    width: 24px;
    height: 22px;
    border: 1px dashed var(--dbd);
    border-radius: 12px;
    background: transparent;
    color: var(--dt3);
    font-size: 0.76rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s, color 0.15s;
  }

  .ch-chat-msg__add-reaction:hover {
    background: var(--dbg2);
    color: var(--dt);
  }

  .ch-chat-msg__thread {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 7px;
    padding: 5px 10px;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .ch-chat-msg__thread:hover {
    background: var(--dbg3);
  }

  .ch-chat-msg__thread-avatars {
    display: flex;
  }

  .ch-chat-msg__thread-av {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background: var(--dt3);
    color: var(--dbg);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.52rem;
    font-weight: 700;
    margin-right: -5px;
    border: 1.5px solid var(--dbg2);
  }

  .ch-chat-msg__thread-av:last-child {
    margin-right: 0;
  }

  .ch-chat-msg__thread-count {
    font-size: 0.73rem;
    color: #60a5fa;
    font-weight: 600;
    margin-left: 4px;
  }

  .ch-chat-msg__thread-time {
    font-size: 0.67rem;
    color: var(--dt3);
  }

  .ch-chat-typing {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 2px 0;
  }

  .ch-chat-typing__dots {
    display: flex;
    gap: 3px;
    align-items: center;
  }

  .ch-chat-typing__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--dt3);
    animation: ch-typing-bounce 1.4s infinite ease-in-out;
  }

  .ch-chat-typing__dot:nth-child(2) { animation-delay: 0.2s; }
  .ch-chat-typing__dot:nth-child(3) { animation-delay: 0.4s; }

  @keyframes ch-typing-bounce {
    0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
    40%           { opacity: 1;   transform: scale(1); }
  }

  .ch-chat-typing__label {
    font-size: 0.73rem;
    color: var(--dt3);
    font-style: italic;
  }

  .ch-chat-compose {
    border-top: 1px solid var(--dbd);
  }

  .ch-chat-compose__toolbar {
    display: flex;
    gap: 2px;
    padding: 4px 12px;
    border-bottom: 1px solid var(--dbd);
    background: var(--dbg2);
  }

  .ch-chat-compose__sep {
    width: 1px;
    background: var(--dbd);
    margin: 2px 4px;
  }

  .ch-chat-input {
    display: flex;
    gap: 8px;
    padding: 10px 14px;
    background: var(--dbg);
  }

  .ch-chat-input__field {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--dbd);
    border-radius: 6px;
    background: var(--dbg2);
    color: var(--dt);
    font-size: 0.83rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .ch-chat-input__field:focus {
    border-color: var(--dt2);
  }

  /* ===== DIRECT MESSAGES ===== */
  .ch-dm-layout {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--dbd);
    border-radius: 8px;
    overflow: hidden;
    min-height: 440px;
  }

  .ch-dm-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--dbd);
    background: var(--dbg2);
  }

  .ch-dm-header__avatar-wrap {
    position: relative;
    flex-shrink: 0;
  }

  .ch-dm-header__avatar {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #8b5cf6;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 700;
  }

  .ch-dm-header__status {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--dbg2);
    background: var(--dbd2);
  }

  .ch-dm-header__status--online {
    background: #22c55e;
  }

  .ch-dm-header__info {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .ch-dm-header__name {
    font-size: 0.88rem;
    font-weight: 700;
    color: var(--dt);
    line-height: 1.2;
  }

  .ch-dm-header__presence {
    font-size: 0.71rem;
    color: #22c55e;
  }

  .ch-dm-header__spacer {
    flex: 1;
  }

  .ch-dm-messages {
    flex: 1;
    overflow-y: auto;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    background: var(--dbg);
  }

  .ch-dm-date-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--dt3);
    font-size: 0.68rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .ch-dm-date-divider::before,
  .ch-dm-date-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--dbd);
  }

  .ch-dm-msg {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .ch-dm-msg--sent {
    flex-direction: row-reverse;
  }

  .ch-dm-msg__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #8b5cf6;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.62rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .ch-dm-msg__bubble-wrap {
    display: flex;
    flex-direction: column;
    max-width: 72%;
    gap: 3px;
  }

  .ch-dm-msg--sent .ch-dm-msg__bubble-wrap {
    align-items: flex-end;
  }

  .ch-dm-msg__bubble {
    padding: 9px 13px;
    border-radius: 16px;
    font-size: 0.83rem;
    line-height: 1.5;
  }

  .ch-dm-msg--received .ch-dm-msg__bubble {
    background: var(--dbg2);
    color: var(--dt);
    border-bottom-left-radius: 4px;
    border: 1px solid var(--dbd);
  }

  .ch-dm-msg--sent .ch-dm-msg__bubble {
    background: var(--dt);
    color: var(--dbg);
    border-bottom-right-radius: 4px;
  }

  .ch-dm-msg__bubble--with-attachment {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ch-dm-attachment {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 10px;
    background: rgba(255,255,255,0.08);
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.12);
  }

  .ch-dm-attachment__icon {
    font-size: 1.1rem;
  }

  .ch-dm-attachment__info {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 1px;
  }

  .ch-dm-attachment__name {
    font-size: 0.77rem;
    font-weight: 600;
    color: inherit;
  }

  .ch-dm-attachment__size {
    font-size: 0.66rem;
    opacity: 0.65;
  }

  .ch-dm-attachment__dl {
    background: rgba(255,255,255,0.12);
    border: none;
    border-radius: 6px;
    color: inherit;
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.85rem;
    flex-shrink: 0;
    transition: background 0.15s;
  }

  .ch-dm-attachment__dl:hover {
    background: rgba(255,255,255,0.2);
  }

  .ch-dm-msg__time {
    font-size: 0.67rem;
    color: var(--dt3);
  }

  .ch-dm-msg--sent .ch-dm-msg__time {
    text-align: right;
  }

  .ch-dm-msg__meta-row {
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: flex-end;
  }

  .ch-dm-msg__read {
    font-size: 0.68rem;
    color: var(--dt3);
    letter-spacing: -2px;
  }

  .ch-dm-msg__read--seen {
    color: #3b82f6;
  }

  .ch-dm-typing {
    display: flex;
    align-items: flex-end;
    gap: 8px;
  }

  .ch-dm-typing__avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    font-size: 0.62rem;
    flex-shrink: 0;
  }

  .ch-dm-typing__dots {
    display: flex;
    gap: 4px;
    align-items: center;
    background: var(--dbg2);
    border: 1px solid var(--dbd);
    padding: 10px 14px;
    border-radius: 16px;
    border-bottom-left-radius: 4px;
  }

  .ch-dm-typing__dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--dt3);
    animation: ch-typing-bounce 1.4s infinite ease-in-out;
  }

  .ch-dm-typing__dot:nth-child(2) { animation-delay: 0.2s; }
  .ch-dm-typing__dot:nth-child(3) { animation-delay: 0.4s; }

  .ch-dm-input-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-top: 1px solid var(--dbd);
    background: var(--dbg2);
  }

  .ch-dm-input {
    flex: 1;
    padding: 9px 13px;
    border: 1px solid var(--dbd);
    border-radius: 20px;
    background: var(--dbg);
    color: var(--dt);
    font-size: 0.83rem;
    outline: none;
    transition: border-color 0.15s;
  }

  .ch-dm-input:focus {
    border-color: var(--dt2);
  }

  .ch-dm-send {
    background: var(--dbd);
    border: none;
    border-radius: 50%;
    width: 34px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: var(--dt3);
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.2s, color 0.2s;
  }

  .ch-dm-send--active {
    background: var(--dt);
    color: var(--dbg);
  }

  .ch-dm-send--active:hover {
    opacity: 0.88;
  }

  /* ===== VIDEO CALL UI ===== */
  .ch-video {
    border: 1px solid var(--dbd);
    border-radius: 10px;
    overflow: hidden;
    background: #0c0c0e;
  }

  .ch-video-header {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    background: #161618;
    border-bottom: 1px solid #2a2a2d;
  }

  .ch-video-header__title {
    font-weight: 600;
    font-size: 0.86rem;
    color: #f0f0f2;
    flex: 1;
  }

  .ch-video-header__rec {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.7rem;
    font-weight: 700;
    color: #e05252;
    letter-spacing: 0.05em;
  }

  .ch-video-header__rec-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #e05252;
    animation: ch-rec-blink 1.8s infinite;
  }

  @keyframes ch-rec-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }

  .ch-video-header__duration {
    font-size: 0.78rem;
    color: #22c55e;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }

  .ch-video-header__spacer {
    flex: 1;
  }

  .ch-video-header__participants {
    font-size: 0.76rem;
    color: #888;
  }

  .ch-video-header__more {
    color: #888;
  }

  .ch-video-header__more:hover {
    color: #f0f0f2;
  }

  .ch-video-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px;
    padding: 4px;
  }

  .ch-video-tile {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    border: 2px solid #2a2a2d;
    transition: border-color 0.2s;
  }

  .ch-video-tile--speaker {
    border-color: #22c55e;
    box-shadow: 0 0 0 1px rgba(34,197,94,0.3), inset 0 0 20px rgba(34,197,94,0.04);
  }

  .ch-video-tile__placeholder {
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ch-video-tile__placeholder--indigo {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);
  }

  .ch-video-tile__placeholder--slate {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  }

  .ch-video-tile__placeholder--teal {
    background: linear-gradient(135deg, #042f2e 0%, #134e4a 50%, #0f766e 100%);
  }

  .ch-video-tile__placeholder--rose {
    background: linear-gradient(135deg, #1c0a14 0%, #4c0519 50%, #881337 100%);
  }

  .ch-video-tile__initials {
    font-size: 1.8rem;
    font-weight: 700;
    color: rgba(255,255,255,0.55);
  }

  .ch-video-tile__overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 6px 8px;
  }

  .ch-video-tile__label {
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .ch-video-tile__label-name {
    font-size: 0.72rem;
    font-weight: 600;
    color: #f0f0f2;
    background: rgba(0,0,0,0.55);
    padding: 2px 8px;
    border-radius: 4px;
    backdrop-filter: blur(4px);
  }

  .ch-video-tile__label-role {
    font-size: 0.62rem;
    color: #22c55e;
    padding: 1px 8px;
    font-weight: 500;
  }

  .ch-video-tile__mic-badge {
    font-size: 0.78rem;
    background: rgba(0,0,0,0.5);
    padding: 3px 6px;
    border-radius: 5px;
    backdrop-filter: blur(4px);
    align-self: flex-start;
  }

  .ch-video-tile__mic-badge--muted {
    color: #e05252;
  }

  .ch-video-tile__speaker-ring {
    position: absolute;
    inset: -2px;
    border-radius: 10px;
    border: 2px solid rgba(34,197,94,0.5);
    pointer-events: none;
    animation: ch-speaker-pulse 2s infinite;
  }

  @keyframes ch-speaker-pulse {
    0%, 100% { opacity: 0.7; }
    50%       { opacity: 0.2; }
  }

  .ch-video-controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: #161618;
    border-top: 1px solid #2a2a2d;
  }

  .ch-video-ctrl-group {
    display: flex;
    gap: 6px;
  }

  .ch-video-ctrl {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    padding: 8px 12px;
    border: 1px solid #3a3a3d;
    border-radius: 8px;
    background: #222225;
    color: #ccc;
    font-size: 0.68rem;
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s;
    min-width: 56px;
  }

  .ch-video-ctrl:hover {
    background: #2e2e32;
    border-color: #555;
  }

  .ch-video-ctrl--active {
    background: rgba(239,68,68,0.15);
    border-color: rgba(239,68,68,0.4);
    color: #f87171;
  }

  .ch-video-ctrl__icon {
    font-size: 1.05rem;
  }

  .ch-video-ctrl__label {
    font-size: 0.62rem;
    color: inherit;
  }

  /* ===== CONTACT ACTIONS ===== */
  .ch-contacts-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  @media (max-width: 700px) {
    .ch-contacts-grid {
      grid-template-columns: 1fr;
    }
  }

  .ch-contact-card {
    border: 1px solid var(--dbd);
    border-radius: 10px;
    overflow: hidden;
    background: var(--dbg2);
    transition: box-shadow 0.2s;
  }

  .ch-contact-card:hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.12);
  }

  .ch-contact-card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px 14px 10px;
  }

  .ch-contact-card__avatar-wrap {
    position: relative;
  }

  .ch-contact-card__avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
  }

  .ch-contact-card__avatar--blue   { background: #3b82f6; }
  .ch-contact-card__avatar--purple { background: #8b5cf6; }
  .ch-contact-card__avatar--green  { background: #10b981; }

  .ch-contact-card__status {
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid var(--dbg2);
    background: var(--dbd2);
  }

  .ch-contact-card__status--online {
    background: #22c55e;
  }

  .ch-contact-card__status--away {
    background: #f59e0b;
  }

  .ch-contact-card__body {
    padding: 0 14px 12px;
  }

  .ch-contact-card__name {
    font-weight: 700;
    font-size: 0.92rem;
    color: var(--dt);
    line-height: 1.2;
  }

  .ch-contact-card__role {
    font-size: 0.77rem;
    color: var(--dt2);
    margin-top: 2px;
  }

  .ch-contact-card__company {
    font-size: 0.72rem;
    color: var(--dt3);
    margin-top: 1px;
  }

  .ch-contact-card__presence {
    font-size: 0.71rem;
    font-weight: 500;
    margin-top: 6px;
  }

  .ch-contact-card__presence--online  { color: #22c55e; }
  .ch-contact-card__presence--away    { color: #f59e0b; }
  .ch-contact-card__presence--offline { color: var(--dt4); }

  .ch-contact-card__meta {
    padding: 10px 14px;
    border-top: 1px solid var(--dbd);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .ch-contact-card__meta-row {
    display: flex;
    align-items: center;
    gap: 7px;
  }

  .ch-contact-card__meta-icon {
    font-size: 0.8rem;
    width: 16px;
    text-align: center;
    flex-shrink: 0;
    color: var(--dt3);
  }

  .ch-contact-card__meta-val {
    font-size: 0.73rem;
    color: var(--dt2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .ch-contact-card__actions {
    display: flex;
    gap: 5px;
    padding: 10px 14px 14px;
    border-top: 1px solid var(--dbd);
    align-items: center;
  }

  .ch-contact-card__btn--primary {
    flex: 1;
  }
</style>
