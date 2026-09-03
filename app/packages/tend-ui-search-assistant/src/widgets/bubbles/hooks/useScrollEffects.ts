import { useEffect, useLayoutEffect, useRef } from 'react';

import type { MessageType } from '@search-assistant/entities/message/api/types';
import { RAF } from '@search-assistant/shared/lib/utils/animate';
import {
  DRAWER_HEADER_CLASSNAME,
  MESSAGE_INPUT_CLASSNAME,
} from '@search-assistant/shared/constants/classnames';

export const useScrollEffects = (messages: MessageType[]) => {
  const scrollableRef = useRef<HTMLDivElement>(null);
  const chatInnerRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const guardRef = useRef<HTMLDivElement>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentHeight = useRef({ height: 0 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Shadow Effect */
  useEffect(() => {
    const scrollable = scrollableRef.current;

    const handleShadow = () => {
      if (!scrollable) return;

      const scrollY = Math.ceil(scrollable.scrollTop) || 0;

      const headerContainer = document.querySelector(`.${DRAWER_HEADER_CLASSNAME}`);

      if (headerContainer) {
        headerContainer.classList.toggle('shadow', scrollY > 0);
      }

      const footerContainer = document.querySelector(`.${MESSAGE_INPUT_CLASSNAME}`);

      if (footerContainer) {
        const height = scrollable.scrollHeight - scrollable.offsetHeight;
        footerContainer.classList.toggle('shadow', scrollY !== height);
      }
    };

    scrollable?.addEventListener('scroll', handleShadow);

    return () => {
      scrollable?.removeEventListener('scroll', handleShadow);
    };
  }, []);

  /* classname to scrollable container on scroll */
  useEffect(() => {
    const scrollable = scrollableRef.current;

    const handleScroll = () => {
      if (scrollable) {
        scrollable.classList.add('is-scrolling');

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
          scrollable.classList.remove('is-scrolling');
        }, 1000);
      }
    };

    if (scrollable) {
      setTimeout(() => {
        scrollable.addEventListener('scroll', handleScroll);
      }, 1000);
    }

    return () => {
      scrollable?.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  /* Saving initial bubble container height for calculations */
  useEffect(() => {
    const bubbles = bubblesRef.current;

    if (bubbles) currentHeight.current.height = bubbles.getBoundingClientRect().height;
  }, []);

  /* Initial bubble container animation (only for service message) */
  useLayoutEffect(() => {
    const bubbles = bubblesRef.current;

    if (bubbles && messages.length === 1) {
      const startTime = performance.now();
      const duration = 400;
      const delay = 400;

      const transition = (progress: number) => {
        const translateY = -50 + progress * 50;
        const opacity = progress;

        bubbles.style.transform = `translateY(${translateY}px)`;
        bubbles.style.opacity = `${opacity}`;
      };

      RAF(transition, startTime, duration, delay);
    }
  }, [messages]);

  /**
   * Scroll effect after sending/receiving messages.
   * Sets bottom padding if the bubbles do not fit within the height of the scrollable area;
   * otherwise, it triggers a normal scroll.
   *
   * IntersectionObserver is used to check if the guard has appeared in the visible area.
   */
  useLayoutEffect(() => {
    const scrollable = scrollableRef.current;
    const chatInner = chatInnerRef.current;
    const bubbles = bubblesRef.current;
    const guard = guardRef.current;

    if (scrollable && chatInner && bubbles && guard) {
      const smoothScroll = (duration: number) => {
        const start = scrollable.scrollTop;
        const end = scrollable.scrollHeight - scrollable.clientHeight;
        const startTime = performance.now();

        const updateScroll = (progress: number) => {
          scrollable.scrollTop = start + (end - start) * progress;
        };

        RAF(updateScroll, startTime, duration);
      };

      const bubblesHeight = bubbles.getBoundingClientRect().height;
      const scrollHeight = scrollable.clientHeight;
      const innerHeight = chatInner.scrollHeight;

      const addition = bubblesHeight - currentHeight.current.height;
      const padding = addition + scrollHeight - innerHeight;

      if (padding > 0) {
        chatInner.style.paddingTop = `${padding}px`;
        currentHeight.current.height = bubblesHeight;

        if (!observerRef.current) {
          observerRef.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
              chatInner.style.paddingTop = `0px`;
              observerRef.current?.disconnect();
              observerRef.current = null;
            }
          });
        }

        observerRef.current.observe(guard);
      }

      smoothScroll(250);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [messages]);

  return { scrollableRef, chatInnerRef, bubblesRef, guardRef };
};
