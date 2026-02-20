import './direction-prompt.css';

export function DirectionPrompt({ options, onSelect }) {
  return (
    <section className="direction-prompt">
      <header>
        <p className="eyebrow">Branch prompts</p>
        <h3>Guide the next beat</h3>
        <p>Founder Claw pauses the video here and waits for your cue.</p>
      </header>
      <div className="option-grid">
        {options.map((option) => (
          <button key={option.id} className="option" onClick={() => onSelect(option)}>
            <span>{option.label}</span>
            <p>{option.hint}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
