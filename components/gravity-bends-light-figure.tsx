export function GravityBendsLightFigure() {
  return (
    <figure className="speed-of-light-figure gravity-light-figure">
      <svg viewBox="0 0 760 420" role="img" aria-labelledby="gravity-light-title gravity-light-description">
        <title id="gravity-light-title">Background source, massive lens, and observer</title>
        <desc id="gravity-light-description">Two solid light paths leave a background source, pass on opposite sides of a massive lens, and reach a telescope. They represent null geodesics through curved spacetime. A pale dashed straight line shows the reference route expected in flat spacetime. The light retains zero rest mass and its locally measured vacuum speed c.</desc>
        <rect x="16" y="16" width="728" height="388" rx="18" fill="#f7f9fc" stroke="#dce3ec" />
        <text x="380" y="62" textAnchor="middle" className="figure-note">Null geodesics through curved spacetime</text>

        <line x1="90" y1="200" x2="660" y2="200" stroke="#a5b2c4" strokeWidth="2" strokeDasharray="8 8" />
        <path d="M90 200 C190 180 274 118 380 118 C486 118 570 180 660 200" fill="none" stroke="#2455e6" strokeWidth="4" />
        <path d="M90 200 C190 220 274 282 380 282 C486 282 570 220 660 200" fill="none" stroke="#2455e6" strokeWidth="4" />

        <ellipse cx="90" cy="200" rx="29" ry="13" transform="rotate(-25 90 200)" fill="#eaf0ff" stroke="#2455e6" strokeWidth="2" />
        <circle cx="90" cy="200" r="7" fill="#2455e6" />
        <text x="90" y="312" textAnchor="middle" className="figure-label"><tspan x="90">Background</tspan><tspan x="90" dy="29">source</tspan></text>

        <circle cx="380" cy="200" r="46" fill="#f7d899" stroke="#c68b27" strokeWidth="2" />
        <ellipse cx="380" cy="200" rx="32" ry="14" transform="rotate(-25 380 200)" fill="#f0bf68" />
        <circle cx="380" cy="200" r="7" fill="#c68b27" />
        <text x="380" y="326" textAnchor="middle" className="figure-label">Massive lens</text>

        <path d="M655 187h30v25h-30zm30 5h12v15h-12M671 212v12m0 0-17 25m17-25 17 25" fill="none" stroke="#13233a" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <text x="670" y="312" textAnchor="middle" className="figure-label"><tspan x="670">Observer /</tspan><tspan x="670" dy="29">telescope</tspan></text>

        <line x1="162" y1="376" x2="205" y2="376" stroke="#a5b2c4" strokeWidth="2" strokeDasharray="8 8" />
        <text x="218" y="383" className="figure-copy">Path expected in flat spacetime</text>
      </svg>
      <figcaption>
        <strong>Background source → massive lens → observer</strong>
        <p>The solid paths represent null geodesics through curved spacetime; the dashed line is a flat-spacetime reference. This is a conceptual diagram, not a scale drawing.</p>
        <p>The light is locally following the spacetime geometry; it is not gaining rest mass or being slowed below c locally.</p>
      </figcaption>
    </figure>
  );
}
