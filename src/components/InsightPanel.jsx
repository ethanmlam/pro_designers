import { AreaChart, Area, ResponsiveContainer, YAxis } from 'recharts';
import './insight-panel.css';

const sentimentSeries = [
  { day: 'Mon', value: 52 },
  { day: 'Tue', value: 55 },
  { day: 'Wed', value: 61 },
  { day: 'Thu', value: 67 },
  { day: 'Fri', value: 63 },
  { day: 'Sat', value: 71 },
  { day: 'Today', value: 74 }
];

const insightCards = [
  {
    title: 'Product Hunt chatter',
    metric: '+18 mentions',
    detail: 'AI ops founders asking for async demos. Opportunity to drop new clip.'
  },
  {
    title: 'Twitter threads',
    metric: 'Sentiment 74%',
    detail: 'Noise around “Founder burnout” trending. Good moment to show recovery roadmap.'
  },
  {
    title: 'LinkedIn saves',
    metric: '+42% WoW',
    detail: 'Growth breakdown carousel resonating with RevOps leaders.'
  }
];

export function InsightPanel() {
  return (
    <section className="insight-panel">
      <header>
        <div>
          <p className="eyebrow">Market pulse</p>
          <h3>Signals fueling today’s cut</h3>
        </div>
        <span className="tag">Auto-refreshed every 30 min</span>
      </header>

      <div className="panel-grid">
        <article className="chart-card">
          <div className="chart-header">
            <p>Cross-platform sentiment</p>
            <strong>+12 pts / week</strong>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={sentimentSeries} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <YAxis hide domain={[40, 80]} />
              <Area type="monotone" dataKey="value" stroke="#0ea5e9" fillOpacity={1} fill="url(#gradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </article>

        {insightCards.map((card) => (
          <article key={card.title} className="insight-card">
            <p className="title">{card.title}</p>
            <h4>{card.metric}</h4>
            <p className="detail">{card.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
