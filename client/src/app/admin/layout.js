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
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { Toaster } from 'react-hot-toast';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Bed, label: 'Rooms', href: '/admin/rooms' },
    { icon: Users, label: 'Residents', href: '/admin/residents' },
    { icon: Ticket, label: 'Tickets', href: '/admin/tickets' },
    { icon: CreditCard, label: 'Payments', href: '/admin/payments' },
    { icon: Megaphone, label: 'Announcements', href: '/admin/announcements' },
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
    if (pathname === '/admin/login') return <>{children}</>;

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans flex text-sm">
            <Toaster position="top-right" />

            {/* Static Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-gray-50 flex flex-col fixed inset-y-0">
                <div className="p-6 flex items-center gap-3 border-b border-gray-200 bg-white">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    <span className="font-semibold text-base tracking-tight">Hostel Hava</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href}>
                                <div className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
                                    }`}>
                                    <item.icon className="w-4 h-4" />
                                    {item.label}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 pl-64 bg-white">
                <header className="h-16 border-b border-gray-200 flex items-center px-8 bg-white sticky top-0 z-10">
                    <h2 className="font-medium text-gray-500 capitalize">{pathname.split('/').pop()}</h2>
                </header>
                <div className="p-8 max-w-6xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
