import './interactive-video.css';

export function InteractiveVideo({ storyboard, onBranchSelect, onKeyRequest, keyConfigured }) {
  return (
    <section className="interactive-video">
      <header>
        <p className="eyebrow">Interactive narrative</p>
        <div>
          <h3>Adaptive strategy film</h3>
          <p className="sub">Founder Claw renders the video via Alibaba Wan, pausing at branch points you define.</p>
        </div>
        <button className="primary ghost" onClick={onKeyRequest} disabled={keyConfigured}>
          {keyConfigured ? 'Wan key connected' : 'Request Alibaba Wan key'}
        </button>
      </header>

      <div className="canvas">
        <div className="video-shell">
          <span className="badge">Wan Render</span>
          <div className="screen"></div>
          <div className="cta-bar">
            <p>"Where do you want to steer next?"</p>
            <div className="cta-buttons">
              {storyboard.branchPrompts.map((prompt) => (
                <button key={prompt.id} onClick={() => onBranchSelect(prompt)}>
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="storyboard">
          {storyboard.phases.map((phase) => (
            <article key={phase.id} className="phase">
              <div className="phase-header">
                <span>{phase.timecode}</span>
                <p>{phase.title}</p>
              </div>
              <p>{phase.desc}</p>
            </article>
          ))}
        </aside>
      </div>
    </section>
  );
}
