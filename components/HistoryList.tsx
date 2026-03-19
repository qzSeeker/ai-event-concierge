'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Search {
    id: string
    user_query: string
    venue_name: string
    location: string
    estimated_cost: string
    why_it_fits: string
    created_at: string
    session_id: string
}

interface Props {
    history: Search[]
}

function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime()
    const mins = Math.floor(diff / 60000)
    const hours = Math.floor(mins / 60)
    const days = Math.floor(hours / 24)
    if (days > 0) return `${days}d ago`
    if (hours > 0) return `${hours}h ago`
    if (mins > 0) return `${mins}m ago`
    return 'Just now'
}

export default function HistoryList({ history }: Props) {
    const [expandedId, setExpandedId] = useState<string | null>(null)

    if (!history.length) return null

    const toggle = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }

    return (
        <div>
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase mb-3">
            Previous searches
        </p>

        <div className="flex flex-col gap-2">
            {history.map((item, i) => {
            const isOpen = expandedId === item.id

            return (
                <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="rounded-xl border border-white/10 overflow-hidden"
                >
                {/* Clickable row */}
                <button
                    onClick={() => toggle(item.id)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors text-left group"
                >
                    <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-medium text-white/70 truncate group-hover:text-white/90 transition-colors">
                        {item.user_query}
                    </p>
                    <p className="text-xs text-white/35 mt-0.5">
                        → {item.venue_name}
                    </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-white/25">
                        {timeAgo(item.created_at)}
                    </span>
                    <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/30 text-xs"
                    >
                        ▼
                    </motion.span>
                    </div>
                </button>

                {/* Expanded proposal card */}
                <AnimatePresence initial={false}>
                    {isOpen && (
                    <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-white/10 px-4 py-4 bg-white/3">

                        {/* Top row */}
                        <div className="flex items-start justify-between mb-3">
                            <h2 className="text-lg font-semibold text-white leading-snug">
                            {item.venue_name}
                            </h2>
                            <span className="shrink-0 ml-3 text-sm font-medium bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                            {item.estimated_cost}
                            </span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                            <p className="text-sm font-medium text-white/60">
                            {item.location}
                            </p>
                        </div>

                        {/* Why it fits */}
                        <div className="border-t border-white/10 pt-3">
                            <p className="text-[10px] font-semibold tracking-widest text-white/35 uppercase mb-2">
                            Why it fits
                            </p>
                            <p className="text-sm text-white/60 leading-relaxed">
                            {item.why_it_fits}
                            </p>
                        </div>

                        {/* Reuse button */}
                        <button
                            onClick={() => {
                            navigator.clipboard.writeText(item.user_query)
                            }}
                            className="mt-4 text-xs text-white/30 hover:text-white/60 transition-colors border border-white/10 hover:border-white/20 rounded-lg px-3 py-1.5"
                        >
                            Copy query
                        </button>

                        </div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </motion.div>
            )
            })}
        </div>
        </div>
    )
}