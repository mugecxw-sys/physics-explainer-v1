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

export const mdxComponents = {
  ShortAnswer,
  VisualExplanation,
  CommonMisconception,
};
