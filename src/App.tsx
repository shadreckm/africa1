/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ShieldCheck, 
  Wallet, 
  Sprout, 
  Home, 
  Search, 
  Bell, 
  User, 
  UserCheck,
  Bug,
  Calendar,
  ShoppingCart,
  CheckCircle2,
  ArrowRight, 
  ChevronRight,
  TrendingUp,
  Plus,
  Zap,
  MessageSquare,
  Building2,
  PieChart,
  Award,
  Globe,
  Fingerprint,
  ScanFace,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  Filter,
  Sparkles,
  Menu,
  X,
  Network,
  Database,
  Brain,
  Activity,
  ShieldAlert,
  Cpu,
  Rocket,
  Target,
  Map,
  BarChart3,
  Send,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Logo, LogoIcon } from './components/Logo';
import { authService } from './services/authService';
import { walletService } from './services/walletService';
import { trustService } from './services/trustService';
import { lumozaAIService } from './services/lumozaService';

// --- Types ---
type ScreenId = 'login' | 'onboarding' | 'dashboard' | 'wallet' | 'profile' | 'opportunities' | 'lumoza' | 'lundai' | 'notifications' | 'architecture' | 'intelligence' | 'strategy' | 'brand' | 'behavioral' | 'kulimaverse' | 'deployment';

interface UserData {
  id: string;
  phone: string;
  wallet_balance: number;
  trust_score: number;
  transactions: any[];
}

interface ScreenProps {
  onNavigate: (id: ScreenId) => void;
  user: UserData | null;
  onRefreshUser: () => void;
}

// --- Shared Components ---

const GlassCard = ({ children, className = "", onClick, ...props }: { children: React.ReactNode, className?: string, onClick?: () => void } & React.HTMLAttributes<HTMLDivElement>) => (
  <div 
    onClick={onClick}
    className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl ${className} ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''}`}
    {...props}
  >
    {children}
  </div>
);

const IconButton = ({ icon: Icon, active, onClick }: { icon: any, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
  >
    <Icon className="w-6 h-6" />
  </button>
);

const SectionHeader = ({ title, action }: { title: string, action?: string }) => (
  <div className="flex justify-between items-end mb-6">
    <h3 className="text-xl font-medium tracking-tight text-white">{title}</h3>
    {action && <button className="text-xs uppercase tracking-widest text-blue-400 font-bold">{action}</button>}
  </div>
);

// --- Screens ---

const Onboarding = ({ onNavigate }: ScreenProps) => (
  <div className="h-full flex flex-col p-8 bg-[#050505] relative overflow-hidden">
    <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
    <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-emerald-600/10 blur-[100px] rounded-full" />
    
    <div className="mt-20 space-y-6 relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-white/10"
      >
        <LogoIcon className="scale-125" />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1 className="text-5xl font-medium tracking-tighter text-white leading-tight">
          Your Life <br />
          <span className="text-zinc-500 italic font-serif">Operating System.</span>
        </h1>
        <p className="text-zinc-400 mt-4 text-lg leading-relaxed max-w-xs">
          Kulima Africa connects your farm, your home, and your future.
        </p>
      </motion.div>
    </div>

    <div className="mt-auto space-y-4 relative z-10">
      <GlassCard className="p-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
          <Fingerprint className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Secure Identity</p>
          <p className="text-sm text-white font-medium">Create your Kulima ID</p>
        </div>
        <ArrowRight className="ml-auto w-5 h-5 text-zinc-600" />
      </GlassCard>

      <button 
        onClick={() => onNavigate('dashboard')}
        className="w-full py-5 bg-white text-black rounded-3xl font-bold text-lg hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
      >
        Get Started
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      
      <p className="text-center text-xs text-zinc-600">
        By continuing, you agree to our <span className="text-zinc-400 underline">Terms of Service</span>
      </p>
    </div>
  </div>
);

const Dashboard = ({ onNavigate, user }: ScreenProps) => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Welcome back,</p>
        <h2 className="text-2xl font-medium text-white">{user?.phone || 'Farmer'}</h2>
      </div>
      <div className="flex gap-3">
        <button onClick={() => onNavigate('notifications')} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center relative">
          <Bell className="w-5 h-5 text-white" />
          <span className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#050505]" />
        </button>
        <button onClick={() => onNavigate('profile')} className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
          <img src={`https://picsum.photos/seed/${user?.id || 'farmer'}/100/100`} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </button>
      </div>
    </div>

    {/* Trust Score Card */}
    <div className="grid grid-cols-1 gap-4">
      <GlassCard 
        onClick={() => onNavigate('kulimaverse')}
        className="bg-gradient-to-br from-blue-600/20 to-emerald-600/20 border-white/20 hover:scale-[1.02] transition-all cursor-pointer"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-1">Impact Trust Score</p>
            <h3 className="text-4xl font-medium text-white">{user?.trust_score || 0}</h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/20">
            +5 pts
          </div>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(user?.trust_score || 0) / 10}%` }}
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500"
          />
        </div>
        <p className="text-[10px] text-zinc-500 mt-3">
          {user?.trust_score && user.trust_score > 800 ? 'Top 5% of farmers in your region. Eligible for $500 credit.' : 'Increase your score by interacting with LUMOZA AI.'}
        </p>
      </GlassCard>

      <GlassCard className="bg-amber-500/10 border-amber-500/20 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Wallet className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Wallet Balance</p>
            <p className="text-lg font-bold text-white">${user?.wallet_balance?.toLocaleString() || '0.00'}</p>
          </div>
        </div>
        <button onClick={() => onNavigate('wallet')} className="px-4 py-2 bg-amber-500 text-black text-[10px] font-bold rounded-full uppercase">Manage</button>
      </GlassCard>
    </div>

    {/* Quick Actions */}
    <div className="grid grid-cols-2 gap-4">
      <GlassCard onClick={() => onNavigate('lumoza')} className="p-4 flex flex-col gap-4">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
          <Sprout className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">LUMOZA</h4>
          <p className="text-[10px] text-zinc-500">Agri-Intelligence</p>
        </div>
      </GlassCard>
      <GlassCard onClick={() => onNavigate('lundai')} className="p-4 flex flex-col gap-4">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <Home className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">LUNDAI</h4>
          <p className="text-[10px] text-zinc-500">Housing Market</p>
        </div>
      </GlassCard>
    </div>

    {/* Opportunities */}
    <div>
      <SectionHeader title="Opportunities" action="See All" />
      <div className="space-y-4">
        {[
          { title: "Fertilizer Subsidy", type: "Grant", amount: "$45", icon: Zap, color: "text-amber-400" },
          { title: "Maize Market Peak", type: "Market", amount: "+12%", icon: TrendingUp, color: "text-emerald-400" }
        ].map((opt, i) => (
          <GlassCard key={i} className="p-4 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${opt.color}`}>
              <opt.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-white">{opt.title}</h5>
              <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{opt.type}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white">{opt.amount}</p>
              <ChevronRight className="w-4 h-4 text-zinc-700 ml-auto" />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </div>
);

const WalletScreen = ({ user, onRefreshUser }: ScreenProps) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddFunds = async () => {
    if (!user || !amount) return;
    setLoading(true);
    await walletService.credit(user.id, parseFloat(amount), "Manual Top-up");
    setAmount('');
    onRefreshUser();
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
      <div className="text-center space-y-2">
        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Total Balance</p>
        <h2 className="text-5xl font-medium text-white">${user?.wallet_balance?.toLocaleString() || '0.00'}</h2>
        <div className="flex justify-center gap-2">
          <Badge color="blue">KULIMA WALLET</Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <input 
            type="number" 
            placeholder="Amount" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-blue-500 transition-colors"
          />
          <button 
            onClick={handleAddFunds}
            disabled={loading}
            className="px-6 bg-white text-black rounded-2xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Add
          </button>
        </div>
      </div>

      <div>
        <SectionHeader title="Recent Activity" />
        <div className="space-y-2">
          {user?.transactions && user.transactions.length > 0 ? (
            user.transactions.slice().reverse().map((t, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 rounded-2xl transition-colors">
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${t.type === 'credit' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {t.type === 'credit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-white">{t.description}</h5>
                  <p className="text-xs text-zinc-500">{t.type === 'credit' ? 'Received' : 'Sent'}</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${t.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                    {t.type === 'credit' ? '+' : '-'}${t.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-zinc-600">{new Date(t.timestamp).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-zinc-500 py-8">No transactions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

const LumozaScreen = ({ user, onRefreshUser }: ScreenProps) => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !user) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      // 1. Get AI Advice
      const aiResponse = await lumozaAIService.getAIAdvice(userMessage);
      
      // 2. Log interaction on backend (updates trust score)
      await lumozaAIService.logInteraction(user.id, userMessage);
      
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
      onRefreshUser(); // Refresh trust score
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 pb-24">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
          <Sprout className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-2xl font-medium text-white">LUMOZA AI</h2>
          <p className="text-xs text-zinc-500">Your Agricultural Intelligence</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 pr-2 no-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
            <Brain className="w-12 h-12 text-emerald-400" />
            <p className="text-sm text-zinc-400 max-w-[200px]">Ask me anything about your farm, crops, or soil.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white/5 border border-white/10 text-zinc-300'}`}>
              <div className="text-sm leading-relaxed prose prose-invert prose-sm">
                <ReactMarkdown>
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
              <span className="text-xs text-zinc-500 tracking-widest uppercase font-bold">LUMOZA is thinking...</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <input 
          type="text" 
          placeholder="Ask LUMOZA..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pr-14 text-white outline-none focus:border-emerald-500 transition-colors"
        />
        <button 
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="absolute right-2 top-2 p-2 bg-emerald-500 text-black rounded-xl disabled:opacity-50 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const LoginScreen = ({ onLogin }: { onLogin: (user: UserData) => void }) => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone) return;
    setLoading(true);
    try {
      const res = await authService.register(phone);
      onLogin(res.user);
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-8 bg-[#050505] items-center justify-center space-y-8">
      <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl shadow-white/10">
        <LogoIcon className="scale-150" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-medium text-white tracking-tighter">Welcome to Kulima</h1>
        <p className="text-zinc-500 text-sm">Enter your phone number to continue</p>
      </div>
      <div className="w-full space-y-4">
        <input 
          type="tel" 
          placeholder="+265 000 000 000" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white text-lg text-center outline-none focus:border-blue-500 transition-colors"
        />
        <button 
          onClick={handleLogin}
          disabled={loading || !phone}
          className="w-full py-5 bg-white text-black rounded-3xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Continue'}
        </button>
      </div>
    </div>
  );
};

const ArchitectureScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
        <Network className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">System Architecture</h2>
        <p className="text-xs text-zinc-500">Super-App Control Layer</p>
      </div>
    </div>

    <div className="space-y-6">
      <GlassCard className="border-l-4 border-l-blue-500">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-blue-400" />
          Kulima ID (Auth Service)
        </h4>
        <div className="space-y-4">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px]">
            <p className="text-blue-400">POST /auth/register</p>
            <p className="text-zinc-500">Payload: &#123; phone, biometric_hash, kyc_data &#125;</p>
            <div className="h-px bg-white/5 my-2" />
            <p className="text-blue-400">POST /auth/login</p>
            <p className="text-zinc-500">Returns: JWT (RS256), RefreshToken</p>
          </div>
          <p className="text-xs text-zinc-500">
            Centralized OIDC provider. Handles session management and cross-platform token validation.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="border-l-4 border-l-green-500">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-green-400" />
          Wallet & Ledger Service
        </h4>
        <div className="space-y-4">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px]">
            <p className="text-green-400">GET /wallet/balance</p>
            <p className="text-zinc-500">Auth: Bearer &lt;JWT&gt;</p>
            <div className="h-px bg-white/5 my-2" />
            <p className="text-green-400">POST /wallet/transfer</p>
            <p className="text-zinc-500">Atomic double-entry transaction</p>
          </div>
          <p className="text-xs text-zinc-500">
            Built on CockroachDB for ACID compliance across regions. Manages cash and agricultural vouchers.
          </p>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Database Schema" />
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
            <h5 className="text-xs font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
              <Database className="w-3 h-3" />
              Users Table (Postgres)
            </h5>
            <ul className="text-[10px] font-mono text-zinc-500 space-y-1">
              <li>id: UUID (PK)</li>
              <li>kulima_id: VARCHAR (Unique)</li>
              <li>phone: VARCHAR</li>
              <li>kyc_status: ENUM</li>
              <li>trust_score: INT</li>
              <li>metadata: JSONB</li>
            </ul>
          </div>
          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-3">
            <h5 className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
              <Database className="w-3 h-3" />
              Ledger Table (CockroachDB)
            </h5>
            <ul className="text-[10px] font-mono text-zinc-500 space-y-1">
              <li>id: UUID (PK)</li>
              <li>account_id: UUID (FK)</li>
              <li>amount: DECIMAL</li>
              <li>type: ENUM (DR/CR)</li>
              <li>tx_id: UUID (FK)</li>
              <li>timestamp: TIMESTAMPTZ</li>
            </ul>
          </div>
        </div>
      </div>

      <GlassCard className="bg-gradient-to-br from-zinc-900 to-black">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Event Bus (Kafka)
        </h4>
        <div className="space-y-4">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 font-mono text-[10px]">
            <p className="text-amber-400">TOPIC: user_verified</p>
            <p className="text-zinc-500">Payload: &#123; kid: "KID_123", level: 2 &#125;</p>
            <div className="h-px bg-white/5 my-2" />
            <p className="text-amber-400">TOPIC: crop_diagnosed</p>
            <p className="text-zinc-500">Payload: &#123; kid: "KID_123", yield_est: 5000 &#125;</p>
          </div>
          <p className="text-xs text-zinc-500">
            High-throughput event stream for cross-system orchestration. Schema-validated using Avro.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="border-l-4 border-l-purple-500">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Activity className="w-4 h-4 text-purple-400" />
          Orchestration Engine (Temporal)
        </h4>
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white font-medium">Workflow: The Path to Homeownership</p>
            <p className="text-[9px] text-zinc-500">Manages long-running state across LUMOZA, KulimaVerse, and LUNDAI.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white font-medium">Workflow: Input-to-Impact</p>
            <p className="text-[9px] text-zinc-500">Tracks seed distribution to harvest logging and credit updates.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  </div>
);

const IntelligenceScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center">
        <Brain className="w-6 h-6 text-amber-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">Decision Infrastructure</h2>
        <p className="text-xs text-zinc-500">AI Intelligence Layer</p>
      </div>
    </div>

    <div className="space-y-6">
      <GlassCard className="bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-amber-400" />
          Intelligence Core (Gemini 3.1)
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] text-amber-400 font-bold uppercase mb-1">Reasoning</p>
            <p className="text-[10px] text-zinc-400">Gemini 3.1 Pro for complex planning & mortgage logic.</p>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5">
            <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Real-time</p>
            <p className="text-[10px] text-zinc-400">Gemini 3 Flash for fraud & instant insights.</p>
          </div>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Impact Trust Scoring (ITS)" />
        <div className="space-y-3">
          {[
            { label: "Agricultural Productivity", weight: "40%", icon: Sprout, color: "text-emerald-400" },
            { label: "Financial Reliability", weight: "30%", icon: Wallet, color: "text-blue-400" },
            { label: "Community Verification", weight: "20%", icon: User, color: "text-amber-400" },
            { label: "Environmental Impact", weight: "10%", icon: Globe, color: "text-emerald-400" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-white font-medium">{item.label}</p>
                <div className="h-1 w-full bg-white/5 rounded-full mt-1">
                  <div className={`h-full rounded-full ${item.color.replace('text-', 'bg-')}`} style={{ width: item.weight }} />
                </div>
              </div>
              <span className="text-[10px] font-bold text-zinc-500">{item.weight}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Autonomous Agents" />
        <div className="grid grid-cols-1 gap-3">
          {[
            { name: "Harvest Monitor", status: "Active", desc: "Analyzing satellite NDVI for Block B.", icon: Activity, color: "emerald" },
            { name: "Fraud Guard", status: "Monitoring", desc: "Real-time transaction anomaly detection.", icon: ShieldAlert, color: "blue" },
            { name: "Credit Scout", status: "Scanning", desc: "Identifying mortgage readiness triggers.", icon: TrendingUp, color: "amber" },
            { name: "HITL Agronomist", status: "Ready", desc: "Manual review for low-confidence AI diagnoses.", icon: UserCheck, color: "pink" }
          ].map((agent, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-${agent.color}-500/10 flex items-center justify-center`}>
                <agent.icon className={`w-5 h-5 text-${agent.color}-400`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h5 className="text-sm font-medium text-white">{agent.name}</h5>
                  <Badge color={agent.color}>{agent.status}</Badge>
                </div>
                <p className="text-[10px] text-zinc-500 mt-1">{agent.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard className="bg-black border-white/5">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500" />
          Decision Logic (Example)
        </h4>
        <div className="p-4 bg-zinc-900/50 rounded-2xl font-mono text-[9px] text-zinc-500 leading-relaxed overflow-x-auto">
          <p className="text-amber-400">if (soil_moisture &lt; 30% && forecast == 'no_rain') &#123;</p>
          <p className="pl-4">trigger_irrigation_alert();</p>
          <p className="pl-4">check_eligible_vouchers('power');</p>
          <p className="pl-4">notify_user('LUMOZA_ADVICE');</p>
          <p className="text-amber-400">&#125;</p>
          <div className="h-px bg-white/5 my-2" />
          <p className="text-blue-400">if (trust_score &gt; 850 && harvest_cycles &gt; 5) &#123;</p>
          <p className="pl-4">auto_approve_mortgage_offer('LUNDAI');</p>
          <p className="pl-4">apply_interest_rate_reduction(4.5);</p>
          <p className="text-blue-400">&#125;</p>
        </div>
      </GlassCard>
    </div>
  </div>
);

const StrategyScreen = ({ onNavigate }: ScreenProps) => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
        <Rocket className="w-6 h-6 text-indigo-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">Execution Strategy</h2>
        <p className="text-xs text-zinc-500">Startup Scaling OS</p>
      </div>
    </div>

    <div className="space-y-6">
      <GlassCard className="border-l-4 border-l-indigo-500">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Target className="w-4 h-4 text-indigo-400" />
          Launch Sequence (Malawi First)
        </h4>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400">01</div>
            <div>
              <p className="text-xs text-white font-medium">LUMOZA (Month 1)</p>
              <p className="text-[10px] text-zinc-500">WhatsApp-first utility for daily active users.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 opacity-60">
            <div className="w-8 h-8 rounded-full bg-zinc-500/20 flex items-center justify-center text-[10px] font-bold text-zinc-400">02</div>
            <div>
              <p className="text-xs text-white font-medium">KulimaVerse (Month 2-3)</p>
              <p className="text-[10px] text-zinc-500">Trust verification and Social Collateral.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 opacity-40">
            <div className="w-8 h-8 rounded-full bg-zinc-500/20 flex items-center justify-center text-[10px] font-bold text-zinc-400">03</div>
            <div>
              <p className="text-xs text-white font-medium">LUNDAI (Month 6+)</p>
              <p className="text-[10px] text-zinc-500">High-ticket housing for top-tier farmers.</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="User Acquisition Funnel" />
        <div className="grid grid-cols-1 gap-3">
          {[
            { goal: "100 Users", strategy: "The Ground Game", desc: "Direct partnerships with Lilongwe VSLAs.", icon: Map, color: "blue" },
            { goal: "1,000 Users", strategy: "The Viral Loop", desc: "Referral bonuses in the Kulima Wallet.", icon: Zap, color: "amber" },
            { goal: "10,000 Users", strategy: "The Input Hook", desc: "Partner with seed/fertilizer suppliers.", icon: Globe, color: "emerald" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/10 flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 text-${item.color}-400`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-bold text-white uppercase tracking-widest">{item.goal}</h5>
                  <span className="text-[10px] text-zinc-500">{item.strategy}</span>
                </div>
                <p className="text-[10px] text-zinc-400 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GlassCard className="bg-indigo-500/5 border-indigo-500/20">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          Field Script (Chichewa/English)
        </h4>
        <div className="p-4 bg-black/40 rounded-2xl space-y-3 italic">
          <p className="text-xs text-zinc-300 leading-relaxed">
            "Moni Bambo! Kodi mukufuna kudziwa momwe mungakulitsire zokolola zanu chaka chino? LUMOZA is your new AI farming assistant on WhatsApp."
          </p>
          <div className="h-px bg-white/5" />
          <p className="text-[10px] text-zinc-500">
            Strategy: Focus on immediate value (weather/pest alerts) before introducing long-term housing (LUNDAI).
          </p>
        </div>
      </GlassCard>

      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Daily Checklist</h5>
          <ul className="text-[10px] text-zinc-400 space-y-2">
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-400" /> 06:00 Weather Alerts</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-400" /> Market Visits (10 signups)</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-400" /> Manual Airtime Rewards</li>
          </ul>
        </div>
        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
          <h5 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">Weekly Goals</h5>
          <ul className="text-[10px] text-zinc-400 space-y-2">
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-amber-400" /> W1: 20 Users (VSLA)</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-amber-400" /> W2: 50 Users (Referrals)</li>
            <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-amber-400" /> W4: 100 Active Users</li>
          </ul>
        </div>
      </div>

      <GlassCard 
        onClick={() => onNavigate('behavioral')}
        className="bg-gradient-to-br from-pink-500/20 to-transparent border-pink-500/30 hover:scale-[1.02] transition-all cursor-pointer group mb-4"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Behavioral OS</h4>
              <p className="text-[10px] text-zinc-500">Engagement & Retention Engine</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-pink-400 transition-colors" />
        </div>
      </GlassCard>

      <GlassCard 
        onClick={() => onNavigate('deployment')}
        className="bg-gradient-to-br from-emerald-500/20 to-transparent border-emerald-500/30 hover:scale-[1.02] transition-all cursor-pointer group mb-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-white font-medium">Deployment Readiness</h4>
              <p className="text-[10px] text-zinc-500">Reliability & Field Ops Audit</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors" />
        </div>
      </GlassCard>

      <GlassCard className="bg-gradient-to-br from-zinc-900 to-black">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-500" />
          Early Revenue Pillars
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400">B2B Commissions (Input Suppliers)</span>
            <span className="text-[10px] font-bold text-emerald-400">3-5%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-[10px] text-zinc-400">Wallet Transaction Fees</span>
            <span className="text-[10px] font-bold text-emerald-400">1%</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5 opacity-40">
            <span className="text-[10px] text-zinc-400">Mortgage Interest (LUNDAI)</span>
            <span className="text-[10px] font-bold text-zinc-500">TBD</span>
          </div>
        </div>
      </GlassCard>

      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
        <h4 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
          <ShieldAlert className="w-3 h-3" />
          What NOT To Do
        </h4>
        <ul className="text-[10px] text-zinc-500 space-y-1 list-disc pl-4">
          <li>Don't build a heavy app (&gt;15MB).</li>
          <li>Don't ignore the "Last Mile" logistics.</li>
          <li>Don't over-automate trust verification early.</li>
        </ul>
      </div>

      <div>
        <SectionHeader title="30-60-90 Day Plan" />
        <div className="space-y-4">
          {[
            { day: "30", title: "LUMOZA Live", desc: "Lilongwe launch. 500 active farmers.", color: "blue" },
            { day: "60", title: "Wallet & ID", desc: "100 Verified profiles in KulimaVerse.", color: "amber" },
            { day: "90", title: "Impact Loans", desc: "First loans disbursed. LUNDAI Beta.", color: "emerald" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className={`w-12 h-12 rounded-2xl bg-${item.color}-500/10 flex flex-col items-center justify-center shrink-0`}>
                <span className={`text-xs font-bold text-${item.color}-400`}>{item.day}</span>
                <span className="text-[8px] text-zinc-500 uppercase">Days</span>
              </div>
              <div className="flex-1 pt-1">
                <h5 className="text-xs font-medium text-white">{item.title}</h5>
                <p className="text-[10px] text-zinc-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <GlassCard className="border-l-4 border-l-blue-500">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Network className="w-4 h-4 text-blue-400" />
          Integration Strategy
        </h4>
        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white font-medium">Step 1: Shared Identity</p>
            <p className="text-[9px] text-zinc-500">Unified Kulima ID across WhatsApp & App.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white font-medium">Step 2: The Wallet Hook</p>
            <p className="text-[9px] text-zinc-500">LUMOZA advice triggers Wallet vouchers.</p>
          </div>
          <div className="p-3 bg-white/5 rounded-xl border border-white/5">
            <p className="text-[10px] text-white font-medium">Step 3: Trust API</p>
            <p className="text-[9px] text-zinc-500">LUNDAI reads ITS scores for pre-approvals.</p>
          </div>
        </div>
      </GlassCard>
    </div>
  </div>
);

const Badge = ({ children, color = "blue" }: { children: React.ReactNode, color?: string }) => {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    zinc: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
  };
  return (
    <span className={`px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider rounded-full border ${colors[color] || colors.blue}`}>
      {children}
    </span>
  );
};

const ProfileScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex flex-col items-center text-center space-y-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-[2.5rem] border-4 border-blue-600/20 p-1">
          <img src="https://picsum.photos/seed/shadreck/200/200" alt="Profile" className="w-full h-full object-cover rounded-[2rem]" referrerPolicy="no-referrer" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center border-4 border-[#050505]">
          <Award className="w-5 h-5 text-white" />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">Shadreck Mawindo</h2>
        <p className="text-sm text-zinc-500">Verified Farmer • Nakuru, Kenya</p>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      {[
        { label: "Trust", value: "842", icon: ShieldCheck, color: "text-blue-400" },
        { label: "Impact", value: "12.4t", icon: TrendingUp, color: "text-emerald-400" },
        { label: "Badges", value: "8", icon: Award, color: "text-amber-400" }
      ].map((stat, i) => (
        <div key={i} className="text-center space-y-1">
          <div className={`w-10 h-10 mx-auto rounded-xl bg-white/5 flex items-center justify-center ${stat.color}`}>
            <stat.icon className="w-5 h-5" />
          </div>
          <p className="text-lg font-bold text-white">{stat.value}</p>
          <p className="text-[8px] text-zinc-600 uppercase tracking-widest font-bold">{stat.label}</p>
        </div>
      ))}
    </div>

    <div>
      <SectionHeader title="Verification Status" />
      <div className="space-y-3">
        {[
          { title: "Kulima ID", status: "Verified", icon: Fingerprint, color: "text-blue-400" },
          { title: "Land Title", status: "Verified", icon: Globe, color: "text-emerald-400" },
          { title: "Biometric", status: "Active", icon: ScanFace, color: "text-blue-400" }
        ].map((v, i) => (
          <GlassCard key={i} className="p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${v.color}`}>
              <v.icon className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-white">{v.title}</h5>
              <p className="text-[10px] text-zinc-500">Last updated: 12 Mar 2026</p>
            </div>
            <Badge color={v.status === 'Verified' ? 'emerald' : 'blue'}>{v.status}</Badge>
          </GlassCard>
        ))}
      </div>
    </div>
  </div>
);

const OpportunitiesScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-medium text-white">Opportunities</h2>
      <button className="p-3 rounded-2xl bg-white/5 text-zinc-400">
        <Filter className="w-5 h-5" />
      </button>
    </div>

    <div className="space-y-6">
      <div>
        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-4">Recommended for you</p>
        <div className="space-y-4">
          {[
            { title: "Maize Export Contract", company: "Global Agri-Trade", value: "$2,400", type: "Market", icon: Globe, color: "bg-blue-500/10 text-blue-400" },
            { title: "Smart Irrigation Grant", company: "KulimaVerse", value: "$500", type: "Funding", icon: Zap, color: "bg-amber-500/10 text-amber-400" }
          ].map((opp, i) => (
            <GlassCard key={i} className="p-5 space-y-4">
              <div className="flex justify-between items-start">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${opp.color}`}>
                  <opp.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{opp.value}</p>
                  <Badge color={opp.type === 'Market' ? 'blue' : 'amber'}>{opp.type}</Badge>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">{opp.title}</h4>
                <p className="text-xs text-zinc-500">{opp.company}</p>
              </div>
              <button className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold text-white hover:bg-white/10 transition-colors">
                View Details
              </button>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LundaiScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center">
        <Home className="w-6 h-6 text-blue-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">LUNDAI</h2>
        <p className="text-xs text-zinc-500">Intelligent Housing</p>
      </div>
    </div>

    <GlassCard className="p-0 overflow-hidden border-white/5">
      <img src="https://picsum.photos/seed/house/600/400" alt="House" className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-medium text-white">Modern Eco-Home</h3>
            <p className="text-xs text-zinc-500">Nakuru Heights • Phase 2</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-white">$12,500</p>
            <p className="text-[10px] text-emerald-400 font-bold">Financing Available</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Building2 className="w-4 h-4" /> 3 Bed
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Zap className="w-4 h-4" /> Solar Ready
          </div>
        </div>
        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-600/20">
          Apply for Financing
        </button>
      </div>
    </GlassCard>

    <div>
      <SectionHeader title="Your Property Trust" />
      <GlassCard className="flex items-center gap-6">
        <div className="w-20 h-20 relative">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
            <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="226" strokeDashoffset="45" className="text-blue-500" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
            80%
          </div>
        </div>
        <div className="flex-1">
          <h5 className="text-sm font-medium text-white">Mortgage Ready</h5>
          <p className="text-xs text-zinc-500 leading-relaxed">Your agricultural yield history has qualified you for a 4.5% interest rate reduction.</p>
        </div>
      </GlassCard>
    </div>
  </div>
);

const NotificationsScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-medium text-white">Intelligence</h2>
      <button className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Clear All</button>
    </div>

    <div className="space-y-4">
      {[
        { title: "AI Insight", desc: "Soil sensors in Block B indicate optimal harvest time in 3 days.", time: "2m ago", icon: Sparkles, color: "text-emerald-400", unread: true },
        { title: "Payment Received", desc: "You received $450.00 from Maize Export Contract.", time: "1h ago", icon: Wallet, color: "text-blue-400", unread: true },
        { title: "New Opportunity", desc: "A new smart irrigation grant is available for your region.", time: "4h ago", icon: Zap, color: "text-amber-400", unread: false },
        { title: "System Update", desc: "Kulima ID biometric verification is now mandatory for high-value trades.", time: "1d ago", icon: ShieldCheck, color: "text-zinc-400", unread: false }
      ].map((n, i) => (
        <div key={i} className={`flex gap-4 p-4 rounded-3xl transition-colors ${n.unread ? 'bg-white/5 border border-white/10' : 'opacity-60'}`}>
          <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 ${n.color}`}>
            <n.icon className="w-6 h-6" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-center">
              <h5 className="text-sm font-medium text-white">{n.title}</h5>
              <span className="text-[10px] text-zinc-600">{n.time}</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">{n.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BrandScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-12 pb-24 bg-white">
    <div className="flex flex-col items-center justify-center py-12 space-y-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-12 bg-zinc-50 rounded-[4rem] border border-zinc-100 shadow-sm"
      >
        <Logo className="scale-150" />
      </motion.div>
      
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter text-[#0B3D2E]">KULIMA AFRICA</h2>
        <p className="text-zinc-500 font-medium tracking-widest uppercase text-xs">Brand Identity System v1.0</p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-8">
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">The Symbolism</h3>
        <div className="grid grid-cols-1 gap-4">
          {[
            { title: "Growth", desc: "The upward leaf apex symbolizes agricultural prosperity and personal advancement.", icon: Sprout, color: "#D4A017" },
            { title: "Trust", desc: "The hexagonal shield silhouette conveys security, stability, and reliability.", icon: ShieldCheck, color: "#0B3D2E" },
            { title: "System", desc: "The node network represents the integrated ecosystem of LUMOZA, LUNDAI, and KulimaVerse.", icon: Network, color: "#0B3D2E" },
            { title: "Continent", desc: "A subtle geometric notch at the base hints at the African silhouette.", icon: Globe, color: "#0B3D2E" }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}10` }}>
                <item.icon className="w-5 h-5" style={{ color: item.color }} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-zinc-900">{item.title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">Color Palette</h3>
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-24 rounded-2xl bg-[#0B3D2E] shadow-lg" />
            <p className="text-[10px] font-bold text-zinc-900">Deep Forest Green</p>
            <p className="text-[10px] text-zinc-400">#0B3D2E</p>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-24 rounded-2xl bg-[#D4A017] shadow-lg" />
            <p className="text-[10px] font-bold text-zinc-900">Sovereign Gold</p>
            <p className="text-[10px] text-zinc-400">#D4A017</p>
          </div>
          <div className="flex-1 space-y-2">
            <div className="h-24 rounded-2xl bg-white border border-zinc-200 shadow-sm" />
            <p className="text-[10px] font-bold text-zinc-900">Pure White</p>
            <p className="text-[10px] text-zinc-400">#FFFFFF</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const BehavioralScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center">
        <Sparkles className="w-6 h-6 text-pink-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">Behavioral OS</h2>
        <p className="text-xs text-zinc-500">Engagement & Retention Engine</p>
      </div>
    </div>

    <div className="space-y-6">
      <GlassCard className="bg-gradient-to-br from-pink-500/10 to-transparent border-pink-500/20">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-pink-400" />
          The "Wow" Moment (First 5m)
        </h4>
        <div className="p-4 bg-black/40 rounded-2xl space-y-3">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 text-[10px] text-white">User</div>
            <div className="p-3 bg-zinc-800/50 rounded-2xl rounded-tl-none text-[10px] text-zinc-300">"Moni! My maize is turning yellow. Help!"</div>
          </div>
          <div className="flex gap-3 justify-end">
            <div className="p-3 bg-pink-500/20 rounded-2xl rounded-tr-none text-[10px] text-white border border-pink-500/20">
              "I see your Maize. This is **Nitrogen deficiency**. Apply Urea or plant beans nearby! 🌽✨"
            </div>
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center shrink-0 text-[10px] text-white font-bold">L</div>
          </div>
          <p className="text-[9px] text-zinc-500 text-center italic">Logic: Instant variable reward (Expertise in pocket)</p>
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="The Daily Habit Loop" />
        <div className="space-y-3">
          {[
            { step: "Trigger", desc: "06:00 AM Weather & Tip", icon: Bell, color: "text-blue-400" },
            { step: "Action", desc: "Log daily work (1 tap)", icon: Plus, color: "text-emerald-400" },
            { step: "Reward", desc: "+5 VU Points & Level Up", icon: Award, color: "text-amber-400" },
            { step: "Investment", desc: "Builds 'Impact Score'", icon: TrendingUp, color: "text-pink-400" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
              <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{item.step}</p>
                <p className="text-xs text-white font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionHeader title="Social Proof: VSLA Leaderboard" />
        <GlassCard className="p-0 overflow-hidden border-white/5">
          <div className="bg-white/5 p-3 flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Mitundu VSLA Group</span>
            <span className="text-[10px] text-emerald-400">Active Now</span>
          </div>
          <div className="p-4 space-y-4">
            {[
              { name: "Mayi Banda", score: 95, level: "Harvest Master", avatar: "MB" },
              { name: "Bambo Phiri", score: 88, level: "Cultivator", avatar: "BP" },
              { name: "Bambo Jere", score: 82, level: "Sprout", avatar: "BJ" }
            ].map((farmer, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] text-white font-bold border border-white/10">
                  {farmer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-white font-medium">{farmer.name}</p>
                    <p className="text-xs text-pink-400 font-bold">{farmer.score}</p>
                  </div>
                  <p className="text-[9px] text-zinc-500">{farmer.level}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <GlassCard className="p-4 border-emerald-500/20 bg-emerald-500/5">
          <h5 className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">Incentive Engine</h5>
          <p className="text-[10px] text-zinc-400 leading-relaxed">
            VU Points tied to real behavior (logging, referrals) redeemable for Airtime & Input Discounts.
          </p>
        </GlassCard>
        <GlassCard className="p-4 border-blue-500/20 bg-blue-500/5">
          <h5 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Viral Loop</h5>
          <p className="text-[10px] text-zinc-400 leading-relaxed">
            "Share the Harvest" - Farmers invite neighbors to earn shared VU bonuses.
          </p>
        </GlassCard>
      </div>
    </div>
  </div>
);

const DeploymentReadinessScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
        <ShieldCheck className="w-6 h-6 text-emerald-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">Deployment Readiness</h2>
        <p className="text-xs text-zinc-500">Reliability & Field Ops Audit</p>
      </div>
    </div>

    <div className="space-y-6">
      <GlassCard className="bg-emerald-500/5 border-emerald-500/20">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          Core Flow Reliability
        </h4>
        <div className="space-y-3">
          {[
            { label: "Asynchronous Retry Logic", status: "Active", icon: Activity },
            { label: "HITL (Human-in-the-Loop) Flagging", status: "Active", icon: UserCheck },
            { label: "Progressive Disclosure (Thinking...)", status: "Active", icon: MessageSquare }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-white">{item.label}</span>
              </div>
              <Badge color="emerald">{item.status}</Badge>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Response Optimization" />
        <div className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-3">
            <p className="text-[10px] text-zinc-500 uppercase font-bold">Before (Technical)</p>
            <p className="text-[10px] text-zinc-400 italic">"Your crop has Spodoptera frugiperda. Apply Emamectin benzoate at 200ml/ha."</p>
            <div className="h-px bg-white/10" />
            <p className="text-[10px] text-emerald-400 uppercase font-bold">After (Actionable)</p>
            <p className="text-[10px] text-white">"Moni! I see **Armyworms**. 🐛 Go to Farmers World, ask for **'Emamectin'**. Mix 1 cap and spray the funnel."</p>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader title="Field Test Scenarios" />
        <div className="space-y-2">
          {[
            { title: "Maize turning yellow", result: "N-Deficiency Check", icon: Sprout },
            { title: "Photo of leaf holes", result: "Pest ID (Armyworm)", icon: Bug },
            { title: "Planting window", result: "Weather-based Advice", icon: Calendar },
            { title: "Market Price Check", result: "Local Dealer Data", icon: ShoppingCart }
          ].map((test, i) => (
            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <test.icon className="w-4 h-4 text-zinc-400" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-white font-medium">{test.title}</p>
                <p className="text-[10px] text-emerald-400">{test.result}</p>
              </div>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          ))}
        </div>
      </div>

      <GlassCard className="bg-amber-500/5 border-amber-500/20 p-4">
        <h5 className="text-[10px] font-bold text-amber-400 uppercase tracking-widest mb-2">Manual Test Checklist</h5>
        <div className="space-y-2">
          {[
            "Connectivity Test (2G/Edge)",
            "Image Stress Test (Blurry/Dark)",
            "Language Test (Deep Chichewa)",
            "Dealer Price Validation"
          ].map((check, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border border-amber-500/50 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-amber-500 rounded-sm" />
              </div>
              <span className="text-[10px] text-zinc-400">{check}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  </div>
);

const KulimaVerseScreen = () => (
  <div className="h-full overflow-y-auto p-6 space-y-8 pb-24">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
        <Globe className="w-6 h-6 text-indigo-400" />
      </div>
      <div>
        <h2 className="text-2xl font-medium text-white">KulimaVerse</h2>
        <p className="text-xs text-zinc-500">Trust & Funding Protocol</p>
      </div>
    </div>

    <div className="space-y-6">
      <GlassCard className="bg-gradient-to-br from-indigo-500/10 to-transparent border-indigo-500/20">
        <h4 className="text-white font-medium mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-400" />
          Verification Status
        </h4>
        <div className="space-y-4">
          {[
            { label: "Biometric ID", status: "Verified", icon: Fingerprint, color: "text-emerald-400" },
            { label: "VSLA Endorsement", status: "Verified", icon: User, color: "text-emerald-400" },
            { label: "Land Title (Digital)", status: "Pending", icon: Map, color: "text-amber-400" }
          ].map((v, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-black/40 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <v.icon className={`w-4 h-4 ${v.color}`} />
                <span className="text-xs text-white">{v.label}</span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${v.color}`}>{v.status}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div>
        <SectionHeader title="Social Collateral" />
        <div className="p-4 bg-white/5 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.1),transparent_70%)]" />
          <div className="relative z-10 space-y-4">
            <p className="text-xs text-zinc-400 leading-relaxed">
              You are vouched for by <span className="text-white font-bold">12 members</span> of the Mitundu VSLA. This unlocks <span className="text-indigo-400 font-bold">$500</span> in additional credit.
            </p>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-800 overflow-hidden">
                  <img src={`https://picsum.photos/seed/farmer${i}/100/100`} alt="Farmer" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-zinc-900 flex items-center justify-center text-[10px] text-zinc-500 font-bold">
                +7
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader title="Active Funding Pools" />
        <div className="space-y-3">
          {[
            { title: "Green Housing Fund", source: "Global Impact Bond", rate: "4.5%", available: "$250k", icon: Home, color: "blue" },
            { title: "Input Credit Pool", source: "P2P Lending", rate: "8.0%", available: "$45k", icon: Sprout, color: "emerald" },
            { title: "Emergency Relief", source: "Grant", rate: "0%", available: "$12k", icon: Zap, color: "amber" }
          ].map((pool, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-${pool.color}-500/10 flex items-center justify-center`}>
                <pool.icon className={`w-5 h-5 text-${pool.color}-400`} />
              </div>
              <div className="flex-1">
                <h5 className="text-sm font-medium text-white">{pool.title}</h5>
                <p className="text-[10px] text-zinc-500">{pool.source}</p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-white">{pool.rate}</p>
                <p className="text-[10px] text-zinc-500">{pool.available}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('dashboard');
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  const refreshUserData = async () => {
    if (!user) return;
    try {
      const data = await authService.getProfile(user.id);
      setUser(data.user);
    } catch (error) {
      console.error("Failed to refresh user data", error);
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('kulima_user');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      authService.getProfile(parsed.id).then(res => {
        setUser(res.user);
        localStorage.setItem('kulima_user', JSON.stringify(res.user));
      }).catch(() => {
        localStorage.removeItem('kulima_user');
        setUser(null);
      });
    }
    setIsAuthReady(true);
  }, []);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('kulima_user', JSON.stringify(userData));
    setCurrentScreen('dashboard');
  };

  if (!isAuthReady) {
    return (
      <div className="h-screen bg-[#050505] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-white" />
      </div>
    );
  }

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderScreen = () => {
    const props = { user, onRefreshUser: refreshUserData };
    switch (currentScreen) {
      case 'dashboard': return <Dashboard {...props} onNavigate={setCurrentScreen} />;
      case 'wallet': return <WalletScreen {...props} onNavigate={setCurrentScreen} />;
      case 'lumoza': return <LumozaScreen {...props} onNavigate={setCurrentScreen} />;
      case 'lundai': return <LundaiScreen />;
      case 'profile': return <ProfileScreen />;
      case 'opportunities': return <OpportunitiesScreen />;
      case 'notifications': return <NotificationsScreen />;
      case 'architecture': return <ArchitectureScreen />;
      case 'intelligence': return <IntelligenceScreen />;
      case 'strategy': return <StrategyScreen {...props} onNavigate={setCurrentScreen} />;
      case 'brand': return <BrandScreen />;
      case 'behavioral': return <BehavioralScreen />;
      case 'kulimaverse': return <KulimaVerseScreen />;
      case 'deployment': return <DeploymentReadinessScreen />;
      default: return <Dashboard {...props} onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#000] flex items-center justify-center p-0 sm:p-8 font-sans selection:bg-blue-500/30">
      {/* Mobile Frame */}
      <div className="w-full h-screen sm:w-[390px] sm:h-[844px] bg-[#050505] sm:rounded-[3rem] sm:border-[8px] border-zinc-900 overflow-hidden relative shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col">
        
        {/* Status Bar Simulation */}
        <div className="h-12 flex justify-between items-center px-8 shrink-0 relative z-50">
          <span className="text-xs font-bold text-white">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-2.5 border border-white/30 rounded-sm relative">
              <div className="absolute inset-0.5 bg-white rounded-[1px] w-[80%]" />
            </div>
            <div className="w-3 h-3 bg-white/30 rounded-full" />
          </div>
        </div>

        {/* Screen Content */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Bar */}
        {currentScreen !== 'onboarding' && (
          <div className="h-24 bg-[#050505]/80 backdrop-blur-xl border-t border-white/5 flex items-center justify-around px-4 shrink-0 relative z-50">
            <IconButton icon={Home} active={currentScreen === 'dashboard'} onClick={() => setCurrentScreen('dashboard')} />
            <IconButton icon={Wallet} active={currentScreen === 'wallet'} onClick={() => setCurrentScreen('wallet')} />
            <div className="relative -top-6">
              <button className="w-14 h-14 bg-white text-black rounded-2xl shadow-2xl shadow-white/10 flex items-center justify-center active:scale-90 transition-transform">
                <Plus className="w-8 h-8" />
              </button>
            </div>
            <IconButton icon={Sprout} active={currentScreen === 'lumoza'} onClick={() => setCurrentScreen('lumoza')} />
            <IconButton icon={User} active={currentScreen === 'profile'} onClick={() => setCurrentScreen('profile')} />
            <IconButton icon={Brain} active={currentScreen === 'intelligence'} onClick={() => setCurrentScreen('intelligence')} />
            <IconButton icon={Rocket} active={currentScreen === 'strategy'} onClick={() => setCurrentScreen('strategy')} />
            <IconButton icon={Sparkles} active={currentScreen === 'brand'} onClick={() => setCurrentScreen('brand')} />
            <IconButton icon={Network} active={currentScreen === 'architecture'} onClick={() => setCurrentScreen('architecture')} />
          </div>
        )}

        {/* Home Indicator */}
        <div className="h-6 flex justify-center items-center shrink-0">
          <div className="w-32 h-1 bg-white/20 rounded-full" />
        </div>
      </div>

      {/* Design Philosophy Overlay (Desktop Only) */}
      <div className="hidden xl:block fixed left-12 top-1/2 -translate-y-1/2 max-w-sm space-y-8">
        <div>
          <h1 className="text-5xl font-serif italic text-white mb-4 leading-tight">Kulima Africa <br />Design OS</h1>
          <p className="text-zinc-500 leading-relaxed">
            A futuristic, minimal, and intelligent Life Operating System designed for the next billion users.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-blue-400 font-bold">Aesthetic</p>
            <p className="text-sm text-zinc-400">Dark Luxury meets Clean Utility. High contrast for outdoor readability, glassmorphism for depth.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">Intelligence</p>
            <p className="text-sm text-zinc-400">AI is not a chatbot; it's a layer. LUMOZA insights are integrated directly into the workflow.</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">Trust</p>
            <p className="text-sm text-zinc-400">The Impact Score is the primary currency. Every action builds a verifiable financial identity.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
