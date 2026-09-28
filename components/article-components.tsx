import type { ReactNode } from "react";

export function ShortAnswer({ children }: { children: ReactNode }) {
  return (
    <aside className="short-answer" aria-labelledby="short-answer-heading">
      <h2 id="short-answer-heading">Short answer</h2>
      {children}
    </aside>
  );
}

export function VisualExplanation({ title, children }: { title: string; children: ReactNode }) {
  return (
    <figure className="visual-explanation">
      <div className="visual-frame" role="img" aria-label={title}>
        <span className="orbit orbit-one" aria-hidden="true" />
        <span className="orbit orbit-two" aria-hidden="true" />
        <span className="visual-core" aria-hidden="true" />
      </div>
      <figcaption><strong>{title}</strong>{children}</figcaption>
    </figure>
  );
}

export function CommonMisconception({ children }: { children: ReactNode }) {
  return (
    <aside className="misconception">
      <p className="eyebrow">Common misconception</p>
      {children}
    </aside>
  );
}

export function SpeedOfLightFigure() {
  return (
    <figure className="speed-of-light-figure">
      <svg viewBox="0 0 760 950" role="img" aria-labelledby="speed-light-title speed-light-description">
        <title id="speed-light-title">Two observers measure the same light speed</title>
        <desc id="speed-light-description">Frame A and Frame B each use their own rulers and synchronized clocks to measure a light pulse. Both measure its speed as c. The frames do not share one absolute time grid; their coordinates are related by Lorentz transformations.</desc>
        <defs>
          <marker id="light-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L10,5 L0,10 z" fill="#2455e6" />
          </marker>
          <marker id="motion-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto-start-reverse" markerUnits="strokeWidth">
            <path d="M0,0 L10,5 L0,10 z" fill="#0b6d78" />
          </marker>
          <pattern id="coordinate-grid-a" width="42" height="36" patternUnits="userSpaceOnUse">
            <path d="M42 0H0V36" fill="none" stroke="#dce3ec" strokeWidth="1" />
          </pattern>
          <pattern id="coordinate-grid-b" width="42" height="36" patternUnits="userSpaceOnUse">
            <path d="M42 0H0V36" fill="none" stroke="#c9e4e4" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x="16" y="16" width="728" height="390" rx="18" fill="#f7f9fc" stroke="#dce3ec" />
        <text x="44" y="60" className="figure-heading">Frame A</text>
        <text x="44" y="91" className="figure-copy">Observer A measures with A’s rulers and synchronized clocks</text>
        <rect x="44" y="112" width="672" height="156" rx="10" fill="url(#coordinate-grid-a)" />
        <circle cx="82" cy="184" r="13" fill="#13233a" />
        <path d="M82 199v38m-17-20h34m-17 20-13 20m13-20 13 20" fill="none" stroke="#13233a" strokeWidth="5" strokeLinecap="round" />
        <text x="54" y="291" className="figure-label">Observer A</text>
        <line x1="145" y1="182" x2="640" y2="182" stroke="#2455e6" strokeWidth="5" markerEnd="url(#light-arrow)" />
        <circle cx="252" cy="182" r="9" fill="#f0a928" stroke="#fff" strokeWidth="3" />
        <text x="150" y="158" className="figure-label">Light pulse</text>
        <line x1="160" y1="248" x2="640" y2="248" stroke="#0b6d78" strokeWidth="3" />
        <path d="M160 240v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16" stroke="#0b6d78" strokeWidth="2" />
        <text x="166" y="284" className="figure-label">A’s distance ruler</text>
        <circle cx="552" cy="334" r="22" fill="#fff" stroke="#0b6d78" strokeWidth="3" />
        <path d="M552 334v-13m0 13 11 6" stroke="#13233a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="636" cy="334" r="22" fill="#fff" stroke="#0b6d78" strokeWidth="3" />
        <path d="M636 334v-13m0 13 11 6" stroke="#13233a" strokeWidth="3" strokeLinecap="round" />
        <text x="44" y="374" className="figure-result">A measures distance and elapsed time → speed = c</text>

        <rect x="16" y="426" width="728" height="390" rx="18" fill="#f2f8f8" stroke="#c9e4e4" />
        <text x="44" y="470" className="figure-heading">Frame B</text>
        <text x="44" y="501" className="figure-copy">Observer B uses B’s own rulers and synchronized clocks</text>
        <rect x="44" y="522" width="672" height="156" rx="10" fill="url(#coordinate-grid-b)" />
        <circle cx="82" cy="594" r="13" fill="#13233a" />
        <path d="M82 609v38m-17-20h34m-17 20-13 20m13-20 13 20" fill="none" stroke="#13233a" strokeWidth="5" strokeLinecap="round" />
        <text x="54" y="701" className="figure-label">Observer B</text>
        <line x1="145" y1="592" x2="640" y2="592" stroke="#2455e6" strokeWidth="5" markerEnd="url(#light-arrow)" />
        <circle cx="252" cy="592" r="9" fill="#f0a928" stroke="#fff" strokeWidth="3" />
        <text x="150" y="568" className="figure-label">Same light pulse</text>
        <line x1="640" y1="628" x2="452" y2="628" stroke="#0b6d78" strokeWidth="3" markerEnd="url(#motion-arrow)" />
        <text x="462" y="620" className="figure-label">B moves relative to A</text>
        <line x1="160" y1="658" x2="640" y2="658" stroke="#0b6d78" strokeWidth="3" />
        <path d="M160 650v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16m48-16v16" stroke="#0b6d78" strokeWidth="2" />
        <text x="166" y="694" className="figure-label">B’s distance ruler</text>
        <circle cx="552" cy="744" r="22" fill="#fff" stroke="#0b6d78" strokeWidth="3" />
        <path d="M552 744v-13m0 13 11 6" stroke="#13233a" strokeWidth="3" strokeLinecap="round" />
        <circle cx="636" cy="744" r="22" fill="#fff" stroke="#0b6d78" strokeWidth="3" />
        <path d="M636 744v-13m0 13 11 6" stroke="#13233a" strokeWidth="3" strokeLinecap="round" />
        <text x="44" y="784" className="figure-result">B measures distance and elapsed time → speed = c</text>

        <rect x="16" y="836" width="728" height="98" rx="14" fill="#eaf0ff" />
        <text x="42" y="876" className="figure-note">A and B do not share one absolute time grid.</text>
        <text x="42" y="910" className="figure-note">Their coordinates are related by Lorentz transformations.</text>
      </svg>
      <figcaption>
        <strong>Two observers, same light speed</strong>
        <p><b>Frame A:</b> Observer A measures the pulse with A’s own rulers and synchronized clocks. The measured speed is c.</p>
        <p><b>Frame B:</b> Observer B moves relative to A and measures with B’s own coordinate grid, rulers, and clocks. The measured speed is also c.</p>
        <p>A and B do not share one absolute time grid. Their coordinates are related by Lorentz transformations.</p>
      </figcaption>
    </figure>
  );
}

export function SimultaneityFigure() {
  return (
    <figure className="simultaneity-figure">
      <svg viewBox="0 0 760 780" role="img" aria-labelledby="simultaneity-title simultaneity-description">
        <title id="simultaneity-title">Two frames assign different times to the same distant events</title>
        <desc id="simultaneity-description">In Frame A, Event L and Event R lie on one horizontal equal-time slice defined by synchronized clocks. In moving Frame B, its tilted equal-time slices pass through the events separately, so the events have different coordinate times. The diagram shows coordinate-time slices, not visual arrival times or signal paths.</desc>
        <defs>
          <marker id="simultaneity-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L10,5 L0,10 z" fill="#5b6878" />
          </marker>
        </defs>

        <rect x="16" y="16" width="728" height="336" rx="18" fill="#f7f9fc" stroke="#dce3ec" />
        <text x="44" y="58" className="simultaneity-heading">Frame A</text>
        <text x="44" y="88" className="simultaneity-copy">A’s own synchronized clocks</text>
        <line x1="138" y1="284" x2="138" y2="120" stroke="#5b6878" strokeWidth="2" markerEnd="url(#simultaneity-arrow)" />
        <line x1="138" y1="284" x2="672" y2="284" stroke="#5b6878" strokeWidth="2" markerEnd="url(#simultaneity-arrow)" />
        <text x="95" y="126" className="simultaneity-axis">time t</text>
        <text x="646" y="313" className="simultaneity-axis">space x</text>
        <line x1="222" y1="222" x2="594" y2="222" stroke="#0b6d78" strokeWidth="4" />
        <circle cx="276" cy="222" r="12" fill="#2455e6" stroke="#fff" strokeWidth="4" />
        <circle cx="540" cy="222" r="12" fill="#2455e6" stroke="#fff" strokeWidth="4" />
        <text x="245" y="198" className="simultaneity-event">Event L</text>
        <text x="509" y="198" className="simultaneity-event">Event R</text>
        <text x="226" y="260" className="simultaneity-label">Same coordinate time in Frame A</text>
        <text x="44" y="333" className="simultaneity-note">A’s synchronized clocks assign L and R the same time.</text>

        <rect x="16" y="372" width="728" height="336" rx="18" fill="#f2f8f8" stroke="#c9e4e4" />
        <text x="44" y="414" className="simultaneity-heading">Frame B (moving relative to A)</text>
        <text x="44" y="444" className="simultaneity-copy">B’s own synchronized clocks define tilted equal-time slices</text>
        <line x1="138" y1="646" x2="138" y2="480" stroke="#5b6878" strokeWidth="2" markerEnd="url(#simultaneity-arrow)" />
        <line x1="138" y1="646" x2="672" y2="646" stroke="#5b6878" strokeWidth="2" markerEnd="url(#simultaneity-arrow)" />
        <text x="95" y="486" className="simultaneity-axis">time t′</text>
        <text x="646" y="675" className="simultaneity-axis">space x′</text>
        <line x1="205" y1="585" x2="382" y2="500" stroke="#0b6d78" strokeWidth="4" />
        <line x1="425" y1="640" x2="602" y2="555" stroke="#0b6d78" strokeWidth="4" />
        <circle cx="276" cy="551" r="12" fill="#2455e6" stroke="#fff" strokeWidth="4" />
        <circle cx="540" cy="585" r="12" fill="#2455e6" stroke="#fff" strokeWidth="4" />
        <text x="245" y="527" className="simultaneity-event">Event L</text>
        <text x="509" y="561" className="simultaneity-event">Event R</text>
        <text x="170" y="614" className="simultaneity-label">t′L</text>
        <text x="610" y="606" className="simultaneity-label">t′R</text>
        <text x="44" y="694" className="simultaneity-note">The events have different coordinate times in Frame B.</text>

        <text x="28" y="744" className="simultaneity-footnote">Coordinate-time slices—not visual arrival times or light-signal paths.</text>
        <text x="28" y="770" className="simultaneity-footnote">Signal delay is accounted for; it does not cause this disagreement.</text>
      </svg>
      <figcaption>
        <strong>Same events, different slices of “now”</strong>
        <p>Frame A’s synchronized clocks assign the distant events the same coordinate time. Frame B’s own Einstein-synchronized clock network assigns them different coordinate times.</p>
        <p>The difference is not when light arrives at an observer. Only spacelike-separated events can have frame-dependent order; timelike and lightlike causal order is preserved.</p>
      </figcaption>
    </figure>
  );
}

export const mdxComponents = {
  ShortAnswer,
  VisualExplanation,
  CommonMisconception,
  SpeedOfLightFigure,
  SimultaneityFigure,
};
