import { Github, Twitter, Linkedin, Instagram, Youtube, Radar } from 'lucide-react';
import './integration-strip.css';

const integrations = [
  { name: 'GitHub', icon: Github, status: 'connected', color: '#f97316' },
  { name: 'Twitter / X', icon: Twitter, status: 'listening', color: '#7dd3fc' },
  { name: 'LinkedIn', icon: Linkedin, status: 'connected', color: '#38bdf8' },
  { name: 'Instagram', icon: Instagram, status: 'pending', color: '#f472b6' },
  { name: 'YouTube', icon: Youtube, status: 'connected', color: '#f87171' },
  { name: 'Product Hunt Radar', icon: Radar, status: 'listening', color: '#facc15' }
];

export function IntegrationStrip() {
  return (
    <section className="integration-strip">
      <header>
        <p className="eyebrow">Signals wired in</p>
        <h3>Social + market channels</h3>
      </header>
      <div className="integration-grid">
        {integrations.map(({ name, icon: Icon, status, color }) => (
          <article key={name} className="integration-card" style={{ borderColor: color }}>
            <div className="icon" style={{ background: `${color}20` }}>
              <Icon size={18} color={color} />
            </div>
            <div>
              <p>{name}</p>
              <span>{status}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
