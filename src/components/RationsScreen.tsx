import {useState, useMemo} from 'react';
import {
  Search,
  AlertTriangle,
  Flame,
  CheckCircle2,
  X,
  RotateCcw,
  MapPin,
} from 'lucide-react';
import {
  RATION_PACKS,
  DISTRIBUTION_HUBS,
  type DietaryTag,
  type RationPack,
} from '../data/nutriData';
import type {TranslationStrings} from '../data/translations';
import {ResilientImage} from './ResilientImage';

interface RationsScreenProps {
  t: TranslationStrings;
  selectedHubFilterId: string | null;
  onClearHubFilter: () => void;
}

const DIET_OPTIONS: DietaryTag[] = [
  'Halal',
  'Kosher',
  'Vegan',
  'Infant Safe',
  'Allergen-Free',
  'Soft Texture',
];

export function RationsScreen({
  t,
  selectedHubFilterId,
  onClearHubFilter,
}: RationsScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag | 'all'>('all');
  const [prepFilter, setPrepFilter] = useState<'all' | 'no-cook' | 'boiling-water'>('all');
  const [activeRation, setActiveRation] = useState<RationPack | null>(null);

  const activeHub = useMemo(
    () => DISTRIBUTION_HUBS.find((h) => h.id === selectedHubFilterId) ?? null,
    [selectedHubFilterId]
  );

  const filteredPacks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return RATION_PACKS.filter((pack) => {
      if (activeHub && !activeHub.stockedRationIds.includes(pack.id)) return false;
      if (selectedDiet !== 'all' && !pack.dietaryTags.includes(selectedDiet)) return false;
      if (prepFilter !== 'all' && pack.prep !== prepFilter) return false;
      if (!q) return true;
      return (
        pack.name.toLowerCase().includes(q) ||
        pack.subtitle.toLowerCase().includes(q) ||
        pack.contents.some((c) => c.toLowerCase().includes(q)) ||
        pack.dietaryTags.some((d) => d.toLowerCase().includes(q))
      );
    });
  }, [activeHub, selectedDiet, prepFilter, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header & Search/Filter Controls */}
      <section className="space-y-5">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.015em] text-[#141e17]">
            {t.rations.heading}
          </h1>
          <p className="text-base text-[#404940] max-w-3xl">{t.rations.subheading}</p>
        </div>

        {activeHub && (
          <div className="bg-[#ffffff] rounded-xl border border-[#1b6b3a]/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-sm font-semibold text-[#141e17]">
              <MapPin className="w-4 h-4 text-[#1b6b3a] shrink-0" aria-hidden="true" />
              <span>
                Showing rations stocked at <strong className="text-[#005127]">{activeHub.name}</strong> ({activeHub.hoursToday})
              </span>
            </div>
            <button
              type="button"
              onClick={onClearHubFilter}
              className="min-h-[44px] px-4 rounded-xl bg-[#e8f5e9] text-[#1b6b3a] text-sm font-semibold hover:bg-[#dae5db] cursor-pointer whitespace-nowrap"
            >
              Show All Hubs
            </button>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-5 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            <div className="lg:col-span-6 relative">
              <Search
                className="w-5 h-5 text-[#404940] absolute start-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.rations.searchPlaceholder}
                aria-label={t.rations.searchPlaceholder}
                className="w-full min-h-[52px] ps-12 pe-4 py-3 rounded-xl bg-[#ffffff] border-[1.5px] border-[#212b24]/30 text-[#141e17] placeholder:text-[#707a6f] text-base focus:outline-none focus:border-2 focus:border-[#1b6b3a]"
              />
            </div>

            {/* Prep Method Segmented Filter */}
            <div
              role="group"
              aria-label="Preparation method filter"
              className="lg:col-span-6 flex flex-wrap items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setPrepFilter('all')}
                className={`min-h-[48px] px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                  prepFilter === 'all'
                    ? 'bg-[#1b6b3a] text-[#ffffff]'
                    : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
                }`}
              >
                All Prep Types
              </button>
              <button
                type="button"
                onClick={() => setPrepFilter('no-cook')}
                className={`min-h-[48px] px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                  prepFilter === 'no-cook'
                    ? 'bg-[#1b6b3a] text-[#ffffff]'
                    : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
                }`}
              >
                {t.rations.noCookFilter}
              </button>
              <button
                type="button"
                onClick={() => setPrepFilter('boiling-water')}
                className={`min-h-[48px] px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                  prepFilter === 'boiling-water'
                    ? 'bg-[#1b6b3a] text-[#ffffff]'
                    : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
                }`}
              >
                {t.rations.boilWaterFilter}
              </button>
            </div>
          </div>

          {/* Dietary Requirement Filter Buttons */}
          <div
            role="group"
            aria-label="Dietary classification filter"
            className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#1b6b3a]/10"
          >
            <button
              type="button"
              onClick={() => setSelectedDiet('all')}
              className={`min-h-[40px] px-3.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                selectedDiet === 'all'
                  ? 'bg-[#1b6b3a] text-[#ffffff]'
                  : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
              }`}
            >
              {t.rations.allDiets}
            </button>
            {DIET_OPTIONS.map((diet) => {
              const active = selectedDiet === diet;
              return (
                <button
                  key={diet}
                  type="button"
                  onClick={() => setSelectedDiet(diet)}
                  className={`min-h-[40px] px-3.5 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#1b6b3a] text-[#ffffff]'
                      : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
                  }`}
                >
                  {diet}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ration Cards Grid */}
      {filteredPacks.length === 0 ? (
        <div className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-10 text-center space-y-4">
          <p className="text-base font-semibold text-[#404940]">{t.rations.noRationMatches}</p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedDiet('all');
              setPrepFilter('all');
              onClearHubFilter();
            }}
            className="min-h-[48px] px-5 rounded-xl bg-[#e8f5e9] border border-[#1b6b3a]/25 text-[#1b6b3a] font-semibold text-sm inline-flex items-center gap-2 hover:bg-[#dae5db] cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reset Filters</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPacks.map((pack) => (
            <article
              key={pack.id}
              className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#f1fcf1] border-b border-[#1b6b3a]/10">
                  <ResilientImage
                    src={pack.image}
                    alt={pack.name}
                    fallbackLabel={pack.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 space-y-3.5">
                  {/* Unboxed typographic metadata */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-[#404940]">
                    <span className="font-mono text-[#005127]">{pack.code}</span>
                    <span aria-hidden="true">·</span>
                    <span className={pack.status === 'In Stock' ? 'text-[#006e1c]' : 'text-[#703700]'}>
                      {pack.status}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{pack.dietaryTags.join(' / ')}</span>
                  </div>

                  <h2 className="text-lg leading-[24px] font-bold text-[#141e17]">
                    {pack.name}
                  </h2>

                  <p className="text-sm text-[#404940] leading-relaxed">{pack.subtitle}</p>

                  {/* Tabular Nutritional Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#1b6b3a]/10 text-sm">
                    <div>
                      <p className="text-xs text-[#404940]">Total Energy</p>
                      <p className="font-bold text-[#141e17] tabular-nums">
                        {pack.kcal.toLocaleString()} kcal
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#404940]">Protein</p>
                      <p className="font-bold text-[#141e17] tabular-nums">
                        {pack.proteinGrams} g
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#404940]">Servings</p>
                      <p className="font-bold text-[#141e17] tabular-nums">
                        {pack.servings} meals
                      </p>
                    </div>
                  </div>

                  {/* Semantic Preparation & Allergen Advisories */}
                  <div className="space-y-2 pt-1">
                    {pack.prep === 'no-cook' ? (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e8f5e9] text-[#005127] text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>No-Cook Ready (0L prep water)</span>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e67e22]/12 text-[#703700] text-xs font-bold">
                        <Flame className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Requires {pack.waterRequiredLiters}L Boiled Water</span>
                      </div>
                    )}

                    {pack.allergenNotice && (
                      <div
                        className={`flex items-start gap-2 px-3 py-2 rounded-lg text-xs font-bold ${
                          pack.allergenNotice.severity === 'critical'
                            ? 'bg-[#d32f2f]/12 text-[#ba1a1a]'
                            : 'bg-[#e67e22]/12 text-[#703700]'
                        }`}
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{pack.allergenNotice.text}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveRation(pack)}
                  className="w-full min-h-[48px] px-4 rounded-xl bg-[#1b6b3a] hover:bg-[#005127] text-[#ffffff] font-semibold text-sm cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50"
                >
                  {t.rations.viewPrepGuide}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Level-2 Elevated Ration Detail Modal */}
      {activeRation && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ration-modal-title"
          className="fixed inset-0 z-50 bg-[#141e17]/60 flex items-center justify-center p-4"
        >
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/15 shadow-nutri-modal p-6 md:p-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1b6b3a]/12">
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#006e1c]">
                  {activeRation.code} · {activeRation.dietaryTags.join(' · ')}
                </p>
                <h2
                  id="ration-modal-title"
                  className="text-xl md:text-2xl font-bold text-[#141e17]"
                >
                  {activeRation.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveRation(null)}
                aria-label={t.rations.closeDetail}
                className="min-h-[48px] min-w-[48px] rounded-xl border border-[#212b24]/20 flex items-center justify-center text-[#212b24] hover:bg-[#e8f5e9] cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Per-Serving Nutrition Matrix */}
            <div>
              <h3 className="text-sm font-bold text-[#141e17] mb-3">
                Per-Serving Nutrition ({activeRation.servings} servings per pack)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 bg-[#f1fcf1] p-4 rounded-xl border border-[#1b6b3a]/10">
                <div>
                  <p className="text-xs text-[#404940]">Energy</p>
                  <p className="font-bold text-sm text-[#141e17] tabular-nums">
                    {activeRation.nutritionPerServing.energy}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#404940]">Protein</p>
                  <p className="font-bold text-sm text-[#141e17] tabular-nums">
                    {activeRation.nutritionPerServing.protein}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#404940]">Carbs</p>
                  <p className="font-bold text-sm text-[#141e17] tabular-nums">
                    {activeRation.nutritionPerServing.carbs}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#404940]">Fat</p>
                  <p className="font-bold text-sm text-[#141e17] tabular-nums">
                    {activeRation.nutritionPerServing.fat}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#404940]">Sodium</p>
                  <p className="font-bold text-sm text-[#141e17] tabular-nums">
                    {activeRation.nutritionPerServing.sodium}
                  </p>
                </div>
              </div>
            </div>

            {/* Contents */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-[#141e17]">Included Items</h3>
              <ul className="space-y-1.5 text-sm text-[#404940] list-disc ps-5">
                {activeRation.contents.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Safe Preparation Steps */}
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold text-[#141e17]">{t.rations.prepStepsTitle}</h3>
              <ol className="space-y-2 text-sm text-[#212b24]">
                {activeRation.prepSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#e8f5e9] text-[#005127] font-bold text-xs flex items-center justify-center shrink-0 tabular-nums">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Stocked Hubs */}
            <div className="space-y-2 pt-2 border-t border-[#1b6b3a]/12">
              <h3 className="text-sm font-bold text-[#141e17]">{t.rations.availableAtTitle}</h3>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-[#005127] font-semibold">
                {DISTRIBUTION_HUBS.filter((h) => h.stockedRationIds.includes(activeRation.id))
                  .map((h) => `${h.name} (${h.hoursToday})`)
                  .join(' · ')}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setActiveRation(null)}
                className="min-h-[48px] px-6 rounded-xl bg-[#1b6b3a] hover:bg-[#005127] text-[#ffffff] font-semibold text-sm cursor-pointer"
              >
                {t.rations.closeDetail}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
