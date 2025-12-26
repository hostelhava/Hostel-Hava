'use client';

import {
    Users,
    Bed,
    Ticket,
    TrendingUp,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

const stats = [
    { label: 'Total Residents', value: '45', icon: Users },
    { label: 'Bed Occupancy', value: '56%', icon: Bed },
    { label: 'Active Tickets', value: '3', icon: Ticket },
    { label: 'Monthly Revenue', value: '₹1.2L', icon: TrendingUp },
];

const recentActivities = [
    { id: 1, text: 'New resident registered: Anil Kumar', time: '2 hours ago', status: 'success' },
    { id: 2, text: 'Payment received from Rahul Varma', time: '5 hours ago', status: 'success' },
    { id: 3, text: 'New maintenance ticket: Room 102', time: 'Yesterday', status: 'warning' },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">System Dashboard</h1>
                <p className="text-gray-500 mt-1">Operational overview and recent system events.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="p-5 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between text-gray-400 mb-3">
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{stat.label}</p>
                        <h2 className="text-2xl font-semibold text-gray-900 mt-1">{stat.value}</h2>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                        <h3 className="font-semibold text-gray-800">Recent Activity</h3>
                        <button className="text-xs text-indigo-600 font-medium hover:underline">View All</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {recentActivities.map((activity) => (
                            <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-gray-50 transition-colors">
                                <div className={`mt-1 ${activity.status === 'success' ? 'text-emerald-500' : 'text-orange-500'
                                    }`}>
                                    {activity.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                </div>
                                <div>
                                    <p className="text-gray-700">{activity.text}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Info */}
                <div className="border border-gray-200 rounded-lg bg-white p-6">
                    <h3 className="font-semibold text-gray-800 mb-6 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        System Status
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">API Gateway</span>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Online</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Database Connection</span>
                            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Active</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500">Last Sync</span>
                            <span className="text-xs font-mono text-gray-400">2025-12-26 15:51 UTC</span>
                        </div>
                    </div>

                    <div className="mt-10 p-4 bg-indigo-50 border border-indigo-100 rounded-md">
                        <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-widest">Admin Note</h4>
                        <p className="text-xs text-indigo-600 mt-2 leading-relaxed">
                            New residents will be assigned to VACANT beds by default. Use the Rooms module to change bed status.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
