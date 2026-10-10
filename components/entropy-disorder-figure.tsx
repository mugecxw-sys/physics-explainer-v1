export function EntropyDisorderFigure() {
  return (
    <figure className="speed-of-light-figure entropy-disorder-figure">
      <svg viewBox="0 0 760 480" role="img" aria-labelledby="entropy-disorder-title entropy-disorder-description">
        <title id="entropy-disorder-title">Same visual order, different entropy</title>
        <desc id="entropy-disorder-description">Two panels show the same two neatly aligned metal blocks with identical sizes, spacing, and appearance. Initially one is hot and one is cold. Finally both have the same temperature. The equilibrium state has higher total entropy even though both scenes look equally ordered. Entropy tracks thermodynamic and microscopic statistical structure, not visual messiness.</desc>
        <rect x="16" y="16" width="348" height="448" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <rect x="396" y="16" width="348" height="448" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <text x="40" y="62" className="figure-heading">Temperature</text>
        <text x="40" y="96" className="figure-heading">imbalance</text>
        <text x="420" y="62" className="figure-heading">Thermal</text>
        <text x="420" y="96" className="figure-heading">equilibrium</text>
        {[36, 184, 416, 564].map((x) => (
          <g key={x}>
            <rect x={x} y="136" width="148" height="140" rx="3" fill="#dce3eb" stroke="#56677d" strokeWidth="2" />
            <path d={`M${x + 12} 148 H${x + 136}`} stroke="#f8fafc" strokeWidth="3" />
          </g>
        ))}
        <text x="110" y="215" textAnchor="middle" className="figure-result">HOT</text>
        <text x="258" y="215" textAnchor="middle" className="figure-result">COLD</text>
        {[490, 638].map((x) => (
          <text key={x} x={x} y="195" textAnchor="middle" className="figure-label">
            <tspan x={x}>SAME</tspan>
            <tspan x={x} dy="32" textLength="124" lengthAdjust="spacingAndGlyphs">TEMPERATURE</tspan>
          </text>
        ))}
        <text x="40" y="323" className="figure-result">
          <tspan x="40">Large temperature</tspan>
          <tspan x="40" dy="30">difference</tspan>
        </text>
        <text x="420" y="323" className="figure-result">Thermal equilibrium</text>
        <text x="40" y="395" className="figure-copy">
          <tspan x="40">Lower total entropy than</tspan>
          <tspan x="40" dy="30">the final equilibrium state</tspan>
        </text>
        <text x="420" y="395" className="figure-copy">Higher total entropy</text>
      </svg>
      <figcaption>
        <strong>Looks equally “ordered” — but entropy has increased.</strong>
        <p>Entropy tracks thermodynamic and microscopic statistical structure, not visual messiness.</p>
      </figcaption>
    </figure>
  );
}
