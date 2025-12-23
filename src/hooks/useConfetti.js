import { useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  DEFAULT_CONFETTI_CONFIG,
  EXPLOSIVE_CONFETTI_CONFIG,
  SIDE_CANNONS_CONFIG,
  FIREWORK_CONFETTI_CONFIG,
} from '../utils/confettiConfig';

/**
 * Custom hook for confetti animations
 */
export const useConfetti = () => {
  /**
   * Trigger default confetti
   */
  const celebrate = useCallback(() => {
    confetti(DEFAULT_CONFETTI_CONFIG);
  }, []);

  /**
   * Trigger explosive confetti burst
   */
  const explode = useCallback(() => {
    confetti(EXPLOSIVE_CONFETTI_CONFIG);
  }, []);

  /**
   * Trigger side cannons
   */
  const sideCannons = useCallback(() => {
    SIDE_CANNONS_CONFIG.forEach((config) => {
      confetti(config);
    });
  }, []);

  /**
   * Trigger firework effect
   */
  const firework = useCallback((x = 0.5, y = 0.5) => {
    confetti({
      ...FIREWORK_CONFETTI_CONFIG,
      origin: { x, y },
    });
  }, []);

  /**
   * Trigger multiple fireworks
   */
  const fireworkShow = useCallback(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const x = Math.random();
      const y = Math.random() * 0.7;
      firework(x, y);
    }, 300);
  }, [firework]);

  /**
   * Clear all confetti
   */
  const clear = useCallback(() => {
    confetti.reset();
  }, []);

  return {
    celebrate,
    explode,
    sideCannons,
    firework,
    fireworkShow,
    clear,
  };
};
