import {useState, useEffect} from 'react';
import {
  Droplets,
  Timer,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Baby,
  RotateCcw,
} from 'lucide-react';
import {
  IMAGES,
  WATER_DOSAGE_TABLE,
  FOOD_TRIAGE_ITEMS,
} from '../data/nutriData';
import type {TranslationStrings} from '../data/translations';
import {ResilientImage} from './ResilientImage';

interface SafetyGuideScreenProps {
  t: TranslationStrings;
}

export function SafetyGuideScreen({t}: SafetyGuideScreenProps) {
  const [selectedVolumeIdx, setSelectedVolumeIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number>(60);
  const [timerActive, setTimerActive] = useState(false);
  const [timerCompleted, setTimerCompleted] = useState(false);

  const selectedDosage = WATER_DOSAGE_TABLE[selectedVolumeIdx];

  useEffect(() => {
    if (!timerActive) return;
    const interval = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerActive(false);
          setTimerCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [timerActive]);

  const handleStartTimer = () => {
    if (secondsLeft === 0) {
      setSecondsLeft(60);
    }
    setTimerCompleted(false);
    setTimerActive(true);
  };

  const handleResetTimer = () => {
    setTimerActive(false);
    setTimerCompleted(false);
    setSecondsLeft(60);
  };

  return (
    <div className="space-y-10">
      {/* Intro Split */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div className="lg:col-span-7 bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 md:p-8 flex flex-col justify-center space-y-4">
          <p className="text-xs font-bold tracking-[0.04em] text-[#006e1c]">
            Life-Safety Nutritional Guidance
          </p>
          <h1 className="text-2xl md:text-[32px] md:leading-[40px] font-bold tracking-[-0.015em] text-[#141e17]">
            {t.safety.heading}
          </h1>
          <p className="text-base text-[#404940] leading-relaxed max-w-2xl">
            {t.safety.subheading}
          </p>
        </div>

        <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-[#1b6b3a]/12 shadow-nutri-card bg-[#ffffff] min-h-[220px]">
          <ResilientImage
            src={IMAGES.safeWater}
            alt="Clean stainless boiling pot, clear glass carafe of purified water, and measuring spoons on a sunlit counter"
            fallbackLabel="Safe Water Purification"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Emergency Water Disinfection + Interactive Boil Timer */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl md:text-2xl font-bold text-[#141e17] flex items-center gap-2.5">
              <Droplets className="w-6 h-6 text-[#1b6b3a]" aria-hidden="true" />
              <span>{t.safety.waterTitle}</span>
            </h2>
            <p className="text-sm text-[#404940]">{t.safety.waterVolumeLabel}</p>
          </div>

          {/* Volume Selector Buttons */}
          <div className="flex flex-wrap gap-2" role="group" aria-label={t.safety.waterVolumeLabel}>
            {WATER_DOSAGE_TABLE.map((vol, idx) => {
              const active = idx === selectedVolumeIdx;
              return (
                <button
                  key={vol.volumeLabel}
                  type="button"
                  onClick={() => setSelectedVolumeIdx(idx)}
                  className={`min-h-[48px] px-4 rounded-xl text-sm font-semibold tabular-nums cursor-pointer transition-colors ${
                    active
                      ? 'bg-[#1b6b3a] text-[#ffffff]'
                      : 'bg-[#e8f5e9] text-[#1b6b3a] hover:bg-[#dae5db]'
                  }`}
                >
                  {vol.volumeLabel}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Method 1: Boiling + Working Countdown Timer */}
          <div className="p-5 rounded-xl bg-[#f1fcf1] border border-[#1b6b3a]/12 space-y-4">
            <h3 className="text-base font-bold text-[#141e17]">
              1. {t.safety.boilProtocolTitle}
            </h3>
            <ul className="space-y-2 text-sm text-[#212b24]">
              <li>
                <strong>Standard elevation:</strong> {selectedDosage.boilSeaLevel}
              </li>
              <li>
                <strong>High elevation:</strong> {selectedDosage.boilHighAlt}
              </li>
              <li>
                Allow water to cool naturally in a clean covered pot before drinking or washing produce.
              </li>
            </ul>

            <div className="pt-3 border-t border-[#1b6b3a]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Timer className="w-5 h-5 text-[#1b6b3a]" aria-hidden="true" />
                <span className="font-mono text-2xl font-bold text-[#005127] tabular-nums">
                  00:{String(secondsLeft).padStart(2, '0')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStartTimer}
                  disabled={timerActive}
                  className="min-h-[48px] px-4 rounded-xl bg-[#1b6b3a] hover:bg-[#005127] disabled:opacity-50 text-[#ffffff] text-sm font-semibold cursor-pointer"
                >
                  {timerActive ? t.safety.timerRunning : t.safety.startTimer}
                </button>
                <button
                  type="button"
                  onClick={handleResetTimer}
                  aria-label={t.safety.resetTimer}
                  className="min-h-[48px] min-w-[48px] rounded-xl bg-[#ffffff] border border-[#1b6b3a]/25 text-[#1b6b3a] flex items-center justify-center hover:bg-[#e8f5e9] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {timerCompleted && (
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#005127] bg-[#e8f5e9] px-3 py-2 rounded-lg">
                <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{t.safety.timerDone}</span>
              </p>
            )}
          </div>

          {/* Method 2: Chlorine Disinfection */}
          <div className="p-5 rounded-xl bg-[#f1fcf1] border border-[#1b6b3a]/12 space-y-4">
            <h3 className="text-base font-bold text-[#141e17]">
              2. {t.safety.bleachProtocolTitle}
            </h3>
            <div className="space-y-2.5 text-sm text-[#212b24]">
              <p>
                <strong>Clear water ({selectedDosage.volumeLabel}):</strong>{' '}
                <span className="font-bold text-[#005127] tabular-nums">
                  {selectedDosage.bleachClearDrops}
                </span>
              </p>
              <p>
                <strong>Cloudy water ({selectedDosage.volumeLabel}):</strong>{' '}
                <span className="font-bold text-[#703700] tabular-nums">
                  {selectedDosage.bleachCloudyDrops}
                </span>
              </p>
              <p>
                Stir thoroughly and let stand covered for{' '}
                <strong className="tabular-nums">{selectedDosage.waitMinutes} minutes</strong>{' '}
                before drinking. Water should carry a faint chlorine scent.
              </p>
            </div>
            <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-[#d32f2f]/10 text-[#ba1a1a] text-xs font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                Never use scented, color-safe, or splashless bleach. Use only plain 5%–6% sodium hypochlorite.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Food Spoilage & Power Outage Triage */}
      <section className="space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-[#141e17]">
          {t.safety.triageTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FOOD_TRIAGE_ITEMS.map((item) => {
            const badgeStyle =
              item.verdict === 'safe'
                ? 'bg-[#e8f5e9] text-[#005127]'
                : item.verdict === 'cook-now'
                  ? 'bg-[#e67e22]/15 text-[#703700]'
                  : 'bg-[#d32f2f]/12 text-[#ba1a1a]';

            const Icon =
              item.verdict === 'safe'
                ? CheckCircle2
                : item.verdict === 'cook-now'
                  ? AlertTriangle
                  : XCircle;

            return (
              <article
                key={item.id}
                className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#404940]">{item.category}</span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${badgeStyle}`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{item.verdictLabel}</span>
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#141e17]">{item.scenario}</h3>
                <p className="text-sm text-[#404940] leading-relaxed">{item.guidance}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Infant Feeding & Oral Rehydration Safety */}
      <section className="bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/12 shadow-nutri-card p-6 md:p-8 space-y-4">
        <h2 className="text-xl font-bold text-[#141e17] flex items-center gap-2.5">
          <Baby className="w-6 h-6 text-[#1b6b3a]" aria-hidden="true" />
          <span>{t.safety.infantTitle}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-[#005127]">
              Ready-to-Feed Infant Formula
            </h3>
            <p className="text-sm text-[#404940] leading-relaxed">
              Always request sterile Ready-to-Feed liquid bottles (Pack NR-03) during boil-water advisories. Never dilute concentrated or powdered formula with untreated tap water.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-[#005127]">
              Bottle Sanitation Without Power
            </h3>
            <p className="text-sm text-[#404940] leading-relaxed">
              Use single-use disposable nipples when available, or wash feeding cups in boiled water and dish soap before air-drying on a clean towel.
            </p>
          </div>
          <div className="space-y-1.5">
            <h3 className="text-sm font-bold text-[#005127]">
              Oral Rehydration Salts (ORS)
            </h3>
            <p className="text-sm text-[#404940] leading-relaxed">
              Mix 1 WHO ORS packet into exactly 1 liter of boiled-and-cooled or bottled safe water. Use within 24 hours; discard unused solution after one day.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
