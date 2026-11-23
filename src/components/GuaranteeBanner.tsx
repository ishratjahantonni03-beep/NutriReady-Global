import {ShieldCheck, Download} from 'lucide-react';
import type {TranslationStrings} from '../data/translations';

interface GuaranteeBannerProps {
  t: TranslationStrings;
  onOpenOfflineCard: () => void;
}

export function GuaranteeBanner({t, onOpenOfflineCard}: GuaranteeBannerProps) {
  return (
    <section
      aria-label="Humanitarian Privacy Guarantee"
      className="no-print w-full bg-[#1b6b3a] text-[#ffffff] border-b border-[#005127]"
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl bg-[#005127] flex items-center justify-center shrink-0 border border-[#4caf50]/35"
            aria-hidden="true"
          >
            <ShieldCheck className="w-5 h-5 text-[#4caf50]" />
          </div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-x-4 gap-y-0.5 text-[15px] leading-[22px] font-bold tracking-[-0.005em]">
            <span>{t.guarantee.commitmentPrimary}</span>
            <span className="hidden sm:inline text-[#9ae9ab]" aria-hidden="true">
              ·
            </span>
            <span className="text-[#a5f4b6]">{t.guarantee.commitmentSecondary}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenOfflineCard}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-[#005127] hover:bg-[#143d23] text-[#ffffff] text-sm font-semibold border border-[#4caf50]/45 flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/60"
        >
          <Download className="w-4 h-4 text-[#8ad89c]" aria-hidden="true" />
          <span>{t.guarantee.offlineAction}</span>
        </button>
      </div>
    </section>
  );
}
