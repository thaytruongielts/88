import React, { useState } from 'react';
import { BookOpen, Star, Clock, History, GraduationCap, Menu, X } from 'lucide-react';
import { TABS } from './constants';
import { TabId } from './types';
import Quiz from './components/Quiz';

const App: React.FC = () => {
  const [activeTabId, setActiveTabId] = useState<TabId>(TabId.UNIT1_USED_TO);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeTab = TABS.find(t => t.id === activeTabId) || TABS[0];

  const getIconForTab = (id: TabId) => {
    switch (id) {
      case TabId.UNIT1_USED_TO: return <History className="w-4 h-4" />;
      case TabId.UNIT1_PAST_CONT: return <Clock className="w-4 h-4" />;
      case TabId.UNIT1_VOCAB: return <Star className="w-4 h-4" />;
      case TabId.UNIT2_PRES_PERF: return <CheckCircleIcon />; // Defined below
      case TabId.UNIT2_VOCAB: return <GraduationCap className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  // Helper for custom icon
  const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-none">English 8</h1>
                <span className="text-xs text-gray-500 font-medium">Friends Plus Curriculum</span>
              </div>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-1">
               {TABS.map((tab) => (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTabId(tab.id)}
                   className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center gap-2
                     ${activeTabId === tab.id 
                       ? `${tab.color} text-white shadow-md` 
                       : 'text-gray-600 hover:bg-gray-100'
                     }`}
                 >
                   {getIconForTab(tab.id)}
                   {tab.label}
                 </button>
               ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-500 hover:text-gray-700 p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 pb-4">
            <div className="px-2 pt-2 space-y-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTabId(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium flex items-center gap-3
                    ${activeTabId === tab.id 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                   <div className={`${activeTabId === tab.id ? 'text-blue-600' : 'text-gray-400'}`}>
                      {getIconForTab(tab.id)}
                   </div>
                   <div>
                     <span className="block">{tab.label}</span>
                     <span className="text-xs text-gray-400 font-normal">{tab.unit}</span>
                   </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{activeTab.label}</h2>
          <p className="text-gray-500 mt-1">Practice exercises for {activeTab.unit}. Complete all 10 questions!</p>
        </div>

        <Quiz tabConfig={activeTab} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto py-6 px-4 text-center">
          <p className="text-sm text-gray-500">Based on Friends Plus Grade 8 Curriculum</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
