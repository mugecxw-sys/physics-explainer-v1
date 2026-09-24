import type { AudioEpisode } from "@/lib/types";

// Audio routes and navigation are generated only from real entries in this array.
export const audioEpisodes: AudioEpisode[] = [
  {
    slug: "quantum-measurement",
    title: "Why Quantum Physics Gets Weird When You Measure It",
    description: "A plain-English audio explanation of quantum observers, measurement, decoherence, and why entanglement cannot send messages faster than light.",
    breadcrumbLabel: "Quantum Measurement",
    intro: [
      "Quantum measurement is often explained as if reality changes because someone looks at it. That is not what the physics requires.",
      "This audio explainer connects three closely related ideas: what an “observer” really means in quantum mechanics, why measurement creates a deeper conceptual problem, and why quantum entanglement still cannot be used to send messages faster than light.",
    ],
    whatYoullUnderstand: "Why the word “observer” can be misleading, why conscious awareness is not required, and why a measurement creates a deeper conceptual problem. It also explains what decoherence does—and does not—settle, and why entanglement produces remarkable correlations without creating a faster-than-light message channel.",
    aboutAudio: [
      "This audio combines several related Physics, Plainly. explainers into one continuous plain-English explanation. It is written for listening rather than as a word-for-word reading of the individual articles.",
      "For the underlying explanations and sources, continue with the related reading above.",
    ],
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
  {
    slug: "time-dilation",
    title: "Why Moving Fast Changes Time",
    description: "A plain-English audio explanation of why the speed of light stays invariant, why moving clocks accumulate different amounts of time, and what time dilation really means.",
    breadcrumbLabel: "Time Dilation",
    intro: [
      "If you chase a car, its speed relative to you changes. Chase a beam of light, and that everyday rule stops working.",
      "This audio explainer connects the constant speed of light with time dilation: why different inertial observers still measure the same vacuum light speed, why moving clocks can accumulate different amounts of time, and why none of this feels strange to someone moving with the clock.",
    ],
    whatYoullUnderstand: "Why chasing light does not make it recede at c minus your speed, and why moving toward light does not make it approach faster than c. It connects the invariant speed of light with the changes to space and time that produce time dilation. You’ll hear what elapsed time means for a moving clock, why your own clock feels normal, how reciprocal time dilation fits together, and how proper time makes reunion comparisons such as the twin scenario consistent.",
    aboutAudio: [
      "This audio combines two related Physics, Plainly. explainers into one continuous explanation of why the invariant speed c changes how moving observers compare space and time.",
      "It is written for listening rather than as a word-for-word reading of either article.",
    ],
    cluster: "relativity",
    audioUrl: "/audio/relativity/moving-fast-changes-time.mp3",
    chapters: [
      { title: "The Rule That Breaks Everyday Intuition" },
      { title: "Why Light Doesn't Add Speeds the Ordinary Way" },
      { title: "If Light Doesn't Change, Something Else Must" },
      { title: "The Light Clock" },
      { title: "You Never Feel Your Own Time Slow Down" },
      { title: "How Can Both Observers Say the Other Clock Is Slow?" },
      { title: "The Twin Paradox Without the Drama" },
      { title: "This Is Not Just Something We See" },
      { title: "What You Should Actually Remember" },
    ],
    relatedArticles: [
      { title: "Why Does Time Dilation Happen?", href: "/physics/relativity/time-dilation/" },
      { title: "Why Is the Speed of Light the Same for Everyone?", href: "/physics/relativity/speed-of-light-same-for-everyone/" },
    ],
    sources: [
      {
        title: "OpenStax — University Physics Volume 3: Time Dilation",
        url: "https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation",
        publisher: "OpenStax",
      },
      {
        title: "OpenStax — College Physics 2e: Simultaneity and Time Dilation",
        url: "https://openstax.org/books/college-physics-2e/pages/28-2-simultaneity-and-time-dilation",
        publisher: "OpenStax",
      },
      {
        title: "OpenStax — University Physics Volume 3: The Lorentz Transformation",
        url: "https://openstax.org/books/university-physics-volume-3/pages/5-5-the-lorentz-transformation",
        publisher: "OpenStax",
      },
      {
        title: "OpenStax — University Physics Volume 3: Relativistic Velocity Transformation",
        url: "https://openstax.org/books/university-physics-volume-3/pages/5-6-relativistic-velocity-transformation",
        publisher: "OpenStax",
      },
      {
        title: "MIT OpenCourseWare — 8.20 Introduction to Special Relativity: Velocity Addition",
        url: "https://ocw.mit.edu/courses/8-20-introduction-to-special-relativity-january-iap-2021/resources/lecture-5-1/",
        publisher: "MIT OpenCourseWare",
      },
      {
        title: "Einstein Online — Constancy of the Speed of Light",
        url: "https://www.einstein-online.info/en/explandict/constancy-of-the-speed-of-light/",
        publisher: "Einstein Online",
      },
      {
        title: "NIST — Pair of Aluminum Atomic Clocks Reveal Einstein's Relativity at a Personal Scale",
        url: "https://www.nist.gov/news-events/news/2010/09/nist-pair-aluminum-atomic-clocks-reveal-einsteins-relativity-personal-scale",
        publisher: "NIST",
      },
    ],
  },
];
