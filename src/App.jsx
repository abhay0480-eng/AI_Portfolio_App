import React, { useState } from 'react';
import PORTFOLIO_DATA from './data/portfolioData';
import Navbar from './components/sections/Navbar';
import StatsSection from './components/sections/StatsSection';
import ExperienceSection from './components/sections/ExperienceSection';
import ProjectsSection from './components/sections/ProjectsSection';
import InfoHeroSection from './components/sections/InfoHeroSection';
import SkillsSection from './components/sections/SkillsSection';
import PhilosophySection from './components/sections/PhilosophySection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/sections/Footer';

const WORK_SECTIONS = [
  { id: 'activity', label: 'Activity' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
];

const WorkNav = () => {
  return (
    <div className="pt-20 pb-4">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {WORK_SECTIONS.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="shrink-0 px-4 py-2 text-sm font-bold text-toast-500 rounded-full border border-cream-200 bg-white hover:border-coral-400/40 hover:text-coral-500 transition-all"
            >
              {sec.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('work');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream-100 text-toast-800 font-sans selection:bg-cream-200 selection:text-toast-900">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .tab-content { animation: fadeIn 0.4s ease-out; }
      `}} />

      <Navbar activeTab={activeTab} onTabChange={handleTabChange} />

      <main>
        {activeTab === 'work' ? (
          <div key="work" className="tab-content">
            <WorkNav />
            <StatsSection data={PORTFOLIO_DATA.stats} />
            <ExperienceSection data={PORTFOLIO_DATA.experience} />
            <ProjectsSection data={PORTFOLIO_DATA.projects} />
          </div>
        ) : (
          <div key="info" className="tab-content">
            <div className="max-w-7xl mx-auto px-6 pt-24 pb-8">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                <div className="w-full lg:w-auto lg:sticky lg:top-24 shrink-0">
                  <InfoHeroSection personal={PORTFOLIO_DATA.personal} contact={PORTFOLIO_DATA.contact} experience={PORTFOLIO_DATA.experience} />
                </div>
                <div className="flex-1 min-w-0">
                  <SkillsSection
                    data={PORTFOLIO_DATA.skills}
                    experience={PORTFOLIO_DATA.experience}
                    projects={PORTFOLIO_DATA.projects}
                  />
                </div>
              </div>
            </div>
            <PhilosophySection data={PORTFOLIO_DATA.philosophy} />
            <ContactSection data={PORTFOLIO_DATA.contact} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}