'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Loader2 } from 'lucide-react';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import ThreeBackground from '@/components/ThreeBackground';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    // 3D Card Effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
            toast.error(error.response?.data?.message || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
            <ThreeBackground />
            <Toaster position="top-right" />

            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                initial={{ opacity: 0, z: -100 }}
                animate={{ opacity: 1, z: 0 }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md"
            >
                <div
                    style={{ transform: 'translateZ(50px)' }}
                    className="px-10 py-12 bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl relative z-10"
                >
                    <div className="flex flex-col items-center mb-10" style={{ transform: 'translateZ(30px)' }}>
                        <motion.div
                            whileHover={{ rotateY: 180 }}
                            transition={{ duration: 0.6 }}
                            className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-black/10"
                        >
                            <ShieldCheck className="w-7 h-7 text-white" />
                        </motion.div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Portal</h1>
                        <p className="text-gray-500 text-sm mt-1">Authenticate to manage Hostel Hava</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6" style={{ transform: 'translateZ(20px)' }}>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                                placeholder="name@hostel.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02, translateZ: '10px' }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-xl shadow-black/10 flex items-center justify-center disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Enter Dashboard'}
                        </motion.button>
                    </form>

                    <footer className="mt-10 pt-6 border-t border-gray-100 text-center" style={{ transform: 'translateZ(10px)' }}>
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Secure Infrastructure &bull; Hostel Hava</span>
                    </footer>
                </div>

                {/* Decorative 3D elements behind the card */}
                <div
                    className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-cyan-500/10 rounded-[2.5rem] -z-10 blur-2xl opacity-50"
                    style={{ transform: 'translateZ(-20px)' }}
                />
            </motion.div>
        </div>
    );
}
