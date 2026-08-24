import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { animate, createScope, splitText, stagger } from 'animejs';

export const useHeroAnimation = (root: RefObject<HTMLElement | null>): void => {
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      const title = root.current?.querySelector<HTMLElement>('[data-hero-title]');
      const hook = root.current?.querySelector<HTMLElement>('[data-hero-hook]');
      const actions = root.current?.querySelector<HTMLElement>('[data-hero-actions]');
      const portrait = root.current?.querySelector<HTMLElement>('[data-hero-portrait]');

      if (title) {
        const split = splitText(title, { words: true, accessible: true });
        const words = split.words as HTMLElement[];
        animate(words, {
          opacity: [0, 1],
          translateY: ['1.25rem', '0rem'],
          delay: stagger(70),
          duration: 600,
          ease: 'outExpo',
        });
      }

      if (hook) {
        animate(hook, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: 400,
          duration: 600,
          ease: 'outQuad',
        });
      }

      if (actions) {
        animate(actions, {
          opacity: [0, 1],
          translateY: ['1rem', '0rem'],
          delay: 520,
          duration: 600,
          ease: 'outQuad',
        });
      }

      if (portrait) {
        animate(portrait, {
          opacity: [0, 1],
          scale: [0.96, 1],
          translateY: ['0.75rem', '0rem'],
          delay: 180,
          duration: 800,
          ease: 'outExpo',
        });
      }
    });

    return () => scope.current?.revert();
  }, [root]);
};
