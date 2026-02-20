import { useState, useEffect } from 'react';
import './App.css';
import { FounderIntake } from './components/FounderIntake';
import { IntegrationStrip } from './components/IntegrationStrip';
import { InsightPanel } from './components/InsightPanel';
import { InteractiveVideo } from './components/InteractiveVideo';
import { DirectionPrompt } from './components/DirectionPrompt';
import { configureWanKey, renderInteractiveCut } from './lib/wanClient';
import { VideoModal } from './components/VideoModal';

const initialForm = {
  name: 'Maya Patel',
  role: 'Founder & CEO',
  project: 'Pulsecraft',
  focus: 'Fundraise prep',
  stage: 'Beta',
  energy: 'Open to ideas'
};

const storyboard = {
  phases: [
    {
      id: 'hook',
      title: 'Momentum hook',
      timecode: '00:14',
      desc: 'Highlight spike in LinkedIn saves + Product Hunt chatter to build intrigue.'
    },
    {
      id: 'deep-dive',
      title: 'Segment deep dive',
      timecode: '01:02',
      desc: 'Show where enterprise founders engage vs indie hackers, highlight objections.'
    },
    {
      id: 'action',
      title: 'Action menu',
      timecode: '02:20',
      desc: 'Pause video and offer next exploration branch.'
    }
  ],
  branchPrompts: [
    { id: 'fundraise', label: 'Investors & runway', hint: 'VC sentiment, dry powder, warm intros' },
    { id: 'audience', label: 'Audience heatmap', hint: 'Top geos, audiences, creator boosts' },
    { id: 'product', label: 'Product signals', hint: 'Feature requests, churn reasons' }
  ]
};

const branchOptions = [
  { id: 'capital', label: 'Capital strategy', hint: 'Show fundraising comps + ideal timing' },
  { id: 'go-to-market', label: 'Go-to-market levers', hint: 'Highlight channels with highest lift' },
  { id: 'break', label: 'Founder wellness', hint: 'Detect burnout cues, suggest reset' },
  { id: 'community', label: 'Community buzz', hint: 'Discord / Slack keywords trending' }
];

function App() {
  const [form, setForm] = useState(initialForm);
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [wanKeyRequested, setWanKeyRequested] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoRenderState, setVideoRenderState] = useState({ status: 'idle', data: null });
  const envWanKey = import.meta.env.VITE_WAN_API_KEY;
  const wanEnvConfigured = Boolean(envWanKey);

  useEffect(() => {
    if (envWanKey) {
      configureWanKey(envWanKey);
    }
  }, [envWanKey]);

  const handleBranchSelect = (option) => {
    setSelectedBranch(option);
  };

  const handleKeyRequest = () => {
    if (wanEnvConfigured) {
      alert('Alibaba Wan key already configured via environment.');
      return;
    }
    setWanKeyRequested(true);
    alert('Drop the Alibaba Wan API key when ready and I will wire it in.');
  };

  const handleStartScouting = async () => {
    setVideoModalOpen(true);
    setVideoRenderState({ status: 'loading', data: null });
    try {
      const payload = {
        founder: form,
        branch: selectedBranch,
        timestamp: new Date().toISOString()
      };
      const result = await renderInteractiveCut(payload);
      setVideoRenderState({ status: 'ready', data: result });
    } catch (err) {
      console.error('Wan render failed, falling back to mock', err);
      setVideoRenderState({ status: 'error', data: null });
    }
  };

  const handleWanKeySubmit = (e) => {
    e.preventDefault();
    const key = new FormData(e.currentTarget).get('wanKey');
    configureWanKey(key);
    setWanKeyRequested(false);
    e.currentTarget.reset();
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Founder Claw</p>
          <h1>Turn your social footprint into an interactive market film.</h1>
          <p className="lead">We ingest your status, pull signal from every network, then spin up an Alibaba Wan video that pauses to let you steer the storyline in real time.</p>
          <div className="hero-actions">
            <button className="primary" onClick={handleStartScouting}>Start scouting</button>
            <button className="secondary" onClick={() => setVideoModalOpen(true)}>Preview last cut</button>
          </div>
        </div>
        <div className="hero-card">
          <p>Next render</p>
          <h3>Tomorrow · 9:00 AM</h3>
          <p className="sub">Auto-triggered when social sentiment moves ±5% or followers request updates.</p>
        </div>
      </header>

      <main className="content-grid">
        <FounderIntake form={form} onChange={setForm} />
        <IntegrationStrip />
        <InsightPanel />
        <InteractiveVideo
          storyboard={storyboard}
          onBranchSelect={handleBranchSelect}
          onKeyRequest={handleKeyRequest}
          keyConfigured={wanEnvConfigured}
        />
        <DirectionPrompt options={branchOptions} onSelect={handleBranchSelect} />
      </main>

      <footer className="footer">
        <div>
          <p>Selected path</p>
          <h4>{selectedBranch.label}</h4>
          <p className="sub">{selectedBranch.hint}</p>
        </div>
        <div>
          <p>Status</p>
          <h4>{wanEnvConfigured ? 'Wan render ready' : 'Waiting on Wan API key'}</h4>
          <p className="sub">
            {wanEnvConfigured
              ? 'Key loaded from secure environment. Interactive video calls will stream through Alibaba Wan.'
              : 'Provide key to enable live renders + branching overlays.'}
          </p>
          {!wanEnvConfigured && wanKeyRequested && (
            <form className="wan-form" onSubmit={handleWanKeySubmit}>
              <input type="password" name="wanKey" placeholder="Paste Alibaba Wan API key" required />
              <button type="submit">Connect</button>
            </form>
          )}
        </div>
      </footer>
      <VideoModal
        open={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        renderState={videoRenderState}
        onBranchSelect={(branch) => {
          setSelectedBranch(branch);
          setVideoRenderState((prev) => ({ ...prev, selectedBranch: branch }));
        }}
      />
    </div>
  );
}

export default App;
