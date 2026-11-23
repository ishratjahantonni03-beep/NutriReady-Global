import {useState, useMemo} from 'react';
import {
  Search,
  MapPin,
  Clock,
  AlertTriangle,
  Accessibility,
  Baby,
  ArrowRight,
  Train,
  RotateCcw,
} from 'lucide-react';
import {DISTRIBUTION_HUBS, IMAGES, RATION_PACKS} from '../data/nutriData';
import type {TranslationStrings} from '../data/translations';
import {ResilientImage} from './ResilientImage';
import type {ScreenId} from './Header';

interface OverviewScreenProps {
  t: TranslationStrings;
  onNavigate: (screen: ScreenId) => void;
  onInspectHubRations: (hubId: string) => void;
}

type HubFilter = 'all' | 'open' | 'step-free' | 'infant';

export function OverviewScreen({
  t,
  onNavigate,
  onInspectHubRations,
}: OverviewScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [hubFilter, setHubFilter] = useState<HubFilter>('all');

  const openHubsCount = DISTRIBUTION_HUBS.filter((h) => h.isOpenNow).length;
  const totalMealsToday = DISTRIBUTION_HUBS.reduce(
    (sum, h) => sum + (h.isOpenNow ? h.mealsAvailableToday : 0),
    0
  );
  const boilZonesCount = DISTRIBUTION_HUBS.filter((h) => h.boilWaterZone).length;
  const infantHubsCount = DISTRIBUTION_HUBS.filter((h) => h.infantStockReady).length;

  const filteredHubs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return DISTRIBUTION_HUBS.filter((hub) => {
      if (hubFilter === 'open' && !hub.isOpenNow) return false;
      if (hubFilter === 'step-free' && !hub.stepFreeAccess) return false;
      if (hubFilter === 'infant' && !hub.infantStockReady) return false;
      if (!q) return true;
      return (
        hub.name.toLowerCase().includes(q) ||
        hub.district.toLowerCase().includes(q) ||
        hub.address.toLowerCase().includes(q) ||
        hub.transitNote.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, hubFilter]);

  const filterButtons: {id: HubFilter; label: string}[] = [
    {id: 'all', label: t.overview.filterAll},
    {id: 'open', label: t.overview.filterOpenNow},
    {id: 'step-free', label: t.overview.filterStepFree},
    {id: 'infant', label: t.overview.filterInfantStock},
  ];

  return (
    <div className="space-y-10">
      {/* Hero Split Section (12-column grid, aligned stretch) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-7 bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 md:p-8 flex flex-col justify-between gap-6">
          <div className="space-y-4">
            <p className="text-xs font-bold tracking-[0.04em] text-[#006e1c]">
              Community Nutrition Readiness · Walk-Up Access
            </p>
            <h1 className="text-[30px] leading-[36px] md:text-[40px] md:leading-[48px] font-extrabold tracking-[-0.02em] text-[#141e17]">
              {t.overview.heroTitle}
            </h1>
            <p className="text-base md:text-lg leading-[26px] md:leading-[28px] text-[#404940] max-w-2xl">
              {t.overview.heroSubtitle}
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Search Input (52px min height, rounded-xl, crisp focus border) */}
            <div className="relative">
              <Search
                className="w-5 h-5 text-[#404940] absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.overview.searchPlaceholder}
                aria-label={t.overview.searchPlaceholder}
                className="w-full min-h-[52px] ps-12 pe-4 py-3 rounded-xl bg-[#ffffff] border-[1.5px] border-[#212b24]/30 text-[#141e17] placeholder:text-[#707a6f] text-base focus:outline-none focus:border-2 focus:border-[#1b6b3a] transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('rations')}
                className="min-h-[52px] px-6 rounded-xl bg-[#1b6b3a] hover:bg-[#005127] text-[#ffffff] font-semibold text-base flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50"
              >
                <span>{t.overview.browseRationsCta}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('planner')}
                className="min-h-[52px] px-6 rounded-xl bg-[#e8f5e9] hover:bg-[#dae5db] border-[1.5px] border-[#1b6b3a]/25 text-[#1b6b3a] font-semibold text-base flex items-center justify-center whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50"
              >
                {t.overview.openPlannerCta}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#1b6b3a]/12 shadow-nutri-card bg-[#ffffff] min-h-[260px]">
          <ResilientImage
            src={IMAGES.heroPantry}
            alt="Organized community nutrition distribution tables with fresh produce, grain sacks, and clean drinking water under a shaded shelter"
            fallbackLabel="Community Nutrition Distribution Hub"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* 4-Column Operational Summary Strip (full-width row below hero) */}
      <section
        aria-label="Live regional nutrition readiness"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
      >
        <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-5">
          <p className="text-sm font-semibold text-[#404940]">{t.overview.kpiHubsOpen}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#005127] tabular-nums">
            {openHubsCount} <span className="text-base font-semibold text-[#707a6f]">/ {DISTRIBUTION_HUBS.length}</span>
          </p>
        </div>

        <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-5">
          <p className="text-sm font-semibold text-[#404940]">{t.overview.kpiDailyMeals}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#005127] tabular-nums">
            {totalMealsToday.toLocaleString()}
          </p>
        </div>

        <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-5">
          <p className="text-sm font-semibold text-[#404940]">{t.overview.kpiBoilZones}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#703700] tabular-nums">
            {boilZonesCount} <span className="text-base font-semibold text-[#703700]">Active</span>
          </p>
        </div>

        <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-5">
          <p className="text-sm font-semibold text-[#404940]">{t.overview.kpiInfantPacks}</p>
          <p className="mt-2 text-3xl font-extrabold text-[#005127] tabular-nums">
            {infantHubsCount} <span className="text-base font-semibold text-[#707a6f]">Hubs</span>
          </p>
        </div>
      </section>

      {/* Active Community Distribution Hubs Directory */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.015em] text-[#141e17]">
              {t.overview.hubsHeading}
            </h2>
            <p className="text-base text-[#404940]">{t.overview.hubsSubheading}</p>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="group"
            aria-label="Distribution hub filters"
            className="flex flex-wrap items-center gap-2"
          >
            {filterButtons.map((btn) => {
              const selected = hubFilter === btn.id;
              return (
                <button
                  key={btn.id}
                  type="button"
                  onClick={() => setHubFilter(btn.id)}
                  className={`min-h-[44px] px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50 ${
                    selected
                      ? 'bg-[#1b6b3a] text-[#ffffff]'
                      : 'bg-[#ffffff] text-[#1b6b3a] border border-[#1b6b3a]/20 hover:bg-[#e0ebe0]'
                  }`}
                >
                  {btn.label}
                </button>
              );
            })}
          </div>
        </div>

        {filteredHubs.length === 0 ? (
          <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-10 text-center space-y-4">
            <p className="text-base font-semibold text-[#404940]">{t.overview.noHubMatches}</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setHubFilter('all');
              }}
              className="min-h-[48px] px-5 rounded-xl bg-[#e8f5e9] border border-[#1b6b3a]/25 text-[#1b6b3a] font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#dae5db] cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>{t.overview.resetFilters}</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHubs.map((hub) => {
              const stockedPacks = RATION_PACKS.filter((p) =>
                hub.stockedRationIds.includes(p.id)
              );
              return (
                <article
                  key={hub.id}
                  className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-3">
                    {/* Clean unboxed metadata kicker */}
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#404940]">
                      <span className={hub.isOpenNow ? 'text-[#006e1c] font-bold' : 'text-[#703700] font-bold'}>
                        {hub.isOpenNow ? 'Open Now' : 'Opens 10:00'}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{hub.district}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {hub.mealsAvailableToday.toLocaleString()} meals ready
                      </span>
                    </div>

                    <h3 className="text-[20px] leading-[26px] font-bold text-[#141e17]">
                      {hub.name}
                    </h3>

                    <div className="space-y-1.5 text-sm text-[#404940]">
                      <p className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#1b6b3a] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{hub.address}</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <Train className="w-4 h-4 text-[#1b6b3a] shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{hub.transitNote}</span>
                      </p>
                      <p className="flex items-center gap-2 tabular-nums">
                        <Clock className="w-4 h-4 text-[#1b6b3a] shrink-0" aria-hidden="true" />
                        <span>Today: {hub.hoursToday}</span>
                      </p>
                    </div>

                    {/* Semantic alert chips paired with explicit text & icon */}
                    {hub.boilWaterZone && (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e67e22]/12 text-[#703700] text-xs font-bold">
                        <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Local Boil-Water Advisory — Sealed water cartons provided</span>
                      </div>
                    )}

                    {/* Clean unboxed accessibility & language summary */}
                    <div className="pt-2 border-t border-[#1b6b3a]/10 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#404940]">
                      {hub.stepFreeAccess && (
                        <span className="inline-flex items-center gap-1.5 text-[#005127] font-semibold">
                          <Accessibility className="w-4 h-4" aria-hidden="true" />
                          <span>Step-Free Entry</span>
                        </span>
                      )}
                      {hub.infantStockReady && (
                        <span className="inline-flex items-center gap-1.5 text-[#005127] font-semibold">
                          <Baby className="w-4 h-4" aria-hidden="true" />
                          <span>Infant Formula Ready</span>
                        </span>
                      )}
                      <span>Languages: {hub.languagesSpoken.join(' · ')}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-[#404940] tabular-nums">
                      {stockedPacks.length} ration varieties stocked
                    </span>
                    <button
                      type="button"
                      onClick={() => onInspectHubRations(hub.id)}
                      className="min-h-[48px] px-5 rounded-xl bg-[#e8f5e9] hover:bg-[#1b6b3a] text-[#1b6b3a] hover:text-[#ffffff] border border-[#1b6b3a]/25 text-sm font-semibold flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50"
                    >
                      <span>{t.overview.inspectRations}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
