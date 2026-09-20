import React, { useState, useEffect } from 'react';
import {
  X,
  Database,
  Table,
  Terminal,
  Code2,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Layers,
  ChevronRight,
  Play,
  Server,
  UploadCloud,
  Radio,
  KeyRound,
  ShieldCheck,
} from 'lucide-react';
import { SupabaseTableMeta, SqlQueryResult, SupabaseConnectionStatus } from '../types';

interface SupabaseStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseStudioModal: React.FC<SupabaseStudioModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'tables' | 'sql' | 'schema' | 'config'>('tables');
  const [tables, setTables] = useState<SupabaseTableMeta[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>('users');
  const [tableRows, setTableRows] = useState<any[]>([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // SQL Runner state
  const [sqlInput, setSqlInput] = useState<string>(
    'SELECT id, name, email, role, xp, streak_days FROM users ORDER BY xp DESC;'
  );
  const [sqlResult, setSqlResult] = useState<SqlQueryResult | null>(null);
  const [sqlExecuting, setSqlExecuting] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);

  // Connection & Supabase sync state
  const [connectionStatus, setConnectionStatus] = useState<SupabaseConnectionStatus | null>(null);
  const [isTestingConn, setIsTestingConn] = useState(false);
  const [isSyncingData, setIsSyncingData] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<{ success: boolean; message: string } | null>(null);

  // Fetch tables metadata
  const fetchTableMeta = async () => {
    try {
      const res = await fetch('/api/database/tables');
      if (res.ok) {
        const data = await res.json();
        setTables(data.tables || []);
      }
    } catch (e) {
      console.error('Failed to fetch database tables:', e);
    }
  };

  // Fetch connection status
  const fetchConnectionStatus = async () => {
    try {
      const res = await fetch('/api/database/status');
      if (res.ok) {
        const data = await res.json();
        setConnectionStatus(data);
      }
    } catch (e) {
      console.error('Failed to check database status:', e);
    }
  };

  // Test connection trigger
  const handleTestConnection = async () => {
    setIsTestingConn(true);
    setSyncFeedback(null);
    try {
      const res = await fetch('/api/database/test-connection', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setConnectionStatus(data);
      }
    } catch (e) {
      console.error('Connection test failed:', e);
    } finally {
      setIsTestingConn(false);
    }
  };

  // Sync data to Supabase
  const handleSyncToSupabase = async () => {
    setIsSyncingData(true);
    setSyncFeedback(null);
    try {
      const res = await fetch('/api/database/sync-to-supabase', { method: 'POST' });
      const data = await res.json();
      setSyncFeedback({
        success: data.success,
        message: data.message + (data.seededCounts ? ` (Synced: ${Object.entries(data.seededCounts).map(([k, v]) => `${v} ${k}`).join(', ')})` : ''),
      });
      // Refresh tables
      fetchTableMeta();
      fetchTableRows(selectedTable);
      handleTestConnection();
    } catch (e: any) {
      setSyncFeedback({
        success: false,
        message: e?.message || 'Failed to sync to Supabase database.',
      });
    } finally {
      setIsSyncingData(false);
    }
  };

  // Fetch rows for selected table
  const fetchTableRows = async (tableName: string) => {
    setTableLoading(true);
    try {
      const res = await fetch(`/api/database/table/${tableName}`);
      if (res.ok) {
        const data = await res.json();
        setTableRows(data.rows || []);
      }
    } catch (e) {
      console.error(`Failed to fetch rows for ${tableName}:`, e);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchTableMeta();
      fetchTableRows(selectedTable);
      fetchConnectionStatus();
    }
  }, [isOpen]);

  const handleSelectTable = (tblName: string) => {
    setSelectedTable(tblName);
    fetchTableRows(tblName);
  };

  const handleRunSql = async (queryToRun?: string) => {
    const query = queryToRun || sqlInput;
    setSqlExecuting(true);
    try {
      const res = await fetch('/api/database/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql: query }),
      });
      const data: SqlQueryResult = await res.json();
      setSqlResult(data);
    } catch (e: any) {
      setSqlResult({
        query,
        columns: ['error'],
        rows: [{ error: e?.message || 'Network error executing SQL' }],
        rowCount: 0,
        executionTimeMs: 0,
        error: e?.message,
      });
    } finally {
      setSqlExecuting(false);
    }
  };

  const sampleSqlQueries = [
    {
      title: 'Top Students by XP',
      sql: 'SELECT id, name, email, role, xp, streak_days FROM users ORDER BY xp DESC;',
    },
    {
      title: 'High-Scoring Submissions (>70)',
      sql: 'SELECT user_id, assignment_id, version, overall_score, grade, created_at FROM submissions WHERE overall_score > 70 ORDER BY overall_score DESC;',
    },
    {
      title: 'Active Lessons in Lucknow Course',
      sql: "SELECT id, title, category, estimated_minutes FROM lessons WHERE course_id = 'crs_lucknow_cafe';",
    },
    {
      title: 'Simulated Campaign Telemetry',
      sql: 'SELECT id, scenario_title, impressions, clicks, conversions, roas, total_spend_inr FROM simulator_runs ORDER BY roas DESC;',
    },
  ];

  const postgresDDL = `-- SkillSprint AI: Complete Supabase PostgreSQL Schema & Bootstrap
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query

-- 1. Users Table
CREATE TABLE IF NOT EXISTS public.users (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(32) NOT NULL DEFAULT 'student',
  title VARCHAR(255),
  college_or_company VARCHAR(255),
  city VARCHAR(128),
  xp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
  id VARCHAR(64) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  business_location VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  difficulty VARCHAR(32) NOT NULL,
  total_lessons INTEGER DEFAULT 6,
  total_assignments INTEGER DEFAULT 4,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Lessons Table
CREATE TABLE IF NOT EXISTS public.lessons (
  id VARCHAR(64) PRIMARY KEY,
  course_id VARCHAR(64) REFERENCES public.courses(id) ON DELETE CASCADE,
  "order" INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(64) NOT NULL,
  estimated_minutes INTEGER NOT NULL,
  assignment_id VARCHAR(64)
);

-- 4. Assignments Table
CREATE TABLE IF NOT EXISTS public.assignments (
  id VARCHAR(64) PRIMARY KEY,
  lesson_id VARCHAR(64) NOT NULL,
  title VARCHAR(255) NOT NULL,
  client_brief TEXT NOT NULL,
  target_objective TEXT NOT NULL
);

-- 5. Submissions Table
CREATE TABLE IF NOT EXISTS public.submissions (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
  assignment_id VARCHAR(64) NOT NULL,
  version INTEGER DEFAULT 1,
  submitted_content TEXT,
  overall_score INTEGER,
  grade VARCHAR(16),
  strengths TEXT[],
  improvements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Simulator Runs Table
CREATE TABLE IF NOT EXISTS public.simulator_runs (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
  scenario_title VARCHAR(255) NOT NULL,
  impressions INTEGER NOT NULL,
  clicks INTEGER NOT NULL,
  conversions INTEGER NOT NULL,
  ctr_percent NUMERIC(5,2),
  cpl_inr NUMERIC(10,2),
  roas NUMERIC(6,2) NOT NULL,
  total_spend_inr INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id VARCHAR(64) PRIMARY KEY,
  user_id VARCHAR(64) REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  ai_score INTEGER,
  simulated_roas NUMERIC(6,2),
  share_token VARCHAR(64) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.simulator_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Permissive read policies for educational demo
CREATE POLICY "Allow public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Allow public read courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Allow public read lessons" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Allow public read assignments" ON public.assignments FOR SELECT USING (true);
CREATE POLICY "Allow public read submissions" ON public.submissions FOR SELECT USING (true);
CREATE POLICY "Allow public read simulator_runs" ON public.simulator_runs FOR SELECT USING (true);
CREATE POLICY "Allow public read portfolio_projects" ON public.portfolio_projects FOR SELECT USING (true);

-- Permissive insert/update policies for demo
CREATE POLICY "Allow public insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert submissions" ON public.submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert simulator_runs" ON public.simulator_runs FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert portfolio_projects" ON public.portfolio_projects FOR INSERT WITH CHECK (true);
`;

  if (!isOpen) return null;

  const filteredRows = tableRows.filter((row) => {
    if (!searchQuery.trim()) return true;
    return JSON.stringify(row).toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div
        id="supabase-studio-modal"
        className="relative w-full max-w-5xl rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Studio Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900 tracking-tight font-display">
                  Supabase &amp; PostgreSQL Database Studio
                </h3>
                {connectionStatus?.isConnected ? (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span>Supabase Cloud Connected</span>
                  </span>
                ) : connectionStatus?.isConfigured ? (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    <span>Configured (Pending Schema)</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-900 border border-blue-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    <span>Local PostgreSQL Engine (Ready)</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                Relational PostgreSQL schema, SQL query runner, and Supabase integration
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              id="btn-close-supabase-studio"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 px-6 bg-slate-50">
          <button
            id="subtab-tables"
            onClick={() => setActiveTab('tables')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'tables'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Table className="w-4 h-4 text-emerald-600" />
            <span>Table Editor ({tables.length})</span>
          </button>

          <button
            id="subtab-sql"
            onClick={() => {
              setActiveTab('sql');
              if (!sqlResult) handleRunSql();
            }}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'sql'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-600" />
            <span>SQL Query Runner</span>
          </button>

          <button
            id="subtab-schema"
            onClick={() => setActiveTab('schema')}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'schema'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Code2 className="w-4 h-4 text-emerald-600" />
            <span>Schema DDL</span>
          </button>

          <button
            id="subtab-config"
            onClick={() => {
              setActiveTab('config');
              fetchConnectionStatus();
            }}
            className={`flex items-center space-x-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'config'
                ? 'border-emerald-600 text-emerald-800'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Server className="w-4 h-4 text-emerald-600" />
            <span>Supabase Connection &amp; Setup</span>
          </button>
        </div>

        {/* Studio Content Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: TABLE EDITOR */}
          {activeTab === 'tables' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 min-h-[460px]">
              {/* Sidebar Tables List */}
              <div className="md:col-span-1 space-y-2 border-r border-slate-200 pr-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Tables
                  </span>
                  <button
                    onClick={() => {
                      fetchTableMeta();
                      fetchTableRows(selectedTable);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    title="Refresh Table List"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {tables.map((tbl) => (
                    <button
                      key={tbl.tableName}
                      id={`btn-select-table-${tbl.tableName}`}
                      onClick={() => handleSelectTable(tbl.tableName)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
                        selectedTable === tbl.tableName
                          ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                          : 'text-slate-700 hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <Table className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                        <span className="truncate">{tbl.tableName}</span>
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700 font-bold">
                        {tbl.rowCount}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Table Data View */}
              <div className="md:col-span-3 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center space-x-2 font-display">
                      <span>public.{selectedTable}</span>
                      <span className="text-xs font-normal text-slate-500">
                        ({tableRows.length} rows loaded)
                      </span>
                    </h4>
                    <p className="text-xs text-slate-500">
                      {tables.find((t) => t.tableName === selectedTable)?.description}
                    </p>
                  </div>

                  {/* Row Search */}
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter table rows..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-emerald-500 w-48 sm:w-64 font-medium"
                    />
                  </div>
                </div>

                {/* Table Grid */}
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  {tableLoading ? (
                    <div className="py-16 text-center text-slate-500 text-xs flex items-center justify-center space-x-2">
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
                      <span>Querying Supabase / PostgreSQL table...</span>
                    </div>
                  ) : filteredRows.length === 0 ? (
                    <div className="py-16 text-center text-slate-400 text-xs font-medium">
                      No records found matching criteria.
                    </div>
                  ) : (
                    <div className="overflow-x-auto max-h-[380px]">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                          <tr>
                            {Object.keys(filteredRows[0] || {}).map((col) => (
                              <th
                                key={col}
                                className="px-3 py-2 font-mono text-[11px] font-bold text-slate-600 whitespace-nowrap"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {filteredRows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              {Object.keys(row).map((col) => (
                                <td
                                  key={col}
                                  className="px-3 py-2 whitespace-nowrap text-slate-800 font-mono text-[11px] max-w-xs truncate"
                                  title={typeof row[col] === 'object' ? JSON.stringify(row[col]) : String(row[col])}
                                >
                                  {typeof row[col] === 'object'
                                    ? JSON.stringify(row[col])
                                    : String(row[col] ?? 'NULL')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SQL RUNNER */}
          {activeTab === 'sql' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">Interactive SQL Runner</h4>
                  <p className="text-xs text-slate-500">
                    Execute standard SQL queries against the active database engine.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    id="btn-execute-sql"
                    onClick={() => handleRunSql()}
                    disabled={sqlExecuting}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
                  >
                    {sqlExecuting ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>Run Query</span>
                  </button>
                </div>
              </div>

              {/* Sample Queries Quick Bar */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-slate-500 py-1 font-medium">Sample Queries:</span>
                {sampleSqlQueries.map((sq, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSqlInput(sq.sql);
                      handleRunSql(sq.sql);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] text-slate-700 font-medium border border-slate-200 transition-colors"
                  >
                    {sq.title}
                  </button>
                ))}
              </div>

              {/* SQL Textarea */}
              <div className="relative">
                <textarea
                  id="sql-editor-textarea"
                  value={sqlInput}
                  onChange={(e) => setSqlInput(e.target.value)}
                  rows={4}
                  className="w-full p-3 font-mono text-xs text-emerald-950 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-500 shadow-xs"
                  placeholder="SELECT * FROM users WHERE role = 'student';"
                />
              </div>

              {/* Query Results */}
              {sqlResult && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>
                      {sqlResult.error ? (
                        <span className="text-red-600 font-bold">Error executing query</span>
                      ) : (
                        <span className="text-emerald-700 font-bold">
                          {sqlResult.rowCount} rows returned in {sqlResult.executionTimeMs}ms
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded-xl overflow-hidden bg-white max-h-72 overflow-y-auto shadow-xs">
                    {sqlResult.error ? (
                      <div className="p-4 text-xs font-mono text-red-700 bg-red-50">
                        {sqlResult.error}
                      </div>
                    ) : (
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
                          <tr>
                            {sqlResult.columns.map((col) => (
                              <th
                                key={col}
                                className="px-3 py-2 font-mono text-[11px] font-bold text-slate-600"
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {sqlResult.rows.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              {sqlResult.columns.map((col) => (
                                <td
                                  key={col}
                                  className="px-3 py-2 whitespace-nowrap text-slate-800 font-mono text-[11px]"
                                >
                                  {String(row[col] ?? 'NULL')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SCHEMA DDL */}
          {activeTab === 'schema' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">PostgreSQL &amp; Supabase DDL</h4>
                  <p className="text-xs text-slate-500">
                    Execute this SQL directly in your Supabase SQL Editor to establish all tables &amp; RLS policies.
                  </p>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(postgresDDL);
                    setCopiedSchema(true);
                    setTimeout(() => setCopiedSchema(false), 2000);
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 border border-slate-300 transition-colors"
                >
                  {copiedSchema ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Schema SQL</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-emerald-300 overflow-x-auto max-h-96 leading-relaxed shadow-xs">
                <pre>{postgresDDL}</pre>
              </div>
            </div>
          )}

          {/* TAB 4: CONNECTION & SUPABASE CONFIG */}
          {activeTab === 'config' && (
            <div className="max-w-3xl space-y-6">
              {/* Connection Status Card */}
              <div
                className={`p-5 rounded-2xl border ${
                  connectionStatus?.isConnected
                    ? 'bg-emerald-50 border-emerald-200'
                    : connectionStatus?.isConfigured
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3.5">
                    {connectionStatus?.isConnected ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    ) : connectionStatus?.isConfigured ? (
                      <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    ) : (
                      <Database className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
                    )}

                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-bold text-slate-900 font-display">
                          {connectionStatus?.isConnected
                            ? 'Connected to Live Supabase Cloud Database'
                            : connectionStatus?.isConfigured
                            ? 'Supabase Configured (Pending Table Creation)'
                            : 'Operating with Local PostgreSQL Engine'}
                        </h4>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            connectionStatus?.isConnected
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {connectionStatus?.isConnected ? 'Cloud Active' : 'Local Ready'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {connectionStatus?.message ||
                          'Ready to bind your Supabase PostgreSQL project with full CRUD and schema synchronization.'}
                      </p>

                      {connectionStatus?.supabaseUrl && (
                        <p className="text-[11px] font-mono text-emerald-800 font-bold pt-1">
                          Target URL: {connectionStatus.supabaseUrl}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <button
                      id="btn-test-supabase-connection"
                      onClick={handleTestConnection}
                      disabled={isTestingConn}
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 transition-colors disabled:opacity-50 shadow-xs"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isTestingConn ? 'animate-spin text-emerald-600' : ''}`} />
                      <span>{isTestingConn ? 'Testing...' : 'Test Connection'}</span>
                    </button>

                    <button
                      id="btn-sync-to-supabase"
                      onClick={handleSyncToSupabase}
                      disabled={isSyncingData}
                      className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors disabled:opacity-50 shadow-xs cursor-pointer"
                    >
                      <UploadCloud className={`w-3.5 h-3.5 ${isSyncingData ? 'animate-bounce' : ''}`} />
                      <span>{isSyncingData ? 'Syncing...' : 'Sync Local Data'}</span>
                    </button>
                  </div>
                </div>

                {/* Sync Feedback Message */}
                {syncFeedback && (
                  <div
                    className={`mt-3 p-3 rounded-lg text-xs border ${
                      syncFeedback.success
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-medium'
                        : 'bg-red-100 border-red-300 text-red-900 font-medium'
                    }`}
                  >
                    {syncFeedback.message}
                  </div>
                )}
              </div>

              {/* Supabase Environment Variables Guide */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <KeyRound className="w-4 h-4 text-amber-600" />
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                      Supabase Environment Variables
                    </h4>
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono">Declared in .env.example</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Provide your Supabase project credentials in your environment variables. The server will automatically establish a live client connection using <code className="text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded font-mono font-bold">@supabase/supabase-js</code>:
                </p>

                <div className="font-mono text-xs p-4 bg-white rounded-xl border border-slate-200 text-slate-900 space-y-1.5 select-all shadow-xs">
                  <div className="flex items-center justify-between text-slate-400 text-[10px] border-b border-slate-100 pb-1 mb-1 font-sans">
                    <span>Variable Name</span>
                    <span>Description</span>
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold">SUPABASE_URL</span>=
                    <span className="text-slate-500">https://your-project-id.supabase.co</span>
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold">SUPABASE_ANON_KEY</span>=
                    <span className="text-slate-500">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</span>
                  </div>
                  <div>
                    <span className="text-slate-400"># Optional service role key for elevated bypass:</span>
                  </div>
                  <div>
                    <span className="text-slate-900 font-bold">SUPABASE_SERVICE_ROLE_KEY</span>=
                    <span className="text-slate-500">your-service-role-key</span>
                  </div>
                </div>
              </div>

              {/* Step-by-Step Connection Instructions */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display">
                    How to Connect in 3 Simple Steps
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                      1
                    </div>
                    <p className="font-bold text-slate-900">Create Supabase Project</p>
                    <p className="text-slate-600 text-[11px]">
                      Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-bold">supabase.com</a> and create a free project.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                      2
                    </div>
                    <p className="font-bold text-slate-900">Run Schema DDL</p>
                    <p className="text-slate-600 text-[11px]">
                      Open the <strong className="text-slate-800">Schema DDL</strong> tab above, copy the SQL, and run it in Supabase SQL Editor.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1 shadow-xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">
                      3
                    </div>
                    <p className="font-bold text-slate-900">Add URL &amp; Anon Key</p>
                    <p className="text-slate-600 text-[11px]">
                      Set <strong className="text-slate-800">SUPABASE_URL</strong> and <strong className="text-slate-800">SUPABASE_ANON_KEY</strong>, then click &quot;Test Connection&quot;.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
