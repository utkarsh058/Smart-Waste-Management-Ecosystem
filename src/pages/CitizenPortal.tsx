import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, CheckCircle2, Award, AlertCircle, Image, MapPin, Gift } from 'lucide-react';
import { Complaint } from '../types';
import { Language, translations } from '../utils/i18n';

interface CitizenPortalProps {
  complaints: Complaint[];
  lang: Language;
  onAddComplaint: (c: Complaint) => void;
  onUpvoteComplaint: (id: string) => void;
}

export const CitizenPortal: React.FC<CitizenPortalProps> = ({
  complaints,
  lang,
  onAddComplaint,
  onUpvoteComplaint
}) => {
  const t = translations[lang];

  const [citizenName, setCitizenName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState('Ward 1 - Connaught Place');
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState<Complaint['issueType']>('Overflowing Bin');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenName || !description) return;

    const newComplaint: Complaint = {
      id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
      citizenName,
      phone: phone || '+91 98000 00000',
      ward,
      location: location || 'Public Park / Street',
      issueType,
      description,
      status: 'Pending',
      timestamp: 'Just now',
      upvotes: 1
    };

    onAddComplaint(newComplaint);
    setSubmitted(true);
    setTimeout(() => {
      setCitizenName('');
      setDescription('');
      setLocation('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-700" />
            <span>{t.citizenPortal} (नागरिक शिकायत एवं इको-टोकन पोर्टल)</span>
          </h2>
          <p className="text-xs text-slate-500">Report overflowing bins & redeem Eco-Tokens for municipal service discounts</p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold font-mono flex items-center gap-1.5">
          <Gift className="w-4 h-4 text-amber-700" />
          <span>Eco-Token Exchange: 10 Tokens = ₹10 Municipal Cashback</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submit Complaint Form */}
        <div className="lg:col-span-1 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <Send className="w-4 h-4 text-emerald-700" />
            <span>शिकायत दर्ज करें (Report Waste Issue)</span>
          </h3>

          {submitted ? (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Grievance registered! Municipal Sanitation Team notified.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-700 font-bold">आपका नाम (Your Name)</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="उदा. रमेश कुमार"
                  required
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-medium transition"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold">वार्ड का नाम (Ward Location)</label>
                <select
                  value={ward}
                  onChange={(e) => setWard(e.target.value)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-medium transition"
                >
                  <option>Ward 1 - Connaught Place</option>
                  <option>Ward 2 - Chandni Chowk</option>
                  <option>Ward 3 - Lajpat Nagar</option>
                  <option>Ward 4 - DLF Cyber City</option>
                  <option>Ward 5 - Hauz Khas</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold">समस्या की श्रेणी (Issue Category)</label>
                <select
                  value={issueType}
                  onChange={(e) => setIssueType(e.target.value as any)}
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-medium transition"
                >
                  <option>Overflowing Bin (बिन भर जाना)</option>
                  <option>Foul Odor (दुर्गंध)</option>
                  <option>Missed Collection (गाड़ी न आना)</option>
                  <option>Damaged Bin (क्षतिग्रस्त बिन)</option>
                  <option>Illegal Dumping (अवैध कचरा)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold">विवरण (Description)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="कचरा समस्या का विवरण दर्ज करें..."
                  required
                  className="w-full mt-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 focus:outline-none focus:border-emerald-600 font-medium transition"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" />
                <span>कमांड सेंटर को भेजें (Submit Grievance)</span>
              </button>
            </form>
          )}
        </div>

        {/* Public Grievance Feed */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-extrabold text-slate-900">नागरिक शिकायत सूची एवं वोट (Public Grievance Feed)</h3>

          <div className="space-y-3">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 hover:border-slate-300 transition"
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-emerald-800 font-extrabold">{c.id}</span>
                    <span className="font-extrabold text-slate-900">{c.citizenName}</span>
                    <span className="text-[11px] text-slate-500 font-medium">• {c.ward}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    c.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : c.status === 'In Progress'
                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    {c.status}
                  </span>
                </div>

                <p className="text-xs text-slate-800 leading-relaxed font-medium">{c.description}</p>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[11px] text-slate-500 font-mono font-bold">{c.timestamp}</span>
                  <button
                    onClick={() => onUpvoteComplaint(c.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 transition font-bold active:scale-95 shadow-sm"
                  >
                    <ThumbsUp className="w-4 h-4 text-emerald-700" />
                    <span>समर्थन करें Upvote ({c.upvotes})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
