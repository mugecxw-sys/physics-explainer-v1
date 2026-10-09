export function OrbitalsVsOrbitsFigure() {
  return (
    <figure className="speed-of-light-figure orbitals-vs-orbits-figure">
      <svg viewBox="0 0 760 520" role="img" aria-labelledby="orbitals-title orbitals-description">
        <title id="orbitals-title">Classical orbit versus quantum orbital</title>
        <desc id="orbitals-description">Left: a classical electron marker follows a definite circular trajectory around a central nucleus, with an arrow indicating direction. Right: a nucleus is surrounded by a softly fading probability-density visualization, darker near the center. There is no electron marker or hidden trajectory on the quantum side. An orbital is not the path an electron travels; the shading represents position probability density, not electron material or a hard physical boundary.</desc>
        <defs>
          <radialGradient id="orbital-density">
            <stop offset="0%" stopColor="#0b6d78" stopOpacity="0.75" />
            <stop offset="24%" stopColor="#0b6d78" stopOpacity="0.55" />
            <stop offset="52%" stopColor="#0b6d78" stopOpacity="0.25" />
            <stop offset="78%" stopColor="#0b6d78" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#0b6d78" stopOpacity="0" />
          </radialGradient>
          <marker id="classical-direction" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill="#2455e6" />
          </marker>
        </defs>
        <rect x="16" y="16" width="348" height="488" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <rect x="396" y="16" width="348" height="488" rx="16" fill="#f3f6fa" stroke="#d9e2ed" />
        <text x="40" y="62" className="figure-heading">Classical orbit</text>
        <text x="420" y="62" className="figure-heading">Quantum orbital</text>
        <text x="40" y="100" className="figure-copy">Defined particle path</text>
        <text x="420" y="100" className="figure-copy">Probability-density view</text>
        <circle cx="190" cy="250" r="95" fill="none" stroke="#2455e6" strokeWidth="3" />
        <path d="M190 155 A95 95 0 0 1 270 199" fill="none" stroke="#2455e6" strokeWidth="3" markerEnd="url(#classical-direction)" />
        <circle cx="285" cy="250" r="8" fill="#2455e6" />
        <text x="243" y="286" className="figure-label">electron</text>
        <circle cx="570" cy="250" r="126" fill="url(#orbital-density)" />
        <circle cx="190" cy="250" r="6" fill="#a56816" stroke="#fff" strokeWidth="2" />
        <circle cx="570" cy="250" r="6" fill="#a56816" stroke="#fff" strokeWidth="2" />
        <path d="M190 262 V385 M570 262 V385" fill="none" stroke="#8a98a8" strokeWidth="1" />
        <text x="190" y="412" textAnchor="middle" className="figure-label">nucleus</text>
        <text x="570" y="412" textAnchor="middle" className="figure-label">nucleus</text>
        <text x="40" y="454" className="figure-copy">
          <tspan x="40">A particle follows</tspan>
          <tspan x="40" dy="30">a defined trajectory.</tspan>
        </text>
        <text x="420" y="454" className="figure-copy">
          <tspan x="420">A spatial quantum state,</tspan>
          <tspan x="420" dy="30">not a trajectory.</tspan>
        </text>
      </svg>
      <figcaption>
        <strong>An orbital is not the path an electron travels.</strong>
        <p>Darker / denser regions represent higher position probability density, not physical electron fog. The soft fade is a visualization, not a hard physical edge.</p>
      </figcaption>
    </figure>
  );
}
