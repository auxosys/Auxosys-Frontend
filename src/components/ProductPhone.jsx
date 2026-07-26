export function ProductPhone() {
  return (
    <div className="pf-stage" aria-hidden="true">
      <div className="pf-glow" />

      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="app-top">
            <div className="app-title">Auxosys AI</div>
            <div className="app-avatar" />
          </div>

          <div className="app-greet">Good morning, Alex</div>
          <div className="app-h">Today's workspace</div>

          <div className="app-card c1">
            <div className="ac-ico">AI</div>
            <div>
              <div className="ac-t">Draft weekly report</div>
              <div className="ac-s">Automated · 2 min ago</div>
            </div>
          </div>

          <div className="app-card c2">
            <div className="ac-ico" style={{ color: '#2BD1BE' }}>⚡</div>
            <div>
              <div className="ac-t">Sync CRM pipeline</div>
              <div className="ac-s">Running…</div>
            </div>
          </div>

          <div className="app-plabel"><span>Automation</span><span>68%</span></div>
          <div className="app-progress"><div className="app-progress-bar" /></div>

          <div className="app-row r1" />
          <div className="app-row r2" />
          <div className="app-row r3" />

          <div className="app-fab">+</div>
        </div>
      </div>

      <div className="pf-chip chip1"><span className="dot" />Task automated</div>
      <div className="pf-chip chip2"><span className="dot" />Live sync</div>
    </div>
  );
}
