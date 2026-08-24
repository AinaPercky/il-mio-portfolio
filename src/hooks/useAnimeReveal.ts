import { useCallback, useEffect, useRef } from 'react';
import type { MutableRefObject, RefObject } from 'react';
import { animate, createScope, onScroll, stagger } from 'animejs';

export type StaggerAxis = 'x' | 'y';

export interface StaggerGroup {
  rootSelector: string;
  itemSelector: string;
  delay: number;
  axis?: StaggerAxis;
}

interface UseAnimeRevealOptions {
  root: RefObject<HTMLElement | null>;
  revealSelector?: string;
  revealAll?: boolean;
  revealDelay?: number;
  staggerSelector?: string;
  staggerItemSelector?: string;
  staggerDelay?: number;
  staggerGroups?: ReadonlyArray<StaggerGroup>;
}

interface AnimeRevealController {
  scope: MutableRefObject<ReturnType<typeof createScope> | null>;
  animateHover: (element: HTMLElement, hovered: boolean) => void;
}

const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const animateReveal = (elements: HTMLElement[], scrollTarget: HTMLElement, delay = 0): void => {
  if (!elements.length) return;

  animate(elements, {
    opacity: [0, 1],
    translateY: ['1rem', '0rem'],
    delay: delay > 0 ? stagger(delay) : 0,
    duration: 650,
    ease: 'outQuad',
    autoplay: onScroll({ container: document.body, target: scrollTarget, repeat: false, sync: 'play pause', enter: { target: 'top', container: '88%' } }),
  });
};

const animateStaggerGroup = (
  elements: NodeListOf<HTMLElement>,
  scrollTarget: HTMLElement,
  delay: number,
  axis: StaggerAxis = 'y',
): void => {
  if (!elements.length) return;

  const animation = {
    opacity: [0, 1],
    delay: stagger(delay),
    duration: 600,
    ease: 'outQuad' as const,
    autoplay: onScroll({ container: document.body, target: scrollTarget, repeat: false, sync: 'play pause', enter: { target: 'top', container: '88%' } }),
  };

  if (axis === 'x') {
    animate(elements, { ...animation, translateX: ['1rem', '0rem'] });
    return;
  }

  animate(elements, { ...animation, translateY: ['1rem', '0rem'] });
};

export const useAnimeReveal = ({
  root,
  revealSelector = '[data-reveal]',
  revealAll = false,
  revealDelay = 0,
  staggerSelector = '[data-stagger]',
  staggerItemSelector = '[data-card]',
  staggerDelay = 90,
  staggerGroups,
}: UseAnimeRevealOptions): AnimeRevealController => {
  const scope = useRef<ReturnType<typeof createScope> | null>(null);

  useEffect(() => {
    const section = root.current;
    if (!section || reducedMotion()) return;

    scope.current = createScope({ root }).add(() => {
      const revealElements: HTMLElement[] = revealAll
        ? Array.from(section.querySelectorAll(revealSelector)).filter(
            (element): element is HTMLElement => element instanceof HTMLElement,
          )
        : [section.querySelector<HTMLElement>(revealSelector)].filter(
            (element): element is HTMLElement => element !== null,
          );
      animateReveal(revealElements, section, revealDelay);

      const groups = staggerGroups ?? [
        {
          rootSelector: staggerSelector,
          itemSelector: staggerItemSelector,
          delay: staggerDelay,
          axis: 'y' as const,
        },
      ];

      groups.forEach(({ rootSelector, itemSelector, delay, axis }) => {
        const groupRoot = section.querySelector<HTMLElement>(rootSelector);
        const items = groupRoot?.querySelectorAll<HTMLElement>(itemSelector);
        if (groupRoot && items) animateStaggerGroup(items, section, delay, axis);
      });
    });

    return () => scope.current?.revert();
  }, [root, revealSelector, revealAll, revealDelay, staggerSelector, staggerItemSelector, staggerDelay, staggerGroups]);

  const animateHover = useCallback((element: HTMLElement, hovered: boolean) => {
    if (reducedMotion()) return;

    scope.current?.execute(() => {
      animate(element, {
        scale: hovered ? 1.02 : 1,
        translateY: hovered ? '-0.25rem' : '0rem',
        duration: 260,
        ease: 'outQuad',
      });
    });
  }, []);

  return { scope, animateHover };
};
