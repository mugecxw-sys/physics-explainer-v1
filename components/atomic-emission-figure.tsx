export function AtomicEmissionFigure() {
  const levels = [
    { label: "E₄", y: 120 },
    { label: "E₃", y: 195 },
    { label: "E₂", y: 235 },
    { label: "E₁", y: 265 },
  ];
  const transitions = [
    { x: 250, from: 565, to: 595, label: "E₂ → E₁", gap: "smaller ΔE", color: "#0b6d78", marker: "emission-small" },
    { x: 440, from: 525, to: 595, label: "E₃ → E₁", gap: "medium ΔE", color: "#2455e6", marker: "emission-medium" },
    { x: 630, from: 450, to: 565, label: "E₄ → E₂", gap: "larger ΔE", color: "#a56816", marker: "emission-large" },
  ];
  return (
    <figure className="speed-of-light-figure atomic-emission-figure">
      <svg viewBox="0 0 760 1056" role="img" aria-labelledby="atomic-emission-title atomic-emission-description">
        <title id="atomic-emission-title">Energy levels, transitions, and spectral lines</title>
        <desc id="atomic-emission-description">Four allowed atomic energies and three example downward transitions. E2 to E1 has the smallest gap, E3 to E1 a medium gap, and E4 to E2 the largest gap. Each gap corresponds to a distinct spectral line, with higher photon frequency for a larger gap. These are conceptual levels, not a particular element; selection rules also govern which transitions produce strong lines.</desc>
        <defs>
          {transitions.map(({ marker, color }) => (
            <marker key={marker} id={marker} markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
              <path d="M0 0 L8 4 L0 8 Z" fill={color} />
            </marker>
          ))}
          <marker id="emission-axis" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#56677d" />
          </marker>
        </defs>
        <rect x="16" y="16" width="728" height="290" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <text x="44" y="62" className="figure-heading">Allowed atomic energy states</text>
        <text x="44" y="94" className="figure-copy">Only particular bound-state energies are allowed.</text>
        {levels.map(({ label, y }) => (
          <g key={label}>
            <text x="92" y={y + 6} className="figure-label">{label}</text>
            <line x1="155" y1={y} x2="686" y2={y} stroke="#56677d" strokeWidth="3" />
          </g>
        ))}
        <rect x="16" y="328" width="728" height="390" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <text x="44" y="374" className="figure-heading">Downward transitions</text>
        <text x="44" y="406" className="figure-copy">Photon energy = energy gap</text>
        {levels.map(({ label, y }) => (
          <g key={label}>
            <text x="92" y={y + 336} className="figure-label">{label}</text>
            <line x1="155" y1={y + 330} x2="686" y2={y + 330} stroke="#c4cfdd" strokeWidth="2" />
          </g>
        ))}
        {transitions.map(({ x, from, to, label, gap, color, marker }) => (
          <g key={marker}>
            <line x1={x} y1={from} x2={x} y2={to - 8} stroke={color} strokeWidth="3" markerEnd={`url(#${marker})`} />
            <text x={x} y="642" textAnchor="middle" className="figure-result">{label}</text>
            <text x={x} y="678" textAnchor="middle" className="figure-label">{gap}</text>
          </g>
        ))}
        <rect x="16" y="740" width="728" height="300" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <text x="44" y="783" className="figure-heading">Spectral lines</text>
        <text x="44" y="816" className="figure-copy">Specific gaps give specific photon frequencies.</text>
        <line x1="155" y1="925" x2="686" y2="925" stroke="#56677d" strokeWidth="2" markerEnd="url(#emission-axis)" />
        {transitions.map(({ x, label, gap, color, marker }) => (
          <g key={marker}>
            <line x1={x} y1="854" x2={x} y2="925" stroke={color} strokeWidth="4" />
            <text x={x} y="962" textAnchor="middle" className="figure-result">{label}</text>
            <text x={x} y="993" textAnchor="middle" className="figure-label">{gap}</text>
          </g>
        ))}
        <text x="155" y="1026" className="figure-label">Frequency f increases →</text>
      </svg>
      <figcaption>
        <strong>Energy levels → transitions → spectral lines</strong>
        <p>Smaller ΔE → lower frequency → longer wavelength. Larger ΔE → higher frequency → shorter wavelength.</p>
        <p>Not every pair of states produces a strong allowed line; selection rules and transition probabilities also matter.</p>
        <p>Conceptual energies and transitions, not the spectrum of a particular element.</p>
      </figcaption>
    </figure>
  );
}
