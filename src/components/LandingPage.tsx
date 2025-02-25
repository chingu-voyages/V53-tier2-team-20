import { motion } from 'framer-motion';
import { Utensils, Clock, Calendar, Sparkles } from 'lucide-react';

export function LandingPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#FF7F50] via-[#FFA500] to-[#FFDAB9]">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20" />
            </div>

            <div className="relative flex min-h-screen flex-col items-center justify-center px-4">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="rounded-full bg-white px-8 py-3 shadow-lg">
                        <h1 className="bg-gradient-to-r from-[#FF7F50] to-[#FFA500] bg-clip-text text-4xl font-bold text-transparent">
                            Schedulicious
                        </h1>
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="mb-12 text-center text-3xl font-bold text-white md:text-4xl"
                >
                    Smart Meal Scheduling in Minutes!
                </motion.h2>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {[
                        { icon: Calendar, text: 'Weekly Planning' },
                        { icon: Clock, text: 'Quick Setup' },
                        { icon: Utensils, text: 'Diverse Meals' },
                        { icon: Sparkles, text: 'Smart AI' },
                    ].map((item, index) => (
                        <motion.div
                            key={item.text}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center justify-center rounded-lg bg-white/10 p-4 text-center backdrop-blur-sm"
                        >
                            <item.icon className="mb-2 h-6 w-6 text-white" />
                            <span className="text-sm font-medium text-white md:text-base">
                                {item.text}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="mt-12"
                >
                    <button className="rounded-full bg-white px-8 py-3 font-semibold text-[#FF7F50] shadow-lg transition-transform hover:scale-105">
                        Get Started
                    </button>
                </motion.div>
            </div>
        </div>
    );
}
