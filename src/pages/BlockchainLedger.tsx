import React from 'react';
import { ShieldCheck, Hash, Layers, Award, ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { BlockchainReceipt } from '../types';
import { Language, translations } from '../utils/i18n';

interface BlockchainLedgerProps {
  receipts: BlockchainReceipt[];
  lang: Language;
}

export const BlockchainLedger: React.FC<BlockchainLedgerProps> = ({ receipts, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700" />
            <span>{t.blockchainLedger} (ब्लॉकचेन डिजिटल ऑडिट लेजर)</span>
          </h2>
          <p className="text-xs text-slate-500">
            Immutable Smart Contract Audit (`SolidWasteRecyclingAudit.sol`) & Citizen Eco-Token Rewards
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold">
            Block Height: #18,492,041
          </span>
        </div>
      </div>

      {/* Leaderboard & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-600 font-semibold">Total Verified Receipts</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{receipts.length} Blocks</div>
          <p className="text-[11px] text-slate-500 font-medium">100% Cryptographic Verification</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-600 font-semibold">Total Eco-Tokens Minted</span>
          <div className="text-2xl font-black text-emerald-700 font-mono">1,886 EcoTokens</div>
          <p className="text-[11px] text-slate-500 font-medium">Redeemable for Municipal Discounts (₹10 = 10 Tokens)</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
          <span className="text-xs text-slate-600 font-semibold">Smart Contract Address</span>
          <div className="text-xs font-mono text-blue-700 font-extrabold truncate">0x71C8A92B1049FA12</div>
          <p className="text-[11px] text-slate-500 font-medium">SolidWasteRecyclingAudit.sol</p>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">डिजिटल रसीद एवं ब्लॉकचेन ट्रांजैक्शन (Weight Receipts)</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3">Tx Hash & Block</th>
                <th className="p-3">Timestamp</th>
                <th className="p-3">Bin Source</th>
                <th className="p-3">Weight (Kg)</th>
                <th className="p-3">Waste Category</th>
                <th className="p-3">Citizen Address</th>
                <th className="p-3 text-right">Eco-Tokens</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {receipts.map((rcpt) => (
                <tr key={rcpt.hash} className="hover:bg-slate-50 transition">
                  <td className="p-3">
                    <div className="text-emerald-700 font-extrabold">{rcpt.hash}</div>
                    <div className="text-slate-500 text-[10px] font-bold">Block #{rcpt.blockNumber}</div>
                  </td>
                  <td className="p-3 text-slate-700 font-sans font-medium">{rcpt.timestamp}</td>
                  <td className="p-3 text-slate-900 font-bold">{rcpt.binId}</td>
                  <td className="p-3 font-extrabold text-slate-900">{rcpt.weightKg} kg</td>
                  <td className="p-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-sans font-bold border border-slate-200">
                      {rcpt.wasteType}
                    </span>
                  </td>
                  <td className="p-3 text-blue-700 font-bold">{rcpt.citizenAddress}</td>
                  <td className="p-3 text-right font-extrabold text-emerald-700">
                    +{rcpt.tokensEarned} Tokens
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
