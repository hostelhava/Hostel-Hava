'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Bed,
    Users,
    MoreVertical,
    Activity,
    ShieldCheck,
    Wrench,
    ArrowUpRight
} from 'lucide-react';

const roomsMock = [
    { id: '101', type: 'Premium', floor: '1st', capacity: 2, occupied: 2, price: '8,000', status: 'Full' },
    { id: '102', type: 'Standard', floor: '1st', capacity: 4, occupied: 2, price: '5,000', status: 'Available' },
    { id: '103', type: 'Premium', floor: '1st', capacity: 2, occupied: 0, price: '8,000', status: 'Available' },
    { id: '201', type: 'Standard', floor: '2nd', capacity: 4, occupied: 4, price: '5,000', status: 'Full' },
    { id: '202', type: 'Standard', floor: '2nd', capacity: 4, occupied: 1, price: '5,000', status: 'Available' },
    { id: '301', type: 'Executive', floor: '3rd', capacity: 1, occupied: 0, price: '12,000', status: 'Maintenance' },
    { id: '302', type: 'Standard', floor: '3rd', capacity: 4, occupied: 3, price: '5,000', status: 'Available' },
    { id: '401', type: 'Premium', floor: '4th', capacity: 2, occupied: 1, price: '8,000', status: 'Available' },
];

export default function RoomsPage() {
    const [filter, setFilter] = useState('All');

    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Room Inventory</h1>
                    <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-[2px] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        Live Capacity Monitoring
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find room ID..."
                            className="pl-12 pr-6 py-4 bg-[#111111] border border-white/5 rounded-[24px] text-sm font-bold text-white focus:outline-none focus:border-purple-500/30 transition-all w-72 shadow-2xl"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-600 text-white px-8 py-4 rounded-[24px] font-black text-sm flex items-center gap-3 shadow-xl shadow-purple-500/20 hover:bg-purple-500 transition-all"
                    >
                        <Plus className="w-5 h-5" />
                        ADD ROOM
                    </motion.button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Capacity', value: '124', sub: 'Beds', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'Available Now', value: '26', sub: 'Spaces', icon: ShieldCheck, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                    { label: 'Repair Log', value: '04', sub: 'Rooms', icon: Wrench, color: 'text-gray-400', bg: 'bg-white/10' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-[#111111] p-8 rounded-[40px] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-white/10 transition-all"
                    >
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 ${stat.bg} rounded-[24px] flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] mb-1">{stat.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-black text-white">{stat.value}</span>
                                    <span className="text-xs font-bold text-gray-600">{stat.sub}</span>
                                </div>
                            </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-gray-700 group-hover:text-purple-500 transition-colors" />
                    </motion.div>
                ))}
            </div>

            {/* Filter Bar */}
            <div className="flex items-center gap-3 bg-[#111111] p-2 rounded-[28px] border border-white/5 w-fit">
                {['All', 'Premium', 'Standard', 'Maintenance'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setFilter(t)}
                        className={`px-8 py-3 rounded-[22px] text-[11px] font-black uppercase tracking-wider transition-all ${filter === t
                            ? 'bg-white text-black shadow-lg shadow-white/5'
                            : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {roomsMock.filter(r => filter === 'All' || r.type === filter || (filter === 'Maintenance' && r.status === 'Maintenance')).map((room, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        whileHover={{ y: -8 }}
                        key={room.id}
                        className="group bg-[#111111] rounded-[48px] p-8 border border-white/5 hover:border-white/10 transition-all relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="w-14 h-14 bg-[#1C1C1E] rounded-3xl flex items-center justify-center font-black text-purple-400 text-xl border border-white/5 transition-transform group-hover:-rotate-6">
                                {room.id}
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className={`text-[9px] font-black uppercase tracking-[2px] px-4 py-1.5 rounded-full ${room.status === 'Full'
                                    ? 'bg-red-500/10 text-red-500'
                                    : room.status === 'Maintenance'
                                        ? 'bg-gray-500/10 text-gray-500'
                                        : 'bg-purple-500/10 text-purple-400'
                                    }`}>
                                    {room.status}
                                </span>
                                <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{room.floor} Floor</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="font-black text-white text-xl tracking-tight">{room.type} Suite</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-purple-500 font-bold text-sm">₹{room.price}</span>
                                    <span className="text-gray-700 text-[10px] font-bold">/ MONTH</span>
                                </div>
                            </div>

                            {/* Bed Occupancy Dots */}
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Occupancy</p>
                                <div className="flex gap-3">
                                    {[...Array(room.capacity)].map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-4 h-4 rounded-full transition-all duration-700 ${idx < room.occupied
                                                ? 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                                                : 'bg-[#1C1C1E] border border-white/5'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                <div className="flex -space-x-3">
                                    {[...Array(room.occupied)].map((_, idx) => (
                                        <div key={idx} className="w-10 h-10 rounded-full border-[3px] border-[#111111] overflow-hidden bg-[#1C1C1E] ring-1 ring-purple-500/10">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=room${room.id + idx}`} alt="avatar" />
                                        </div>
                                    ))}
                                    {room.occupied < room.capacity && (
                                        <div className="w-10 h-10 rounded-full border-[3px] border-[#111111] bg-[#1C1C1E] flex items-center justify-center text-[10px] font-black text-gray-600 ring-1 ring-white/5">
                                            +{room.capacity - room.occupied}
                                        </div>
                                    )}
                                </div>
                                <motion.button
                                    whileHover={{ rotate: 90 }}
                                    className="p-2 text-gray-600 hover:text-white transition-colors"
                                >
                                    <MoreVertical className="w-6 h-6" />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
