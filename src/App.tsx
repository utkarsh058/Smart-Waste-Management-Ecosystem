import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabId } from './components/Sidebar';
import { NotificationModal } from './components/NotificationModal';

import { Language } from './utils/i18n';
import { 
  initialSmartBins, 
  initialFleetTrucks, 
  initialBlockchainReceipts, 
  initialCloudLogs, 
  initialComplaints, 
  initialNotifications, 
  initialStaff 
} from './services/mockData';

import { Dashboard } from './pages/Dashboard';
import { LiveMap } from './pages/LiveMap';
import { SmartBins } from './pages/SmartBins';
import { WasteSegregation } from './pages/WasteSegregation';
import { FleetManagement } from './pages/FleetManagement';
import { RouteOptimization } from './pages/RouteOptimization';
import { BlockchainLedger } from './pages/BlockchainLedger';
import { CloudApiConsole } from './pages/CloudApiConsole';
import { CitizenPortal } from './pages/CitizenPortal';
import { Analytics } from './pages/Analytics';
import { Diagnostics } from './pages/Diagnostics';
import { StaffRoster } from './pages/StaffRoster';
import { Settings } from './pages/Settings';
import { Complaint, SystemNotification } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');
  const [lang, setLang] = useState<Language>('en');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [bins, setBins] = useState(initialSmartBins);
  const [trucks, setTrucks] = useState(initialFleetTrucks);
  const [blockchainReceipts, setBlockchainReceipts] = useState(initialBlockchainReceipts);
  const [cloudLogs, setCloudLogs] = useState(initialCloudLogs);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [notifications, setNotifications] = useState<SystemNotification[]>(initialNotifications);
  const [staff] = useState(initialStaff);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleLanguageToggle = () => {
    setLang(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleRefreshData = () => {
    // Simulate updating IoT bin fill levels slightly
    setBins(prev => prev.map(bin => {
      const currentFill = bin.fillLevel ?? Math.max(bin.wetBinFillLevel, bin.dryBinFillLevel);
      const delta = Math.floor(Math.random() * 5) - 2;
      const newFill = Math.min(100, Math.max(10, currentFill + delta));
      return {
        ...bin,
        fillLevel: newFill,
        wetBinFillLevel: newFill,
        dryBinFillLevel: Math.max(10, newFill - 10),
        distanceCm: Math.max(8, Math.floor(100 - newFill)),
        status: newFill >= 85 ? 'Alert (≥85%)' : newFill >= 70 ? 'Warning' : 'Normal (<85%)'
      };
    }));
  };

  const handleDispatchTruck = (binId: string) => {
    setBins(prev => prev.map(bin => {
      if (bin.id === binId) {
        return { ...bin, assignedTruckId: 'TRK-DEL-01' };
      }
      return bin;
    }));

    const newNtf: SystemNotification = {
      id: `NTF-${Date.now()}`,
      title: `Emergency Dispatch Triggered for ${binId}`,
      message: `Truck TRK-DEL-01 assigned via TSP AI shortest path algorithm.`,
      timestamp: 'Just now',
      type: 'success',
      read: false
    };

    setNotifications(prev => [newNtf, ...prev]);
  };

  const handleResetBin = (binId: string) => {
    setBins(prev => prev.map(bin => {
      if (bin.id === binId) {
        return {
          ...bin,
          fillLevel: 15,
          wetBinFillLevel: 15,
          dryBinFillLevel: 15,
          distanceCm: 95,
          status: 'Normal (<85%)',
          assignedTruckId: undefined
        };
      }
      return bin;
    }));
  };

  const handleAddComplaint = (newC: Complaint) => {
    setComplaints(prev => [newC, ...prev]);
  };

  const handleUpvoteComplaint = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, upvotes: c.upvotes + 1 } : c));
  };

  const criticalBinCount = bins.filter(b => (b.fillLevel ?? Math.max(b.wetBinFillLevel, b.dryBinFillLevel)) >= 85).length;

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-100 text-slate-900 flex flex-col font-sans">
      {/* Fixed Top Header */}
      <Header
        lang={lang}
        onLanguageToggle={handleLanguageToggle}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        onRefreshData={handleRefreshData}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container below Header */}
      <div className="flex flex-1 overflow-hidden min-h-0 relative">
        {/* Fixed Left Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          lang={lang}
          criticalBinCount={criticalBinCount}
        />

        {/* Independent Scrollable Workspace */}
        <main className="flex-1 overflow-y-auto min-h-0 p-4 lg:p-6 w-full">
          <div className="max-w-7xl mx-auto space-y-6">
            {activeTab === 'dashboard' && (
              <Dashboard
                bins={bins}
                trucks={trucks}
                notifications={notifications}
                lang={lang}
                onDispatchTruck={handleDispatchTruck}
                onSelectTab={setActiveTab}
              />
            )}

            {activeTab === 'map' && (
              <LiveMap
                bins={bins}
                trucks={trucks}
                lang={lang}
                onDispatchTruck={handleDispatchTruck}
              />
            )}

            {activeTab === 'bins' && (
              <SmartBins
                bins={bins}
                lang={lang}
                onDispatchTruck={handleDispatchTruck}
                onResetBin={handleResetBin}
              />
            )}

            {activeTab === 'segregation' && (
              <WasteSegregation lang={lang} />
            )}

            {activeTab === 'fleet' && (
              <FleetManagement trucks={trucks} lang={lang} />
            )}

            {activeTab === 'route' && (
              <RouteOptimization bins={bins} lang={lang} />
            )}

            {activeTab === 'blockchain' && (
              <BlockchainLedger receipts={blockchainReceipts} lang={lang} />
            )}

            {activeTab === 'cloud' && (
              <CloudApiConsole logs={cloudLogs} lang={lang} />
            )}

            {activeTab === 'citizen' && (
              <CitizenPortal
                complaints={complaints}
                lang={lang}
                onAddComplaint={handleAddComplaint}
                onUpvoteComplaint={handleUpvoteComplaint}
              />
            )}

            {activeTab === 'analytics' && (
              <Analytics lang={lang} />
            )}

            {activeTab === 'diagnostics' && (
              <Diagnostics lang={lang} />
            )}

            {activeTab === 'staff' && (
              <StaffRoster staff={staff} lang={lang} />
            )}

            {activeTab === 'settings' && (
              <Settings lang={lang} />
            )}
          </div>
        </main>
      </div>

      {/* Notification Modal Drawer */}
      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
        onClearAll={() => setNotifications([])}
      />
    </div>
  );
}

export default App;
