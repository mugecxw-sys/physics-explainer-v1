export function EntropyIncreaseFigure() {
  const low = [
    [30, 30], [64, 24], [101, 33], [43, 63], [83, 60], [120, 76],
    [26, 100], [64, 102], [106, 110], [44, 139], [84, 145], [125, 155],
    [29, 177], [69, 180], [112, 182], [255, 103],
  ];
  const high = [
    [28, 28], [98, 26], [178, 32], [272, 25], [54, 74], [137, 78],
    [218, 77], [289, 89], [27, 129], [105, 123], [183, 136], [261, 131],
    [57, 179], [139, 174], [219, 181], [292, 175],
  ];
  return (
    <figure className="speed-of-light-figure entropy-increase-figure">
      <svg viewBox="0 0 760 530" role="img" aria-labelledby="entropy-title entropy-description">
        <title id="entropy-title">Low-entropy macrostate to high-entropy macrostate</title>
        <desc id="entropy-description">Two equal boxes contain the same illustrative number of particle dots. Almost all dots are in the left half of the first box. In the second, dots are roughly distributed throughout the volume. The arrow between macrostates represents typical spontaneous evolution, not a force on particles. Relatively few whole-system microscopic configurations match the strong imbalance; vastly more look equilibrium-like. The dots are schematic, not precise microstate counts.</desc>
        <defs>
          <marker id="entropy-evolution" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#56677d" />
          </marker>
        </defs>
        <text x="36" y="46" className="figure-heading">Low-entropy</text>
        <text x="36" y="80" className="figure-heading">macrostate</text>
        <text x="444" y="46" className="figure-heading">High-entropy /</text>
        <text x="444" y="80" className="figure-heading">equilibrium-like</text>
        <text x="444" y="114" className="figure-heading">macrostate</text>
        <rect x="16" y="140" width="320" height="210" rx="12" fill="#f3f6fa" stroke="#8a98a8" strokeWidth="2" />
        <rect x="424" y="140" width="320" height="210" rx="12" fill="#f3f6fa" stroke="#8a98a8" strokeWidth="2" />
        <line x1="176" y1="140" x2="176" y2="350" stroke="#c4cfdd" strokeWidth="1.5" strokeDasharray="5 6" />
        <line x1="584" y1="140" x2="584" y2="350" stroke="#c4cfdd" strokeWidth="1.5" strokeDasharray="5 6" />
        {low.map(([x, y], i) => <circle key={i} cx={16 + x} cy={140 + y} r="5" fill="#0b6d78" />)}
        {high.map(([x, y], i) => <circle key={i} cx={424 + x} cy={140 + y} r="5" fill="#0b6d78" />)}
        <path d="M352 245 H405" fill="none" stroke="#56677d" strokeWidth="2.5" markerEnd="url(#entropy-evolution)" />
        <text x="380" y="393" textAnchor="middle" className="figure-note">Typical spontaneous evolution</text>
        <text x="36" y="443" className="figure-copy">
          <tspan x="36">Relatively few microscopic</tspan>
          <tspan x="36" dy="30">configurations match</tspan>
          <tspan x="36" dy="30">this strong imbalance</tspan>
        </text>
        <text x="444" y="443" className="figure-copy">
          <tspan x="444">Vastly more microscopic</tspan>
          <tspan x="444" dy="30">configurations look</tspan>
          <tspan x="444" dy="30">like this</tspan>
        </text>
      </svg>
      <figcaption>
        <strong>More compatible microstates → greater multiplicity → higher entropy</strong>
        <p>The individual particles still follow microscopic dynamics; the statistical difference is in how many whole-system configurations belong to each macrostate.</p>
      </figcaption>
    </figure>
  );
}
