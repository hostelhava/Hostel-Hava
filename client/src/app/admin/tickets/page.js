'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Ticket,
    Clock,
    CheckCircle2,
    AlertCircle,
    Search,
    MoreVertical,
    MessageSquare,
    User,
    ArrowUpRight,
    Wrench,
    Wifi,
    Zap,
    ShieldAlert,
    Plus,
    Activity,
    Layers
} from 'lucide-react';

const ticketsMock = [
    { id: 'TKT-1082', subject: 'Leaky Faucet in Bathroom', category: 'Plumbing', priority: 'High', status: 'Open', resident: 'Felix Brown', room: '101', date: '2 hours ago' },
    { id: 'TKT-1081', subject: 'Wi-Fi Connection Dropping', category: 'Internet', priority: 'Medium', status: 'In-Progress', resident: 'Sarah Miller', room: '101', date: '5 hours ago' },
    { id: 'TKT-1080', subject: 'Broken Light Switch', category: 'Electrical', priority: 'High', status: 'Open', resident: 'Elena Rodriguez', room: '102', date: '1 day ago' },
    { id: 'TKT-1079', subject: 'AC Filter Cleaning', category: 'Maintenance', priority: 'Low', status: 'Resolved', resident: 'David Chen', room: '202', date: '2 days ago' },
    { id: 'TKT-1078', subject: 'Security Breach Report', category: 'Security', priority: 'Urgent', status: 'In-Progress', resident: 'Aisha Khan', room: '102', date: '3 days ago' },
];

const categoryIcons = {
    Plumbing: <Wrench className="w-5 h-5" />,
    Internet: <Wifi className="w-5 h-5" />,
    Electrical: <Zap className="w-5 h-5" />,
    Maintenance: <ArrowUpRight className="w-5 h-5" />,
    Security: <ShieldAlert className="w-5 h-5" />
};

export default function TicketsPage() {
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTickets = ticketsMock.filter(t => {
        const matchesFilter = filterStatus === 'All' || t.status === filterStatus;
        const matchesSearch = t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Support Tickets</h1>
                    <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-[2px] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        Active Incident Monitoring
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find ticket ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-[#111111] border border-white/5 rounded-[24px] text-sm font-bold text-white focus:outline-none focus:border-purple-500/30 transition-all w-72 shadow-2xl"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-600 text-white px-8 py-4 rounded-[24px] font-black text-sm flex items-center gap-3 shadow-xl shadow-purple-500/20"
                    >
                        <Plus className="w-5 h-5" />
                        NEW TICKET
                    </motion.button>
                </div>
            </div>

            {/* Quick Stats Bento */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Volume', value: '142', icon: Layers, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'Unassigned', value: '12', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-400/10' },
                    { label: 'Active Work', value: '28', icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                    { label: 'Finalized', value: '102', icon: CheckCircle2, color: 'text-gray-400', bg: 'bg-white/10' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-[#111111] p-7 rounded-[40px] border border-white/5 flex flex-col gap-5 hover:border-white/10 transition-all group"
                    >
                        <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-[20px] flex items-center justify-center transition-transform group-hover:scale-110`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filter Pill List */}
            <div className="flex items-center gap-3 bg-[#111111] p-2 rounded-[28px] border border-white/5 w-fit">
                {['All', 'Open', 'In-Progress', 'Resolved'].map((s) => (
                    <button
                        key={s}
                        onClick={() => setFilterStatus(s)}
                        className={`px-8 py-3 rounded-[22px] text-[11px] font-black uppercase tracking-wider transition-all ${filterStatus === s
                            ? 'bg-white text-black shadow-lg shadow-white/5'
                            : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {s}
                    </button>
                ))}
            </div>

            {/* Ticket Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <AnimatePresence mode='popLayout'>
                    {filteredTickets.map((ticket, i) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            key={ticket.id}
                            className="bg-[#111111] rounded-[48px] p-8 border border-white/5 hover:border-white/10 transition-all relative overflow-hidden group"
                        >
                            <div className="flex justify-between items-start mb-8">
                                <div className="flex items-center gap-5">
                                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-transform group-hover:rotate-6 ${ticket.status === 'Open' ? 'bg-red-500/10 text-red-500' :
                                        ticket.status === 'In-Progress' ? 'bg-yellow-500/10 text-yellow-500' :
                                            'bg-purple-500/10 text-purple-400'
                                        }`}>
                                        {categoryIcons[ticket.category] || <Ticket className="w-6 h-6" />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">{ticket.id}</p>
                                        <h3 className="font-black text-white text-xl tracking-tight leading-tight">{ticket.subject}</h3>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className={`text-[9px] font-black uppercase tracking-[2px] px-4 py-1.5 rounded-full ${ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'bg-red-500/10 text-red-500' :
                                        ticket.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                                            'bg-purple-500/10 text-purple-400'
                                        }`}>
                                        {ticket.priority} PRIORITY
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-700 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" /> {ticket.date}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="bg-[#1C1C1E] p-5 rounded-[32px] border border-white/5">
                                    <p className="text-[9px] font-black text-gray-700 uppercase tracking-[2px] mb-2 leading-none">Reporter</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full overflow-hidden bg-black ring-2 ring-purple-500/10">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${ticket.resident}`} alt="avatar" />
                                        </div>
                                        <span className="text-xs font-black text-white">{ticket.resident}</span>
                                    </div>
                                </div>
                                <div className="bg-[#1C1C1E] p-5 rounded-[32px] border border-white/5">
                                    <p className="text-[9px] font-black text-gray-700 uppercase tracking-[2px] mb-2 leading-none">Location</p>
                                    <span className="text-xs font-black text-purple-400 tracking-tight uppercase">UNIT {ticket.room}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2].map(x => (
                                            <div key={x} className="w-9 h-9 rounded-full border-[3px] border-[#111111] bg-[#1C1C1E] flex items-center justify-center ring-1 ring-white/5">
                                                <User className="w-4 h-4 text-gray-700" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Watching</span>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2.5 px-6 py-3 bg-[#1C1C1E] hover:bg-white hover:text-black border border-white/5 rounded-[20px] text-[11px] font-black uppercase tracking-wider transition-all">
                                        <MessageSquare className="w-4 h-4" />
                                        Respond
                                    </button>
                                    <button className="p-2.5 text-gray-700 hover:text-white transition-colors">
                                        <MoreVertical className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}

