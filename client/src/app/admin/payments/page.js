'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    CreditCard,
    Download,
    ArrowUpRight,
    Search,
    MoreVertical,
    Wallet,
    TrendingUp,
    CheckCircle2,
    Clock,
    XCircle,
    Banknote,
    QrCode,
    Activity,
    DollarSign,
    Target
} from 'lucide-react';

const transactionMock = [
    { id: 'TXN-9021', resident: 'Felix Brown', room: '101', amount: '8,000', method: 'UPI', date: '24 May 2024', status: 'Completed', type: 'Rent' },
    { id: 'TXN-9020', resident: 'Sarah Miller', room: '101', amount: '8,000', method: 'Card', date: '23 May 2024', status: 'Completed', type: 'Rent' },
    { id: 'TXN-9019', resident: 'David Chen', room: '202', amount: '2,500', method: 'Cash', date: '22 May 2024', status: 'Pending', type: 'Security' },
    { id: 'TXN-9018', resident: 'Elena Rodriguez', room: '102', amount: '5,000', method: 'UPI', date: '21 May 2024', status: 'Failed', type: 'Rent' },
    { id: 'TXN-9017', resident: 'James Wilson', room: '201', amount: '5,000', method: 'Bank Transfer', date: '20 May 2024', status: 'Completed', type: 'Rent' },
    { id: 'TXN-9016', resident: 'Aisha Khan', room: '102', amount: '12,000', method: 'UPI', date: '19 May 2024', status: 'Completed', type: 'Annual' },
];

export default function PaymentsPage() {
    const [filterStatus, setFilterStatus] = useState('All');

    return (
        <div className="space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tight">Finances & Payments</h1>
                    <p className="text-gray-500 font-bold text-sm mt-1 uppercase tracking-[2px] flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-500" />
                        Revenue Ledger & Tracking
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find transaction..."
                            className="pl-12 pr-6 py-4 bg-[#111111] border border-white/5 rounded-[24px] text-sm font-bold text-white focus:outline-none focus:border-purple-500/30 transition-all w-72 shadow-2xl"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black px-8 py-4 rounded-[24px] font-black text-sm flex items-center gap-3 shadow-xl shadow-white/5"
                    >
                        <Download className="w-5 h-5" />
                        EXPORT REPORT
                    </motion.button>
                </div>
            </div>

            {/* Financial Bento Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] rounded-[48px] p-10 border border-white/5 relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                        <Wallet className="w-32 h-32 text-purple-500" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#8B5CF6]" />
                            <p className="text-gray-500 font-black text-xs uppercase tracking-[3px]">Total Collections</p>
                        </div>
                        <div className="flex items-baseline gap-6 mb-10">
                            <h2 className="text-6xl font-black text-white tracking-tighter">₹1,25,000</h2>
                            <span className="flex items-center gap-1.5 bg-purple-500/10 px-4 py-2 rounded-full text-[11px] font-black text-purple-400">
                                <TrendingUp className="w-3 h-3" /> +12.5%
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                            <div>
                                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[2px] mb-2 flex items-center gap-2">
                                    <Target className="w-3 h-3 text-purple-500" /> Revenue Goal
                                </p>
                                <p className="text-2xl font-black text-white">₹2,00k</p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-[10px] font-black uppercase tracking-[2px] mb-2 flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-yellow-500" /> Pending Invoices
                                </p>
                                <p className="text-2xl font-black text-white">₹75k</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {[
                    { label: 'Unpaid Dues', value: '₹42,500', icon: DollarSign, color: 'text-red-400', bg: 'bg-red-400/10' },
                    { label: 'Failed Ops', value: '04', icon: XCircle, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
                ].map((stat, i) => (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={stat.label}
                        className="bg-[#111111] rounded-[48px] p-8 border border-white/5 flex flex-col justify-between hover:border-white/10 transition-all group"
                    >
                        <div className={`w-16 h-16 ${stat.bg} rounded-3xl flex items-center justify-center transition-transform group-hover:rotate-6`}>
                            <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-gray-600 font-black text-[10px] uppercase tracking-[2px] mb-1">{stat.label}</p>
                            <h3 className={`text-4xl font-black ${stat.color}`}>{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Transactions Section */}
            <div className="bg-[#111111] rounded-[48px] border border-white/5 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
                <div className="p-10 border-b border-white/5 flex flex-col lg:flex-row items-center justify-between gap-8">
                    <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-[4px]">Verified Records</h3>
                        <p className="text-gray-600 text-[11px] font-bold mt-1 tracking-wider">Live stream of inmate transaction events</p>
                    </div>

                    <div className="flex items-center gap-2 bg-black p-1.5 rounded-[24px] border border-white/5">
                        {['All', 'Completed', 'Pending', 'Failed'].map(s => (
                            <button
                                key={s}
                                onClick={() => setFilterStatus(s)}
                                className={`px-8 py-2.5 rounded-[20px] text-[10px] font-black transition-all uppercase tracking-[2px] ${filterStatus === s
                                    ? 'bg-white text-black shadow-lg shadow-white/10'
                                    : 'text-gray-600 hover:text-white'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#1C1C1E]/30">
                                <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Identifier</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Resident Entity</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Magnitude</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Channel</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Verification</th>
                                <th className="px-10 py-6 text-[10px] font-black text-gray-600 uppercase tracking-[2px]">Epoch</th>
                                <th className="px-10 py-6 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {transactionMock.filter(t => filterStatus === 'All' || t.status === filterStatus).map((txn, i) => (
                                <motion.tr
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={txn.id}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-10 py-8">
                                        <span className="text-[11px] font-black text-white bg-[#1C1C1E] px-4 py-2 rounded-xl border border-white/5 tracking-tighter uppercase">
                                            {txn.id}
                                        </span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div>
                                            <p className="text-sm font-black text-white">{txn.resident}</p>
                                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Unit {txn.room}</p>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="text-xl font-black text-white tracking-tight">₹{txn.amount}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center border border-white/5">
                                                {txn.method === 'UPI' ? <QrCode className="w-5 h-5 text-purple-400" /> : <Banknote className="w-5 h-5 text-yellow-400" />}
                                            </div>
                                            <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{txn.method}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            {txn.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-purple-400" /> : txn.status === 'Pending' ? <Clock className="w-4 h-4 text-yellow-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                                            <span className={`text-[10px] font-black uppercase tracking-[2px] ${txn.status === 'Completed' ? 'text-purple-400' : txn.status === 'Pending' ? 'text-yellow-400' : 'text-red-400'
                                                }`}>
                                                {txn.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <p className="text-xs font-black text-gray-700">{txn.date}</p>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <button className="p-2.5 text-gray-700 hover:text-white transition-colors hover:bg-white/5 rounded-xl">
                                            <MoreVertical className="w-6 h-6" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
