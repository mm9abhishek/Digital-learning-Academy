import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  Flame,
  LayoutDashboard,
  BookOpen,
  PenTool,
  Sliders,
  FolderHeart,
  ShieldCheck,
  HelpCircle,
  FileCode2,
  ChevronDown,
  Database,
  LogIn,
  LogOut,
  UserCheck,
  Info,
  Search,
  Target,
  TrendingUp,
  Compass,
} from 'lucide-react';
import { User, UserRole } from '../types';

interface NavbarProps {
  currentUser: User | null;
  allUsers: User[];
  currentTab: string;
  onTabChange: (tab: string) => void;
  onSwitchUser: (userId: string) => void;
  onOpenJuryGuide: () => void;
  onOpenDeliverables: () => void;
  onOpenLogin: (role?: UserRole) => void;
  onOpenSupabaseStudio: () => void;
  onOpenAbout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  allUsers,
  currentTab,
  onTabChange,
  onSwitchUser,
  onOpenJuryGuide,
  onOpenDeliverables,
  onOpenLogin,
  onOpenSupabaseStudio,
  onOpenAbout,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const mainNavItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      category: 'Learn',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'lessons',
      label: 'Course & Lessons',
      category: 'Learn',
      icon: BookOpen,
      badge: null,
    },
    {
      id: 'assignments',
      label: 'AI Mentor Practice',
      category: 'Learn',
      icon: PenTool,
      badge: null,
    },
    {
      id: 'seo',
      label: 'SEO & Traffic Planner',
      category: 'Innovate',
      icon: Search,
      badge: 'New Tool',
    },
    {
      id: 'google-practice',
      label: 'Google Ads & GSC Sandbox',
      category: 'Practice',
      icon: Target,
      badge: 'Live Practice',
    },
    {
      id: 'simulator',
      label: 'Campaign Simulator',
      category: 'Practice',
      icon: Sliders,
      badge: null,
    },
    {
      id: 'portfolio',
      label: 'Portfolio Showcase',
      category: 'Showcase',
      icon: FolderHeart,
      badge: null,
    },
    ...(currentUser?.role === 'admin'
      ? [{ id: 'admin', label: 'Admin Hub', category: 'Admin', icon: ShieldCheck, badge: 'Admin' }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      {/* Top Banner for Instant Clarity */}
      <div className="bg-slate-900 text-white text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 text-slate-300">
            <span className="flex items-center gap-1 font-bold text-amber-400">
              <Sparkles className="w-3 h-3" />
              <span>SkillSprint AI Marketing Sandbox</span>
            </span>
            <span className="text-slate-500">|</span>
            <span>
              <strong>Learn:</strong> Performance Marketing • <strong>Practice:</strong> Google Ads &amp; GSC Simulators • <strong>Innovate:</strong> AI Traffic &amp; ROAS Predictor
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="text-slate-400">Case Client: <strong className="text-white">The Nawabi Bean Café (Lucknow)</strong></span>
            {onOpenAbout && (
              <button
                onClick={onOpenAbout}
                className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer text-[11px]"
              >
                What We Do &amp; Innovate Guide →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Tagline */}
          <div
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={() => onTabChange('dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 ring-1 ring-amber-400/40 shrink-0">
              <Sparkles className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight text-slate-900 font-display">
                  SkillSprint <span className="text-amber-600">AI</span>
                </span>
                <span className="hidden md:inline-flex text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-300">
                  Digital Sandbox
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block leading-tight">
                Learn, Practice &amp; Innovate Marketing
              </p>
            </div>
          </div>

          {/* Center Navigation Links (Clean & Scannable) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-amber-50 text-amber-950 border border-amber-300 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                        isActive
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-amber-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center space-x-2">
            {/* What We Do & Learn guide button */}
            {onOpenAbout && (
              <button
                id="btn-open-about-platform"
                onClick={onOpenAbout}
                className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-300 transition-colors shadow-xs"
                title="What We Do, Learn & Innovate - Platform Architecture Guide"
              >
                <Info className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden xl:inline">What We Do &amp; Learn</span>
              </button>
            )}

            {/* Supabase Database Studio Button */}
            <button
              id="btn-open-database-studio"
              onClick={onOpenSupabaseStudio}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition-colors shadow-xs"
              title="Inspect Supabase PostgreSQL Database & Run SQL Queries"
            >
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden xl:inline">Database Studio</span>
            </button>

            {/* Jury Demo Guide */}
            <button
              id="btn-open-jury-guide"
              onClick={onOpenJuryGuide}
              className="hidden 2xl:inline-flex items-center space-x-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Demo Walkthrough Guide"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Jury Demo</span>
            </button>

            {/* Student XP Badge */}
            {currentUser && (
              <div className="hidden sm:flex items-center space-x-1 text-xs px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                <Award className="w-3.5 h-3.5 text-amber-600" />
                <span>{currentUser.xp} XP</span>
              </div>
            )}

            {/* Login / Switch Persona Dropdown */}
            <button
              id="btn-open-login-panel"
              onClick={() => onOpenLogin()}
              className="inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-300 transition-colors"
              title="Login / Switch between Student and Admin"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden md:inline">Login</span>
            </button>

            {/* User Profile Avatar / Switcher */}
            {currentUser && (
              <div className="relative">
                <button
                  id="user-profile-menu-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-1.5 p-1 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-slate-200"
                  />
                  <div className="hidden xl:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser.name}</p>
                    <p className="text-[10px] text-amber-700 font-medium capitalize">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-3 h-3 text-slate-500" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-72 rounded-xl bg-white border border-slate-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[11px] text-slate-500 font-medium">Active Account</p>
                        <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                          {currentUser.role}
                        </span>
                      </div>
                      <p className="text-xs font-bold text-slate-900 mt-1">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{currentUser.email}</p>
                    </div>

                    <div className="py-1">
                      <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Instant Persona Switch
                      </span>
                      {allUsers.map((user) => (
                        <button
                          key={user.id}
                          id={`switch-user-${user.id}`}
                          onClick={() => {
                            onSwitchUser(user.id);
                            setShowUserMenu(false);
                          }}
                          className={`w-full flex items-center space-x-2.5 p-2 rounded-lg text-left text-xs transition-colors ${
                            user.id === currentUser.id
                              ? 'bg-amber-50 text-amber-900 border border-amber-200'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-7 h-7 rounded-md object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-slate-800 truncate">{user.name}</p>
                            <p className="text-[10px] text-slate-500 capitalize">{user.role} • {user.email}</p>
                          </div>
                          {user.id === currentUser.id && (
                            <UserCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="mt-1 pt-2 border-t border-slate-100 space-y-1">
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onOpenLogin();
                        }}
                        className="w-full flex items-center space-x-2 px-2.5 py-1.5 text-xs text-amber-700 hover:bg-amber-50 rounded-lg font-semibold"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Open Login / Register Modal</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onOpenSupabaseStudio();
                        }}
                        className="w-full flex items-center space-x-2 px-2.5 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50 rounded-lg font-semibold"
                      >
                        <Database className="w-3.5 h-3.5" />
                        <span>Launch Supabase SQL Studio</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile / Compact Secondary Navigation Bar */}
      <div className="lg:hidden flex overflow-x-auto py-2 px-3 space-x-1.5 border-t border-slate-200 bg-slate-50/70">
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-bold transition-all shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};

