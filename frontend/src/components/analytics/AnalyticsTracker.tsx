import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackAnalyticsEvent } from '../../services/analytics.service';

export const AnalyticsTracker = () => {
  const location = useLocation();
  const startedAt = useRef(0);

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    startedAt.current = Date.now();
    const timer = window.setTimeout(() => trackAnalyticsEvent('page_view'), 250);
    return () => {
      window.clearTimeout(timer);
      const durationMs = Math.min(Date.now() - startedAt.current, 3600000);
      if (durationMs >= 3000) trackAnalyticsEvent('engagement', { durationMs });
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement | null)?.closest('a') as HTMLAnchorElement | null;
      if (!link || location.pathname.startsWith('/admin')) return;
      const href = link.href;
      if (/wa\.me|whatsapp|mailto:|tel:/i.test(href)) trackAnalyticsEvent('contact_click', { target: href.slice(0, 500) });
      else if (link.hostname && link.hostname !== window.location.hostname) trackAnalyticsEvent('external_click', { target: href.slice(0, 500) });
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname]);

  return null;
};
