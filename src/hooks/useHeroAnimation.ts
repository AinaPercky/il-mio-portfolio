import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { animate, createScope, splitText, stagger } from 'animejs';

export const useHeroAnimation = (root: RefObject<HTMLElement | null>, replayKey: string): void => {
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    if (!root.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    scope.current = createScope({ root }).add(() => {
      const title = root.current?.querySelector<HTMLElement>('[data-hero-title]');
      const subtitle = root.current?.querySelector<HTMLElement>('[data-hero-subtitle]');
      const hook = root.current?.querySelector<HTMLElement>('[data-hero-hook]');
      const actions = root.current?.querySelector<HTMLElement>('[data-hero-actions]');
      const actionButtons = actions?.querySelectorAll<HTMLElement>('[data-hero-action]');
      const portrait = root.current?.querySelector<HTMLElement>('[data-hero-portrait]');
      const orbit = root.current?.querySelector<HTMLElement>('[data-hero-orbit]');
      const primaryAmbient = root.current?.querySelector<HTMLElement>('[data-hero-ambient="primary"]');
      const secondaryAmbient = root.current?.querySelector<HTMLElement>('[data-hero-ambient="secondary"]');

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

      if (subtitle) {
        animate(subtitle, {
          opacity: [0, 1],
          translateY: ['0.75rem', '0rem'],
          delay: 280,
          duration: 550,
          ease: 'outQuad',
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

      if (actionButtons?.length) {
        animate(actionButtons, {
          scale: [0.96, 1],
          delay: stagger(100, { start: 520 }),
          duration: 500,
          ease: 'outBack',
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

      if (orbit) {
        animate(orbit, {
          rotate: '1turn',
          duration: 20000,
          ease: 'linear',
          loop: true,
        });
      }

      if (primaryAmbient) {
        animate(primaryAmbient, {
          translateX: ['0rem', '1.25rem'],
          translateY: ['0rem', '0.75rem'],
          scale: [1, 1.06],
          duration: 9000,
          ease: 'inOutSine',
          direction: 'alternate',
          loop: true,
        });
      }

      if (secondaryAmbient) {
        animate(secondaryAmbient, {
          translateX: ['0rem', '-1rem'],
          translateY: ['0rem', '-0.75rem'],
          scale: [1, 1.08],
          duration: 10500,
          delay: 350,
          ease: 'inOutSine',
          direction: 'alternate',
          loop: true,
        });
      }
    });

    return () => scope.current?.revert();
  }, [root, replayKey]);
};
