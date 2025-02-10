'use client';

import {motion} from 'framer-motion';
import {CHANGE_LOGS} from "./constant";

export default function Changelog() {
    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const item = {
        hidden: {opacity: 0, y: 20},
        show: {opacity: 1, y: 0}
    };

    return (
        <div className="max-w-5xl mx-auto p-8 min-h-screen bg-gradient-to-b from-gray-50 to-white">
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-bold mb-4 text-gray-800 tracking-tight">Changelog</h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Discover journey through continuous improvements and innovations
                </p>
            </motion.div>

            <motion.div
                className="space-y-12 border-l-2 border-blue-300 pl-8"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {CHANGE_LOGS.map((entry, index) => (
                    <motion.div
                        key={index}
                        className="relative group"
                        variants={item}
                    >
                        <div className="absolute -left-[41px] flex items-center justify-center">
                            <div className="w-5 h-5 bg-blue-500 rounded-full ring-8 ring-white group-hover:ring-blue-50 transition-all duration-300 group-hover:scale-110"></div>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <span className={`
                                    px-4 py-1.5 rounded-full text-sm font-medium tracking-wide
                                    ${entry.tag === 'Feature' ? 'bg-green-50 text-green-700 ring-1 ring-green-200' : ''}
                                    ${entry.tag === 'Enhancement' ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200' : ''}
                                    ${entry.tag === 'Security' ? 'bg-purple-50 text-purple-700 ring-1 ring-purple-200' : ''}
                                `}>
                                    {entry.tag}
                                </span>
                                <time className="text-sm text-gray-500 font-medium">{entry.date}</time>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                {entry.title}
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                {entry.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
