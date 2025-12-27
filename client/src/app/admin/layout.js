'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Bed,
    Users,
    Ticket,
    CreditCard,
    Megaphone,
    LogOut,
    Bell,
    Settings as SettingsIcon,
    CircleUser,
    Search
} from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Bed, label: 'Rooms', href: '/admin/rooms' },
    { icon: Users, label: 'Residents', href: '/admin/residents' },
    { icon: Ticket, label: 'Tickets', href: '/admin/tickets' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    { icon: Megaphone, label: 'Announcements', href: '/admin/announcements', badge: '+3' },
];

export default function AdminLayout({ children }) {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
        const token = localStorage.getItem('admin_token');
        if (!token && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [pathname, router]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    if (!isMounted) return null;

    return (
        <>
            <Toaster position="top-center" reverseOrder={false}
                toastOptions={{
                    style: {
                        background: '#111111',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.05)',
                        fontSize: '11px',
                        fontWeight: '900',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        padding: '16px 24px'
                    }
                }}
            />

            {pathname === '/admin/login' ? (
                children
            ) : (
                <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
                    {/* --- FIXED SIDEBAR --- */}
                    <aside
                        className="w-[280px] h-full bg-black flex flex-col items-center py-6 border-r border-white/5 shrink-0 z-[100] relative shadow-[10px_0_30px_rgba(139,92,246,0.05)] overflow-hidden"
                    >
                        {/* Visual Glow behind logo */}
                        <div className="absolute top-0 left-0 w-full h-32 bg-purple-600/10 blur-[50px] pointer-events-none" />

                        {/* Logo Section */}
                        <div className="flex items-center gap-4 mb-10 px-8 w-full relative z-10 transition-all">
                            <div className="w-11 h-11 bg-[#111111] border border-white/10 rounded-2xl flex items-center justify-center rotate-3 shadow-lg shadow-purple-500/10 shrink-0">
                                <span className="text-purple-500 font-black text-2xl italic">N</span>
                            </div>
                            <span className="font-black text-2xl tracking-tight text-white uppercase tracking-[3px]">
                                NeSt
                            </span>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1 flex flex-col space-y-2 w-full px-4 relative z-10">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link key={item.href} href={item.href} className="w-full">
                                        <div className={`flex items-center gap-4 px-6 py-4 rounded-[20px] transition-all duration-300 group relative ${isActive
                                            ? 'bg-white/5 text-white shadow-lg'
                                            : 'text-gray-500 hover:text-purple-400 hover:bg-white/[0.02]'
                                            }`}>

                                            <item.icon className={`w-5 h-5 shrink-0 transition-colors ${isActive ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />

                                            <span className="font-bold text-[13px] whitespace-nowrap uppercase tracking-widest">
                                                {item.label}
                                            </span>

                                            {item.badge && (
                                                <span className="ml-auto bg-purple-600 text-white text-[9px] px-2 py-0.5 rounded-full font-black shadow-lg shadow-purple-500/40">
                                                    {item.badge}
                                                </span>
                                            )}

                                            {/* Active Indicator Hook */}
                                            {isActive && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-purple-500 rounded-r-full shadow-[0_0_15px_rgba(168,85,247,0.8)]" />
                                            )}
                                        </div>
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Logout Button */}
                        <div className="w-full px-4 mb-4 relative z-10">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-4 px-6 py-4 w-full rounded-[20px] text-gray-500 hover:bg-red-500/10 hover:text-red-400 transition-all group"
                            >
                                <LogOut className="w-5 h-5 group-hover:text-red-400 shrink-0" />
                                <span className="font-bold text-[13px] uppercase tracking-widest">Log Out</span>
                            </button>
                        </div>
                    </aside>

                    {/* --- MAIN CONTENT WRAPPER --- */}
                    <div className="flex-1 flex flex-col h-full overflow-hidden relative">

                        {/* Background Blobs for Atmosphere */}
                        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[80px] pointer-events-none" />

                        {/* Header */}
                        <header className="h-20 flex items-center justify-end px-10 bg-transparent shrink-0 z-10 relative">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4 bg-[#111111] p-2 rounded-[28px] border border-white/5">
                                    {/* <button className="p-3 text-gray-600 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all relative">
                                        <Bell className="w-5 h-5" />
                                        <span className="absolute top-3 right-3 w-2 h-2 bg-purple-500 border-2 border-[#111111] rounded-full"></span>
                                    </button> */}
                                    {/* <button className="p-3 text-gray-600 hover:text-purple-400 hover:bg-white/5 rounded-full transition-all">
                                        <SettingsIcon className="w-5 h-5" />
                                    </button> */}
                                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-[#1C1C1E] shadow-xl cursor-pointer ring-2 ring-purple-500/10 transition-all">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Page Content with Independent Scrolling */}
                        <main className="flex-1 overflow-y-auto px-10 pb-10">
                            <div className="max-w-[1700px] mx-auto">
                                {children}
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}
