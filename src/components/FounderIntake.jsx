import './founder-intake.css';

const statusOptions = ['Pre-launch', 'Beta', 'Revenue', 'Scaling'];
const energyModes = ['Heads down', 'Open to ideas', 'Need a break'];

export function FounderIntake({ form, onChange }) {
  return (
    <section className="founder-intake">
      <header>
        <p className="eyebrow">Founder check-in</p>
        <h2>Let Founder Claw learn your vibe</h2>
        <p>We keep it lightweight. Feed us the context once, then we scan your world and orchestrate strategy films automatically.</p>
      </header>

      <div className="form-grid">
        <label>
          <span>Founder name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            placeholder="e.g. Maya Patel"
          />
        </label>
        <label>
          <span>Role</span>
          <input
            type="text"
            value={form.role}
            onChange={(e) => onChange({ ...form, role: e.target.value })}
            placeholder="CEO / CTO / solo builder"
          />
        </label>
        <label>
          <span>Startup / Project</span>
          <input
            type="text"
            value={form.project}
            onChange={(e) => onChange({ ...form, project: e.target.value })}
            placeholder="Product name"
          />
        </label>
        <label>
          <span>Primary focus</span>
          <input
            type="text"
            value={form.focus}
            onChange={(e) => onChange({ ...form, focus: e.target.value })}
            placeholder="Fundraise, growth, retention, launch..."
          />
        </label>
      </div>

      <div className="chips">
        <div>
          <p className="eyebrow">Stage</p>
          <div className="chip-row">
            {statusOptions.map((status) => (
              <button
                key={status}
                className={status === form.stage ? 'chip active' : 'chip'}
                onClick={() => onChange({ ...form, stage: status })}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Energy</p>
          <div className="chip-row">
            {energyModes.map((mode) => (
              <button
                key={mode}
                className={mode === form.energy ? 'chip active' : 'chip'}
                onClick={() => onChange({ ...form, energy: mode })}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
