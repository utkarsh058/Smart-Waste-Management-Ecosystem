import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SmartBin, FleetTruck } from '../types';
import { Language, translations } from '../utils/i18n';
import { MapPin, Truck, RefreshCw, Zap, Navigation, ShieldCheck, Info } from 'lucide-react';

interface LiveMapProps {
  bins: SmartBin[];
  trucks: FleetTruck[];
  lang: Language;
  onDispatchTruck: (binId: string) => void;
}

export const LiveMap: React.FC<LiveMapProps> = ({
  bins,
  trucks,
  lang,
  onDispatchTruck
}) => {
  const t = translations[lang];
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);

  const [selectedBin, setSelectedBin] = useState<SmartBin | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'critical' | 'trucks'>('all');

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Center on Delhi NCR
      const map = L.map(mapContainerRef.current, {
        center: [28.6139, 77.2090],
        zoom: 12,
        zoomControl: false
      });

      // Light mode tiles (CartoDB Voyager)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        maxZoom: 19
      }).addTo(map);

      L.control.zoom({ position: 'topright' }).addTo(map);

      mapInstanceRef.current = map;
      markersRef.current = L.layerGroup().addTo(map);
    }

    const map = mapInstanceRef.current;
    const markersGroup = markersRef.current;
    if (!map || !markersGroup) return;

    markersGroup.clearLayers();

    // Render Bins
    if (filterMode === 'all' || filterMode === 'critical') {
      const displayBins = filterMode === 'critical' ? bins.filter(b => b.fillLevel >= 85) : bins;

      displayBins.forEach((bin) => {
        const color = bin.fillLevel >= 85 ? '#dc2626' : bin.fillLevel >= 70 ? '#d97706' : '#16a34a';

        const customIcon = L.divIcon({
          className: 'custom-bin-marker',
          html: `
            <div style="
              background-color: ${color};
              width: 32px;
              height: 32px;
              border-radius: 50%;
              border: 2px solid #ffffff;
              box-shadow: 0 4px 10px rgba(0,0,0,0.2);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 11px;
            ">
              ${bin.fillLevel}%
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });

        const marker = L.marker([bin.lat, bin.lng], { icon: customIcon });

        marker.on('click', () => {
          setSelectedBin(bin);
        });

        marker.addTo(markersGroup);
      });
    }

    // Render Fleet Trucks
    if (filterMode === 'all' || filterMode === 'trucks') {
      trucks.forEach((trk) => {
        const truckIcon = L.divIcon({
          className: 'custom-truck-marker',
          html: `
            <div style="
              background: linear-gradient(135deg, #1d4ed8, #0284c7);
              width: 36px;
              height: 36px;
              border-radius: 8px;
              border: 2px solid #ffffff;
              box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
            ">
              🚚
            </div>
          `,
          iconSize: [36, 36],
          iconAnchor: [18, 18]
        });

        const marker = L.marker([trk.currentLat, trk.currentLng], { icon: truckIcon });
        marker.bindPopup(`
          <div class="text-xs space-y-1">
            <div class="font-bold text-blue-700 font-mono">${trk.id}</div>
            <div class="font-semibold text-slate-900">${trk.driverName}</div>
            <div class="text-slate-600">Payload: ${trk.currentPayloadTons} / ${trk.capacityTons} Tons</div>
            <div class="text-slate-600">Fuel: ${trk.fuelPercentage}%</div>
          </div>
        `);
        marker.addTo(markersGroup);
      });
    }

    // Draw TSP Route Line for critical bins
    if (routeLayerRef.current) {
      map.removeLayer(routeLayerRef.current);
    }

    const criticalCoords: [number, number][] = bins
      .filter(b => b.fillLevel >= 85)
      .map(b => [b.lat, b.lng]);

    if (criticalCoords.length > 0 && trucks[0]) {
      const fullPath: [number, number][] = [
        [trucks[0].currentLat, trucks[0].currentLng],
        ...criticalCoords
      ];
      routeLayerRef.current = L.polyline(fullPath, {
        color: '#16a34a',
        weight: 4,
        dashArray: '8, 8',
        opacity: 0.9
      }).addTo(map);
    }

  }, [bins, trucks, filterMode]);

  return (
    <div className="space-y-4 h-[calc(100vh-110px)] flex flex-col">
      {/* Top Map Controls Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-slate-900">लाइव जीआईएस मानचित्र (Live GIS Map)</h2>
            <p className="text-xs text-slate-500">Real-time GPS Tracking & Smart Bin Fill Coordinates</p>
          </div>
        </div>

        {/* Filter Toggle Buttons */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterMode === 'all' ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            सभी (All Bins & Fleet)
          </button>
          <button
            onClick={() => setFilterMode('critical')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterMode === 'critical' ? 'bg-rose-600 text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            गंभीर बिन (&gt;85%)
          </button>
          <button
            onClick={() => setFilterMode('trucks')}
            className={`px-3 py-1 rounded-lg font-bold transition ${
              filterMode === 'trucks' ? 'bg-blue-700 text-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            कचरा गाड़ियाँ (Fleet)
          </button>
        </div>
      </div>

      {/* Map Container & Drawer */}
      <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-200 shadow-md">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Selected Bin Detail Floating Drawer */}
        {selectedBin && (
          <div className="absolute top-4 right-4 z-20 w-80 p-4 rounded-2xl bg-white/95 border border-slate-200 backdrop-blur-md shadow-xl space-y-3 animate-fade-in text-xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div>
                <span className="font-mono text-emerald-700 font-extrabold text-[11px]">{selectedBin.id}</span>
                <h4 className="font-extrabold text-slate-900 text-sm">{selectedBin.name}</h4>
              </div>
              <button
                onClick={() => setSelectedBin(null)}
                className="text-slate-400 hover:text-slate-700 text-base font-bold px-1.5"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-slate-700 font-medium">
                <span>स्थान (Ward Location):</span>
                <span className="font-bold text-slate-900">{selectedBin.ward}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 font-medium">
                <span>भरने की स्थिति (Fill Level):</span>
                <span className={`font-bold font-mono text-sm ${selectedBin.fillLevel >= 85 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {selectedBin.fillLevel}%
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-700 font-medium">
                <span>सेंसर दूरी (Ultrasonic):</span>
                <span className="font-mono text-blue-700 font-bold">{selectedBin.distanceCm} cm</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 font-medium">
                <span>नमी स्तर (Moisture):</span>
                <span className="font-mono text-amber-700 font-bold">{selectedBin.moistureAnalog} / 1024</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <button
                onClick={() => onDispatchTruck(selectedBin.id)}
                className="w-full py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition shadow-sm active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Truck className="w-4 h-4" />
                <span>{selectedBin.assignedTruckId ? 'Truck Dispatched' : 'कचरा गाड़ी भेजें (Dispatch Truck)'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
