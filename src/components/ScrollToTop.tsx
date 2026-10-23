import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Keeps the viewport honest across route changes: jump to the top for a new
 * page, or scroll to the anchor when the URL carries a hash.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}
