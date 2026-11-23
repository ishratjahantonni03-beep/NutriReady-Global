import {useState, useRef, useEffect} from 'react';
import {Globe, ChevronDown, Menu, X} from 'lucide-react';
import {LOCALES, type LocaleCode, type TranslationStrings} from '../data/translations';

export type ScreenId = 'overview' | 'rations' | 'planner' | 'safety';

interface HeaderProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  locale: LocaleCode;
  onChangeLocale: (locale: LocaleCode) => void;
  t: TranslationStrings;
}

export function Header({
  activeScreen,
  onNavigate,
  locale,
  onChangeLocale,
  t,
}: HeaderProps) {
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLocale = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const navItems: {id: ScreenId; label: string}[] = [
    {id: 'overview', label: t.nav.overview},
    {id: 'rations', label: t.nav.rations},
    {id: 'planner', label: t.nav.planner},
    {id: 'safety', label: t.nav.safety},
  ];

  const handleNavClick = (id: ScreenId) => {
    onNavigate(id);
    setMobileNavOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-40 bg-[#ffffff] border-b border-[#1b6b3a]/12">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand Title (single line, no attached descriptor/badges) */}
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className="flex items-center gap-2.5 text-[#1b6b3a] font-extrabold text-xl tracking-[-0.015em] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50 rounded-lg px-1 py-1"
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="28" height="28" rx="8" fill="#1B6B3A" />
            <path
              d="M14 6.5C10.5 8.5 8.5 11.8 8.5 15.2C8.5 18.6 10.9 21.2 14 21.5C17.1 21.2 19.5 18.6 19.5 15.2C19.5 11.8 17.5 8.5 14 6.5Z"
              fill="#4CAF50"
            />
            <path
              d="M14 10.5V20.5M14 14.5L17 12.2M14 16.8L11 14.5"
              stroke="#FFFFFF"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
          </svg>
          <span>NutriReady</span>
        </button>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`relative min-h-[44px] px-1 text-[15px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50 rounded-md ${
                  isActive
                    ? 'text-[#005127]'
                    : 'text-[#404940] hover:text-[#1b6b3a]'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[2.5px] bg-[#1b6b3a] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action (Language & Locale Selector using native script names) */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={langMenuOpen}
              onClick={() => setLangMenuOpen((prev) => !prev)}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#e8f5e9] border border-[#1b6b3a]/25 text-[#1b6b3a] text-sm font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer hover:bg-[#dae5db] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50"
            >
              <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>{currentLocale.nativeName}</span>
              <ChevronDown
                className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                  langMenuOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langMenuOpen && (
              <div
                role="listbox"
                aria-label="Language selection"
                className="absolute end-0 mt-2 w-48 bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/15 shadow-nutri-modal py-1.5 z-50"
              >
                {LOCALES.map((loc) => {
                  const selected = loc.code === locale;
                  return (
                    <button
                      key={loc.code}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => {
                        onChangeLocale(loc.code);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full min-h-[44px] px-4 py-2 text-start text-sm font-semibold flex items-center justify-between cursor-pointer transition-colors ${
                        selected
                          ? 'bg-[#e8f5e9] text-[#005127]'
                          : 'text-[#212b24] hover:bg-[#f1fcf1]'
                      }`}
                    >
                      <span>{loc.nativeName}</span>
                      {selected && (
                        <span className="text-xs font-bold text-[#1b6b3a]">Active</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen((prev) => !prev)}
            className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-[#1b6b3a]/20 text-[#1b6b3a] hover:bg-[#e8f5e9] cursor-pointer"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#1b6b3a]/12 bg-[#ffffff] px-4 py-3 flex flex-col gap-1.5"
        >
          {navItems.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`min-h-[48px] px-4 rounded-xl text-start text-base font-semibold cursor-pointer transition-colors ${
                  isActive
                    ? 'bg-[#1b6b3a] text-[#ffffff]'
                    : 'text-[#212b24] hover:bg-[#e8f5e9]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
