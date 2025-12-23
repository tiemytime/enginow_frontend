/**
 * Confetti Configuration
 */

/**
 * Default confetti config for task completion
 */
export const DEFAULT_CONFETTI_CONFIG = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
  colors: ['#1e40af', '#7c3aed', '#10b981', '#f59e0b'],
  angle: 90,
  scalar: 1.2,
  ticks: 200,
  gravity: 1,
  decay: 0.94,
  startVelocity: 30,
};

/**
 * Explosive confetti burst
 */
export const EXPLOSIVE_CONFETTI_CONFIG = {
  particleCount: 150,
  spread: 180,
  origin: { y: 0.5 },
  colors: ['#1e40af', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'],
  scalar: 1.5,
  ticks: 250,
  gravity: 0.8,
  decay: 0.91,
  startVelocity: 45,
};

/**
 * Side cannons confetti
 */
export const SIDE_CANNONS_CONFIG = [
  {
    particleCount: 50,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.6 },
    colors: ['#1e40af', '#7c3aed'],
  },
  {
    particleCount: 50,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.6 },
    colors: ['#10b981', '#f59e0b'],
  },
];

/**
 * Gentle rain confetti
 */
export const RAIN_CONFETTI_CONFIG = {
  particleCount: 50,
  spread: 30,
  origin: { y: -0.1 },
  colors: ['#1e40af', '#7c3aed', '#10b981'],
  scalar: 0.8,
  ticks: 300,
  gravity: 0.3,
  decay: 0.96,
  startVelocity: 10,
};

/**
 * Firework confetti
 */
export const FIREWORK_CONFETTI_CONFIG = {
  particleCount: 30,
  spread: 360,
  ticks: 150,
  gravity: 0.5,
  decay: 0.94,
  startVelocity: 20,
  colors: ['#1e40af', '#7c3aed', '#10b981', '#f59e0b', '#ef4444'],
  scalar: 1,
};
