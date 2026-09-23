import type { AudioEpisode } from "@/lib/types";

// Audio routes and navigation are generated only from real entries in this array.
export const audioEpisodes: AudioEpisode[] = [
  {
    slug: "quantum-measurement",
    title: "Why Quantum Physics Gets Weird When You Measure It",
    description: "A plain-English audio explanation of quantum observers, measurement, decoherence, and why entanglement cannot send messages faster than light.",
    cluster: "quantum",
    audioUrl: "/audio/quantum/quantum-measurement.mp3",
    chapters: [
      { title: "Why the Word “Observer” Causes So Much Confusion" },
      { title: "What Actually Happens in a Quantum Measurement" },
      { title: "Why Nobody Needs to Be Watching" },
      { title: "Why Measurement Changes What We See" },
      { title: "The Deeper Measurement Problem" },
      { title: "What Decoherence Does — and Doesn't Do" },
      { title: "Entanglement and the Faster-Than-Light Trap" },
      { title: "What You Should Actually Remember" },
    ],
    relatedArticles: [
      { title: "What Is the Observer Effect in Quantum Mechanics?", href: "/physics/quantum/observer-effect/" },
      { title: "What Is the Quantum Measurement Problem?", href: "/physics/quantum/measurement-problem/" },
      { title: "Why Can't Quantum Entanglement Be Used for Faster-Than-Light Communication?", href: "/physics/quantum/entanglement-faster-than-light/" },
    ],
    sources: [
      {
        title: "Stanford Encyclopedia of Philosophy — Philosophical Issues in Quantum Theory",
        url: "https://plato.stanford.edu/entries/qt-issues/",
        publisher: "Stanford Encyclopedia of Philosophy",
      },
      {
        title: "Stanford Encyclopedia of Philosophy — The Role of Decoherence in Quantum Mechanics",
        url: "https://plato.stanford.edu/entries/qm-decoherence/",
        publisher: "Stanford Encyclopedia of Philosophy",
      },
      {
        title: "NIST — Measurement-induced decoherence and information in double-slit interference",
        url: "https://www.nist.gov/publications/measurement-induced-decoherence-and-information-double-slit-interference",
        publisher: "NIST",
      },
      {
        title: "Stanford Encyclopedia of Philosophy — Bell's Theorem",
        url: "https://plato.stanford.edu/entries/bell-theorem/",
        publisher: "Stanford Encyclopedia of Philosophy",
      },
    ],
  },
];
