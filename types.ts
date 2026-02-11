
export type AppStep = 'landing' | 'question' | 'surprise';

export interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  type: 'heart' | 'confetti';
  sway: number;
  rotation: number;
  borderRadius?: string;
}
