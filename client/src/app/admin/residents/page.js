'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Plus,
    Search,
    Users,
    MoreVertical,
    ExternalLink,
    Mail,
    Phone,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Search as SearchIcon,
    CreditCard,
    AlertCircle,
    ArrowUpRight,
    MapPin
} from 'lucide-react';

const residentsMock = [
    { id: 'R-001', name: 'Felix Brown', room: '101', joinDate: 'Jan 12, 2024', status: 'Active', email: 'felix@example.com', phone: '+91 98765 43210' },
    { id: 'R-002', name: 'Sarah Miller', room: '101', joinDate: 'Feb 05, 2024', status: 'Active', email: 'sarah.m@example.com', phone: '+91 98765 43211' },
    { id: 'R-003', name: 'James Wilson', room: '201', joinDate: 'Mar 15, 2024', status: 'Inactive', email: 'james.w@example.com', phone: '+91 98765 43212' },
    { id: 'R-004', name: 'Elena Rodriguez', room: '102', joinDate: 'Dec 20, 2023', status: 'Active', email: 'elena.r@example.com', phone: '+91 98765 43213' },
    { id: 'R-005', name: 'David Chen', room: '202', joinDate: 'Apr 02, 2024', status: 'Pending', email: 'david.c@example.com', phone: '+91 98765 43214' },
    { id: 'R-006', name: 'Aisha Khan', room: '102', joinDate: 'Jan 28, 2024', status: 'Active', email: 'aisha.k@example.com', phone: '+91 98765 43215' },
    { id: 'R-007', name: 'Leo Martinez', room: '301', joinDate: 'Mar 22, 2024', status: 'Pending', email: 'leo.m@example.com', phone: '+91 98765 43216' },
];

export default function ResidentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const filteredResidents = residentsMock.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || r.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-10 pb-12">
            {/* Header Section */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Residents Register</h1>
                    <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-[2px] flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-purple-500" />
                        Hostel Census & Directory
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find by name or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-6 py-4 bg-[#111111] border border-white/5 rounded-[24px] text-sm font-bold text-white focus:outline-none focus:border-purple-500/30 transition-all w-80 shadow-2xl"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-purple-600 text-white px-8 py-4 rounded-[24px] font-black text-sm flex items-center gap-3 shadow-xl shadow-purple-500/20"
                    >
                        <Plus className="w-5 h-5" />
                        ADD RESIDENT
                    </motion.button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: 'Total Census', value: '1,248', change: '+2.5%', icon: Users, color: 'text-purple-400', bg: 'bg-purple-400/10' },
                    { label: 'New Arrivals', value: '32', change: 'Week', icon: Calendar, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                    { label: 'Unpaid Fees', value: '14', change: 'Alert', icon: CreditCard, color: 'text-red-400', bg: 'bg-red-400/10' },
                    { label: 'Active Tasks', value: '3', change: 'Fixed', icon: AlertCircle, color: 'text-gray-400', bg: 'bg-white/10' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-[#111111] p-6 rounded-[40px] border border-white/5 flex items-center gap-5 hover:border-white/10 transition-all group"
                    >
                        <div className={`w-14 h-14 ${stat.bg} rounded-[20px] flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-gray-600 uppercase tracking-[2px]">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-white">{stat.value}</span>
                                <span className={`text-[9px] font-bold ${stat.color}`}>{stat.change}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Table Section */}
            <div className="bg-[#111111] rounded-[48px] border border-white/5 shadow-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5 flex flex-wrap items-center justify-between gap-6">
                    <h3 className="font-black text-white text-sm uppercase tracking-widest tracking-[3px]">Inmate Directory</h3>
                    <div className="flex items-center gap-2 bg-black p-1.5 rounded-[24px] border border-white/5">
                        {['All', 'Active', 'Pending', 'Inactive'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-6 py-2 rounded-[18px] text-[10px] font-black transition-all uppercase tracking-wider ${filterStatus === s
                                    ? 'bg-white text-black shadow-lg'
                                    : 'text-gray-600 hover:text-white'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#1C1C1E]/30">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Resident Name</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Room Allocation</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Communication</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Join Epoch</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Verification</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredResidents.map((resident, i) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={resident.id}
                                    className="hover:bg-white/5 transition-all group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full border-2 border-[#1C1C1E] overflow-hidden bg-black ring-2 ring-purple-500/10 group-hover:ring-purple-500 transition-all">
                                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${resident.name}`} alt="avatar" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white">{resident.name}</p>
                                                <p className="text-[10px] font-bold text-gray-600">{resident.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-4 py-2 bg-[#1C1C1E] text-purple-400 rounded-xl text-[11px] font-black border border-white/5">
                                            UNIT {resident.room}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center gap-2 text-gray-500 group-hover:text-gray-300">
                                                <Mail className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-bold tracking-tight">{resident.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone className="w-3.5 h-3.5" />
                                                <span className="text-[11px] font-bold tracking-tight">{resident.phone}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-xs font-black text-gray-400">
                                        {resident.joinDate}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${resident.status === 'Active' ? 'bg-purple-500/10 text-purple-400' :
                                            resident.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                'bg-gray-500/10 text-gray-500'
                                            }`}>
                                            {resident.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            <button className="p-2.5 text-gray-600 hover:text-purple-400 hover:bg-purple-500/10 rounded-xl transition-all">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                            <button className="p-2.5 text-gray-600 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-8 py-8 border-t border-white/5 flex items-center justify-between bg-[#1C1C1E]/20">
                    <p className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Page 01 <span className="text-gray-800 mx-2">/</span> Of 48</p>
                    <div className="flex gap-3">
                        <button className="p-3 text-gray-600 bg-black border border-white/5 rounded-[20px] hover:text-white transition-all">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button className="p-3 text-black bg-white rounded-[20px] shadow-lg shadow-white/5 transition-all">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}


