import React, { useState } from 'react';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowRight,
  Database,
  Building,
  MapPin,
} from 'lucide-react';
import { User, UserRole } from '../types';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  initialRole?: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  initialRole = 'student',
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [collegeOrCompany, setCollegeOrCompany] = useState('');
  const [city, setCity] = useState('Noida / Lucknow');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // Preset Test Users
  const testAccounts = {
    student: {
      email: 'student@skillsprint.ai',
      password: 'Student@2026',
      name: 'Aarav Sharma',
      role: 'student' as UserRole,
      badge: 'Student Marketer (Lucknow Café Case Study)',
      xp: 620,
    },
    admin: {
      email: 'admin@skillsprint.ai',
      password: 'Admin@2026',
      name: 'Prof. Neha Verma',
      role: 'admin' as UserRole,
      badge: 'AI Day Jury & Faculty Evaluator',
      xp: 2500,
    },
  };

  const handleQuickLogin = (role: UserRole) => {
    setSelectedRole(role);
    const acc = testAccounts[role];
    setEmail(acc.email);
    setPassword(acc.password);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
            role: selectedRole,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Login failed. Please check credentials.');
        }

        setSuccessMessage(`Welcome, ${data.user.name}! Logging you into the ${data.user.role} workspace...`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 600);
      } else {
        // Register
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
            role: selectedRole,
            collegeOrCompany: collegeOrCompany.trim(),
            city: city.trim(),
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Registration failed.');
        }

        setSuccessMessage(`Account created! Welcome to SkillSprint AI, ${data.user.name}.`);
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 600);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div
        id="login-panel-modal"
        className="relative w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-8"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-white p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Sparkles className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 tracking-tight font-display">
                  SkillSprint <span className="text-amber-600">AI</span> Auth Portal
                </h2>
                <p className="text-xs text-slate-500">
                  PostgreSQL &amp; Supabase Connected Authentication
                </p>
              </div>
            </div>
            <button
              id="btn-close-login-modal"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Switcher Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              type="button"
              id="tab-role-student"
              onClick={() => {
                setSelectedRole('student');
                handleQuickLogin('student');
              }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'student'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student / Marketer</span>
            </button>

            <button
              type="button"
              id="tab-role-admin"
              onClick={() => {
                setSelectedRole('admin');
                handleQuickLogin('admin');
              }}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                selectedRole === 'admin'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Admin / Faculty</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Quick-Fill Test Account Card */}
          <div className="rounded-xl p-3.5 bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Verified Test Credentials ({selectedRole.toUpperCase()})
              </span>
              <button
                type="button"
                id={`btn-autofill-${selectedRole}`}
                onClick={() => handleQuickLogin(selectedRole)}
                className="text-[11px] font-bold text-amber-700 hover:underline"
              >
                Auto-fill form
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded-lg p-2 border border-amber-200">
                <span className="text-slate-500 text-[10px] block font-medium">Username / Email</span>
                <span className="font-mono text-slate-900 font-bold select-all">
                  {testAccounts[selectedRole].email}
                </span>
              </div>
              <div className="bg-white rounded-lg p-2 border border-amber-200">
                <span className="text-slate-500 text-[10px] block font-medium">Password</span>
                <span className="font-mono text-amber-800 font-bold select-all">
                  {testAccounts[selectedRole].password}
                </span>
              </div>
            </div>
            <p className="text-[10px] text-slate-600 mt-2 font-medium">
              👤 {testAccounts[selectedRole].name} • {testAccounts[selectedRole].badge}
            </p>
          </div>

          {/* Tab Selection: Sign In vs Sign Up */}
          <div className="flex border-b border-slate-200">
            <button
              type="button"
              id="subtab-login"
              onClick={() => setActiveTab('login')}
              className={`pb-2.5 text-xs font-bold transition-all border-b-2 mr-6 ${
                activeTab === 'login'
                  ? 'border-amber-500 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In to {selectedRole === 'admin' ? 'Admin Portal' : 'Student Learning'}
            </button>
            <button
              type="button"
              id="subtab-register"
              onClick={() => setActiveTab('register')}
              className={`pb-2.5 text-xs font-bold transition-all border-b-2 ${
                activeTab === 'register'
                  ? 'border-amber-500 text-amber-800'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Create New Account
            </button>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-start space-x-2.5 text-xs text-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start space-x-2.5 text-xs text-emerald-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {activeTab === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      id="input-register-name"
                      required
                      placeholder="e.g. Priya Sundaram"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      College / Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Amity Noida"
                        value={collegeOrCompany}
                        onChange={(e) => setCollegeOrCompany(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      City
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Noida / Lucknow"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address or Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  id="input-login-email"
                  required
                  placeholder={
                    selectedRole === 'student'
                      ? 'student@skillsprint.ai'
                      : 'admin@skillsprint.ai'
                  }
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">Password</label>
                {activeTab === 'login' && (
                  <button
                    type="button"
                    onClick={() => setPassword(testAccounts[selectedRole].password)}
                    className="text-[10px] text-amber-700 hover:underline font-bold"
                  >
                    Insert default password
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="input-login-password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 rounded-xl border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-amber-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-submit-auth"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 rounded-xl font-bold text-xs text-slate-950 bg-amber-500 hover:bg-amber-600 transition-all shadow-sm disabled:opacity-60 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>
                {isLoading
                  ? 'Authenticating...'
                  : activeTab === 'login'
                  ? `Log In as ${selectedRole === 'admin' ? 'Admin' : 'Student'}`
                  : 'Complete Registration'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Database & Supabase connection badge */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              Database: PostgreSQL / Supabase Compatible
            </span>
            <span className="text-emerald-700 font-bold">● Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
};
