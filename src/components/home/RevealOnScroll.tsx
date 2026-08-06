'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Small client-island for scroll-driven reveal motion.
 * Wraps server-rendered children (passed as a prop) — does NOT convert the
 * SEO landing page itself into a client component. See AGENTS notes on the
 * session-25 lesson: reusing a 'use client' component inline crashed
 * `next build` when the whole page became client-rendered. This stays isolated.
 */
export function RevealOnScroll({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`lt-reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}
