"use client";

import { useRef } from "react";

const milestones = [25, 50, 75] as const;

function emitAudioEvent(name: "audio_play" | "audio_25" | "audio_50" | "audio_75" | "audio_complete", slug: string) {
  window.dispatchEvent(new CustomEvent("physics-audio", { detail: { name, slug } }));
}

export function AudioPlayer({ src, title, slug }: { src: string; title: string; slug: string }) {
  const emitted = useRef(new Set<number>());

  return (
    <audio
      className="audio-player"
      controls
      preload="metadata"
      aria-label={title}
      onPlay={() => emitAudioEvent("audio_play", slug)}
      onTimeUpdate={(event) => {
        const element = event.currentTarget;
        if (!Number.isFinite(element.duration) || element.duration <= 0) return;
        const progress = (element.currentTime / element.duration) * 100;
        milestones.forEach((milestone) => {
          if (progress >= milestone && !emitted.current.has(milestone)) {
            emitted.current.add(milestone);
            emitAudioEvent(`audio_${milestone}` as "audio_25" | "audio_50" | "audio_75", slug);
          }
        });
      }}
      onEnded={() => emitAudioEvent("audio_complete", slug)}
    >
      <source src={src} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
