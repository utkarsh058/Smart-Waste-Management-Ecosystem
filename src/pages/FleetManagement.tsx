import React from 'react';
import { FleetTruck } from '../types';
import { Language, translations } from '../utils/i18n';
import { Truck, Fuel, Navigation, User, Phone, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

interface FleetManagementProps {
  trucks: FleetTruck[];
  lang: Language;
}

export const FleetManagement: React.FC<FleetManagementProps> = ({ trucks, lang }) => {
  const t = translations[lang];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <Truck className="w-5 h-5 text-emerald-700" />
            <span>{t.fleetManagement} (कचरा गाड़ी बेड़ा प्रबंधन)</span>
          </h2>
          <p className="text-xs text-slate-500">Municipal Garbage Trucks, GPS Telemetry & Load Status</p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 border border-blue-200 font-extrabold font-mono">
            सक्रिय गाड़ियाँ (Active Vehicles): {trucks.length}
          </span>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trucks.map((truck) => (
          <div
            key={truck.id}
            className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-emerald-700 to-blue-700 text-white font-bold shadow-sm">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-mono text-emerald-700 font-extrabold text-xs">{truck.id}</div>
                    <div className="font-extrabold text-slate-900 text-sm">{truck.plateNumber}</div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  truck.status === 'Collecting'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : truck.status === 'In-Transit'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-slate-100 text-slate-600 border border-slate-200'
                }`}>
                  {truck.status}
                </span>
              </div>

              {/* Driver Details */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 font-medium">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-bold">
                    <User className="w-3.5 h-3.5 text-emerald-700" /> चालक का नाम (Driver)
                  </div>
                  <div className="font-bold text-slate-900">{truck.driverName}</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-500 uppercase flex items-center gap-1 font-bold">
                    <Phone className="w-3.5 h-3.5 text-blue-700" /> फोन नंबर (Phone)
                  </div>
                  <div className="font-mono text-slate-800 font-bold">{truck.driverPhone}</div>
                </div>
              </div>

              {/* Payload & Fuel Gauges */}
              <div className="space-y-3 pt-1">
                {/* Payload Capacity */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600">कुल कचरा भार (Payload Load):</span>
                    <span className="font-mono font-extrabold text-slate-900">
                      {truck.currentPayloadTons} / {truck.capacityTons} Tons
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{ width: `${(truck.currentPayloadTons / truck.capacityTons) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Fuel Level */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-600 flex items-center gap-1">
                      <Fuel className="w-3.5 h-3.5 text-blue-700" /> ईंधन स्तर (Fuel Level):
                    </span>
                    <span className="font-mono font-extrabold text-blue-700">{truck.fuelPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${truck.fuelPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* GPS Status Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
              <span className="flex items-center gap-1.5 font-bold text-emerald-800">
                <Navigation className="w-3.5 h-3.5" />
                {truck.speedKmH} km/h GPS Speed
              </span>
              <span className="text-slate-500 font-bold">
                Lat: {truck.currentLat.toFixed(4)}, Lng: {truck.currentLng.toFixed(4)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
