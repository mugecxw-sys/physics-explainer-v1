import type { Topic } from "@/lib/types";

export const topics: Topic[] = [
  {
    slug: "quantum",
    cluster: "quantum",
    title: "Quantum Physics",
    description: "Understand what measurement, observation, and entanglement really mean.",
    startHere: ["observer-effect"],
  },
  {
    slug: "relativity",
    cluster: "relativity",
    title: "Relativity",
    description: "Explore how motion, time, light, and gravity reshape our picture of reality.",
    startHere: ["time-dilation"],
  },
  {
    slug: "atomic-physics",
    cluster: "atomic",
    title: "Atomic Physics",
    description: "Look inside matter and make sense of atoms, electrons, and solidity.",
    startHere: ["electron-fall-into-nucleus", "atoms-empty-space"],
  },
  {
    slug: "thermodynamics",
    cluster: "thermodynamics",
    title: "Thermodynamics",
    description: "Build an intuitive picture of heat, entropy, and the direction of change.",
  },
];

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getTopicByCluster(cluster: string) {
  return topics.find((topic) => topic.cluster === cluster);
}
