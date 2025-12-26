'use client';
import { motion } from 'framer-motion';

export default function PlaceholderPage() {
    return (
        <div className="h-[80vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <h2 className="text-3xl font-bold text-white">Coming Soon</h2>
                <p className="text-slate-400 mt-2 text-lg">We are currently implementing this module.</p>
                <div className="mt-8 flex justify-center">
                    <div className="w-12 h-1 bg-indigo-500 rounded-full animate-pulse" />
                </div>
            </motion.div>
        </div>
    );
}
