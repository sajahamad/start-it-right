import { useEffect, useRef, useState } from 'react';
import ContentIcon from './ContentIcon.jsx';

const ANIMATION_DURATION_MS = 1300;

function easeOutCubic(t) {
  return 1 - (1 - t) ** 3;
}

function StatCard({ value, suffix = '', label, icon }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const node = cardRef.current;
    if (!node || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let frameId;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / ANIMATION_DURATION_MS, 1);
      setDisplayValue(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated, value]);

  return (
    <div
      ref={cardRef}
      className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-lg"
    >
      <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        <ContentIcon name={icon} className="h-6 w-6" />
      </span>
      <p className="mb-1 text-2xl font-extrabold text-ink" dir="ltr">
        {displayValue}
        {suffix}
      </p>
      <p className="m-0 text-sm text-muted">{label}</p>
    </div>
  );
}

export default StatCard;
