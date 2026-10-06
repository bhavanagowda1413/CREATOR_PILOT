import React, { useState, useEffect } from 'react';
import { Sidebar, PageId } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { GrowthCycleModal } from './components/GrowthCycleModal';

import { DashboardPage } from './pages/DashboardPage';
import { StrategyPage } from './pages/StrategyPage';
import { StudioPage } from './pages/StudioPage';
import { CalendarPage } from './pages/CalendarPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { LearningPage } from './pages/LearningPage';
import { AutomationPage } from './pages/AutomationPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';

import { api, CreatorProfile, ContentItem, Recommendation, LearningInsight, AnalyticsSummary } from './services/api';

export function App() {
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [isCycleModalOpen, setIsCycleModalOpen] = useState<boolean>(false);

  // Data states
  const [creator, setCreator] = useState<CreatorProfile | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [learnings, setLearnings] = useState<LearningInsight[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  // System states
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      // Check backend health
      try {
        const health = await api.getHealth();
        setIsDemoMode(Boolean(health.demoMode));
      } catch (e) {
        setIsDemoMode(true);
      }

      const [cData, cntData, recData, lrnData, anaData] = await Promise.all([
        api.getCreator().catch(() => null),
        api.getContent().catch(() => []),
        api.getRecommendations().catch(() => []),
        api.getLearnings().catch(() => []),
        api.getAnalytics().catch(() => null)
      ]);

      if (cData) setCreator(cData);
      if (cntData) setContent(cntData);
      if (recData) setRecommendations(recData);
      if (lrnData) setLearnings(lrnData);
      if (anaData) setAnalytics(anaData);
    } catch (err) {
      console.warn('Backend server not connected yet. Running frontend with fallback state.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetDemo = async () => {
    setIsLoading(true);
    try {
      await api.resetDemo();
      await fetchInitialData();
    } catch (err) {
      console.error('Reset demo error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateNewRecommendation = async () => {
    setIsLoading(true);
    try {
      await api.generateRecommendation();
      await fetchInitialData();
    } catch (err) {
      console.error('Generate error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#0b0f19] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onRunCycle={() => setIsCycleModalOpen(true)}
        isDemoMode={isDemoMode}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        <TopBar
          creator={creator}
          onRunCycle={() => setIsCycleModalOpen(true)}
          onResetDemo={handleResetDemo}
          isDemoMode={isDemoMode}
          isLoading={isLoading}
        />

        <main className="flex-1 pb-16">
          {activePage === 'dashboard' && (
            <DashboardPage
              creator={creator}
              recommendations={recommendations}
              content={content}
              analytics={analytics}
              setActivePage={setActivePage}
              onRunCycle={() => setIsCycleModalOpen(true)}
            />
          )}

          {activePage === 'strategy' && (
            <StrategyPage
              creator={creator}
              recommendations={recommendations}
              onGenerateNew={handleGenerateNewRecommendation}
              setActivePage={setActivePage}
              isLoading={isLoading}
            />
          )}

          {activePage === 'studio' && (
            <StudioPage
              creator={creator}
              setActivePage={setActivePage}
              onContentSaved={fetchInitialData}
            />
          )}

          {activePage === 'calendar' && (
            <CalendarPage
              content={content}
              onContentUpdated={fetchInitialData}
              setActivePage={setActivePage}
            />
          )}

          {activePage === 'analytics' && (
            <AnalyticsPage analytics={analytics} />
          )}

          {activePage === 'learning' && (
            <LearningPage
              learnings={learnings}
              onTriggerLearning={handleGenerateNewRecommendation}
              isLoading={isLoading}
            />
          )}

          {activePage === 'automation' && <AutomationPage />}

          {activePage === 'profile' && (
            <ProfilePage
              creator={creator}
              onProfileUpdated={fetchInitialData}
            />
          )}

          {activePage === 'settings' && (
            <SettingsPage
              isDemoMode={isDemoMode}
              onResetDemo={handleResetDemo}
              onRunCycle={() => setIsCycleModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Hackathon 12-step Growth Cycle Modal */}
      <GrowthCycleModal
        isOpen={isCycleModalOpen}
        onClose={() => setIsCycleModalOpen(false)}
        onCycleComplete={fetchInitialData}
      />
    </div>
  );
}

export default App;
