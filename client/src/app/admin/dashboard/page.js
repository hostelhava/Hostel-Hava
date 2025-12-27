'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Bed,
    CreditCard,
    Ticket,
    Activity,
    ArrowUpRight,
    Search,
    Plus,
    Bell,
    CheckCircle2,
    Clock,
    UserPlus,
    Megaphone
} from 'lucide-react';

const stats = [
    { label: 'Total Residents', value: '1,248', change: '+12 this week', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Bed Occupancy', value: '92%', change: '8 unfilled units', icon: Bed, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Pending Dues', value: '₹42.5k', change: '14 residents', icon: CreditCard, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Active Tickets', value: '12', change: '4 high urgency', icon: Ticket, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
];

const recentActivity = [
    { name: 'Felix Brown', action: 'Checked-in to Unit 101', time: '2h ago', seed: 'Felix' },
    { name: 'Sarah Miller', action: 'Paid Rent for June', time: '5h ago', seed: 'Sarah' },
    { name: 'David Chen', action: 'Reported Plumbing Issue', time: '1d ago', seed: 'David' },
    { name: 'Elena Rodriguez', action: 'Request Guest Entry', time: '1d ago', seed: 'Elena' },
];

const timeRanges = {
    Months: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov', 'Dec'],
    Weeks: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    Days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

export default function AdminDashboard() {
    const [activeRange, setActiveRange] = useState('Months');

    return (
        <div className="space-y-10 pb-12">
            {/* Quick KPI Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-[#111111] p-7 rounded-[40px] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                    >
                        <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[22px] flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white mt-1">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-gray-500 mt-2 flex items-center gap-1.5 uppercase tracking-wider">
                                <Activity className="w-3 h-3" /> {stat.change}
                            </p>
                        </div>
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight className={`w-5 h-5 ${stat.color}`} />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* --- LEFT: OCCUPANCY ANALYTICS --- */}
                <div className="col-span-12 lg:col-span-8 flex flex-col gap-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#111111] rounded-[48px] p-10 border border-white/5 relative overflow-hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[4px]">Occupancy Velocity</h3>
                                <p className="text-gray-600 text-[11px] font-bold mt-1 tracking-wider uppercase">Property Inflow & Retention Analysis</p>
                            </div>
                            <div className="flex items-center gap-2 bg-black p-1.5 rounded-[20px] border border-white/5">
                                {Object.keys(timeRanges).map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setActiveRange(t)}
                                        className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${activeRange === t ? 'bg-white text-black' : 'text-gray-600 hover:text-white'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Custom Chart Illustration */}
                        <div className="h-[300px] w-full relative group">
                            <svg className="w-full h-full" viewBox="0 0 800 300" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.15" />
                                        <stop offset="100%" stopColor="#111111" stopOpacity="0" />
                                    </linearGradient>
                                </defs>

                                <motion.path
                                    animate={{
                                        d: activeRange === 'Months'
                                            ? "M0,250 Q100,230 200,180 T400,100 T600,120 T800,50 V300 H0 Z"
                                            : activeRange === 'Weeks'
                                                ? "M0,250 Q100,200 200,220 T400,150 T600,180 T800,100 V300 H0 Z"
                                                : "M0,250 Q100,240 200,210 T400,190 T600,200 T800,160 V300 H0 Z"
                                    }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    fill="url(#chartGradient)"
                                />

                                <motion.path
                                    animate={{
                                        d: activeRange === 'Months'
                                            ? "M0,250 Q100,230 200,180 T400,100 T600,120 T800,50"
                                            : activeRange === 'Weeks'
                                                ? "M0,250 Q100,200 200,220 T400,150 T600,180 T800,100"
                                                : "M0,250 Q100,240 200,210 T400,190 T600,200 T800,160"
                                    }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    fill="none"
                                    stroke="#8B5CF6"
                                    strokeWidth="4"
                                    className="drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                                />
                            </svg>

                            <div className="absolute inset-x-0 bottom-0 flex justify-between px-2 pt-6 border-t border-white/5">
                                {timeRanges[activeRange].map(label => (
                                    <span key={label} className="text-[10px] font-black text-gray-700 uppercase">{label}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Action Capsules */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { label: 'Register', icon: UserPlus, color: 'text-purple-400' },
                            { label: 'Broadcast', icon: Megaphone, color: 'text-yellow-400' },
                            { label: 'Log Bill', icon: CreditCard, color: 'text-red-400' },
                            { label: 'Inspections', icon: Search, color: 'text-emerald-400' },
                        ].map((btn, i) => (
                            <motion.button
                                whileHover={{ y: -5, scale: 1.02 }}
                                key={i}
                                className="bg-[#111111] p-6 rounded-[32px] border border-white/5 flex flex-col items-center gap-4 hover:border-white/10"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-black flex items-center justify-center border border-white/5 ${btn.color}`}>
                                    <btn.icon className="w-6 h-6" />
                                </div>
                                <span className="text-[10px] font-black text-white uppercase tracking-widest">{btn.label}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT: LIVE PULSE --- */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-10">
                    {/* Activity Feed */}
                    <div className="bg-[#111111] rounded-[48px] p-8 border border-white/5 shadow-2xl relative">
                        <div className="flex justify-between items-center mb-8 px-2">
                            <h3 className="text-sm font-black text-white uppercase tracking-[4px]">Live Pulse</h3>
                            <button className="p-2 text-gray-600 hover:text-white"><Activity className="w-5 h-5 animate-pulse" /></button>
                        </div>

                        <div className="space-y-6">
                            {recentActivity.map((act, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-center gap-5 p-4 rounded-[32px] hover:bg-white/5 transition-colors group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#1C1C1E] ring-2 ring-purple-500/10 group-hover:ring-purple-500 transition-all">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${act.seed}`} alt="user" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-black text-white truncate">{act.name}</h4>
                                        <p className="text-[10px] font-bold text-gray-600 uppercase tracking-tight truncate">{act.action}</p>
                                    </div>
                                    <span className="text-[9px] font-black text-gray-700 uppercase whitespace-nowrap">{act.time}</span>
                                </motion.div>
                            ))}
                        </div>

                        <button className="w-full mt-8 py-4 bg-black rounded-[24px] border border-white/5 text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-[2px] transition-all">
                            View Historical Logs
                        </button>
                    </div>

                    {/* Support Health */}
                    <div className="bg-gradient-to-br from-[#1C1C1E] to-black rounded-[48px] p-8 border border-white/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-yellow-400/10 flex items-center justify-center text-yellow-400 shadow-[0_0_20px_rgba(251,191,36,0.1)]">
                                <Ticket className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-[3px]">System Health</h3>
                                <p className="text-[10px] font-bold text-gray-600 uppercase">Maintenance Resolution Status</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {[
                                { label: 'High Priority', value: '04', color: 'bg-red-500' },
                                { label: 'Normal Traffic', value: '28', color: 'bg-purple-500' },
                                { label: 'Resolved (24h)', value: '18', color: 'bg-emerald-500' },
                            ].map(item => (
                                <div key={item.label}>
                                    <div className="flex justify-between text-[10px] font-black text-gray-600 uppercase mb-2">
                                        <span>{item.label}</span>
                                        <span className="text-white">{item.value}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.random() * 60 + 20}%` }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
