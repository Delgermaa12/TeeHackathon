import React from 'react';
import { motion } from 'framer-motion';
import { useAppContext } from '../../context/AppContext';

interface DataPoint {
    label: string;
    value: number;
}

interface SimpleChartProps {
    data: DataPoint[];
    height?: number;
    color?: string;
}

export function SimpleChart({ data, height = 200, color = '#eab308' }: SimpleChartProps) {
    const { theme } = useAppContext();
    
    if (data.length === 0) return null;

    const maxVal = Math.max(...data.map(d => d.value), 1);
    const padding = 20;
    const chartWidth = 500;
    const chartHeight = height - padding * 2;
    
    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * chartWidth,
        y: chartHeight - (d.value / maxVal) * chartHeight
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L 0 ${chartHeight} Z`;

    return (
        <div className="w-full overflow-hidden">
            <svg 
                viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                className="w-full overflow-visible"
                style={{ height: chartHeight }}
                preserveAspectRatio="none"
            >
                {/* Grid Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                    <line 
                        key={i}
                        x1="0" 
                        y1={chartHeight * p} 
                        x2={chartWidth} 
                        y2={chartHeight * p} 
                        stroke={theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 
                        strokeWidth="1"
                    />
                ))}

                {/* Area */}
                <motion.path
                    d={areaPath}
                    fill={`url(#gradient-${color.replace('#', '')})`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.2 }}
                    transition={{ duration: 1 }}
                />

                {/* Line */}
                <motion.path
                    d={linePath}
                    fill="none"
                    stroke={color}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />

                {/* Points */}
                {points.map((p, i) => (
                    <motion.circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="4"
                        fill={theme === 'dark' ? '#0a0a0a' : '#fff'}
                        stroke={color}
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                    />
                ))}

                <defs>
                    <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={color} stopOpacity="1" />
                        <stop offset="100%" stopColor={color} stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
            
            <div className="flex justify-between mt-4">
                {data.map((d, i) => (
                    <span key={i} className={`text-[8px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white/20' : 'text-black/30'}`}>
                        {d.label}
                    </span>
                ))}
            </div>
        </div>
    );
}
