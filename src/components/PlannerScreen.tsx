import {useState, useMemo} from 'react';
import {
  Minus,
  Plus,
  ShieldCheck,
  Download,
  Printer,
  Check,
  Droplets,
  Flame,
} from 'lucide-react';
import type {TranslationStrings} from '../data/translations';

interface PlannerScreenProps {
  t: TranslationStrings;
}

type DietPreference = 'standard' | 'halal' | 'kosher' | 'vegan' | 'allergen-free';

export function PlannerScreen({t}: PlannerScreenProps) {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);
  const [pregnant, setPregnant] = useState(0);

  const [dietPref, setDietPref] = useState<DietPreference>('standard');
  const [canBoilWater, setCanBoilWater] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const calculation = useMemo(() => {
    const dailyKcal =
      adults * 2100 + children * 1400 + infants * 750 + pregnant * 2450;
    const total72hKcal = dailyKcal * 3;

    // WHO emergency baseline: ~3L/day drinking per adult/teen, 2L/day child, plus hygiene/prep water
    const dailyDrinkingLiters =
      adults * 3 + children * 2 + infants * 1 + pregnant * 3.5;
    const drinking72hLiters = Math.round(dailyDrinkingLiters * 3 * 10) / 10;

    const prepWater72hLiters = canBoilWater
      ? Math.round((adults + children + pregnant) * 1.5 * 3 * 10) / 10
      : Math.round((adults + children + pregnant) * 0.75 * 3 * 10) / 10;

    const noCookPacksNeeded = Math.max(
      1,
      Math.ceil((total72hKcal - infants * 750 * 3) / 2200)
    );
    const warmKitsNeeded = canBoilWater
      ? Math.max(1, Math.floor((adults + children + pregnant) / 2))
      : 0;
    const adjustedNoCook = canBoilWater
      ? Math.max(1, noCookPacksNeeded - warmKitsNeeded)
      : noCookPacksNeeded;

    const infantPacksNeeded = infants > 0 ? infants * 2 : 0;

    const recommendations: {id: string; title: string; count: number; detail: string}[] = [
      {
        id: 'rec-nocook',
        title:
          dietPref === 'kosher' || dietPref === 'allergen-free'
            ? 'Kosher Allergen-Free Dry Ration Box (NR-04)'
            : dietPref === 'vegan'
              ? 'Plant-Forward High-Protein Grain Box (NR-06)'
              : '24-Hour No-Cook Sustenance Pack (NR-01)',
        count: adjustedNoCook,
        detail: 'Ready to eat with zero cooking fuel required',
      },
    ];

    if (canBoilWater && warmKitsNeeded > 0) {
      recommendations.push({
        id: 'rec-warm',
        title: 'Halal Warm Lentil & Grain Family Kit (NR-02)',
        count: warmKitsNeeded,
        detail: 'Provides 6 warm servings per kit using boiled water',
      });
    }

    if (infantPacksNeeded > 0) {
      recommendations.push({
        id: 'rec-infant',
        title: 'Infant & Maternal Ready-Feed Pack (NR-03)',
        count: infantPacksNeeded,
        detail: 'Sterile ready-to-feed bottles; no water mixing needed',
      });
    }

    recommendations.push({
      id: 'rec-water',
      title: 'Sealed 5L Potable Water Containers',
      count: Math.ceil((drinking72hLiters + prepWater72hLiters) / 5),
      detail: `${(drinking72hLiters + prepWater72hLiters).toFixed(1)}L combined 72-hour reserve`,
    });

    return {
      total72hKcal,
      drinking72hLiters,
      prepWater72hLiters,
      recommendations,
    };
  }, [adults, children, infants, pregnant, dietPref, canBoilWater]);

  const toggleChecked = (id: string) => {
    setCheckedItems((prev) => ({...prev, [id]: !prev[id]}));
  };

  const handleDownloadChecklist = () => {
    const lines = [
      'NUTRIREADY — 72-HOUR HOUSEHOLD NUTRITION & WATER PLAN',
      'Calculated locally. No names or personal data recorded.',
      '=======================================================',
      `Household: ${adults} Adults/Teens, ${children} Children, ${infants} Infants, ${pregnant} Pregnant/Lactating`,
      `Diet Preference: ${dietPref} | Heat Access: ${canBoilWater ? 'Can boil water' : 'No-cook only'}`,
      '',
      `72-Hour Energy Estimate: ${calculation.total72hKcal.toLocaleString()} kcal`,
      `Drinking Water (72h): ${calculation.drinking72hLiters} Liters`,
      `Food & Hygiene Water (72h): ${calculation.prepWater72hLiters} Liters`,
      '',
      'RECOMMENDED PICKUP CHECKLIST:',
      ...calculation.recommendations.map(
        (rec) => `[ ] ${rec.count}x ${rec.title} — ${rec.detail}`
      ),
    ];

    const blob = new Blob([lines.join('\n')], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NutriReady-72h-Supply-Plan.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const steppers: {
    label: string;
    value: number;
    min: number;
    max: number;
    onChange: (n: number) => void;
  }[] = [
    {label: t.planner.adultsLabel, value: adults, min: 0, max: 12, onChange: setAdults},
    {label: t.planner.childrenLabel, value: children, min: 0, max: 12, onChange: setChildren},
    {label: t.planner.infantsLabel, value: infants, min: 0, max: 6, onChange: setInfants},
    {label: t.planner.pregnantLabel, value: pregnant, min: 0, max: 6, onChange: setPregnant},
  ];

  const dietChoices: {id: DietPreference; label: string}[] = [
    {id: 'standard', label: 'Standard / Any'},
    {id: 'halal', label: 'Halal'},
    {id: 'kosher', label: 'Kosher'},
    {id: 'vegan', label: 'Vegan'},
    {id: 'allergen-free', label: 'Top-9 Allergen-Free'},
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.015em] text-[#141e17]">
          {t.planner.heading}
        </h1>
        <p className="text-base text-[#404940] max-w-3xl">{t.planner.subheading}</p>
        <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#005127] pt-1">
          <ShieldCheck className="w-4 h-4 text-[#4caf50] shrink-0" aria-hidden="true" />
          <span>{t.planner.localNotice}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Household & Dietary Controls */}
        <section className="lg:col-span-6 bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 md:p-7 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-[#141e17]">{t.planner.householdTitle}</h2>
            <div className="divide-y divide-[#1b6b3a]/10">
              {steppers.map((item) => (
                <div
                  key={item.label}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <span className="text-base font-semibold text-[#212b24]">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label={`Decrease ${item.label}`}
                      disabled={item.value <= item.min}
                      onClick={() => item.onChange(Math.max(item.min, item.value - 1))}
                      className="w-12 h-12 rounded-xl border-[1.5px] border-[#1b6b3a]/25 bg-[#e8f5e9] text-[#1b6b3a] flex items-center justify-center hover:bg-[#dae5db] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-8 text-center text-lg font-extrabold text-[#141e17] tabular-nums">
                      {item.value}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${item.label}`}
                      disabled={item.value >= item.max}
                      onClick={() => item.onChange(Math.min(item.max, item.value + 1))}
                      className="w-12 h-12 rounded-xl border-[1.5px] border-[#1b6b3a]/25 bg-[#e8f5e9] text-[#1b6b3a] flex items-center justify-center hover:bg-[#dae5db] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-5 border-t border-[#1b6b3a]/12 space-y-4">
            <h2 className="text-lg font-bold text-[#141e17]">{t.planner.dietAndFuelTitle}</h2>

            <div className="flex flex-wrap gap-2" role="group" aria-label="Dietary preference">
              {dietChoices.map((choice) => {
                const active = dietPref === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => setDietPref(choice.id)}
                    className={`min-h-[44px] px-4 rounded-xl text-sm font-semibold cursor-pointer transition-colors ${
                      active
                        ? 'bg-[#1b6b3a] text-[#ffffff]'
                        : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <button
                type="button"
                onClick={() => setCanBoilWater(false)}
                className={`min-h-[52px] px-4 py-3 rounded-xl border-[1.5px] text-sm font-semibold text-start flex items-center gap-2.5 cursor-pointer transition-colors ${
                  !canBoilWater
                    ? 'bg-[#1b6b3a] border-[#1b6b3a] text-[#ffffff]'
                    : 'bg-[#ffffff] border-[#212b24]/25 text-[#212b24] hover:bg-[#f1fcf1]'
                }`}
              >
                <Droplets className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.planner.fuelNoHeat}</span>
              </button>

              <button
                type="button"
                onClick={() => setCanBoilWater(true)}
                className={`min-h-[52px] px-4 py-3 rounded-xl border-[1.5px] text-sm font-semibold text-start flex items-center gap-2.5 cursor-pointer transition-colors ${
                  canBoilWater
                    ? 'bg-[#1b6b3a] border-[#1b6b3a] text-[#ffffff]'
                    : 'bg-[#ffffff] border-[#212b24]/25 text-[#212b24] hover:bg-[#f1fcf1]'
                }`}
              >
                <Flame className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.planner.fuelCanBoil}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Right Column: Live 72-Hour Allocation Results */}
        <section className="lg:col-span-6 bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 md:p-7 space-y-6">
          <h2 className="text-lg font-bold text-[#141e17]">{t.planner.resultsTitle}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-5 border-b border-[#1b6b3a]/12">
            <div>
              <p className="text-xs font-semibold text-[#404940]">
                {t.planner.totalEnergyLabel}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#005127] tabular-nums">
                {calculation.total72hKcal.toLocaleString()}{' '}
                <span className="text-sm font-semibold">kcal</span>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#404940]">
                {t.planner.drinkingWaterLabel}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#005127] tabular-nums">
                {calculation.drinking72hLiters}{' '}
                <span className="text-sm font-semibold">Liters</span>
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#404940]">
                {t.planner.prepWaterLabel}
              </p>
              <p className="mt-1 text-2xl font-extrabold text-[#005127] tabular-nums">
                {calculation.prepWater72hLiters}{' '}
                <span className="text-sm font-semibold">Liters</span>
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-base font-bold text-[#141e17]">
              {t.planner.recommendedPacksTitle}
            </h3>
            <div className="divide-y divide-[#1b6b3a]/10 border border-[#1b6b3a]/12 rounded-xl overflow-hidden">
              {calculation.recommendations.map((rec) => {
                const isChecked = !!checkedItems[rec.id];
                return (
                  <button
                    key={rec.id}
                    type="button"
                    onClick={() => toggleChecked(rec.id)}
                    className="w-full min-h-[56px] p-4 bg-[#ffffff] hover:bg-[#f1fcf1] flex items-start gap-3.5 text-start cursor-pointer transition-colors"
                  >
                    <span
                      className={`w-6 h-6 mt-0.5 rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-[#1b6b3a] border-[#1b6b3a] text-[#ffffff]'
                          : 'bg-[#ffffff] border-[#212b24]/40'
                      }`}
                    >
                      {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                    </span>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-bold ${
                          isChecked ? 'line-through text-[#707a6f]' : 'text-[#141e17]'
                        }`}
                      >
                        <span className="tabular-nums text-[#005127]">{rec.count}×</span>{' '}
                        {rec.title}
                      </p>
                      <p className="text-xs text-[#404940] mt-0.5">{rec.detail}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="no-print flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleDownloadChecklist}
              className="flex-1 min-h-[52px] px-5 rounded-xl bg-[#1b6b3a] hover:bg-[#005127] text-[#ffffff] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>{t.planner.downloadChecklist}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="min-h-[52px] px-5 rounded-xl bg-[#e8f5e9] hover:bg-[#dae5db] border border-[#1b6b3a]/25 text-[#1b6b3a] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" aria-hidden="true" />
              <span>{t.planner.printPlan}</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
