'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface Proposal {
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
    proposal: Proposal | null
}

export default function ProposalCard({ proposal }: Props) {
    if (!proposal) return null

    return (
        <div className="mb-6">
        <p className="text-xs font-medium tracking-widest text-white/40 uppercase mb-3">
            Latest proposal
        </p>

        <AnimatePresence mode="wait">
            <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="relative rounded-xl border border-white/10 bg-white/5 p-5"
            >
            {/* NEW badge */}
            <span className="absolute top-0 right-0 text-[10px] font-semibold bg-white text-[#1a1a1a] px-3 py-1 rounded-bl-lg rounded-tr-xl tracking-wider">
                New
            </span>

            {/* Top row */}
            <div className="flex items-start justify-between pr-12 mb-3">
                <h2 className="text-xl font-semibold text-white leading-snug">
                {proposal.venue_name}
                </h2>
                <span className="shrink-0 ml-3 text-sm font-medium bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                {proposal.estimated_cost}
                </span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
                <p className="text-sm font-medium text-white/60">{proposal.location}</p>
            </div>

            {/* Why it fits */}
            <div className="border-t border-white/10 pt-4">
                <p className="text-[10px] font-semibold tracking-widest text-white/35 uppercase mb-2">
                Why it fits
                </p>
                <p className="text-sm text-white/60 leading-relaxed">{proposal.why_it_fits}</p>
            </div>
            </motion.div>
        </AnimatePresence>
        </div>
    )
}