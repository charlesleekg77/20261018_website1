import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from './Logo';
import SessionTag from './SessionTag';

export type NavItem = {
  label: string;
  route: string;
  section: string;
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'Manifesto', route: '/manifesto', section: 'manifesto' },
  { label: 'Human Works', route: '/works', section: 'works' },
  { label: 'Services', route: '/services', section: 'services' },
  { label: 'Contact / Join', route: '/contact', section: 'contact' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (value) => setScrolled(value > 24));

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isActive = (item: NavItem) =>
    location.pathname === item.route ||
    (location.pathname === '/' && location.hash === `#${item.section}`);

  const go = (item: NavItem) => {
    const onHome = location.pathname === '/';
    const target = onHome ? document.getElementById(item.section) : null;

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${item.section}`);
      setMenuOpen(false);
      return;
    }

    navigate(item.route);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          scrolled
            ? 'border-offwhite/15 bg-charcoal/85 backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex items-center justify-between gap-4 py-3">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item)}
                data-cursor-label="GO"
                aria-current={isActive(item) ? 'page' : undefined}
                className={`label-type group relative px-3 py-2 transition-colors ${
                  isActive(item) ? 'text-acid' : 'text-offwhite/70 hover:text-offwhite'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 bottom-1 h-px origin-left bg-acid transition-transform duration-300 ${
                    isActive(item) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            ))}

            <button
              type="button"
              onClick={() => navigate('/contact')}
              data-cursor-label="JOIN"
              className="label-type ml-2 border border-signal bg-signal px-4 py-2 text-ink transition-all hover:border-acid hover:bg-acid hover:shadow-[4px_4px_0_0_var(--color-offwhite)]"
            >
              Start a project
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden xl:block">
              <SessionTag />
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center border border-offwhite/25 lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-[2px] w-full bg-offwhite transition-all ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-[2px] w-full bg-offwhite transition-all ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-[2px] w-full bg-offwhite transition-all ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          className="h-[3px] origin-left bg-acid"
          style={{ scaleX: scrollYProgress }}
        />
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[4.75rem] z-40 border-y border-offwhite/15 bg-charcoal/97 backdrop-blur-lg lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col py-4">
              {NAV_ITEMS.map((item, index) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => go(item)}
                  className="flex min-h-[44px] items-center justify-between border-b border-offwhite/10 py-4 text-left"
                >
                  <span className="font-display text-3xl font-extrabold uppercase tracking-tight text-offwhite">
                    {item.label}
                  </span>
                  <span className="label-type text-signal">{String(index + 1).padStart(2, '0')}</span>
                </button>
              ))}
              <div className="pt-5">
                <SessionTag compact />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
