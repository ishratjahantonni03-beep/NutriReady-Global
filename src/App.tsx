import {useState, useEffect} from 'react';
import {Header, type ScreenId} from './components/Header';
import {GuaranteeBanner} from './components/GuaranteeBanner';
import {OverviewScreen} from './components/OverviewScreen';
import {RationsScreen} from './components/RationsScreen';
import {PlannerScreen} from './components/PlannerScreen';
import {SafetyGuideScreen} from './components/SafetyGuideScreen';
import {OfflineCardModal} from './components/OfflineCardModal';
import {LOCALES, TRANSLATIONS, type LocaleCode} from './data/translations';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('overview');
  const [locale, setLocale] = useState<LocaleCode>('en');
  const [selectedHubFilterId, setSelectedHubFilterId] = useState<string | null>(null);
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);

  const currentLocaleMeta = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];
  const t = TRANSLATIONS[locale];

  useEffect(() => {
    document.documentElement.lang = currentLocaleMeta.code;
    document.documentElement.dir = currentLocaleMeta.dir;
  }, [currentLocaleMeta]);

  const handleNavigate = (screen: ScreenId) => {
    setActiveScreen(screen);
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  const handleInspectHubRations = (hubId: string) => {
    setSelectedHubFilterId(hubId);
    setActiveScreen('rations');
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e8f5e9] text-[#212b24]">
      <Header
        activeScreen={activeScreen}
        onNavigate={handleNavigate}
        locale={locale}
        onChangeLocale={setLocale}
        t={t}
      />

      <GuaranteeBanner
        t={t}
        onOpenOfflineCard={() => setOfflineModalOpen(true)}
      />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10">
        {activeScreen === 'overview' && (
          <OverviewScreen
            t={t}
            onNavigate={handleNavigate}
            onInspectHubRations={handleInspectHubRations}
          />
        )}

        {activeScreen === 'rations' && (
          <RationsScreen
            t={t}
            selectedHubFilterId={selectedHubFilterId}
            onClearHubFilter={() => setSelectedHubFilterId(null)}
          />
        )}

        {activeScreen === 'planner' && <PlannerScreen t={t} />}

        {activeScreen === 'safety' && <SafetyGuideScreen t={t} />}
      </main>

      <footer className="no-print border-t border-[#1b6b3a]/12 bg-[#f1fcf1] mt-8">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-[#404940]">
          <p>{t.footer.privacyNote}</p>
          <button
            type="button"
            onClick={() => setOfflineModalOpen(true)}
            className="min-h-[44px] px-4 rounded-xl bg-[#ffffff] border border-[#1b6b3a]/20 text-[#1b6b3a] font-semibold text-sm hover:bg-[#e8f5e9] whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          >
            {t.footer.printSummary}
          </button>
        </div>
      </footer>

      <OfflineCardModal
        isOpen={offlineModalOpen}
        onClose={() => setOfflineModalOpen(false)}
      />
    </div>
  );
}
