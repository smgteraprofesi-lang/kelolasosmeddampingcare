import { useState } from 'react';
import { Users, CalendarRange, Clock, FileText, LogOut } from 'lucide-react';
import Sidebar, { PageKey, NavItem } from '@/components/Sidebar';
import BottomNav from '@/components/BottomNav';
import TimPage from '@/pages/TimPage';
import PlannerPage from '@/pages/PlannerPage';
import SchedulePage from '@/pages/SchedulePage';
import CaptionPage from '@/pages/CaptionPage';
import AuthPage from '@/pages/AuthPage';
import { AuthProvider, useAuth } from '@/lib/auth';
import LoadingSpinner from '@/components/LoadingSpinner';

const NAV_ITEMS: NavItem[] = [
  { key: 'tim', label: 'Daftar Tim', icon: Users },
  { key: 'planner', label: 'Content Planner', icon: CalendarRange },
  { key: 'schedule', label: 'Content Schedule', icon: Clock },
  { key: 'caption', label: 'Bank Caption', icon: FileText },
];

function AppContent() {
  const { user, loading, signOut } = useAuth();
  const [active, setActive] = useState<PageKey>('tim');

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner message="Memuat..." />
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar items={NAV_ITEMS} active={active} onNavigate={setActive} />

      <div className="md:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-6">
          <h1 className="text-base font-bold text-gray-900 md:text-lg">
            Kelola Sosmed Dampingcare
          </h1>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-500 truncate max-w-[180px]">
              {user.email}
            </span>
            <button
              onClick={signOut}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>
        </header>

        <main className="px-4 py-5 pb-24 md:px-6 md:pb-6">
          {active === 'tim' && <TimPage />}
          {active === 'planner' && <PlannerPage />}
          {active === 'schedule' && <SchedulePage />}
          {active === 'caption' && <CaptionPage />}
        </main>
      </div>

      <BottomNav items={NAV_ITEMS} active={active} onNavigate={setActive} />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
