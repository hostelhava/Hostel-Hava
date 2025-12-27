'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Megaphone,
    Send,
    Users,
    Bell,
    MoreVertical,
    Trash2,
    Edit3,
    Eye,
    CheckCircle2,
    Clock,
    Plus,
    Search,
    Pin,
    AlertTriangle,
    Info,
    PartyPopper,
    Activity,
    Signal,
    Radio
} from 'lucide-react';

const announcementsMock = [
    {
        id: 'ANN-001',
        title: 'Sunday Brunch Special',
        content: 'Join us this Sunday for a special North Indian buffet in the mess hall. 11:00 AM onwards!',
        target: 'All Residents',
        date: '2 hours ago',
        type: 'Event',
        status: 'Published',
        pinned: true
    },
    {
        id: 'ANN-002',
        title: 'Water Supply Maintenance',
        content: 'There will be a scheduled water outage for plumbing repairs on Monday from 10 AM to 2 PM.',
        target: 'All Blocks',
        date: '5 hours ago',
        type: 'Alert',
        status: 'Scheduled',
        pinned: false
    },
    {
        id: 'ANN-003',
        title: 'New Night-Entry Rules',
        content: 'Please note the revised night entry timings effective from 1st June. Check circular for details.',
        target: 'All Residents',
        date: '1 day ago',
        type: 'Info',
        status: 'Published',
        pinned: false
    },
];

const typeStyles = {
    Event: { icon: PartyPopper, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    Alert: { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-400/10' },
    Info: { icon: Info, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
};

export default function AnnouncementsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Broadcast Center</h1>
                    <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-[2px] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        Live Bulletin Transmission
                    </p>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-purple-600 text-white px-8 py-4 rounded-[24px] font-black text-sm flex items-center gap-3 shadow-xl shadow-purple-500/20"
                >
                    <Send className="w-5 h-5" />
                    NEW BROADCAST
                </motion.button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* Left: Compose & Stats */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-[#111111] rounded-[40px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                            <Radio className="w-24 h-24 text-purple-500" />
                        </div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[4px] mb-8">Transmission Stats</h3>

                        <div className="space-y-8">
                            {[
                                { label: 'Reach SMS/Push', value: '4,102', icon: Signal, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                                { label: 'Read Ratio', value: '88%', icon: Eye, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                                { label: 'Active Alerts', value: '02', icon: Bell, color: 'text-red-400', bg: 'bg-red-400/10' },
                            ].map(s => (
                                <div key={s.label} className="flex items-center gap-5">
                                    <div className={`w-12 h-12 rounded-2xl ${s.bg} flex items-center justify-center ${s.color}`}>
                                        <s.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-700 uppercase tracking-[2px]">{s.label}</p>
                                        <p className="text-xl font-black text-white tracking-tight">{s.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-white/5">
                            <button className="w-full py-4 bg-black text-gray-500 font-black text-[11px] rounded-[20px] hover:text-white border border-white/5 transition-all uppercase tracking-[2px]">
                                Full Logs View
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#1C1C1E] to-black rounded-[40px] p-8 border border-white/5 shadow-2xl">
                        <h3 className="text-sm font-black text-white uppercase tracking-[3px] mb-4 flex items-center gap-3">
                            <Users className="w-5 h-5 text-purple-500" />
                            Target Matrix
                        </h3>
                        <p className="text-gray-600 text-xs font-bold leading-relaxed mb-8">
                            Reach subsets of the hostel population based on wing, block, or type.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {['All Units', 'Block Alpha', 'Girls Wing', 'Suite Floor'].map(tag => (
                                <span key={tag} className="px-5 py-2.5 bg-[#1C1C1E] rounded-xl text-[10px] font-black text-purple-400 border border-white/5 hover:bg-purple-500/10 cursor-pointer transition-all uppercase tracking-wider">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="font-black text-white uppercase tracking-[4px] text-sm">Activity Bulletin</h3>
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-purple-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Find bulletins..."
                                className="pl-11 pr-6 py-3 bg-[#111111] border border-white/5 rounded-[20px] text-[12px] font-black text-white focus:outline-none focus:border-purple-500/30 w-72 transition-all shadow-xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {announcementsMock.map((ann, i) => {
                            const Style = typeStyles[ann.type] || typeStyles.Info;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={ann.id}
                                    className="bg-[#111111] rounded-[48px] p-8 border border-white/5 shadow-2xl hover:border-white/10 transition-all group relative overflow-hidden"
                                >
                                    {ann.pinned && (
                                        <div className="absolute top-8 right-8 p-3 bg-purple-500/10 text-purple-400 rounded-2xl shadow-[0_0_20px_rgba(139,92,246,0.1)] border border-purple-500/20">
                                            <Pin className="w-5 h-5" />
                                        </div>
                                    )}

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className={`w-16 h-16 ${Style.bg} ${Style.color} rounded-[24px] flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6`}>
                                            <Style.icon className="w-8 h-8" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`text-[10px] font-black uppercase tracking-[3px] ${Style.color}`}>{ann.type}</span>
                                                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                                                <span className="text-[10px] font-bold text-gray-700 uppercase tracking-widest">{ann.date}</span>
                                            </div>
                                            <h4 className="text-2xl font-black text-white mb-3 tracking-tight">{ann.title}</h4>
                                            <p className="text-gray-500 text-[15px] font-medium leading-relaxed mb-8 pr-12">
                                                {ann.content}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className="flex items-center gap-3 px-5 py-2.5 bg-[#1C1C1E] rounded-xl text-[10px] font-black text-purple-400 border border-white/5 uppercase tracking-wider">
                                                        <Users className="w-4 h-4" />
                                                        {ann.target}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className={`w-2 h-2 rounded-full ${ann.status === 'Published' ? 'bg-purple-500 animate-pulse shadow-[0_0_10px_#8B5CF6]' : 'bg-yellow-500'}`} />
                                                        <span className={`text-[10px] font-black uppercase tracking-[2px] ${ann.status === 'Published' ? 'text-purple-400' : 'text-yellow-400'}`}>
                                                            {ann.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-3 text-gray-700 hover:text-white bg-[#1C1C1E] rounded-xl border border-white/5 transition-all">
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button className="p-3 text-gray-700 hover:text-red-400 bg-[#1C1C1E] rounded-xl border border-white/5 transition-all">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
