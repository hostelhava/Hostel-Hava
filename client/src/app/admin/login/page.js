'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader2, ArrowRight, Lock, Mail, ChevronRight, Activity } from 'lucide-react';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('/auth/login', { email, password });
            const { access_token } = response.data;

            localStorage.setItem('admin_token', access_token);
            toast.success('Access Granted');

            setTimeout(() => {
                router.push('/admin/dashboard');
            }, 500);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Access Denied');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black font-sans selection:bg-purple-500/30 overflow-hidden relative">
            {/* Cinematic Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-50 contrast-150" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-[460px] px-6 relative z-10"
            >
                {/* Logo & Header */}
                <div className="text-center mb-12 flex flex-col items-center">


                    <h1 className="text-3xl font-black text-white tracking-tighter uppercase mb-2">
                        Command Terminal
                    </h1>
                    <p className="text-gray-500 font-bold text-[10px] uppercase tracking-[4px] flex items-center gap-2">
                        <Activity className="w-3 h-3 text-purple-500" />
                        Secure <span className="text-white">NeSt</span> Authentication
                    </p>
                </div>

                <div className="bg-[#111111] border border-white/5 rounded-[48px] p-8 md:p-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-[60px] -mr-16 -mt-16 pointer-events-none" />

                    <form onSubmit={handleLogin} className="space-y-8">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-gray-700 uppercase tracking-[3px] ml-1">Identity Code</label>
                            <div className="relative group">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-black border border-white/5 rounded-[24px] focus:border-purple-500/30 outline-none transition-all text-xs font-black text-white placeholder:text-gray-800 shadow-2xl"
                                    placeholder="ADMIN@NEST.IO"
                                />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] font-black text-gray-700 uppercase tracking-[3px]">Secret Hash</label>
                                <button type="button" className="text-[9px] font-black text-gray-600 hover:text-purple-400 uppercase tracking-widest transition-colors">Emergency</button>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-700 group-focus-within:text-purple-400 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-black border border-white/5 rounded-[24px] focus:border-purple-500/30 outline-none transition-all text-xs font-black text-white placeholder:text-gray-800 shadow-2xl"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-purple-600 text-white text-[11px] font-black uppercase tracking-[2px] rounded-[24px] transition-all shadow-[0_15px_30px_-5px_rgba(139,92,246,0.3)] flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <>
                                        AUTHORIZE ACCESS
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>
                        </div>
                    </form>

                    <div className="mt-10 flex items-center justify-center gap-6">
                        <div className="h-[1px] flex-1 bg-white/5" />
                        <span className="text-[9px] font-black text-gray-800 uppercase tracking-[4px]">Verified By NeSt</span>
                        <div className="h-[1px] flex-1 bg-white/5" />
                    </div>
                </div>

                <footer className="mt-12 text-center">
                    <p className="text-[10px] font-black text-gray-700 uppercase tracking-[3px]">
                        &copy; 2025 <span className="text-white">NeSt</span> <span className="mx-3 opacity-20">|</span> Unified Property Logic
                    </p>
                </footer>
            </motion.div>
        </div>
    );
}
