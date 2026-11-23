import {X, Printer, Download, ShieldCheck, Droplets, MapPin} from 'lucide-react';
import {DISTRIBUTION_HUBS, WATER_DOSAGE_TABLE} from '../data/nutriData';

interface OfflineCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OfflineCardModal({isOpen, onClose}: OfflineCardModalProps) {
  if (!isOpen) return null;

  const openHubs = DISTRIBUTION_HUBS.filter((h) => h.isOpenNow);

  const handleDownloadTxt = () => {
    const lines = [
      'NUTRIREADY — EMERGENCY NUTRITION & SAFE WATER REFERENCE CARD',
      '============================================================',
      'HUMANITARIAN GUARANTEE:',
      '- Emergency food is never conditional on registration.',
      '- No names. No personal data.',
      '',
      'OPEN DISTRIBUTION HUBS:',
      ...openHubs.map(
        (h) =>
          `* ${h.name} (${h.district}) — ${h.hoursToday}\n  Address: ${h.address}\n  Transit: ${h.transitNote}`
      ),
      '',
      'SAFE WATER PURIFICATION QUICK RATIO:',
      ...WATER_DOSAGE_TABLE.map(
        (w) =>
          `* ${w.volumeLabel}: Boil ${w.boilSeaLevel} | OR unscented bleach (5-6%): ${w.bleachClearDrops} (clear water), wait 30 min.`
      ),
      '',
      'INFANT SAFETY:',
      '* Use Ready-to-Feed sterile liquid formula whenever boil-water advisories are active.',
      '* Discard unrefrigerated mixed formula after 2 hours.',
    ];

    const blob = new Blob([lines.join('\n')], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'NutriReady-Emergency-Card.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="offline-modal-title"
      className="fixed inset-0 z-50 bg-[#141e17]/60 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#ffffff] rounded-2xl border border-[#1b6b3a]/15 shadow-nutri-modal p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#1b6b3a]/12">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#e8f5e9] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#1b6b3a]" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="offline-modal-title"
                className="text-xl font-bold text-[#141e17]"
              >
                Offline Emergency Nutrition Card
              </h2>
              <p className="text-sm text-[#404940]">
                Save or print this summary for zero-connectivity access.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close offline card modal"
            className="min-h-[48px] min-w-[48px] rounded-xl border border-[#212b24]/20 flex items-center justify-center text-[#212b24] hover:bg-[#e8f5e9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-5 space-y-6">
          <div className="rounded-xl bg-[#1b6b3a] text-[#ffffff] p-4 space-y-1">
            <p className="font-bold text-[15px]">
              Emergency food is never conditional on registration.
            </p>
            <p className="text-sm text-[#a5f4b6] font-semibold">
              No names. No personal data. Walk-up service for all households.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#141e17] flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#1b6b3a]" aria-hidden="true" />
              <span>Open Community Distribution Hubs ({openHubs.length})</span>
            </h3>
            <div className="divide-y divide-[#1b6b3a]/10 border border-[#1b6b3a]/12 rounded-xl overflow-hidden">
              {openHubs.map((hub) => (
                <div key={hub.id} className="p-3.5 bg-[#f1fcf1]/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <p className="font-semibold text-sm text-[#141e17]">{hub.name}</p>
                    <p className="text-xs text-[#404940]">{hub.address}</p>
                  </div>
                  <div className="text-xs font-mono font-semibold text-[#005127] tabular-nums shrink-0">
                    {hub.hoursToday}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#141e17] flex items-center gap-2 mb-3">
              <Droplets className="w-4 h-4 text-[#1b6b3a]" aria-hidden="true" />
              <span>Water Disinfection Quick Reference</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {WATER_DOSAGE_TABLE.map((row) => (
                <div
                  key={row.volumeLabel}
                  className="p-3.5 rounded-xl bg-[#ffffff] border border-[#1b6b3a]/12"
                >
                  <p className="font-bold text-sm text-[#1b6b3a] tabular-nums">
                    {row.volumeLabel}
                  </p>
                  <p className="text-xs text-[#404940] mt-1">{row.boilSeaLevel}</p>
                  <p className="text-xs font-semibold text-[#212b24] mt-1 tabular-nums">
                    Bleach: {row.bleachClearDrops}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="no-print pt-4 border-t border-[#1b6b3a]/12 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="min-h-[52px] px-6 rounded-xl bg-[#e8f5e9] border border-[#1b6b3a]/25 text-[#1b6b3a] font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#dae5db] cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            <span>Download Offline .txt</span>
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="min-h-[52px] px-6 rounded-xl bg-[#1b6b3a] hover:bg-[#005127] text-[#ffffff] font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#4caf50]/50"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>Print Card</span>
          </button>
        </div>
      </div>
    </div>
  );
}
