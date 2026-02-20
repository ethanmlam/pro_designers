import { X, Loader2, Play, AlertCircle } from 'lucide-react';
import './video-modal.css';

const fallbackRender = {
  playbackUrl: 'https://cdn.example.com/founder-claw/mock-cut.mp4',
  cover: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
  stats: {
    duration: '02:47',
    generatedAt: 'Just now',
    sources: ['Twitter / X', 'Product Hunt', 'LinkedIn']
  },
  branches: [
    { id: 'capital', label: 'Investors & runway', desc: 'Pitch decks, warm intros, dry powder heat map' },
    { id: 'audience', label: 'Audience heatmap', desc: 'Creator boosts, geo traction, social clusters' },
    { id: 'product', label: 'Product signals', desc: 'Feature pressure, churn themes, roadmap prompts' }
  ]
};

export function VideoModal({ open, onClose, renderState, onBranchSelect }) {
  if (!open) return null;

  const { status, data } = renderState;
  const render = data || fallbackRender;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <header>
          <div>
            <p className="eyebrow">Interactive Wan render</p>
            <h2>Founder Claw scouting film</h2>
          </div>
          <button className="icon" onClick={onClose}>
            <X size={18} />
          </button>
        </header>

        {status === 'loading' && (
          <div className="video-loading">
            <Loader2 className="spin" size={28} />
            <p>Generating cut with Alibaba Wan…</p>
            <span>This can take ~20 seconds the first time.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="video-error">
            <AlertCircle size={20} />
            <div>
              <p>Live render failed</p>
              <span>Showing fallback storyboard so you can demo the flow.</span>
            </div>
          </div>
        )}

        <div className="video-player">
          <div className="video-frame" style={{ backgroundImage: `url(${render.cover})` }}>
            <button className="play">
              <Play size={24} />
            </button>
            <div className="video-meta">
              <span>{render.stats.duration}</span>
              <span>{render.stats.generatedAt}</span>
            </div>
          </div>
          <aside>
            <p className="eyebrow">Branch next</p>
            <div className="branch-list">
              {render.branches.map((branch) => (
                <button key={branch.id} onClick={() => onBranchSelect(branch)}>
                  <strong>{branch.label}</strong>
                  <span>{branch.desc}</span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
