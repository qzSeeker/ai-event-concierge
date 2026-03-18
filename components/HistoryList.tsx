'use client'

import { motion } from 'framer-motion'

interface Search {
    id: string
    user_query: string
    venue_name: string
    created_at: string
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
    if (!history.length) return null

    return (
        <div>
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase mb-3">
            Previous searches
        </p>

        <div className="flex flex-col gap-1">
            {history.map((item, i) => (
            <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5 transition-colors group cursor-default"
            >
                <div className="flex-1 min-w-0 pr-4">
                <p className="text-sm font-medium text-white/70 truncate group-hover:text-white/90 transition-colors">
                    {item.user_query}
                </p>
                <p className="text-xs text-white/35 mt-0.5">→ {item.venue_name}</p>
                </div>
                <span className="shrink-0 text-xs text-white/25">
                {timeAgo(item.created_at)}
                </span>
            </motion.div>
            ))}
        </div>
        </div>
    )
}