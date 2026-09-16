import { Menu, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import majors from '../data/majors.json';
import { filterMajors } from '../utils/majors.js';
import { getUniversities } from '../utils/universities.js';

const links = [
  { to: '/', label: 'الرئيسية' },
  { to: '/majors', label: 'التخصصات' },
  { to: '/universities', label: 'الجامعات' },
  { to: '/compare', label: 'قارن بين تخصصات' },
  { to: '/guide', label: 'دليل أول سنة' },
  { to: '/resources', label: 'مصادر مجانية' },
];

const SEARCH_DEBOUNCE_MS = 180;
const MAX_RESULTS = 5;

function NavLinks({ onLinkClick }) {
  return links.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      end={link.to === '/'}
      onClick={onLinkClick}
      className={({ isActive }) =>
        `border-b-2 pb-1 text-[15px] font-medium transition-colors ${
          isActive ? 'border-primary font-bold text-ink' : 'border-transparent text-muted hover:text-ink'
        }`
      }
    >
      {link.label}
    </NavLink>
  ));
}

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  const trimmedQuery = debouncedQuery.trim();

  const majorResults = useMemo(
    () => (trimmedQuery ? filterMajors(majors, { search: trimmedQuery }).slice(0, MAX_RESULTS) : []),
    [trimmedQuery],
  );

  const universityResults = useMemo(() => {
    if (!trimmedQuery) return [];
    const lowered = trimmedQuery.toLowerCase();
    return getUniversities(majors)
      .filter((university) => university.name.toLowerCase().includes(lowered))
      .slice(0, MAX_RESULTS);
  }, [trimmedQuery]);

  const hasResults = majorResults.length > 0 || universityResults.length > 0;

  function selectResult() {
    setQuery('');
    inputRef.current?.blur();
  }

  function handleSearchKeyDown(event) {
    if (event.key === 'Escape') {
      setQuery('');
      event.target.blur();
    }
  }

  return (
    <header
      className={`sticky top-0 z-20 border-b border-border bg-white transition-shadow print:hidden ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="relative mx-auto flex w-full max-w-6xl items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <NavLink to="/" className="shrink-0">
          <img src={logo} alt="ابدأها صح" className="h-7 w-auto object-contain sm:h-8" />
        </NavLink>

        <div className="relative flex shrink-0 items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.focus()}
            aria-label="بحث"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-muted transition hover:border-primary hover:text-primary sm:h-9 sm:w-9"
          >
            <Search className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} aria-hidden="true" />
          </button>

          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="دور عن تخصص أو جامعة..."
            className="w-20 rounded-lg border border-border px-3 py-2 text-sm text-ink outline-none transition-colors hover:border-primary focus:border-primary sm:w-36 md:w-56"
          />
        </div>

        {trimmedQuery && (
          <div className="absolute inset-x-4 top-full z-30 mt-2 rounded-2xl border border-border bg-white p-4 shadow-lg sm:inset-x-auto sm:right-6 sm:w-80 md:w-96">
            {!hasResults ? (
              <div className="py-6 text-center">
                <p className="text-sm text-ink">لا توجد نتائج مطابقة لـ '{trimmedQuery}'</p>
                <p className="mt-1 text-xs text-muted">جرّب كلمة أخرى مثل: طب، هندسة، جامعة...</p>
              </div>
            ) : (
              <div className="max-h-80 overflow-y-auto">
                {majorResults.length > 0 && (
                  <div className="mb-3">
                    <p className="mb-1.5 px-1 text-xs font-bold text-muted">التخصصات</p>
                    <ul className="flex flex-col gap-1">
                      {majorResults.map((major) => (
                        <li key={major.id}>
                          <Link
                            to={`/majors/${major.id}`}
                            onClick={selectResult}
                            className="block rounded-lg px-3 py-2 hover:bg-surface"
                          >
                            <span className="block text-sm font-bold text-ink">{major.name}</span>
                            <span className="block text-xs text-muted">{major.faculty}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {universityResults.length > 0 && (
                  <div>
                    <p className="mb-1.5 px-1 text-xs font-bold text-muted">الجامعات</p>
                    <ul className="flex flex-col gap-1">
                      {universityResults.map((university) => (
                        <li key={university.id}>
                          <Link
                            to={`/universities/${university.id}`}
                            onClick={selectResult}
                            className="block rounded-lg px-3 py-2 hover:bg-surface"
                          >
                            <span className="block text-sm font-bold text-ink">{university.name}</span>
                            <span className="block text-xs text-muted">{university.majorsCount} تخصص</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="mt-1 hidden items-center gap-5 lg:flex">
            <NavLinks />
          </nav>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-white sm:h-9 sm:w-9 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4 sm:h-4.5 sm:w-4.5" strokeWidth={2} aria-hidden="true" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="absolute inset-x-0 top-full z-20 flex flex-col items-center gap-4 border-b border-border bg-white px-4 py-5 shadow-md lg:hidden">
            <NavLinks onLinkClick={() => setIsMenuOpen(false)} />
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
